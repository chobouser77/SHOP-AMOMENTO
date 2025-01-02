$(document).ready(function() {
  const productsPerPage = 24;
  let currentPage = 1;  // currentPage를 1로 초기화
  let products = [];

  // JSON 데이터 가져오기
  $.getJSON("products.json", function(data) {
    products = data;
    renderAndPaginate(); // 상품 렌더링 및 페이지네이션 처리
  });

  // 상품 렌더링 및 페이지네이션 처리 함수
  function renderAndPaginate() {
    const grid = $("#product");
    grid.empty(); // 기존 상품 초기화

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

    // 페이지네이션 버튼 생성
    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginationContainer = $(".pagination");
    paginationContainer.empty(); // 기존 페이지 번호 초기화

    // 이전 버튼
    const prevButton = $('<button id="prev-page">&lt;</button>');
    paginationContainer.append(prevButton);

    // 페이지 번호 버튼 생성
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = $("<button>").attr("id", `${i}page`).text(i);
      paginationContainer.append(pageButton);
    }

    // 다음 버튼
    const nextButton = $('<button id="next-page">&gt;</button>');
    paginationContainer.append(nextButton);

    // 페이지 번호 버튼 클릭 이벤트 처리
    $("button[id$='page']").click(function() {
      currentPage = parseInt($(this).text()); // 클릭한 페이지 번호로 이동
      renderAndPaginate(); // 해당 페이지의 상품 렌더링
      console.log("현재 페이지는", currentPage, "입니다.");
    });

    // 페이지네이션 상태 업데이트
    updatePagination();
  }

  // 페이지네이션 상태 업데이트 함수
  function updatePagination() {
    const totalPages = Math.ceil(products.length / productsPerPage);

    // 이전 버튼 비활성화 처리
    $("#prev-page").prop("disabled", currentPage === 1);

    // 다음 버튼 비활성화 처리
    $("#next-page").prop("disabled", currentPage === totalPages);

    // 페이지 번호 버튼 활성화 처리
    $("button[id$='page']").each(function() {
      $(this).removeClass("active"); // 이전에 활성화된 페이지 버튼 클래스 제거
      if (parseInt($(this).text()) === currentPage) {
        $(this).addClass("active"); // 현재 페이지 번호 버튼 활성화
      }
    });

    // 이전 버튼 클릭 이벤트 처리
    $("#prev-page").off('click').on('click', function() {
      console.log("이전버튼 클릭, currentPage:", currentPage); // 클릭된 버튼 상태 확인
      if (currentPage > 1) {
        currentPage--; // `currentPage`를 숫자로 간단히 감소
        console.log("이전버튼 실행 성공, currentPage:", currentPage);
        renderAndPaginate(); 
      } else {
        console.log("이전버튼 실행 실패 - 첫 페이지입니다.");
      }
    });

    // 다음 버튼 클릭 이벤트 처리
    $("#next-page").off('click').on('click', function() {
      const totalPages = Math.ceil(products.length / productsPerPage);
      console.log("다음버튼 클릭, currentPage:", currentPage, "totalPages:", totalPages); // 클릭된 버튼 상태 확인
      if (currentPage < totalPages) {
        currentPage++; // `currentPage`를 숫자로 간단히 증가
        console.log("다음버튼 실행 성공, currentPage:", currentPage);
        renderAndPaginate(); 
      } else {
        console.log("다음버튼 실행 실패 - 마지막 페이지입니다.");
      }
    });
  }
});
