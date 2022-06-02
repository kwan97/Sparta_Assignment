let static_comment_username = "comment_user_name";

$(document).ready(function () {

    const searchParams = new URL(location.href).searchParams;
    const memoIdparam = searchParams.get('memoid');
    getComments(memoIdparam);
})

function add_comments(memoId){

    let comments = $('#user_comment').val();
    let data={"memoId" : memoId,"comments":comments};

    $.ajax({
        type: "POST",
        url: "/api/memos/comments",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('댓글이 성공적으로 저장되었습니다.');
            window.location.reload();
        }
    });
}
function getComments(memoId){

    $('#users_comments').empty();
    $.ajax({
        type: "GET",
        url: `/api/comments/${memoId}`,
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let comment = response[i];
                let comment_contents=comment.comments;
                getCommentsUsername(comment.id);
                let memoid = comment.memoId;
                let commentid = comment.id;
                let comment_username = static_comment_username;
                addCommentHTML(comment_contents,comment_username,commentid);
            }
        }
    });
}
function addCommentHTML(comment_contents,comment_username, commentid) {
    let tempHtml = makeComment(comment_contents,comment_username,commentid);
    $('#users_comments').append(tempHtml);
}

function makeComment(comment_contents,comment_username,commentid) {
    return `<div class="users_comments" id="users_comments" style="margin-top: 15px;">
                <div class="card" style="box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);">
                    <!-- date/username 영역 -->
                    <div class="metadata" style="margin-bottom: 10px;">
                        <div class="username" style="margin-right: 5px;">
                            ${comment_username}
                        </div>
                    </div>
                    <!-- contents 조회/수정 영역-->
                    <div class="contents">
                        <div id="${commentid}-CommentContents" class="text" style="display: inline-block; width: 500px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${comment_contents}
                        </div>
                        <div id="${commentid}-commentEditarea" class="edit">
                                <textarea id="${commentid}-CommentTextarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                        </div>
                    </div>
                    <!-- 버튼 영역-->
                    <div class="footer">
                            <img id="${commentid}-editComment" class="icon-start-edit" src="/images/edit.png" alt="" onclick="editComment('${commentid}')">
                            <img id="${commentid}-deleteComment" class="icon-delete" src="/images/delete.png" alt="" onclick="deleteComment('${commentid}')">
                            <img id="${commentid}-submitComment" class="icon-end-edit" src="/images/done.png" alt="" onclick="submitEditComment('${commentid}')">
                    </div>
                </div>
            </div>`;
}
function getCommentsUsername(id){
    $.ajax({
        type:"GET",
        url:`/api/comments/username/${id}`,
        async:false,
        success:function(response){
            static_comment_username=response;
        }
    })
}
function showCommentEdits(id) {
    $(`#${id}-commentEditarea`).show();
    $(`#${id}-submitComment`).show();
    $(`#${id}-deleteComment`).show();

    $(`#${id}-CommentContents`).hide();
    $(`#${id}-editComment`).hide();
}

function hideEdits(id) {
    $(`#${id}-commentEditarea`).hide();
    $(`#${id}-submitComment`).hide();
    $(`#${id}-deleteComment`).hide();

    $(`#${id}-CommentContents`).show();
    $(`#${id}-editComment`).show();
}
function editComment(id) {
    showCommentEdits(id);
    let contents = $(`#${id}-CommentContents`).text().trim();
    $(`#${id}-CommentTextarea`).val(contents);
}
function deleteComment(id){
    $.ajax({
        type: "DELETE",
        url: `/api/comments/${id}`,
        success: function (response) {
            alert('메시지 삭제에 성공하였습니다.');
            window.location.reload();
        }
    })
}
function submitEditComment(id){
    let comments = $(`#${id}-CommentTextarea`).val().trim();
    if(isValiableComments(comments)===false){
        return;
    }
    let data={"comments":comments};
    alert("comment : " + comments+ "commentid : "+id);
    $.ajax({
        type: "PUT",
        url: `/api/comments/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 변경에 성공하였습니다.');
            window.location.reload();
        }
    })
}

function isValiableComments(comments){
    if(comments==''){
        alert("댓글을 입력해주세요");
        return false;
    }
    if(comments.trim().length>50){
        alert("댓글은 50자 이하로 입력해주세요");
        return false;
    }
}