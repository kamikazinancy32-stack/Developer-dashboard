import './style.css'

// The learning resources shown on the dashboard
const resources = [
  {
    name: 'Vite Guide',
    category: 'Documentation',
    description: 'Set up the dev server and build projects for production.',
    link: 'https://vite.dev/guide/',
  },
  {
    name: 'npm Docs',
    category: 'Documentation',
    description: 'Install packages, manage dependencies and run scripts.',
    link: 'https://docs.npmjs.com/',
  },
  {
    name: 'ESLint Docs',
    category: 'Documentation',
    description: 'Configure rules that catch bugs and bad patterns early.',
    link: 'https://eslint.org/docs/latest/',
  },
  {
    name: 'Prettier Docs',
    category: 'Documentation',
    description: 'Format code automatically with a consistent style.',
    link: 'https://prettier.io/docs/',
  },
  {
    name: 'MDN Web Docs',
    category: 'Reference',
    description: 'The main reference for HTML, CSS and JavaScript.',
    link: 'https://developer.mozilla.org/',
  },
  {
    name: 'Can I use',
    category: 'Reference',
    description: 'Check which browsers support a web feature.',
    link: 'https://caniuse.com/',
  },
  {
    name: 'DevDocs',
    category: 'Reference',
    description: 'Many API docs in one fast, searchable page.',
    link: 'https://devdocs.io/',
  },
  {
    name: 'JavaScript.info',
    category: 'Tutorials',
    description: 'A modern JavaScript tutorial from basics to advanced.',
    link: 'https://javascript.info/',
  },
  {
    name: 'freeCodeCamp',
    category: 'Tutorials',
    description: 'Free interactive courses with hands-on projects.',
    link: 'https://www.freecodecamp.org/learn/',
  },
  {
    name: 'web.dev Learn',
    category: 'Tutorials',
    description: 'Courses on CSS, accessibility, performance and more.',
    link: 'https://web.dev/learn',
  },
  {
    name: 'Bundlephobia',
    category: 'Tools',
    description: 'See how much an npm package adds to your bundle.',
    link: 'https://bundlephobia.com/',
  },
  {
    name: 'Regex101',
    category: 'Tools',
    description: 'Build and test regular expressions with explanations.',
    link: 'https://regex101.com/',
  },
]

// Elements from index.html
const searchInput = document.querySelector('#search')
const filterButtons = document.querySelectorAll('.chip')
const countText = document.querySelector('#count')
const resourceList = document.querySelector('#resource-list')

// The category chosen with the filter buttons ('All' at the start)
let selectedCategory = 'All'

// Return only the resources that match BOTH the search text and the category
function getFilteredResources() {
  const searchText = searchInput.value.trim().toLowerCase()

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
        <p class="empty-title">No resources found</p>
        <p>Try another name or choose the "All" category.</p>
      </li>
    `
    return
  }

  resourceList.innerHTML = list
    .map(
      (resource) => `
        <li class="card">
          <div class="card-top">
            <span class="avatar" aria-hidden="true">${resource.name.charAt(0)}</span>
            <span class="badge badge-${resource.category.toLowerCase()}">${resource.category}</span>
          </div>
          <h2>${resource.name}</h2>
          <p>${resource.description}</p>
          <a href="${resource.link}" target="_blank" rel="noopener noreferrer">
            Open ${resource.name} <span aria-hidden="true">&rarr;</span>
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

// Mark the clicked filter button as active and all the others as inactive
function setActiveButton(activeButton) {
  filterButtons.forEach((button) => {
    const isActive = button === activeButton
    button.setAttribute('aria-pressed', String(isActive))
  })
}

// Run the filter and refresh both the cards and the count
function updateDashboard() {
  const filtered = getFilteredResources()
  renderResources(filtered)
  updateCount(filtered.length)
}

// 'input' fires on every key press in the search box
searchInput.addEventListener('input', updateDashboard)

// Each filter button stores its category in a data-category attribute
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category
    setActiveButton(button)
    updateDashboard()
  })
})

// First render when the page loads
updateDashboard()
