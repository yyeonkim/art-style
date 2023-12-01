const ul = document.querySelector("ul");

function selectList(event: Event) {
  const prev = document.getElementById("selected");
  const target = event.target as HTMLInputElement;

  if (prev && prev !== target) {
    prev.id = "";
  }
  target.id = "selected";
}

ul?.addEventListener("click", selectList);
