// 글쓰기 form.html로 이동
document.querySelector(".writing__").addEventListener("click", function() {
    console.log(e.target);
      location.href = "form.html"
  })
  var boardCardDiv = document.querySelector(".card")
  const lightBtn = document.querySelector(".category");
  
  // 몇분 전 표시
  function timeCheck(time) {
  
    var min = 60 * 1000
    var now = new Date()
    var writeDay = new Date(time)
    var minsAgo = Math.floor((now - writeDay) / (min))
    var result = {
              'raw': writeDay.getFullYear() + '-' + (writeDay.getMonth() + 1 > 9 ? '' : '0') + (writeDay.getMonth() + 1) + '-' + (writeDay.getDate() > 9 ? '' : '0') +  writeDay.getDate() + ' ' + (writeDay.getHours() > 9 ? '' : '0') +  writeDay.getHours() + ':' + (writeDay.getMinutes() > 9 ? '' : '0') +  writeDay.getMinutes() + ':'  + (writeDay.getSeconds() > 9 ? '' : '0') +  writeDay.getSeconds(),
              'formatted': '',
          };
      if (minsAgo < 60) { // 1시간 내
              result.formatted = minsAgo + '분 전';
          } else if (minsAgo < 60 * 24) { // 하루 내
              result.formatted = Math.floor(minsAgo / 60) + '시간 전';
          } else { // 하루 이상
              result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
          };
          return result.formatted;
  }
  
  // 커뮤니티 번호 스트링으로
  function sortCategory(no) {
  
    if (no === 1) {
      // return `전체`
      return `술집추천`
    } else if (no === 2) {
      // return `술집추천`
      return `분실/실종센터`
    } else if (no === 3) {
      // return `분실/실종센터`
      return `일상`
    } else if (no === 4) {
      // return `일상`
      return `사건사고`
    } else if (no === 5) {
      // return `사건사고`
      return `기타`
    // } else if (no === 6) {
    //   return `술게임`
     }
    // else if (no === 7){
    //   return `기타`
    // }
  }
  
  var lenderingCountAll = 0;
  // 모든 데이터 렌더링
  function allList() {
    fetch("/community/list")
      .then(function(response) {
        return response.json()
      })
      .then(function(boards) {
        console.log(boards);
        for (var i = lenderingCountAll; i < lenderingCountAll + 3; i++) {
          if (i === boards.length ) {
            alert("게시물이" + (boards.length - lenderingCountAll) + "개 남았습니다.")
            break;
          } else {
          var categoryNo = boards[i].communityNo
          var div = document.createElement("div")
          div.classList.add("card-body")
          div.innerHTML = `<a id= "aTag" href = "communityDetail.html?boardNo=${boards[i].boardNo}">
              <img class="community_img" src="">
              <div class="card-category">` + sortCategory(categoryNo) + `</div><br>
              <div class="contents">
                <div class="card-contents-name">${boards[i].boardTitle}</div>
                <div id="card-contents">${boards[i].boardContents}<button class="see_more">. . .</button></div><br>
              </div> <br>
              <div class="card-like"><i class="fa-regular fa-thumbs-up"></i> ${boards[i].boardLike}</div>
              <div class="card-comment"><i class="fa-regular fa-comment"></i> 댓글 ${boards[i].boardCommentCount}</div>
              <div class="community_time">` + timeCheck(`${boards[i].regDate}`) + `</div>
              <div class="community_writer">${boards[i].name}</div>
              </a>
          `
          boardCardDiv.appendChild(div)
          }
        }
        lenderingCountAll += 3;
      })
  }
  var lenderingCount2 = 0;
  var lenderingCount3 = 0;
  var lenderingCount4 = 0;
  var lenderingCount5 = 0;
  var lenderingCount6 = 0;
  var lenderingCount7 = 0;
  var a = 0;
  
  // 카테고리 렌더링
  function targetList(targetNo) {
  
  function countUp(targetNo) {
    if (targetNo === 2) {
     lenderingCount2 += 1;
     return lenderingCount2
   } else if (targetNo === 3) {
     lenderingCount3 += 1;
     return lenderingCount3
   } else if (targetNo === 4) {
     lenderingCount4 += 1;
     return lenderingCount4
   } else if (targetNo === 5) {
     lenderingCount5 += 1;
     return lenderingCount5
   } else if (targetNo === 6) {
     lenderingCount6 += 1;
     return lenderingCount6
   } else if (targetNo === 7) {
     lenderingCount7 += 1;
     return lenderingCount7
   }
  }
  
  function targetNoCount(targetNo) {
    if (targetNo == 2) {
      a = lenderingCount2
     return a
   } else if (targetNo == 3) {
       a = lenderingCount3
     return a
   } else if (targetNo == 4) {
       a = lenderingCount4
     return a
   } else if (targetNo == 5) {
       a = lenderingCount5
     return a
   } else if (targetNo == 6) {
     a = lenderingCount6
     return a
   } else if (targetNo == 7) {
     a = lenderingCount7
     return a
   }
  }
  
    fetch("/community/list")
      .then(function(response) {
        return response.json()
      })
      .then(function(boards) {
        targetNoCount(targetNo)
        for (var i = a; i < a + boards.length; i++) {
            if (targetNo == boards[i].communityNo) {
            targetNo = boards[i].communityNo
            var div = document.createElement("div")
            div.classList.add("card-body")
            div.innerHTML = `<a href = "communityDetail.html?boardNo=${boards[i].boardNo}">
            <img class="community_img" src="">
            <div class="card-category">` + sortCategory(targetNo) + `</div><br>
            <div class="contents">
              <div class="card-contents-name">${boards[i].boardTitle}</div>
              <div id="card-contents">${boards[i].boardContents}<button class="see_more">. . .</button></div><br>
            </div> <br>
            <div class="card-like"><i class="fa-regular fa-thumbs-up"></i> ${boards[i].boardLike}</div>
            <div class="card-comment"><i class="fa-regular fa-comment"></i> 댓글 ${boards[i].boardCommentCount}</div>
            <div class="community_time">` + timeCheck(`${boards[i].regDate}`) + `</div>
            <div class="community_writer">${boards[i].name}</div>
            </a>
          `
            boardCardDiv.appendChild(div)
            countUp(targetNo)
          }
        }
  
      })
  }
  
  // 스크롤에 따른 카테고리 렌더링
  function scrollTargetList(targetNo) {
  
  function countUp(targetNo) {
    if (targetNo === 2) {
     lenderingCount2 += 1;
     return lenderingCount2
   } else if (targetNo === 3) {
     lenderingCount3 += 1;
     return lenderingCount3
   } else if (targetNo === 4) {
     lenderingCount4 += 1;
     return lenderingCount4
   } else if (targetNo === 5) {
     lenderingCount5 += 1;
     return lenderingCount5
   } else if (targetNo === 6) {
     lenderingCount6 += 1;
     return lenderingCount6
   } else if (targetNo === 7) {
     lenderingCount7 += 1;
     return lenderingCount7
   }
  }
  
  function targetNoCount(targetNo) {
    if (targetNo == 2) {
      a = lenderingCount2
     return a
   } else if (targetNo == 3) {
       a = lenderingCount3
     return a
   } else if (targetNo == 4) {
       a = lenderingCount4
     return a
   } else if (targetNo == 5) {
       a = lenderingCount5
     return a
   } else if (targetNo == 6) {
     a = lenderingCount6
     return a
   } else if (targetNo == 7) {
     a = lenderingCount7
     return a
   }
  }
  
    fetch("/community/list")
      .then(function(response) {
        return response.json()
      })
      .then(function(boards) {
        targetNoCount(targetNo)
        for (var i = a; i < a + boards.length; i++) {
          if (a + i + 5> boards.length ) {
  
            console.log(a);
            console.log(i);
            console.log(boards.length);
            for (var j = 0; j < boards.length - a -1; j++) {
              console.log(j);
              if ( j > 2) {
                break;
              }
              $(".card-body:last").remove()
              var cardBlock = document.createElement("div")
              cardBlock.classList.add("card-block")
              boardCardDiv.appendChild(cardBlock)
            }
  
  
            alert("게시물이 더이상 존재하지 않습니다.")
            lenderingCount2 = boards.length;
            break;
          } else {
            if (targetNo == boards[i].communityNo) {
            targetNo = boards[i].communityNo
  
            var div = document.createElement("div")
            div.classList.add("card-body")
            div.innerHTML = `<a href = "communityDetail.html?boardNo=${boards[i].boardNo}">
            <img class="community_img" src="">
            <div class="card-category">` + sortCategory(targetNo) + `</div><br>
            <div class="contents">
              <div class="card-contents-name">${boards[i].boardTitle}</div>
              <div id="card-contents">${boards[i].boardContents}<button class="see_more">. . .</button></div><br>
            </div> <br>
            <div class="card-like"><i class="fa-regular fa-thumbs-up"></i> ${boards[i].boardLike}</div>
            <div class="card-comment"><i class="fa-regular fa-comment"></i> 댓글 ${boards[i].boardCommentCount}</div>
            <div class="community_time">` + timeCheck(`${boards[i].regDate}`) + `</div>
            <div class="community_writer">${boards[i].name}</div>
            </a>
          `
            boardCardDiv.appendChild(div)
  
          }
          }
        }
        countUp(targetNo)
      })
  }
  
  
  // 무한스크롤
  function debounce(callback, limit = 500) {
      let timeout
      return function(...args) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
              callback.apply(this, args)
          }, limit)
      }
  }
  // 카테고리 클릭
  lightBtn.addEventListener("click", function(e) {
    if (e.target == e.currentTarget) {
      return;
    } else {
      e.currentTarget.querySelector('.act').classList.toggle('act');
      e.target.classList.toggle('act');
      let targetNo = e.target.value
      if (targetNo == 6) {
        allList()
  
        // ===== 무한 스크롤 (스크롤 이벤트) =====
        document.addEventListener("scroll", debounce(e => {
            // clientHeight : 웹 브라우저 창의 높이
            // scrollTop : 현재 스크롤된 부분의 맨 위의 높이
            // scrollHeight : 문서의 총 높이 (= 스크롤의 총 높이)
            // 스크롤의 마지막에 도달 : clientHeight + scrollTop >= scrollHeight
            const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement
            if(clientHeight + scrollTop >= scrollHeight) {
                  allList()
            }
        }, 200))
      }
      if (targetNo != 6 && targetNo != 7) {
        $(".card").empty()
        targetList(targetNo)
        // ===== 무한 스크롤 (스크롤 이벤트) =====
        document.addEventListener("scroll", debounce(e => {
            const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement
            if(clientHeight + scrollTop > scrollHeight) {
                  scrollTargetList(targetNo)
            }
        }, 200))
      }
      if (targetNo == 7) {
        location.href = "game.html"
      }
    }
  })
  