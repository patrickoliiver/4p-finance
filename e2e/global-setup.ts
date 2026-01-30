import { copyFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default async function globalSetup() {
  const fixturePath = resolve(__dirname, 'fixtures/db.fixture.json')
  const dbPath = resolve(__dirname, '../db.json')

  copyFileSync(fixturePath, dbPath)
  console.log('Database reset to fixture state')
}
