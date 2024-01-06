import { endLoading, startLoading } from "./loader";

let lazyLoadingTimeout: NodeJS.Timeout;
const images = document.querySelectorAll(".artwork");
const targetImg: HTMLImageElement | null =
  document.querySelector(".target__img"); // 작품 상세 페이지의 이미지

function lazyLoad() {
  // 이전 tiemout 제거
  if (lazyLoadingTimeout) clearTimeout(lazyLoadingTimeout);

  lazyLoadingTimeout = setTimeout(() => {
    const lazyImages: NodeListOf<HTMLImageElement> =
      document.querySelectorAll(".artwork.lazy");

    // 이미지 없으면 이벤트 삭제
    if (lazyImages.length === 0)
      document.removeEventListener("scroll", lazyLoad);

    lazyImages.forEach((img) => {
      if (img.offsetTop < window.innerHeight + window.scrollY) {
        img.setAttribute("src", img.dataset.src as string);
        img.classList.remove("lazy");
      }
    });
  }, 50);
}

async function clickArtwork(event: Event) {
  event.preventDefault();
  startLoading();

  // 이미지 url을 art-detail에 get 요청으로 보내기
  const image = event.target as HTMLImageElement;
  const path = `/art-detail?target=${image.src}`;

  await fetch(path);
  // result나 art-detail 화면에서 사용한 url revoke
  if (targetImg) URL.revokeObjectURL(targetImg.src);

  endLoading();
  location.assign(path);
}

window.addEventListener("scroll", lazyLoad);
images.forEach((ele) => ele.addEventListener("click", clickArtwork));
