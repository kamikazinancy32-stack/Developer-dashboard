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

// Every category once, in the order it first appears (Set removes duplicates)
const categories = [...new Set(resources.map((resource) => resource.category))]

// Build the page layout once
const app = document.querySelector('#app')

app.innerHTML = `
  <header class="header">
    <h1>Developer Dashboard</h1>
    <p>Quick links to the docs, tutorials and tools I use most.</p>
  </header>

  <section class="controls" aria-label="Search and filter resources">
    <div class="control">
      <label for="search">Search by name</label>
      <input id="search" type="search" placeholder="e.g. Vite" autocomplete="off" />
    </div>
    <div class="control">
      <label for="category">Category</label>
      <select id="category">
        <option value="All">All</option>
        ${categories.map((category) => `<option value="${category}">${category}</option>`).join('')}
      </select>
    </div>
  </section>

  <p id="count" class="count" aria-live="polite"></p>
  <ul id="resource-list" class="grid"></ul>
`

const searchInput = document.querySelector('#search')
const categorySelect = document.querySelector('#category')
const countText = document.querySelector('#count')
const resourceList = document.querySelector('#resource-list')

// Return only the resources that match BOTH the search text and the category
function getFilteredResources() {
  const searchText = searchInput.value.trim().toLowerCase()
  const selectedCategory = categorySelect.value

  return resources.filter((resource) => {
    const matchesName = resource.name.toLowerCase().includes(searchText)
    const matchesCategory =
      selectedCategory === 'All' || resource.category === selectedCategory
    return matchesName && matchesCategory
  })
}

// Turn a list of resources into cards and put them on the page
function renderResources(list) {
  if (list.length === 0) {
    resourceList.innerHTML = `
      <li class="empty">
        No resources match your search. Try another name or choose "All".
      </li>
    `
    return
  }

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

// Show how many resources are visible, e.g. "Showing 4 of 12 resources"
function updateCount(shownCount) {
  countText.textContent = `Showing ${shownCount} of ${resources.length} resources`
}

// Run the filter and refresh both the cards and the count
function updateDashboard() {
  const filtered = getFilteredResources()
  renderResources(filtered)
  updateCount(filtered.length)
}

// 'input' fires on every key press, 'change' fires when a new option is picked
searchInput.addEventListener('input', updateDashboard)
categorySelect.addEventListener('change', updateDashboard)

// First render when the page loads
updateDashboard()
