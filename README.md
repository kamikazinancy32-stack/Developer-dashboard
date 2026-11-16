# Developer Dashboard

The Developer Dashboard is a small web page that collects the developer resources I use most (documentation, tooling guides, tutorials and tools) in one place. You can search the resources by name and filter them by category.

The page itself is simple on purpose. I built it for the hands-on lab of the FEM08 module, Tooling & Build Systems, so the main focus is the tooling around the code: a package manager (npm), a bundler and dev server (Vite), a linter (ESLint) and a formatter (Prettier).

## Module structure

| Lesson | Main topic            | Format           | Learning outcome                                                                | Estimated time |
| ------ | --------------------- | ---------------- | ------------------------------------------------------------------------------- | -------------- |
| 1      | The Tooling Ecosystem | Video + Reading  | Explain the purpose of package managers, bundlers, linters, and formatters      | 1.5 hrs        |
| 2      | Package Management    | Reading + Video  | Initialize a project and manage dependencies using npm or Yarn                  | 2 hrs          |
| 3      | Module Bundling       | Reading          | Set up a development server and bundle an application for production using Vite | 2 hrs          |
| 4      | Code Quality          | Reading + Video  | Integrate ESLint and Prettier to automatically check and format code            | 2.5 hrs        |
| 5      | Knowledge Check       | Auto-graded Quiz | Recall and identify the commands and configuration options for key tools        | 0.5 hrs        |
| 6      | Hands-On Lab          | Coding Lab       | Build the "Developer Dashboard" with a full tooling setup                       | 3 hrs          |

## Learning objectives

**Configure a modern front-end project using a package manager like npm or Yarn.**
I created the project with `npm create vite@latest`, installed every tool as a devDependency with `npm install --save-dev`, and added npm scripts for every task (dev, build, preview, lint, format). `package-lock.json` locks the exact versions so anyone gets the same install.

**Automate the development and build process by bundling modules with Vite.**
`npm run dev` starts the Vite dev server with hot module replacement, and `npm run build` bundles and minifies the app into `dist/`. The options are set explicitly in `vite.config.js`.

**Enforce code quality standards by integrating ESLint into a project workflow.**
ESLint runs with `npm run lint`. It uses the recommended rules plus `no-unused-vars` (error) and `eqeqeq` (warning).

**Format code automatically using Prettier to maintain a consistent style across a codebase.**
Prettier runs with `npm run format` and is checked with `npm run format:check`. The style rules live in `.prettierrc`, so every file follows the same style.

