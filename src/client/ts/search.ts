const form = document.querySelector(".search__form");
const dropZone = document.querySelector(".dropZone");

async function handleSubmit(event: Event) {
  event.preventDefault();

  const input: HTMLInputElement | null =
    document.querySelector(".search__input");

  if (input) {
    postImageUrl(input.value);
  }
}

function dropFile(event: DragEvent) {
  event.preventDefault();

  const file = event.dataTransfer?.files[0];
  postImage(file as File);
}

async function postImageUrl(image: string) {
  const data = await fetch("/api/search/url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image }),
  }).then((res) => res.json());

  // data를 result 화면에 전달
}

async function postImage(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  const data = await fetch("/api/search/file", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());

  // data를 result 화면에 전달
}

function handleDragOver(event: Event) {
  event.preventDefault();
}

form?.addEventListener("submit", handleSubmit);
dropZone?.addEventListener("drop", (ev) => dropFile(ev as DragEvent));
dropZone?.addEventListener("dragover", handleDragOver);
