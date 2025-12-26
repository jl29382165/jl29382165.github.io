$(document).ready(function() {
    // 初始加載補發名單
    loadCardReprintList();

    // 處理登入表單提交
    $('#loginForm').submit(function(e) {
        e.preventDefault();

        var username = $('#username').val();

        $.ajax({
            url: '/login',
            method: 'POST',
            data: { username: username },
            success: function(response) {
                if (response.success) {
                    $('#errorMessage').text('');
                    var user = response.user;
                    $('#dataRow').show();
                    $('#dataBody').html(`
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.englishName}</td>
                            <td>${user.department}</td>
                            <td>${user.departmentEnglish}</td>
                            <td>${user.position}</td>
                            <td>${user.positionEnglish}</td>
                            <td><button class="btn btn-primary" onclick="applyForReissue({
                                username: '${user.username}',
                                name: '${user.name}',
                                englishName: '${user.englishName}',
                                department: '${user.department}',
                                departmentEnglish: '${user.departmentEnglish}',
                                position: '${user.position}',
                                positionEnglish: '${user.positionEnglish}'
                            })">申請補發</button></td>
                        </tr>
                    `);
                } else {
                    $('#errorMessage').text('錯誤訊息：帳號錯誤或不存在');
                }
                $('#username').val(''); // 清空帳號輸入欄位
            },
            error: function() {
                $('#errorMessage').text('錯誤訊息：伺服器錯誤');
            }
        }); 
    });
});

// 申請補發資料
function applyForReissue(user) {
    $.ajax({
        url: '/applyForReissue',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function(response) {
            if (response.success) {
                alert('申請補發成功');
                loadCardReprintList();
                $('#username').val('');  // 清空輸入帳號的地方
                $('#dataRow').hide(); // 隱藏查詢結果
                
            } else {
                alert('申請補發失敗');
            }
        },
        error: function() {
            alert('申請失敗，伺服器錯誤');
        }
    });
}

// 取消補發資料
function cancelReissue(username) {
    $.ajax({
        url: '/cancelReissue/' + username,
        method: 'DELETE',
        success: function(response) {
            if (response.success) {
                alert('取消補發成功');
                loadCardReprintList();
            } else {
                alert('取消補發失敗');
            }
        },
        error: function() {
            alert('取消失敗，伺服器錯誤');
        }
    });
}

// 載入補發名單
function loadCardReprintList() {
    $.ajax({
        url: '/cards',
        method: 'GET',
        success: function(response) {
            var cardBody = $('#cardBody');
            cardBody.empty();
            response.forEach(function(card) {
                cardBody.append(`
                    <tr>
                        <td>${card.name}</td>
                        <td>${card.englishName}</td>
                        <td>${card.department}</td>
                        <td>${card.departmentEnglish}</td>
                        <td>${card.position}</td>
                        <td>${card.positionEnglish}</td>
                        <td><button class="btn btn-danger btn-sm" onclick="cancelReissue('${card.username}')">取消</button></td>
                    </tr>
                `);
            });
        }
    });
}

// excel下載cards表格
function downloadExcel() {
    window.location.href = '/downloadExcel';
}




