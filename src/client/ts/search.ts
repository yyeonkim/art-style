const form = document.querySelector(".search__form");
const dropZone = document.querySelector(".dropZone");

async function submitUrl(event: Event) {
  event.preventDefault();

  const input: HTMLInputElement | null =
    document.querySelector(".search__input");

  if (input) {
    const url = input.value;
    const data = await postImageUrl(url);
    passResult(url, data);
  }
}

async function postImageUrl(image: string) {
  const data = await fetch("/api/search/url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image }),
  }).then((res) => res.json());

  return data;
}

function passResult(image: string | File, result: JSON) {
  fetch("/api/result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image, result }),
  }).then(() => location.assign("/result"));
}

async function dropFile(event: DragEvent) {
  event.preventDefault();

  const file = event.dataTransfer?.files[0];
  const data = await postImage(file as File);
  passResult(file as File, data);
}

async function postImage(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  const data = await fetch("/api/search/file", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());

  return data;
}

function handleDragOver(event: Event) {
  event.preventDefault();
}

form?.addEventListener("submit", submitUrl);
dropZone?.addEventListener("drop", (ev) => dropFile(ev as DragEvent));
dropZone?.addEventListener("dragover", handleDragOver);
