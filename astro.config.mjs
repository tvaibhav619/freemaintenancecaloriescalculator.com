// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://freemaintenancecaloriescalculator.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
          ja: 'ja',
          fr: 'fr',
          de: 'de',
          pt: 'pt',
          ko: 'ko',
          it: 'it',
        },
      },
      filter: (page) => !page.includes('/404') && !page.includes('/500'),
      serialize(item) {
        item.lastmod = new Date().toISOString().split('T')[0];
        const path = new URL(item.url).pathname;
        if (path === '/' || /^\/[a-z]{2}\/$/.test(path)) {
          item.changefreq = 'daily';
          item.priority = path === '/' ? 1.0 : 0.9;
        } else {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});