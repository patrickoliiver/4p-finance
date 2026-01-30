import { test as base } from '@playwright/test'
import { copyFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Extend base test with database reset
export const test = base.extend({
  page: async ({ page }, use) => {
    // Reset database before each test
    const fixturePath = resolve(__dirname, 'fixtures/db.fixture.json')
    const dbPath = resolve(__dirname, '../db.json')
    copyFileSync(fixturePath, dbPath)

    // Small delay to ensure json-server picks up the change
    await page.waitForTimeout(100)

    await use(page)
  },
})

export { expect } from '@playwright/test'
