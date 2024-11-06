import { postArtwork } from "./api";
import { endLoading, startLoading } from "./loader";

const form = document.querySelector(".search__form");
const dropZone = document.querySelector(".dropZone");

async function submitUrl(event: Event) {
  event.preventDefault();
  startLoading();

  const input: HTMLInputElement | null =
    document.querySelector(".search__input");
  if (!input) return;

  const url = input.value;
  const blob = await resizeImage(url, 640, 640);
  if (!blob) console.error("이미지 없음");

  const data = await postArtwork(blob!).then((res) => res.json());
  // result 뷰에 imgSrc, artworks 데이터 생성
  await postResult({ imgSrc: url, classes: data.predictedClasses });
  endLoading();
  location.assign("/result");
}

/**
 * result 뷰에 이미지 주소 전달
 * @param imageUrl
 */
async function postResult({
  imgSrc,
  classes,
}: {
  imgSrc: string;
  classes: string[];
}) {
  await fetch("/result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: imgSrc, classes }),
  });
}

async function dropFile(event: DragEvent) {
  event.preventDefault();
  startLoading();

  const file = event.dataTransfer?.files[0];
  const blobUrl = URL.createObjectURL(file as Blob);
  await postImageFile(file!);

  //await postResult(blobUrl);
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

function resizeImage(
  fileOrUrl: File | string,
  width: number,
  height: number
): Promise<Blob | null> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    // 이미지 주소인 경우
    if (typeof fileOrUrl === "string") img.src = fileOrUrl;
    // 파일인 경우
    else img.src = URL.createObjectURL(fileOrUrl as Blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    };

    img.onerror = (error) => reject(error);
  });
}

form?.addEventListener("submit", submitUrl);
dropZone?.addEventListener("drop", (ev) => dropFile(ev as DragEvent));
dropZone?.addEventListener("dragover", handleDragOver);
