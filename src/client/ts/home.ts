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

  loadImage(artworks);
}

/* 카테고리별 작품 이미지 API 요청 */
async function getArtwork(category: string): Promise<IArtwork[]> {
  const res = fetch(`/api/artworks/${category}`);
  return res.then((res) => res.json());
}

/* 카테고리별로 작품 이미지를 화면에 표시 */
function loadImage(artworks: IArtwork[]) {
  const children: HTMLElement[] = [];
  for (const artwork of artworks) {
    const a = document.createElement("a");
    const img = document.createElement("img");
    a.href = `/art-detail?target=${artwork.url}`;
    img.className = "artwork";
    img.src = artwork.url;
    a.appendChild(img);
    children.push(a);
  }

  const list = document.querySelector(".home__list");
  list?.replaceChildren(...children);
}

window.addEventListener("hashchange", changeCategory);
