let lightBtn = document.querySelector('.category-sort-div');
let filterBtn = document.querySelector('.filter')
var itemDiv = document.querySelector(".alclist-item-div")
let paginationUl = document.querySelector(".pagination-ul")


let categoryTargetNo;
let filterTargetNo;
let pageSize = 10;
let pageCount = 10; // 페이징에 나타낼 페이지 수
var totalAlcoholPage; // 전체 페이지 사이즈
var totalAlcoholCount;
var targetNo = 0;


$(document).ready(function() {
  fetch("/alcohol/size")
    .then(response => {
      return response.json()
    })
    .then(size => {
      console.log(size);
      totalAlcoholCount = size
      paging(totalAlcoholCount, pageSize, pageCount, 1, targetNo)
      targetList(targetNo,1)
    })
})

function paging(totalAlcoholCount, pageSize, pageCount, currentPage, targetNo) {
  console.log("currentPage : " + currentPage);
  console.log(targetNo);

  totalAlcoholPage = Math.ceil(totalAlcoholCount / pageSize) // 총 페이지 수\

  if (totalAlcoholPage < pageCount) {
    pageCount = totalAlcoholPage;
  }

  let pageGroup = Math.ceil(currentPage / pageCount) // 페이지 그룹
  let last = pageGroup * pageCount // 화면에 보여질 마지막 페이지 번호

  if (last > totalAlcoholPage) {
    last = totalAlcoholPage
  }


  let first = last - (pageCount - 1); //화면에 보여질 첫번째 페이지 번호
  let next = last + 1;
  let prev = first - 1;

  if (last % pageCount != 0) {
    first = currentPage
    last = totalAlcoholPage
  }

  let pageHtml = "";

  if (prev > 0) {
    pageHtml += "<li><a href='#' id='prev'> 이전 </a></li>";
  }

  //페이징 번호 표시
  for (var i = first; i <= last; i++) {
    if (currentPage == i) {
      pageHtml +=
        "<li class='on'><a href='#' id='" + i + "'>" + i + "</a></li>";
    } else {
      pageHtml += "<li><a href='#' id='" + i + "'>" + i + "</a></li>";
    }
  }

  if (last < totalAlcoholPage) {
    pageHtml += "<li><a href='#' id='next'> 다음 </a></li>";
  }

  $(".pagination-ul").html(pageHtml)

  //페이징 번호 클릭 이벤트
  $(".pagination-ul li a").click(function() {
    let $id = $(this).attr("id");
    selectedPage = $(this).text();

    if ($id == "next") selectedPage = next;
    if ($id == "prev") selectedPage = prev;

    paging(totalAlcoholCount, pageSize, pageCount, selectedPage, targetNo);
    targetList(targetNo, selectedPage)
  });
}

// 도수별 정렬
function degreeSort(alcoholArr) {
  alcoholArr.sort((a, b) => {
    return a.degree - b.degree;
  })
}

// 가나다순 정렬
function alphabeticalOrderSort(alcoholArr) {
  alcoholSortArr = alcoholArr.sort((a, b) => {
    let x = a.alcoholName.toLowerCase();
    let y = b.alcoholName.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  })
}


// 주류 페이지 수
function AlcoholPageSize(targetNo) {
  console.log(targetNo)
  if (targetNo == 0) {
    fetch("/alcohol/size")
      .then(response => {
        return response.json()
      })
      .then(size => {
        totalAlcoholCount = size // 총 페이지 수
        paging(totalAlcoholCount, pageSize, pageCount, 1, targetNo)
        targetList(targetNo,1)

      });
  } else {
    fetch(`/alcohol/targetSize?targetNo=${targetNo}`)
      .then(response => {
        return response.json()
      })
      .then(size => {
        totalAlcoholCount = size // target 총 페이지 수
        paging(totalAlcoholCount, pageSize, pageCount, 1, targetNo)
        targetList(targetNo,1)
      });
  }
}


// target list 생성
function targetList(targetNo, selectedPage) {
  $('.alcohol-list-div div').empty();
  if (targetNo == 0) {
    fetch(`/alcohol/list?pageSize=${pageSize}&pageNo=${selectedPage}`)
      .then(function(response) {
        return response.json()
      })
      .then(function(alcohols) {
        createdList(alcohols);
      })
  } else {
    fetch(`/alcohol/targetList?targetNo=${targetNo}&pageSize=${pageSize}&pageNo=${selectedPage}`)
      .then(function(response) {
        return response.json()
      })
      .then(function(alcohols) {
        createdList(alcohols);
      })
  }
}

// list 생성
function createdList(alcohols) {
  for (let alcohol of alcohols) {
    let div = document.createElement("div")
    div.classList.add("card")
    div.classList.add("border")
    div.classList.add("border-1")
    div.classList.add("rounded-3")
    div.classList.add("shadow-lg")
    // div.classList.add("border-dark")
    div.classList.add("x-card-border")
    div.innerHTML = `
    <a class="alc-link" href="alcoholdetail.html?no=${alcohol.alcoholDetailNo}">
    <img src="/alcohol/photo?filename=178x173_${alcohol.img}" class="card-img-top">
    <div class="card-body">
    <p class="card-text">
    <ul>
    <li>${alcohol.alcoholName}</li>
    <li class="alchol-degree-value">${alcohol.degree}%</li>
    </ul>
    </p>
    </div>
    </a>
    `
    itemDiv.appendChild(div)
  }
  console.log("itemDiv");
}



lightBtn.addEventListener("click", function(e) {
  let currTargetNo;
  currTargetNo = e.target.value;

  console.log(totalAlcoholCount);

  if (e.target == e.currentTarget) {
    return;
  } else {
    e.currentTarget.querySelector('.act').classList.toggle('act');
    e.target.classList.toggle('act');
    console.log(currTargetNo);
    AlcoholPageSize(currTargetNo)
  }

})


// 필터 버튼
// filterBtn.addEventListener("click", function(e) {
//   if (e.target == e.currentTarget) {
//     return;
//   } else {
//     e.currentTarget.querySelector('.filterAct').classList.toggle('filterAct');
//     e.target.classList.toggle('filterAct');
//
//     filterTargetNo = e.target.value
//
//     console.log(filterTargetNo);
//
//     if (filterTargetNo == 0) {
//       degreeSort(targetArr);
//       createdList(targetArr);
//     }
//     if (filterTargetNo == 1) {
//       alphabeticalOrderSort(targetArr);
//       createdList(targetArr);
//     }
//   }
// })
