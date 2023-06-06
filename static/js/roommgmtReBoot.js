
$('.entrance').click(function() {
    fetch("/member/get")
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        var userNickName= result.data.nickName
        console.log(userNickName)
        return userNickName;
    }).then(function(userNickName) {
        console.log(userNickName)
        location.href = `/party/chat.html?roomNum=1&username=${userNickName}`;
    })
    })
    