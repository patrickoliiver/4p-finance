import { test, expect } from './fixtures'

test.describe('Transações', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Criar transação', () => {
    test('deve abrir modal ao clicar em "Novo valor"', async ({ page }) => {
      await page.click('button:has-text("Novo valor")')

      await expect(page).toHaveURL(/modal=new/)
      await expect(page.getByRole('dialog')).toBeVisible()
    })

    test('deve criar transação de entrada', async ({ page }) => {
      await page.click('button:has-text("Novo valor")')
      await page.fill('input[placeholder="0.00"]', '15000')

      await page.getByRole('dialog').locator('button:has-text("Entrada")').click()
      await page.getByRole('dialog').locator('button:has-text("Adicionar")').click()

      await expect(page.getByRole('dialog')).not.toBeVisible()
      await expect(page.locator('text=R$ 150,00')).toBeVisible()
    })

    test('deve criar transação de saída', async ({ page }) => {
      await page.click('button:has-text("Novo valor")')
      await page.fill('input[placeholder="0.00"]', '5000')

      await page.getByRole('dialog').locator('button:has-text("Saída")').click()
      await page.getByRole('dialog').locator('button:has-text("Adicionar")').click()

      await expect(page.getByRole('dialog')).not.toBeVisible()
      await expect(page.locator('text=R$ 50,00')).toBeVisible()
    })

    test('deve validar valor zero', async ({ page }) => {
      await page.click('button:has-text("Novo valor")')
      await page.getByRole('dialog').locator('button:has-text("Adicionar")').click()

      await expect(page.locator('text=O valor precisa ser diferente de 0.00')).toBeVisible()
    })

    test('deve persistir valores na URL ao digitar', async ({ page }) => {
      await page.click('button:has-text("Novo valor")')
      await page.fill('input[placeholder="0.00"]', '10000')
      await page.getByRole('dialog').locator('button:has-text("Saída")').click()

      await expect(page).toHaveURL(/amount=/)
      await expect(page).toHaveURL(/type=outcome/)
    })
  })

  test.describe('Editar transação', () => {
    test('deve abrir modal de edição ao clicar em uma transação', async ({ page }) => {
      // Fixture tem R$ 1.000,00 (fixture_001)
      await page.locator('text=R$ 1.000,00').click()

      await expect(page).toHaveURL(/modal=edit/)
      await expect(page).toHaveURL(/id=fixture_001/)
      await expect(page.getByRole('dialog')).toBeVisible()
    })

    test('deve atualizar transação', async ({ page }) => {
      // Edita transação do fixture
      await page.locator('text=R$ 1.000,00').click()

      const input = page.getByRole('dialog').locator('input')
      await input.clear()
      await input.fill('120000')
      await page.getByRole('dialog').locator('button:has-text("Salvar alterações")').click()

      await expect(page.getByRole('dialog')).not.toBeVisible()
      await expect(page.locator('text=R$ 1.200,00')).toBeVisible()
    })
  })

  test.describe('Deletar transação', () => {
    test('deve mover transação para excluídos', async ({ page }) => {
      // Fixture tem R$ 500,00 (mais recente) e R$ 1.000,00 ativos
      await expect(page.locator('text=R$ 500,00')).toBeVisible()

      // Deleta primeira transação (R$ 500,00 - mais recente)
      await page.locator('main').getByRole('button', { name: 'Excluir' }).first().click()
      await page.waitForTimeout(500)

      // Vai para excluídos e verifica
      await page.click('button:has-text("Excluídos")')
      await expect(page.locator('text=R$ 500,00')).toBeVisible()
    })
  })

  test.describe('Restaurar transação', () => {
    test('deve restaurar transação excluída', async ({ page }) => {
      // Fixture tem R$ 750,00 deletado (fixture_003)
      await page.click('button:has-text("Excluídos")')
      await expect(page.locator('text=R$ 750,00')).toBeVisible()

      // Restaura
      await page.locator('button:has-text("Restaurar")').click()
      await page.waitForTimeout(500)

      // Verifica que sumiu dos excluídos
      await expect(page.locator('main >> text=R$ 750,00')).not.toBeVisible()

      // Volta para lista principal
      await page.click('button:has-text("Todos")')
      await expect(page.locator('text=R$ 750,00')).toBeVisible()
    })
  })
})