**Analyze the role of build tools in optimizing applications for production environments.**
I compared my source files with the files Vite produced in `dist/` (see [Build output analysis](#build-output-analysis)). The built files are bundled, minified and have hashed file names for caching.

## Tools used and why

| Tool                   | Why I used it                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| npm                    | Comes with Node.js, installs the dev tools and runs the project scripts.                          |
| Vite                   | Fast dev server with hot module replacement, and a production build with almost no configuration. |
| ESLint                 | Finds bugs and bad patterns (unused variables, loose `==`) before the code runs.                  |
| Prettier               | Formats code automatically so I do not have to think about spacing, quotes or semicolons.         |
| eslint-config-prettier | Turns off ESLint rules that would clash with Prettier, so the two tools never disagree.           |
| @eslint/js and globals | Give ESLint its recommended rules and tell it about browser globals like `document`.              |
| Plain JavaScript       | Template literals and `innerHTML` are enough to render the cards, with no framework needed.       |

## Alternatives considered

- **Yarn or pnpm instead of npm.** Both are good, and pnpm saves disk space. npm comes with Node.js and was enough for a project this size, so I did not need another tool.
- **Webpack or Parcel instead of Vite.** Webpack bundles the whole app before it serves it in development, so its dev server starts slower and needs more configuration (loaders, plugins). Vite serves native ES modules and only needed a few lines of config. Parcel is also zero-config, but the lab is built around Vite.
- **JSHint or Biome instead of ESLint.** JSHint is older and has far fewer rules and plugins. Biome is very fast and does linting and formatting in one tool, but ESLint is the industry standard and the tool the lab teaches.
- **Biome or EditorConfig instead of Prettier.** EditorConfig only sets basics like indentation and line endings in the editor; it does not reformat code. Biome could replace Prettier, but Prettier is more widely used and pairs directly with ESLint through eslint-config-prettier.
- **React or Vue instead of Vanilla JS.** The lab is about tooling, not UI frameworks. A framework would add complexity and dependencies without helping that goal.
- **`document.createElement` instead of template literals.** `createElement` is safer for user-supplied text, but it takes many more lines. My data is a fixed array I wrote myself, so template literals with `innerHTML` are shorter and easier to read.
- **Husky and lint-staged.** These run lint and format automatically before each commit. They are useful in a team, but not required for this lab, so I run the scripts myself.
- **`.eslintrc.json` vs `eslint.config.js`.** The lab mentions `.eslintrc.json` and `npx eslint --init`, which is the older config format. When I installed ESLint I got version 10.15.0. Since ESLint 9, the flat config file `eslint.config.js` is the default, and the old `.eslintrc` format is no longer supported in ESLint 10. So I used `eslint.config.js`.

## Project structure

```text
Developer dashboard/
├── public/
│   └── favicon.svg        Browser tab icon, copied to dist/ as-is
├── src/
│   ├── main.js            Resources array, card rendering, search/filter logic
│   └── style.css          Dashboard styles, light and dark mode
├── .gitattributes         Forces LF line endings so Prettier passes on Windows too
├── .gitignore             Keeps node_modules and dist out of Git
├── .prettierignore        Files Prettier should skip
├── .prettierrc            Prettier style settings
├── eslint.config.js       ESLint flat config and rules
├── index.html             Page layout (top bar, hero, search, filters, footer)
├── package.json           Project info, scripts and devDependencies
├── package-lock.json      Exact installed versions (generated by npm)
├── README.md              This file
└── vite.config.js         Vite settings (root, base, outDir)
```

## Setup and scripts

You need Node.js installed (I used Node 24.13.0 and npm 11.7.0).

```bash
git clone https://github.com/kamikazinancy32-stack/Developer-dashboard.git
cd Developer-dashboard
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

| Script                 | Command              | What it does                                                         |
| ---------------------- | -------------------- | -------------------------------------------------------------------- |
| `npm run dev`          | `vite`               | Starts the dev server with hot module replacement                    |
| `npm start`            | `vite`               | Same as `dev`                                                        |
| `npm run build`        | `vite build`         | Bundles and minifies the app into `dist/`                            |
| `npm run preview`      | `vite preview`       | Serves the built `dist/` folder locally to test the production build |
| `npm run lint`         | `eslint src/`        | Checks the source code for problems                                  |
| `npm run lint:fix`     | `eslint src/ --fix`  | Checks and automatically fixes what ESLint can fix                   |
| `npm run format`       | `prettier --write .` | Formats every file in the project                                    |
| `npm run format:check` | `prettier --check .` | Reports files that are not formatted, without changing them          |

## Vite configuration

```js
export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
  },
})
```

- **`defineConfig`** is a helper that gives my editor autocomplete for the options. It does not change the config.
- **`root: '.'`** is the folder that contains `index.html`. Vite starts from there in dev and build.
- **`base: './'`** is the public path the built files are loaded from. With `'./'` the links in `dist/index.html` are relative (`./assets/index-...js`), so the build works from any folder, for example a GitHub Pages sub-folder. With the default `'/'` it would only work from the root of a domain.
- **`build.outDir: 'dist'`** is the folder where `npm run build` writes the production files. It is in `.gitignore` because it can always be rebuilt.

## ESLint

```js
export default [
  { ignores: ['dist/'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': 'error',
      eqeqeq: 'warn',
    },
  },
  eslintConfigPrettier,
]
```

- **`ignores: ['dist/']`** skips the build output, which is generated and minified.
- **`js.configs.recommended`** turns on ESLint's recommended rules for common bugs.
- **`sourceType: 'module'`** lets me use `import` and `export`.
- **`globals.browser`** tells ESLint that `document` and `window` exist, so it does not report them as undefined.
- **`no-unused-vars: 'error'`** reports variables, functions or imports that are never used. Unused code makes files harder to read and can hide a typo (for example, I meant to use a variable but used a different one).
- **`eqeqeq: 'warn'`** asks for `===` instead of `==`. `==` converts types before comparing, so `'5' == 5` and `0 == ''` are both `true`. `===` does not convert types, so the comparison only passes when the value and type both match. My code only uses `===`.

**What ESLint found.** I ran `npx eslint src/` after each step. It reported **0 problems** every time: on the original Vite starter code, after cleaning it up, and on the finished dashboard. So nothing needed fixing. To check the rules were really active, I linted a test file that broke both rules on purpose and got:

```text
  1:7   error    'unused' is assigned a value but never used  no-unused-vars
  3:11  warning  Expected '===' and instead saw '=='          eqeqeq

