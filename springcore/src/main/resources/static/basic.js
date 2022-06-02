let static_username ="username";

$(document).ready(function () {

    getMessages();
})

function getMessages() {
    $('#cards-box').empty();
    $.ajax({
        type: "GET",
        url: "/api/memos",
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let message = response[i];
                let title = message['title'];
                let id = message['id'];
                getUsername(message.userId)
                let username = static_username;
                let contents = message['contents'];
                let modifiedAt = message['modifiedAt'];
                addHTML(title,id, username, contents, modifiedAt);
            }
        }
    });
}
function getUsername(id){
    $.ajax({
        type:"GET",
        url:`/api/memos/username/${id}`,
        async:false,
        success:function(response){
            static_username=response;
        }
    })
}

function addHTML(title,id, username, contents, modifiedAt) {
    let tempHtml = makeMessage(title,id, username, contents, modifiedAt);
    $('#cards-box').append(tempHtml);
}

function makeMessage(title,id, username, contents, modifiedAt) {
    return `<div onclick="toCommentPage(${id})" class="card" style="box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);">
                        <!-- date/username 영역 -->
                        <div class="metadata" style="margin-bottom: 10px;">
                            <div id="showtitle" style="font-size:18px; font-weight:bold; color :black;">${title}</div>
                            <div id="${id}-username" class="username" style="margin-right: 15px;">
                                ${username}
                            </div>
                            <div class="date">
                                ${modifiedAt}
                            </div>
                        </div>
                        <!-- contents 조회/수정 영역-->
                        <div class="contents">
                            <div id="${id}-contents" class="text" style="display: inline-block; width: 500px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                ${contents}
                            </div>
                            <div id="${id}-editarea" class="edit">
                                <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <!-- 버튼 영역-->
                        <div class="footer">
                        </div>
                    </div>`;
}

function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 300) {
        alert('공백 포함 300자 이하로 입력해주세요');
        return false;
    }
    return true;
}

function isValidTitle(title) {
    if (title == '') {
        alert('제목을 입력해주세요');
        return false;
    }
    if (title.trim().length > 15) {
        alert('제목은 15자 이하로 입력해주세요');
        return false;
    }
    return true;
}


function writePost() {
    let contents = $('#contents').val();
    let title = $('#title').val();
    if (isValidContents(contents) == false||isValidTitle(title)==false) {
        return;
    }

    let data = {'title' : title, 'contents': contents};

    $.ajax({
        type: "POST",
        url: "/api/memos",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 성공적으로 작성되었습니다.');
            window.location.reload();
        }
    });
}
function toCommentPage(memoid){
    let url = "/memos/commentPage";
    url = url + "?memoid="+memoid;
    location.href=url;
}

