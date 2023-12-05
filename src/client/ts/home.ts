import { LABEL } from "../../constants";
import { IArtWork } from "../../types";

async function changeCategory() {
  let artWorks: IArtWork[] = [];

  // 카테고리별 작품 이미지 API 요청
  if (location.hash === `#${LABEL.REALIST}`) {
    artWorks = await getArtWork(LABEL.REALIST);
  }
  if (location.hash === `#${LABEL.IMPRESSIONIST}`) {
    artWorks = await getArtWork(LABEL.IMPRESSIONIST);
  }
  if (location.hash === `#${LABEL.POST_IMPRESSIONIST}`) {
    artWorks = await getArtWork(LABEL.POST_IMPRESSIONIST);
  }
  if (location.hash === `#${LABEL.ROMANTIC}`) {
    artWorks = await getArtWork(LABEL.ROMANTIC);
  }

  loadImage(artWorks);
}

/* 카테고리별 작품 이미지 API 요청 */
async function getArtWork(category: string): Promise<IArtWork[]> {
  const res = fetch(`/api/artworks/${category}`);
  return res.then((res) => res.json());
}

/* 카테고리별로 작품 이미지를 화면에 표시 */
function loadImage(artWorks: IArtWork[]) {
  const children: HTMLElement[] = [];
  for (const artWork of artWorks) {
    const a = document.createElement("a");
    const img = document.createElement("img");
    a.href = `/art-detail?target=${artWork.url}`;
    img.className = "artWork";
    img.src = artWork.url;
    a.appendChild(img);
    children.push(a);
  }

  const list = document.querySelector(".home__list");
  list?.replaceChildren(...children);
}

window.addEventListener("hashchange", changeCategory);
