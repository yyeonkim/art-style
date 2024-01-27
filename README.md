# 그림 스타일 분석 및 추천 서비스

## 🎨 소개

🕶️ [시연 영상](https://youtu.be/e7e1J4ztMN8?feature=shared) (배경음악 O)

- 사용자가 사이트에 작품 이미지를 업로드하면,
- 그림 스타일을 분석하여 다른 유사한
  작품을 추천합니다.

<img width="500px" src="주요기능설명.png" alt="사용자가 이미지 주소나 파일을 업로드하면, 이를 base64로 인코딩하여 Roboflow에 전달한다. Roboflow에서 예측 레이블을 받으면, 동일한 레이블을 가진 유사한 이미지를 사용자에게 보여준다." />

## 사용 기술

- Typescript
- Express
- Pug
- SCSS
- [Roboflow](https://roboflow.com/) : 이미지 분류

<img width="400px" src="기술스택.png" alt="프론트엔드, 백엔드, 저장소, 이미지 분류에 사용한 기술을 설명" />
