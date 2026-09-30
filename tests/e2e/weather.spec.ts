import { expect, test } from '@playwright/test';

test('busca uma cidade, exibe a previsão e troca para Fahrenheit', async ({ page }) => {
  await page.route('**/geocoding-api.open-meteo.com/v1/search**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        results: [
          {
            id: 3451190,
            name: 'São Paulo',
            latitude: -23.5505,
            longitude: -46.6333,
            country: 'Brasil',
            country_code: 'BR',
            admin1: 'São Paulo',
            timezone: 'America/Sao_Paulo',
          },
        ],
      }),
    });
  });

  await page.route('**/api.open-meteo.com/v1/forecast**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        timezone: 'America/Sao_Paulo',
        current: {
          time: '2026-09-30T12:00',
          temperature_2m: 24.1,
          weather_code: 1,
          is_day: 1,
          relative_humidity_2m: 68,
          precipitation: 0,
          pressure_msl: 1012,
          wind_speed_10m: 12.4,
        },
        daily: {
          time: ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'],
          weather_code: [1, 2, 3, 61, 0],
          temperature_2m_min: [19.2, 19.8, 20.1, 18.7, 19.4],
          temperature_2m_max: [27.3, 28.1, 26.9, 24.5, 27.8],
          precipitation_probability_max: [10, 20, 40, 70, 5],
          precipitation_sum: [0, 0.2, 1.5, 8.1, 0],
          wind_speed_10m_max: [18, 20.4, 22.1, 25, 16.2],
          sunrise: ['2026-09-30T05:45', '2026-10-01T05:44', '2026-10-02T05:43', '2026-10-03T05:42', '2026-10-04T05:41'],
          sunset: ['2026-09-30T17:48', '2026-10-01T17:48', '2026-10-02T17:49', '2026-10-03T17:49', '2026-10-04T17:50'],
        },
      }),
    });
  });

  await page.goto('/');
  await page.getByLabel('Cidade').fill('São Paulo');
  await page.getByRole('button', { name: 'Buscar' }).click();

  await expect(page.getByRole('heading', { name: 'São Paulo' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Previsão.*5 dias/ })).toBeVisible();

  await page.getByRole('button', { name: '°F' }).click();

  await expect(page.getByRole('group', { name: 'Temperatura 75°F' })).toBeVisible();
  await expect(page.getByRole('button', { name: '°F' })).toHaveAttribute('aria-pressed', 'true');
});

test('mostra estado vazio quando geocoding não retorna results', async ({ page }) => {
  await page.route('**/geocoding-api.open-meteo.com/v1/search**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.goto('/');
  await page.getByLabel('Cidade').fill('Cidade inexistente');
  await page.getByRole('button', { name: 'Buscar' }).click();

  await expect(page.getByRole('heading', { name: 'Nenhuma cidade encontrada' })).toBeVisible();
});

test('rejeita busca vazia e somente espaços sem chamar geocoding', async ({ page }) => {
  let geocodingCalls = 0;
  await page.route('**/geocoding-api.open-meteo.com/v1/search**', async (route) => {
    geocodingCalls += 1;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByRole('alert')).toContainText('Informe uma cidade');

  await page.getByLabel('Cidade').fill('   ');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByRole('alert')).toContainText('Informe uma cidade');
  expect(geocodingCalls).toBe(0);
});

test('preserva caracteres especiais na busca', async ({ page }) => {
  await page.route('**/geocoding-api.open-meteo.com/v1/search**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        results: [
          {
            id: 3451190,
            name: 'São Paulo',
            latitude: -23.5505,
            longitude: -46.6333,
            country: 'Brasil',
            country_code: 'BR',
          },
        ],
      }),
    });
  });
  await page.route('**/api.open-meteo.com/v1/forecast**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        timezone: 'America/Sao_Paulo',
        current: { time: '2026-09-30T12:00', temperature_2m: 20, weather_code: 0, is_day: 1 },
        daily: {
          time: ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'],
          weather_code: [0, 0, 0, 0, 0],
          temperature_2m_min: [10, 10, 10, 10, 10],
          temperature_2m_max: [20, 20, 20, 20, 20],
        },
      }),
    });
  });

  await page.goto('/');
  await page.getByLabel('Cidade').fill('São Paulo');
  await page.getByRole('button', { name: 'Buscar' }).click();

  await expect(page.getByRole('heading', { name: 'São Paulo' })).toBeVisible();
});

test('mostra erro amigável quando forecast está incompleto', async ({ page }) => {
  await page.route('**/geocoding-api.open-meteo.com/v1/search**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        results: [{ id: 1, name: 'São Paulo', latitude: -23.5, longitude: -46.6, country: 'Brasil' }],
      }),
    });
  });
  await page.route('**/api.open-meteo.com/v1/forecast**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ current: { temperature_2m: 20 } }),
    });
  });

  await page.goto('/');
  await page.getByLabel('Cidade').fill('São Paulo');
  await page.getByRole('button', { name: 'Buscar' }).click();

  await expect(page.getByRole('alert')).toContainText('Os dados da previsão estão incompletos.');
});

test.describe('fluxo mobile estreito', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('busca e renderiza o clima em 375x812', async ({ page }) => {
    await page.route('**/geocoding-api.open-meteo.com/v1/search**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [
            {
              id: 3451190,
              name: 'São Paulo',
              latitude: -23.5505,
              longitude: -46.6333,
              country: 'Brasil',
              country_code: 'BR',
              admin1: 'São Paulo',
              timezone: 'America/Sao_Paulo',
            },
          ],
        }),
      });
    });

    await page.route('**/api.open-meteo.com/v1/forecast**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          timezone: 'America/Sao_Paulo',
          current: {
            time: '2026-09-30T12:00',
            temperature_2m: 24.1,
            weather_code: 1,
            is_day: 1,
            precipitation: 0,
          },
          daily: {
            time: ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'],
            weather_code: [1, 2, 3, 61, 0],
            temperature_2m_min: [19, 19, 20, 18, 19],
            temperature_2m_max: [27, 28, 26, 24, 27],
            precipitation_probability_max: [10, 20, 40, 70, 5],
          },
        }),
      });
    });

    await page.goto('/');
    await page.getByLabel('Cidade').fill('São Paulo');
    await page.getByRole('button', { name: 'Buscar' }).click();

    await expect(page.getByRole('heading', { name: 'São Paulo' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Previsão.*5 dias/ })).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      .toBe(true);
  });
});