✖ 2 problems (1 error, 1 warning)
```

I then deleted that test file and `npm run lint` was clean again.

## Prettier

`.prettierrc`:

```json
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

- **`singleQuote`**: use `'single'` quotes instead of `"double"`.
- **`semi: false`**: no semicolons at the end of lines.
- **`tabWidth: 2`**: indent with 2 spaces.
- **`trailingComma: "es5"`**: add a trailing comma wherever ES5 allows it (arrays, objects). This keeps Git diffs smaller when I add a new item.
- **`printWidth: 80`**: wrap lines longer than 80 characters.

`.prettierignore` excludes `dist` (generated, minified code), `node_modules` (other people's code) and `package-lock.json` (generated by npm; reformatting it would only create noise in Git).

**What Prettier changed.** When I first wrote the resources array, I put the Prettier Docs and Bundlephobia objects on one line each. Those lines were longer than 80 characters, so `prettier --check` failed. `prettier --write` split each one into a multi-line object.

**ESLint and Prettier together.** Some ESLint rules are about formatting, and they could disagree with Prettier. `eslint-config-prettier` turns all of those rules off. I import it and put it **last** in the config array, so it overrides anything before it. Now ESLint only checks code quality and Prettier owns formatting.

## Features

- **HTML layout**: the page structure is plain HTML in `index.html`: a top bar with the logo and navigation, a hero section with the title and search box, the category filter buttons, the results count, an empty list for the cards, and a footer. JavaScript only fills in the cards.
- **Resources array**: a `const resources` array of 12 learning resources, each with a `name`, `category`, `description` and `link`, in four categories: Documentation (Vite, npm, ESLint, Prettier), Reference (MDN, Can I use, DevDocs), Tutorials (JavaScript.info, freeCodeCamp, web.dev Learn) and Tools (Bundlephobia, Regex101).
- **Rendering with template literals**: `renderResources(list)` turns each resource into a card with `.map()` and a template literal, joins them, and puts the result in the page with `innerHTML`. Each card shows a letter icon, a coloured category badge, the name, a short description and a link that opens in a new tab with `rel="noopener noreferrer"`. That stops the new page from controlling mine through `window.opener`.
- **Search and filter**: the search box filters by name as I type (the `input` event). The category buttons (All, Documentation, Reference, Tutorials, Tools) each store their category in a `data-category` attribute. Clicking one saves it in `selectedCategory`, and `setActiveButton()` highlights it. `getFilteredResources()` checks both the search text and the category, so search and filter work together.
- **Results count**: `updateCount()` shows text like "Showing 3 of 12 resources".
- **Empty state**: when nothing matches, the grid shows a "No resources found" message instead of being blank.
- **Accessibility**: the search box has a `<label>`. The filter buttons are in a group labelled "Category:" and use `aria-pressed` so screen readers know which one is active. The results count has `aria-live="polite"` so changes are announced. Link text names the site ("Open MDN Web Docs") instead of repeating "click here". Links, buttons and the input have a visible focus outline.
- **Design**: a gradient hero, rounded cards with a soft shadow that lift on hover, pill-shaped filter buttons, and one colour per category badge.
- **Responsive and dark mode**: the grid uses `repeat(auto-fill, minmax(250px, 1fr))`, so it goes from one column on a phone to four on a desktop. The heading size uses `clamp()`. Colours are CSS variables that change under `prefers-color-scheme: dark`.

## Build output analysis

Output of `npm run build` (Vite 8.3.5):

```text
✓ 5 modules transformed.
dist/index.html                 3.42 kB │ gzip: 1.13 kB
dist/assets/index-I-EPd0ud.css  4.85 kB │ gzip: 1.69 kB
dist/assets/index-qqUhbkoN.js   3.67 kB │ gzip: 1.60 kB
✓ built in 435ms
```

Files in `dist/`:

| File                        | Size        | Notes                                        |
| --------------------------- | ----------- | -------------------------------------------- |
| `index.html`                | 3,429 bytes | Script and stylesheet links injected by Vite |
| `assets/index-qqUhbkoN.js`  | 3,679 bytes | All JavaScript, bundled and minified         |
| `assets/index-I-EPd0ud.css` | 4,857 bytes | All CSS, extracted and minified              |
| `favicon.svg`               | 9,523 bytes | Copied from `public/` unchanged              |

**Source vs built:**

| Source file     | Source size | Built file                  | Built size  | Change      |
| --------------- | ----------- | --------------------------- | ----------- | ----------- |
| `src/main.js`   | 4,962 bytes | `assets/index-qqUhbkoN.js`  | 3,679 bytes | 26% smaller |
| `src/style.css` | 6,773 bytes | `assets/index-I-EPd0ud.css` | 4,857 bytes | 28% smaller |
| `index.html`    | 3,327 bytes | `index.html`                | 3,429 bytes | 3% larger   |

`index.html` got slightly larger because Vite adds the `<script>` and `<link>` tags for the hashed files and does not minify HTML by default.

**Hashed file names.** `qqUhbkoN` and `I-EPd0ud` are hashes of each file's content. When the content changes, the name changes. So a browser can cache these files for a long time, and still downloads the new version after a deploy because the file name is different. This is called cache busting. Files in `public/` (like `favicon.svg`) are copied as-is and keep their names.

**Minification.** The built JavaScript has no comments, no indentation and short variable names (for example `let e=...`). The CSS is on one line with comments removed. The JS shrank less than the CSS because Vite also adds a small module-preload polyfill to the bundle. With gzip, which servers normally use, the JS is only 1.60 kB.

**Bundling.** Vite combined my modules (`main.js` and the `style.css` it imports) into one JS file and one CSS file. It also added the `<script>` and `<link>` tags to `dist/index.html` for me. Because `base` is `'./'`, those links are relative (`./assets/...`).

I ran `npm run preview` and the production build loaded correctly at `http://localhost:4173`.

## Reflection

Vite's build makes the app faster for users. It bundles my modules into fewer files, minifies them, and removes unused code (tree-shaking), so the browser downloads less. The hashed file names mean browsers can cache files for a long time and still always get the newest version after a change. For me as a developer, the dev server starts almost instantly because it serves native ES modules instead of bundling first. Hot module replacement updates the page as soon as I save, without losing what I typed in the search box.

## Discussion: why is Vite's dev server faster than Webpack's?

- **Native ES modules served on demand.** Webpack builds a full bundle of the whole app before the dev server can show anything, and that gets slower as the app grows. Vite skips that step. The browser requests each module with `import`, and Vite only transforms the files the current page actually asks for.
- **Dependency pre-bundling with esbuild.** Libraries in `node_modules` rarely change and can be made of hundreds of small files. Vite pre-bundles them once with esbuild, which is written in Go and is much faster than JavaScript-based bundlers, and caches the result.
- **Fast HMR.** When I edit a file, Vite only replaces that one module in the browser. The update speed stays the same no matter how big the app is, while Webpack has to rebuild part of the bundle.
