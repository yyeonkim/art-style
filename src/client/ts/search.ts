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

async function passResult(imageUrl: string, result: JSON) {
  await fetch("/result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: imageUrl, result }),
  });
}

async function dropFile(event: DragEvent) {
  event.preventDefault();

  const file = event.dataTransfer?.files[0];
  const blobUrl = URL.createObjectURL(file as Blob);
  const data = await postImage(file as File);

  await passResult(blobUrl, data);
  location.assign("/result");
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
