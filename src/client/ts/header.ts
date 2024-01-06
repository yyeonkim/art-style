const header = document.querySelector("header");

hiddenSearch();
addShadow();

/* 브라우저 경로에 따라 이미지 검색 버튼 숨기기 */
function hiddenSearch() {
  const currentPath = window.location.pathname;

  if (currentPath === "/search" && header) {
    header.children[1].className = "hidden";
  } else if (header) {
    header.children[1].className = "";
  }
}

/* 브라우저 경로에 따라 그림자 스타일 추가 */
function addShadow() {
  const currentPath = window.location.pathname;

  if (currentPath !== "/" && header) {
    header.className = "shadow";
  } else if (header) {
    header.className = "";
  }
}
