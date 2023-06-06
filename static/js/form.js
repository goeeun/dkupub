
var xcate = document.querySelector(".board-category")
var xtitle = document.querySelector(".write-title")
var xcontent = document.querySelector("#summernote")


// 발표용 저장 버튼
document.querySelector(".save").addEventListener("click", function(){
	location.href='mainReBoot7.html'
})




// document.querySelector(".save").addEventListener("click", function()
// {

// 	console.log(xcate.value);
// 	console.log(xtitle.value);
// 	console.log(xcontent.value);

// 	fetch('/member/getLoginUser')
// 	.then(function(response){
// 	return response.json()
// 	})
// 	.then(function(result){

// 	console.log(result.data.mno);
// 	var xmno = result.data.mno;

// 	function sortCategory(category) {

// 		var a = "술집추천"
// 		var b = "분실/실종센터"
// 		var c = "일상"
// 		var d = "사건사고"
// 		// var e = "술게임"
// 		var f = "기타"

// 		if (category === a) {
// 			return 1
// 		} else if (category === b) {
// 			return 2
// 		} else if (category === c) {
// 			return 3
// 		} else if (category === d) {
// 			return 4
// 		} else if (category === f){
// 			return 5
// 		}
// 	}

// 	var categoryNo = xcate.value;


// 	fetch(`/communityForm/add?mNo=${xmno}&communityNo=` + sortCategory(categoryNo) + `&boardTitle=${xtitle.value}&boardContents=${xcontent.value}`)
// 	.then(function (response){
// 		return response.text()
// 	})
// 	.then(function(text) {
// 		// uploadSummernoteImageFile()
// 		console.log(text);
// 		location.href = "main.html"
// 	});

// 	})
// 	})

document.querySelector(".quit").addEventListener("click", function() {
location.href = "main.html"
})


$(document).ready(function() {

	$('#summernote').summernote({
    toolbar: [
        // [groupName, [list of button]]
        ['fontname', ['fontname']],
        ['fontsize', ['fontsize']],
        ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
        ['color', ['forecolor','color']],
        ['table', ['table']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert',['picture','link','video']]
      ],
      fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','맑은 고딕','궁서','굴림체','굴림','돋움체','바탕체'],
      fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72'],
		  height: 350,                 // 에디터 높이
		  minHeight: 350,             // 최소 높이
		  maxHeight: 350,             // 최대 높이
		  focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
		  lang: "ko-KR",					// 한글 설정
		  placeholder: '최대 2048자까지 쓸 수 있습니다',	//placeholder 설정

	// 		callbacks: {	//여기 부분이 이미지를 첨부하는 부분
	// 			onImageUpload : function(files, editor, welEditable) {
	// 				// 파일 업로드(다중업로드를 위해 반복문 사용)
	//
	// 				uploadSummernoteImageFile(files,
	// 				this);
	//
	// 		}
	// }
});
});

 // function uploadSummernoteImageFile(file, editor) {
	// 					console.log(file);
 // };
