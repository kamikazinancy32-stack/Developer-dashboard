import './style.css'
import { setupThemeToggle } from './theme.js'

// The developer resources shown on the dashboard
const resources = [
  {
    name: 'MDN Web Docs',
    category: 'Frontend',
    tag: 'Web',
    short: 'mdn',
    description: 'Up-to-date documentation for HTML, CSS and JavaScript.',
    link: 'https://developer.mozilla.org/',
  },
  {
    name: 'React Docs',
    category: 'Frontend',
    tag: 'React',
    short: 'jsx',
    description:
      'Learn components, hooks, state and more from the official docs.',
    link: 'https://react.dev/learn',
  },
  {
    name: 'Node.js Docs',
    category: 'Backend',
    tag: 'Node.js',
    short: 'node',
    description: 'The API reference for building server-side JavaScript apps.',
    link: 'https://nodejs.org/docs/latest/api/',
  },
  {
    name: 'PostgreSQL Docs',
    category: 'Backend',
    tag: 'Database',
    short: 'sql',
    description: 'Reference and tutorials for the open source SQL database.',
    link: 'https://www.postgresql.org/docs/',
  },
  {
    name: 'Docker Docs',
    category: 'DevOps',
    tag: 'Containers',
    short: 'dkr',
    description: 'Package, ship and run your applications in containers.',
    link: 'https://docs.docker.com/',
  },
  {
    name: 'GitHub Actions',
    category: 'DevOps',
    tag: 'CI/CD',
    short: 'ci',
    description: 'Automate tests, builds and deployments from your repository.',
    link: 'https://docs.github.com/actions',
  },
  {
    name: 'Vite Guide',
    category: 'Tools',
    tag: 'Build tool',
    short: 'vite',
    description: 'A fast dev server and an optimised production build.',
    link: 'https://vite.dev/guide/',
  },
  {
    name: 'ESLint Docs',
    category: 'Tools',
    tag: 'Linting',
    short: 'lint',
    description: 'Find and fix problems in your JavaScript code.',
    link: 'https://eslint.org/docs/latest/',
  },
  {
    name: 'Prettier Docs',
    category: 'Tools',
    tag: 'Formatting',
    short: 'fmt',
    description: 'Format your code automatically with one consistent style.',
    link: 'https://prettier.io/docs/',
  },
  {
    name: 'JavaScript.info',
    category: 'Learning',
    tag: 'JavaScript',
    short: 'js',
    description: 'A modern JavaScript tutorial, from the basics to advanced.',
    link: 'https://javascript.info/',
  },
  {
    name: 'freeCodeCamp',
    category: 'Learning',
    tag: 'Courses',
    short: 'fcc',
    description: 'Free interactive courses with hands-on projects.',
    link: 'https://www.freecodecamp.org/learn/',
  },
  {
    name: 'web.dev Learn',
    category: 'Learning',
    tag: 'Web',
    short: 'web',
    description: 'Courses on CSS, accessibility, performance and more.',
    link: 'https://web.dev/learn',
  },
]

// Elements from index.html
const searchInput = document.querySelector('#search')
const categoryButtons = document.querySelectorAll('.chip')
const viewButtons = document.querySelectorAll('[data-view]')
const countText = document.querySelector('#count')
const bookmarkCount = document.querySelector('#bookmark-count')
const resourceList = document.querySelector('#resource-list')

// Current state of the filters
let selectedCategory = 'All'
let selectedView = 'all' // 'all' or 'bookmarks'

// ---------- Bookmarks (saved in localStorage) ----------

const BOOKMARK_KEY = 'devdash-bookmarks'

// Load the saved bookmark names. try/catch because storage can be blocked
function loadBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || []
  } catch {
    return []
  }
}

let bookmarks = loadBookmarks()

function saveBookmarks() {
  try {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks))
  } catch {
    // Storage is blocked: bookmarks still work until the page is closed
  }
}

