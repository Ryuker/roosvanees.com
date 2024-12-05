# roosvanees.com notes


## static deployment to Github Pages
1. add to `package.json`
``` js
"homepage": "https://ryuker.github.io/roosvanees.com",
"scripts": {
  "predeploy" : "npm run build",
  "deploy" : "gh-pages -d dist",
  // other scripts
}
```
2. modify astro.config.mjs
- important to specify docs folder
- modify asset prefix to use `./` to ensure css etc is loading properly, else astro adds a '/' in front of the urls
``` js
output: 'static',
site: 'https://ryuker.github.io',
outDir: './dist/docs',
build: {
  assets: 'astro',
  assetsPrefix: './'
},
```
3. optional: 
- add `.nojekyll files to root folder and public folder (not sure if necessary but prevents Jekyll processing on Git Hub pages)

