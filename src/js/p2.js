$(document).ready(function() {
  const productsPerPage = 24;
  let currentPage = 1;
  let products = [];

  // JSON 데이터 가져오기
  $.getJSON("products.json", function(data) {
    products = data;
    renderProducts(); 
    createPagination(); // 페이지네이션 버튼 생성
  });

  // 상품 렌더링 함수
  function renderProducts() {
    const grid = $("#product");
    grid.empty(); // 기존 그리드 초기화

    // 현재 페이지에 해당하는 상품만 자르기
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageProducts = products.slice(start, end);

    // 상품 생성 및 삽입
    pageProducts.forEach(function(product) {
      const productDiv = $("<div>").addClass("product");
      productDiv.html(`
        <img src="${product.image}" alt="${product.name}">
        <span>${product.category}</span>
        <span>${product.name}</span>
        <span>KRW ${product.price.toLocaleString('ko-KR')}</span>
      `);
      grid.append(productDiv);
    });
  }

  // 페이지네이션 기능
  $("#prev-page").click(function() {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      updatePagination();
    }
  });

  $("#next-page").click(function() {
    if (currentPage * productsPerPage < products.length) {
      currentPage++;
      renderProducts();
      updatePagination();
    }
  });

  // 페이지 번호 버튼 클릭 이벤트 처리
  function createPagination() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginationContainer = $(".pagination");

    paginationContainer.empty(); // 기존 버튼 초기화

    // 이전 버튼
    paginationContainer.append('<button id="prev-page">&lt;</button>');

    // 페이지 번호 버튼 동적으로 생성
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = $('<button>').attr('id', `${i}page`).text(i);
      pageButton.click(function() {
        currentPage = i;
        renderProducts();
        updatePagination();
      });
      paginationContainer.append(pageButton);
    }

    // 다음 버튼
    paginationContainer.append('<button id="next-page">&gt;</button>');

    updatePagination(); // 초기 페이지 상태 업데이트
  }

  // 페이지 상태 업데이트 (활성화된 버튼 색상 변경 등)
  function updatePagination() {
    $(".pagination button").removeClass("active"); // 모든 버튼에서 active 클래스 제거
    $(`#${currentPage}page`).addClass("active"); // 현재 페이지에 active 클래스 추가
  }
});