// Add the resource to bookmarks, or remove it if it is already there
function toggleBookmark(name) {
  if (bookmarks.includes(name)) {
    bookmarks = bookmarks.filter((bookmark) => bookmark !== name)
  } else {
    bookmarks.push(name)
  }
  saveBookmarks()
}

// ---------- Filtering and rendering ----------

// Return only the resources that match the view, category AND search text
function getFilteredResources() {
  const searchText = searchInput.value.trim().toLowerCase()

  return resources.filter((resource) => {
    const matchesView =
      selectedView === 'all' || bookmarks.includes(resource.name)
    const matchesCategory =
      selectedCategory === 'All' || resource.category === selectedCategory
    const matchesSearch =
      resource.name.toLowerCase().includes(searchText) ||
      resource.tag.toLowerCase().includes(searchText)
    return matchesView && matchesCategory && matchesSearch
  })
}

// The message shown when no card matches
function getEmptyMessage() {
  if (selectedView === 'bookmarks' && bookmarks.length === 0) {
    return 'You have no bookmarks yet. Click the bookmark icon on a card to save it.'
  }
  return 'No resources match your search. Try another word or choose "All".'
}

// Turn a list of resources into cards and put them on the page
function renderResources(list) {
  if (list.length === 0) {
    resourceList.innerHTML = `
      <li class="empty">
        <p class="empty-title">Nothing here</p>
        <p>${getEmptyMessage()}</p>
      </li>
    `
    return
  }

  resourceList.innerHTML = list
    .map((resource) => {
      const isSaved = bookmarks.includes(resource.name)
      return `
        <li class="card">
          <div class="card-top">
            <span class="tile">${resource.short}</span>
            <button
              type="button"
              class="bookmark"
              data-name="${resource.name}"
              aria-pressed="${isSaved}"
              aria-label="Bookmark ${resource.name}"
            >
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 3h12v18l-6-4-6 4z" />
              </svg>
            </button>
          </div>
          <h3>${resource.name}</h3>
          <p class="card-desc">${resource.description}</p>
          <div class="card-bottom">
            <span class="tag tag-category">${resource.category}</span>
            <span class="tag">${resource.tag}</span>
            <a
              class="card-link"
              href="${resource.link}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open ${resource.name} in a new tab"
            >
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 4h6v6" />
                <path d="M20 4 10 14" />
                <path d="M19 14v6H4V5h6" />
              </svg>
            </a>
          </div>
        </li>
      `
    })
    .join('')
}

// Show how many resources are visible, e.g. "Showing 4 of 12"
function updateCount(shownCount) {
  countText.textContent = `Showing ${shownCount} of ${resources.length}`
  bookmarkCount.textContent = bookmarks.length
}

// In a group of buttons, mark one as active and the others as inactive
function setActiveButton(buttons, activeButton) {
  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button === activeButton))
  })
}

// Run the filters and refresh the cards and the counts
function updateDashboard() {
  const filtered = getFilteredResources()
  renderResources(filtered)
  updateCount(filtered.length)
}

// ---------- Events ----------

// 'input' fires on every key press in the search box
searchInput.addEventListener('input', updateDashboard)

// Category chips: each one stores its category in data-category
categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category
    setActiveButton(categoryButtons, button)
    updateDashboard()
  })
})

// Sidebar: "All resources" or "Bookmarks"
viewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedView = button.dataset.view
    setActiveButton(viewButtons, button)
    updateDashboard()
  })
})

// The cards are re-created on every update, so I listen on the list
// and check whether a bookmark button was clicked (event delegation)
resourceList.addEventListener('click', (event) => {
  const button = event.target.closest('.bookmark')
  if (!button) {
    return
  }
  const name = button.dataset.name
  toggleBookmark(name)
  updateDashboard()

  // The old button was replaced, so put keyboard focus on the new one
  const newButton = resourceList.querySelector(`[data-name="${name}"]`)
  if (newButton) {
    newButton.focus()
  }
})

// ---------- Start ----------

setupThemeToggle(document.querySelector('#theme-toggle'))
updateDashboard()
