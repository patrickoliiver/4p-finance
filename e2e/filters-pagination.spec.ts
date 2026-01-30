import { test, expect } from './fixtures'

test.describe('Filtros', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('deve filtrar por entradas', async ({ page }) => {
    await page.click('button:has-text("Entradas")')

    await expect(page).toHaveURL(/filter=income/)
  })

  test('deve filtrar por saídas', async ({ page }) => {
    await page.click('button:has-text("Saídas")')

    await expect(page).toHaveURL(/filter=outcome/)
  })

  test('deve filtrar por excluídos', async ({ page }) => {
    await page.click('button:has-text("Excluídos")')

    await expect(page).toHaveURL(/filter=deleted/)
  })

  test('deve mostrar todos ao clicar em Todos', async ({ page }) => {
    await page.click('button:has-text("Saídas")')
    await page.click('button:has-text("Todos")')

    await expect(page).toHaveURL(/filter=all/)
  })

  test('deve manter filtro ao recarregar página', async ({ page }) => {
    await page.click('button:has-text("Entradas")')
    await expect(page).toHaveURL(/filter=income/)

    await page.reload()

    await expect(page).toHaveURL(/filter=income/)
  })

  test('deve criar histórico no navegador', async ({ page }) => {
    await page.click('button:has-text("Entradas")')
    await page.click('button:has-text("Saídas")')
    await page.click('button:has-text("Excluídos")')

    await page.goBack()
    await expect(page).toHaveURL(/filter=outcome/)

    await page.goBack()
    await expect(page).toHaveURL(/filter=income/)
  })
})

test.describe('Paginação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('deve mudar página via URL', async ({ page }) => {
    await page.goto('/?page=2')

    await expect(page).toHaveURL(/page=2/)
  })

  test('deve mudar itens por página', async ({ page }) => {
    await page.selectOption('select', '15')

    await expect(page).toHaveURL(/limit=15/)
  })

  test('deve manter paginação ao recarregar', async ({ page }) => {
    await page.goto('/?page=2&limit=15')

    await page.reload()

    await expect(page).toHaveURL(/page=2/)
    await expect(page).toHaveURL(/limit=15/)
  })

  test('deve resetar página ao mudar filtro', async ({ page }) => {
    await page.goto('/?page=2')

    await page.click('button:has-text("Entradas")')

    // Filtro muda, página deve resetar para 1
    await expect(page).toHaveURL(/filter=income/)
    await expect(page).not.toHaveURL(/page=2/)
  })
})

test.describe('URL State', () => {
  test('deve restaurar estado completo da URL', async ({ page }) => {
    await page.goto('/?filter=income&page=1&limit=15')

    // Verifica que o filtro "Entradas" está ativo
    const entriesButton = page.locator('button:has-text("Entradas")')
    await expect(entriesButton).toHaveAttribute('class', /active/)

    // Verifica select de itens por página
    await expect(page.locator('select')).toHaveValue('15')
  })

  test('deve abrir modal de novo valor via URL', async ({ page }) => {
    await page.goto('/?modal=new')

    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('deve fechar modal e limpar URL', async ({ page }) => {
    await page.goto('/?modal=new')

    // Fecha modal clicando fora ou no X
    await page.keyboard.press('Escape')

    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(page).not.toHaveURL(/modal=/)
  })
})
