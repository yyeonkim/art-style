const ul = document.querySelector("ul");

function selectList(event: Event) {
  const prev = document.getElementById("selected");
  const target = event.target as HTMLInputElement;

  // id와 hash url 변경
  if (target.tagName === "LI" && prev) {
    prev.id = "";
    target.id = "selected";
    window.location.hash = target.dataset.id as string;
  }
}

ul?.addEventListener("click", selectList);
