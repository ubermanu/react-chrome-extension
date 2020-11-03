/* eslint-disable no-undef */

if (window.REACT_EXTENSION_ACTIVE === undefined) {
  window.REACT_EXTENSION_ACTIVE = false;
}

if (window.REACT_EXTENSION_ID === undefined) {
  window.REACT_EXTENSION_ID = `chrome-extension-container-${Date.now()}`;
}

function handleLoad() {
  let data = this.responseText;
  let scripts = [];

  // Fix static resource urls
  data = data.replace(/\/(static\/(css|js)\/([a-zA-Z0-9_.])+)/gi, function(
    match
  ) {
    return chrome.runtime.getURL(match.replace(/^\//g, ""));
  });

  // Gather all the scripts in the generated template
  data.replace(/<script[^<]*<\/script>/gi, function(match) {
    const src = /src="(.*?)"/g.exec(match);
    scripts.push(src[1]);
    return "";
  });

  // Create container
  const container = document.createElement("div");
  container.setAttribute("id", window.REACT_EXTENSION_ID);
  container.insertAdjacentHTML("beforeend", data);

  // Insert scripts manually
  for (let src of scripts) {
    const script = document.createElement("script");
    script.setAttribute("src", src);
    container.append(script);
  }

  // Append container to body
  document.querySelector("body").append(container);
  window.REACT_EXTENSION_ACTIVE = true;
}

(function() {
  if (!window.REACT_EXTENSION_ACTIVE) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", handleLoad);
    req.open("GET", chrome.runtime.getURL("index.html"));
    req.send();
  } else {
    document.getElementById(window.REACT_EXTENSION_ID).remove();
    window.REACT_EXTENSION_ACTIVE = false;
  }
})();
