import { chromium } from '@playwright/test';
import type { Route } from './+types/banan';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const url = URL.parse(request.url)?.searchParams.get('path');

  if (!url) {
    return {
      data: '/th.png',
    };
  }
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(decodeURIComponent(url));
  const buffer = await page.screenshot({ type: 'png' });
  return {
    data: `data:image/png;base64,${buffer.toString('base64')}`,
  };
};

export default function Banan({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <img src={loaderData.data} alt={'Result'} />
    </main>
  );
}
