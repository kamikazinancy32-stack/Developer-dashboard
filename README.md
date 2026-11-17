# Developer Dashboard

A small web page that collects developer resources (docs, tools and tutorials) in one place. You can search them, filter by category, bookmark favourites and switch between light and dark themes.

I built it for the FEM08 Tooling & Build Systems lab, so the focus is the tooling: npm, Vite, ESLint and Prettier.

**Live site:** https://kamikazinancy32-stack.github.io/Developer-dashboard/

## Project structure

```text
Developer dashboard/
├── .github/workflows/
│   └── deploy.yml         Lints, builds and deploys to GitHub Pages on every push
├── public/
│   └── favicon.svg        Browser tab icon
├── src/
│   ├── main.js            Resources array, cards, search, filters, bookmarks
│   ├── theme.js           Light / dark theme toggle
│   └── style.css          Styles and responsive layout
├── .gitattributes         Forces LF line endings so Prettier passes on Windows
├── .prettierignore        Files Prettier skips
├── .prettierrc            Prettier settings
├── eslint.config.js       ESLint config and rules
├── index.html             Page layout
├── package.json           Scripts and devDependencies
└── vite.config.js         Vite settings
```

## Setup and scripts

```bash
git clone https://github.com/kamikazinancy32-stack/Developer-dashboard.git
cd Developer-dashboard
npm install
npm run dev
```

| Script                 | Command              | What it does                                    |
| ---------------------- | -------------------- | ----------------------------------------------- |
| `npm run dev`          | `vite`               | Starts the dev server with hot module reload    |
| `npm start`            | `vite`               | Same as `dev`                                   |
| `npm run build`        | `vite build`         | Bundles and minifies the app into `dist/`       |
| `npm run preview`      | `vite preview`       | Serves the built `dist/` folder locally         |
| `npm run lint`         | `eslint src/`        | Checks the code for problems                    |
| `npm run lint:fix`     | `eslint src/ --fix`  | Fixes what ESLint can fix automatically         |
| `npm run format`       | `prettier --write .` | Formats every file                              |
| `npm run format:check` | `prettier --check .` | Reports unformatted files without changing them |

## Vite configuration

```js
export default defineConfig({
  root: '.', // folder that contains index.html
  base: './', // relative links, so the build works in any folder
  build: {
    outDir: 'dist', // where the production build goes
  },
})
```

`base: './'` is what lets the site work on GitHub Pages, where it lives in the `/Developer-dashboard/` sub-folder.

## ESLint

ESLint 10 was installed, which uses the flat config file `eslint.config.js` (the older `.eslintrc.json` format is no longer supported). It uses the recommended rules plus:

- `no-unused-vars: 'error'`: reports variables and imports that are never used.
- `eqeqeq: 'warn'`: asks for `===` instead of `==`, because `==` converts types (`'5' == 5` is `true`).

`npx eslint src/` reported 0 problems on my code. To confirm the rules work, I linted a test file that broke both on purpose:

```text
  1:7   error    'unused' is assigned a value but never used  no-unused-vars
  3:11  warning  Expected '===' and instead saw '=='          eqeqeq
```

## Prettier

```json
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

`.prettierignore` skips `dist`, `node_modules` and `package-lock.json` because they are generated. `eslint-config-prettier` is added last in the ESLint config so ESLint's formatting rules never conflict with Prettier.

Prettier found two resource objects longer than 80 characters and split them over several lines.

## Features

- A `resources` array of 12 objects (`name`, `category`, `link` and more) rendered as cards with template literals.
- Search by name or tag, plus category filters (Frontend, Backend, DevOps, Tools, Learning) that work together.
- Bookmarks saved in `localStorage`, with a Bookmarks view in the sidebar.
- Light and dark theme toggle.
- Results count ("Showing 3 of 12") and a message when nothing matches.
- Responsive layout and accessible labels, `aria-pressed` buttons and focus outlines.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`. It installs dependencies with `npm ci`, runs `lint` and `format:check`, builds, and publishes `dist/` to GitHub Pages. If lint or formatting fails, nothing is deployed.

## Build output analysis

`npm run build` output:

```text
✓ 6 modules transformed.
dist/index.html                 11.03 kB │ gzip: 2.30 kB
dist/assets/index-BgRgxlTs.css   7.98 kB │ gzip: 2.26 kB
dist/assets/index-C9tLqcYb.js    6.19 kB │ gzip: 2.44 kB
✓ built in 446ms
```

| Source                         | Source size  | Built file                  | Built size   | Change      |
| ------------------------------ | ------------ | --------------------------- | ------------ | ----------- |
| `src/main.js` + `src/theme.js` | 9,954 bytes  | `assets/index-C9tLqcYb.js`  | 6,193 bytes  | 38% smaller |
| `src/style.css`                | 11,051 bytes | `assets/index-BgRgxlTs.css` | 7,987 bytes  | 28% smaller |
| `index.html`                   | 10,935 bytes | `index.html`                | 11,037 bytes | 1% larger   |

- **Bundling:** my two JS modules became one file, and the CSS became one file.
- **Minification:** comments and spaces are removed and variable names are shortened.
- **Hashed file names:** names like `index-C9tLqcYb.js` change when the content changes, so browsers can cache files safely (cache busting).
- `index.html` grew slightly because Vite adds the script and stylesheet tags and does not minify HTML.

## Reflection

Vite's build makes the app faster for users. It bundles my modules into fewer files, minifies them and removes unused code, so the browser downloads less. Hashed file names let browsers cache files for a long time and still get the newest version after a change. For me as a developer, the dev server starts almost instantly because it serves native ES modules instead of bundling first, and hot module replacement updates the page as soon as I save.
