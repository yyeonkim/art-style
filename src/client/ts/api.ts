import { LABEL } from "../../constants";
import { IArtwork } from "../../types";

/* 카테고리별 작품 이미지 API 요청 */
async function getArtwork(
  category:
    | LABEL.REALIST
    | LABEL.POST_IMPRESSIONIST
    | LABEL.IMPRESSIONIST
    | LABEL.ROMANTIC
): Promise<IArtwork[]> {
  const json = await fetch(`/api/artworks?category=${category}`).then((res) =>
    res.json()
  );
  return json;
}

async function postArtwork(imgBlob: Blob) {
  return await fetch("/api/artwork", {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream" },
    body: imgBlob,
  });
}

/**
 * result 뷰에 이미지 주소, 작품 데이터 생성
 * @param imageUrl 뷰에서 사용할 검색 이미지
 * @param classes Roboflow 예측 라벨
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

export { getArtwork, postArtwork, postResult };
