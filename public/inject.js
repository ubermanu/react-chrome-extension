/* eslint-disable no-undef */
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

  // Append HTML content
  const body = document.querySelector("body");
  body.insertAdjacentHTML("beforeend", data);

  // Insert scripts manually
  for (let src of scripts) {
    const script = document.createElement("script");
    script.setAttribute("src", src);
    body.append(script);
  }
}

const req = new XMLHttpRequest();
req.addEventListener("load", handleLoad);
req.open("GET", chrome.runtime.getURL("index.html"));
req.send();
