import { IArtWork } from "../types";
import { getFiles } from "../db";

/* 각 라벨(클래스)마다 저장소에서 이미지 가져오기 */
async function getResult(labels: string[]) {
  const result: IArtWork[] = [];

  for (const label of labels) {
    const files = await getFiles(label);
    result.push(...files);
  }

  return result;
}

export { getResult };
