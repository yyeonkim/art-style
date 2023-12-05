const images = document.querySelectorAll(".artwork");
const targetImg: HTMLImageElement | null =
  document.querySelector(".target__img");

async function clickArtwork(event: Event) {
  event.preventDefault();
  const image = event.target as HTMLImageElement;

  // 이미지 url을 art-detail에 get 요청으로 보내기
  const path = `/art-detail?target=${image.src}`;
  await fetch(path);

  // result나 art-detail 화면에서 사용한 url revoke
  if (targetImg) URL.revokeObjectURL(targetImg.src);
  location.assign(path);
}

images.forEach((ele) => ele.addEventListener("click", clickArtwork));
