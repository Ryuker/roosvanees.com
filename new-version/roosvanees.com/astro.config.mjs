// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from 'astro-icon';
import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), relativeLinks(), 
    icon({
      iconDir: "src/assets/icons",
      include: {
        // mdi: ["*"], // (Default) Loads entire Material Design Icon set
        // mdi: ["account"], // Loads only Material Design Icon's "account" SVG
      }
    })
  ],
  output: 'static',
  site: 'https://ryuker.github.io',
  outDir: './dist/docs',
  build: {
    assets: 'astro',
  },
  trailingSlash: 'always'
});