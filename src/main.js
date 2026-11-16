import './style.css'

// The developer resources shown on the dashboard
const resources = [
  {
    name: 'MDN Web Docs',
    category: 'Documentation',
    link: 'https://developer.mozilla.org/',
  },
  {
    name: 'Node.js Docs',
    category: 'Documentation',
    link: 'https://nodejs.org/docs/latest/api/',
  },
  {
    name: 'GitHub Docs',
    category: 'Documentation',
    link: 'https://docs.github.com/',
  },
  { name: 'Vite Guide', category: 'Tooling', link: 'https://vite.dev/guide/' },
  { name: 'npm Docs', category: 'Tooling', link: 'https://docs.npmjs.com/' },
  {
    name: 'Yarn Docs',
    category: 'Tooling',
    link: 'https://yarnpkg.com/getting-started',
  },
  {
    name: 'ESLint Docs',
    category: 'Tooling',
    link: 'https://eslint.org/docs/latest/',
  },
  {
    name: 'Prettier Docs',
    category: 'Tooling',
    link: 'https://prettier.io/docs/',
  },
  {
    name: 'JavaScript.info',
    category: 'Tutorials',
    link: 'https://javascript.info/',
  },
  {
    name: 'freeCodeCamp',
    category: 'Tutorials',
    link: 'https://www.freecodecamp.org/learn/',
  },
  { name: 'Can I use', category: 'Tools', link: 'https://caniuse.com/' },
  {
    name: 'Bundlephobia',
    category: 'Tools',
    link: 'https://bundlephobia.com/',
  },
]

// Build the page layout once
const app = document.querySelector('#app')

app.innerHTML = `
  <header class="header">
    <h1>Developer Dashboard</h1>
    <p>Quick links to the docs, tutorials and tools I use most.</p>
  </header>

  <ul id="resource-list" class="grid"></ul>
`

const resourceList = document.querySelector('#resource-list')

// Turn a list of resources into cards and put them on the page
function renderResources(list) {
  resourceList.innerHTML = list
    .map(
      (resource) => `
        <li class="card">
          <h2>${resource.name}</h2>
          <span class="badge">${resource.category}</span>
          <a href="${resource.link}" target="_blank" rel="noopener noreferrer">
            Visit site
          </a>
        </li>
      `
    )
    .join('')
}

renderResources(resources)
