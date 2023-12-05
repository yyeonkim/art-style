function startLoading() {
  const body = document.querySelector("body");
  if (body) body.className = "stopScroll";

  const loader = document.createElement("div");
  loader.className = "loader";
  const spinner = document.createElement("span");
  spinner.className = "spinner";
  loader.appendChild(spinner);

  body?.appendChild(loader);
}

function endLoading() {
  const body = document.querySelector("body");
  if (body) body.className = "";

  const loader = document.querySelector(".loader");
  loader?.remove();
}

export { startLoading, endLoading };
