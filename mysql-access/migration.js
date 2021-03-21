const db = require('./db')
const fs = require('fs')

const initMigration = async(connection) => {
  const [ results ] = await connection.query(`SHOW TABLES LIKE 'migration_version'`)

  if (results.length === 0) {
    await connection.query('START TRANSACTION')
    await connection.query(`
      CREATE TABLE migration_version (
        id INT NOT NULL AUTO_INCREMENT,
        version INT NOT NULL,
        PRIMARY KEY (id)
      );
    `)
    await connection.query('INSERT INTO migration_version (id, version) VALUES (1, 0);')
    await connection.query('COMMIT;')
  }
}

const getCurrentVersion = async(connection) => {
  const [ results ] = await connection.query('SELECT version FROM migration_version WHERE id = 1')
  return results[0].version
}

const migration = async() => {
  const connection = await db
  await initMigration(connection)

  // PARÂMETROS PARA EXECUTAR O SCRIPT PELA LINHA DE COMANDO. CHAMAR COM node migration.js --target-version 50
  const currentVersion = await getCurrentVersion(connection)
  let targetVersion = 1000
  if (process.argv.length) {
    if (process.argv[2] === '--target-version' && process.argv[3]){
      targetVersion = parseInt(process.argv[3])
    }
  }
  console.log('Migratin to: ', targetVersion)

  const migrations = fs.readdirSync('./migrations')

  const migrationSorted = migrations.map(version => {
    return parseInt(version.split('.')[0])
  }).sort((a, b) => a - b)

  const migrationSortedReverse = migrations.map(version => {
    return parseInt(version.split('.')[0])
  }).sort((a, b) => b - a)

  for await (const migration of migrationSorted) {
    if (migration > currentVersion && targetVersion >= migration){
      const m = require('./migrations/' + migration + '.js')
      await connection.query('START TRANSACTION;')
      if (m.up){
        await m.up(connection)
        console.log('Migration UP: ', migration)
      }
      await connection.query('UPDATE migration_version SET version = ? WHERE id = ?;', [migration, 1])
      await connection.query('COMMIT;')
    }
  }

  for await (const migration of migrationSortedReverse) {
    if (migration <= currentVersion && targetVersion < migration){
      const m = require('./migrations/' + migration + '.js')
      await connection.query('START TRANSACTION;')
      if (m.down){
        await m.down(connection)
        console.log('Migration DOWN: ', migration)
      }
      const currentMigration = migrationSortedReverse[migrationSortedReverse.indexOf(migration)+1] || 0
      await connection.query('UPDATE migration_version SET version = ? WHERE id = ?;', [currentMigration, 1])
      await connection.query('COMMIT;')
    }
  }
  await connection.close()
}

migration()
