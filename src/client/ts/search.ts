import { endLoading, startLoading } from "./loader";

const form = document.querySelector(".search__form");
const dropZone = document.querySelector(".dropZone");

async function submitUrl(event: Event) {
  event.preventDefault();
  startLoading();

  const input: HTMLInputElement | null =
    document.querySelector(".search__input");

  if (input) {
    const url = input.value;
    const similarArtworks = await postImageUrl(url);

    await postResult(url, similarArtworks);
    endLoading();
    location.assign("/result");
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

async function postResult(imageUrl: string, result: JSON) {
  await fetch("/result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: imageUrl, result }),
  });
}

async function dropFile(event: DragEvent) {
  event.preventDefault();
  startLoading();

  const file = event.dataTransfer?.files[0];
  const blobUrl = URL.createObjectURL(file as Blob);
  const similarArtworks = await postImageFile(file as File);

  await postResult(blobUrl, similarArtworks);
  endLoading();
  location.assign("/result");
}

async function postImageFile(image: File) {
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
