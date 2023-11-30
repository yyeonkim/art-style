const header = document.querySelector("header");

hiddenSearch();

/* 현재 브라우저 경로에 따라 이미지 검색 버튼 숨기기 */
function hiddenSearch() {
  const currentPath = window.location.pathname;

  if (currentPath === "/search" && header) {
    header.children[1].className = "hidden";
  } else if (header) {
    header.children[1].className = "";
  }
}
