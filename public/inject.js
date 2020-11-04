/* eslint-disable no-undef */

if (window.REACT_EXTENSION_ACTIVE === undefined) {
  window.REACT_EXTENSION_ACTIVE = false
}

if (window.REACT_EXTENSION_ID === undefined) {
  window.REACT_EXTENSION_ID = `chrome-extension-container-${Date.now()}`
}

function handleLoad() {
  let data = this.responseText

  // Create container
  const container = document.createElement('div')
  container.setAttribute('id', window.REACT_EXTENSION_ID)
  container.insertAdjacentHTML('beforeend', data)

  // Append container to body
  document.querySelector('body').append(container)
  window.REACT_EXTENSION_ACTIVE = true
}

(function() {
  if (!window.REACT_EXTENSION_ACTIVE) {
    const req = new XMLHttpRequest()
    req.addEventListener('load', handleLoad)
    req.open('GET', chrome.runtime.getURL('index.html'))
    req.send()
  } else {
    document.getElementById(window.REACT_EXTENSION_ID).remove()
    window.REACT_EXTENSION_ACTIVE = false
  }
})()
