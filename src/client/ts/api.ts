import { IArtwork } from "../../types";

/* 카테고리별 작품 이미지 API 요청 */
async function getArtwork(category: string): Promise<IArtwork[]> {
  const json = await fetch(`/api/artworks?category=${category}`).then((res) =>
    res.json()
  );
  return json;
}

export { getArtwork };
