import { LABEL } from "../../constants";
import { IArtwork } from "../../types";

async function changeCategory() {
  let artworks: IArtwork[] = [];

  // 카테고리별 작품 이미지 API 요청
  if (location.hash === `#${LABEL.REALIST}`) {
    artworks = await getArtwork(LABEL.REALIST);
  }
  if (location.hash === `#${LABEL.IMPRESSIONIST}`) {
    artworks = await getArtwork(LABEL.IMPRESSIONIST);
  }
  if (location.hash === `#${LABEL.POST_IMPRESSIONIST}`) {
    artworks = await getArtwork(LABEL.POST_IMPRESSIONIST);
  }
  if (location.hash === `#${LABEL.ROMANTIC}`) {
    artworks = await getArtwork(LABEL.ROMANTIC);
  }

  window.scrollTo(0, 0);
  loadImage(artworks);
}

/* 카테고리별 작품 이미지 API 요청 */
async function getArtwork(category: string): Promise<IArtwork[]> {
  const json = await fetch(`/api/artworks?category=${category}`).then((res) =>
    res.json()
  );
  return json;
}

/* 카테고리별로 작품 이미지를 화면에 표시 */
function loadImage(artworks: IArtwork[]) {
  const children: HTMLElement[] = [];

  for (let i = 0; i < artworks.length; i++) {
    const a = document.createElement("a");
    const img = document.createElement("img");
    const artwork = artworks[i];

    a.href = `/art-detail?target=${artwork.url}`;
    img.className = "artwork";

    if (i < 12) img.src = artwork.url;
    else {
      img.dataset.src = artwork.url;
      img.classList.add("lazy");
    }

    a.appendChild(img);
    children.push(a);
  }

  const list = document.querySelector(".home__list");
  list?.replaceChildren(...children);
}

/* 해시 주소 제거 */
function removeHash() {
  window.location.hash = LABEL.IMPRESSIONIST;
}

window.addEventListener("hashchange", changeCategory);
document.addEventListener("readystatechange", removeHash);
