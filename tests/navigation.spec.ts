import { test, expect } from '@playwright/test';

test.describe('Hash Routing - Navegação', () => {

    test('F5 deve manter estado na ferramenta', async ({ page }) => {
        // 1. Ir para dashboard (landing redireciona quando logado)
        await page.goto('/#/app');
        await page.waitForLoadState('networkidle');

        // 2. Navegar para ferramentas
        await page.getByRole('button', { name: /ferramentas/i }).click();
        await page.waitForLoadState('networkidle');

        // 3. Clicar em Simples Nacional
        await page.getByRole('heading', { name: 'Simples Nacional', exact: true }).click();
        await expect(page).toHaveURL(/#\/tools\/simples-nacional/);

        // 4. Refresh (F5)
        await page.reload();
        await page.waitForLoadState('networkidle');

        // 5. CRÍTICO: Deve permanecer na ferramenta
        await expect(page).toHaveURL(/#\/tools\/simples-nacional/);
        await expect(page.getByRole('heading', { name: 'Simples Nacional', exact: true }).first()).toBeVisible();
    });

    test('F5 deve manter estado no dashboard', async ({ page }) => {
        await page.goto('/#/app');
        await page.waitForLoadState('networkidle');
        await expect(page.getByRole('button', { name: /visão geral/i })).toBeVisible({ timeout: 10000 });

        await page.reload();
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveURL(/#\/app/);
        await expect(page.getByRole('button', { name: /visão geral/i })).toBeVisible();
    });
});

test.describe('Hash Routing - Histórico', () => {

    test('Botão voltar deve funcionar corretamente', async ({ page }) => {
        // 1. Dashboard
        await page.goto('/#/app');
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(/#\/app/);

        // 2. Ferramentas
        await page.getByRole('button', { name: /ferramentas/i }).click();
        await page.waitForLoadState('networkidle');

        // 3. ICMS-ST
        await page.getByRole('heading', { name: /icms-st calculator/i }).click();
        await expect(page).toHaveURL(/#\/tools\/icms-st/);

        // 4. Voltar para ferramentas
        await page.goBack();
        await page.waitForLoadState('networkidle');
        await expect(page.getByRole('heading', { name: /central de ferramentas/i })).toBeVisible();

        // 5. Voltar para dashboard
        await page.goBack();
        await expect(page).toHaveURL(/#\/app/);
    });
});

test.describe('Hash Routing - Deep Linking', () => {

    test('Link direto para ferramenta deve funcionar', async ({ page }) => {
        await page.goto('/#/tools/difal');
        await page.waitForLoadState('networkidle');

        // DIFAL é chamado "Partilha ICMS (EC 87/2015)" - usar getByText mais robusto
        await expect(page.getByText(/partilha.*icms/i).first()).toBeVisible({ timeout: 10000 });
        await expect(page).toHaveURL(/#\/tools\/difal/);
    });

    test('Link direto para dashboard deve funcionar', async ({ page }) => {
        await page.goto('/#/app');
        await page.waitForLoadState('networkidle');

        await expect(page.getByRole('button', { name: /visão geral/i })).toBeVisible({ timeout: 10000 });
        await expect(page).toHaveURL(/#\/app/);
    });

    test('Link direto para consultor IA deve funcionar', async ({ page }) => {
        await page.goto('/#/consultor-ia');
        await page.waitForLoadState('networkidle');

        // Produção usa "Consultor AI" - usar getByText mais robusto
        await expect(page.getByText(/consultor.*ai/i).first()).toBeVisible({ timeout: 10000 });
        await expect(page).toHaveURL(/#\/consultor-ia/);
    });
});

test.describe('Hash Routing - Fallback', () => {

    test('Hash inválido deve redirecionar para dashboard', async ({ page }) => {
        await page.goto('/#/banana');
        await page.waitForLoadState('networkidle');

        // Deve fazer fallback para dashboard - aumentar timeout
        await expect(page).toHaveURL(/#\/app/, { timeout: 10000 });

        // Não deve mostrar tela branca
        const body = page.locator('body');
        await expect(body).not.toBeEmpty();
        await expect(page.getByRole('button', { name: /visão geral/i })).toBeVisible();
    });

    test('Hash malformado deve ser tratado', async ({ page }) => {
        await page.goto('/#///invalid///path');
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveURL(/#\/app/, { timeout: 10000 });
        await expect(page.locator('body')).not.toBeEmpty();
        await expect(page.getByRole('button', { name: /visão geral/i })).toBeVisible();
    });
});

test.describe('Hash Routing - localStorage', () => {

    test('localStorage deve persistir estado', async ({ page }) => {
        await page.goto('/#/app');
        await page.waitForLoadState('networkidle');

        await page.getByRole('button', { name: /ferramentas/i }).click();
        await page.waitForLoadState('networkidle');

        await page.getByRole('heading', { name: 'Simples Nacional', exact: true }).click();
        await page.waitForLoadState('networkidle');

        // Verificar localStorage
        const state = await page.evaluate(() => {
            return localStorage.getItem('portal_fiscal_state');
        });

        expect(state).toBeTruthy();
        const parsed = JSON.parse(state!);
        expect(parsed.activeTool).toBe('simples-nacional');
        expect(parsed.showLanding).toBe(false);
    });

    test('localStorage deve ser usado no reload', async ({ page, context }) => {
        // Definir estado no localStorage
        await page.goto('/#/app');
        await page.waitForLoadState('networkidle');

        await page.evaluate(() => {
            localStorage.setItem('portal_fiscal_state', JSON.stringify({
                showLanding: false,
                activeTab: 'tools',
                activeTool: 'icms-st'
            }));
        });

        // Reload deve ler localStorage
        await page.reload();
        await page.waitForLoadState('networkidle');

        // Deve abrir direto na ferramenta - aguardar URL mudar
        await expect(page).toHaveURL(/#\/tools\/icms-st/, { timeout: 10000 });
        await expect(page.getByRole('heading', { name: /icms-st/i })).toBeVisible();
    });
});

test.describe('Hash Routing - Navegação Complexa', () => {

    test('Navegar entre múltiplas ferramentas', async ({ page }) => {
        await page.goto('/#/app');
        await page.waitForLoadState('networkidle');

        // Ir para ferramentas
        await page.getByRole('button', { name: /ferramentas/i }).click();
        await page.waitForLoadState('networkidle');

        // Ferramenta 1: Simples Nacional
        await page.getByRole('heading', { name: 'Simples Nacional', exact: true }).click();
        await expect(page).toHaveURL(/#\/tools\/simples-nacional/);

        // Voltar
        await page.goBack();
        await page.waitForLoadState('networkidle');
        await expect(page.getByRole('heading', { name: /central de ferramentas/i })).toBeVisible();

        // Ferramenta 2: DIFAL (Partilha ICMS) - usar getByText
        await page.getByText(/partilha.*icms/i).first().click();
        await expect(page).toHaveURL(/#\/tools\/difal/);

        // Voltar
        await page.goBack();
        await page.waitForLoadState('networkidle');
        await expect(page.getByRole('heading', { name: /central de ferramentas/i })).toBeVisible();

        // Avançar
        await page.goForward();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(/#\/tools\/difal/);
    });
});
