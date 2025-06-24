document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  const isEnglish = currentPath.includes("-en.html");

  const switchLink = document.createElement("a");
  switchLink.style.position = "fixed";
  switchLink.style.top = "20px";
  switchLink.style.right = "20px";
  switchLink.style.zIndex = "10000";
  switchLink.style.padding = "8px 14px";
  switchLink.style.backgroundColor = "#ffffff";
  switchLink.style.color = "#000000";
  switchLink.style.border = "1px solid #ccc";
  switchLink.style.borderRadius = "6px";
  switchLink.style.fontSize = "14px";
  switchLink.style.fontFamily = "Arial, sans-serif";
  switchLink.style.textDecoration = "none";
  switchLink.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
  switchLink.style.cursor = "pointer";
  switchLink.style.display = "block";
  switchLink.style.visibility = "visible";

  if (isEnglish) {
    switchLink.href = currentPath.replace("-en.html", ".html");
    switchLink.textContent = "🇹🇷 Türkçe";
  } else {
    switchLink.href = currentPath.replace(".html", "-en.html");
    switchLink.textContent = "🇬🇧 English";
  }

  document.body.appendChild(switchLink);
});
