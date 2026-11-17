// Light / dark theme toggle. The chosen theme is saved in localStorage.

const STORAGE_KEY = 'devdash-theme'

// Read the saved theme. try/catch because storage can be blocked
function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage is blocked: the theme still works, it just is not remembered
  }
}

// Put the theme on <html data-theme="..."> so the CSS can use it
function applyTheme(theme, button) {
  document.documentElement.dataset.theme = theme
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  button.setAttribute('aria-label', `Switch to ${nextTheme} theme`)
}

export function setupThemeToggle(button) {
  // Use the saved theme, otherwise follow the operating system setting
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const startTheme = getSavedTheme() || (prefersDark ? 'dark' : 'light')
  applyTheme(startTheme, button)

  button.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    applyTheme(newTheme, button)
    saveTheme(newTheme)
  })
}
