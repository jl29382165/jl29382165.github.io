$(document).ready(function() {
    const $registerForm = $("#registerForm");
    const $tableBody = $("#userTable tbody");
    const $loadingBar = $("#loading-bar");
    const $progressBar = $("#progress-bar");
    let dataTable;

    // 初始化 DataTable
    dataTable = $('#userTable').DataTable({
        ajax: {
            url: "/api/users",
            dataSrc: '',
            error: function() {
                // 處理Ajax錯誤，避免顯示警告訊息
                $('#userTable').DataTable().clear().draw();
            }
        },
        columns: [
            { data: 'name', className: 'column-chinese-name' },
            { data: 'englishName' },
            { data: 'department' },
            { data: 'departmentEnglish' },
            { data: 'position' },
            { data: 'positionEnglish' },
            { data: 'imgPhoto' },
            { data: 'createdDate', render: formatDateTime },
            { data: 'lastModifiedDate', render: formatDateTime },
            {
                data: null,
                render: function(data, type, row) {
                    return `<button class="btn btn-danger btn-sm" onclick="deleteUser(${row.id})">刪除</button>`;
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    return `<button class="btn btn-success btn-sm" onclick="editUser(${row.id})">編輯</button>`;
                }
            }
        ],
        order: [[8, 'desc']], // 預設按最後修改時間排序
        paging: true,
        searching: true,
        language: {
            search: "關鍵字查詢:",
            paginate: {
                first: "首頁",
                last: "末頁",
                next: "下一頁",
                previous: "上一頁"
            },
            info: "顯示 _START_ 到 _END_ 筆資料，總共 _TOTAL_ 筆",
            infoEmpty: "沒有資料",
            zeroRecords: "找不到符合的資料",
            lengthMenu: "顯示 _MENU_ 筆資料",
            emptyTable: "表格中沒有資料"
        }
    });

    // 註冊表單提交事件
    $registerForm.on("submit", function(e) {
        e.preventDefault();

        // 顯示進度條
        $loadingBar.show();
        $progressBar.css('width', '0%');

        // 收集表單數據
        const formData = {
            name: $("#name").val(),
            englishName: $("#englishName").val(),
            department: $("#department").val(),
            departmentEnglish: $("#departmentEnglish").val(),
            position: $("#position").val(),
            positionEnglish: $("#positionEnglish").val(),
            imgPhoto: $("#imgPhoto").val()
        };

        // 發送請求到後端
        $.ajax({
            url: "/api/users/create",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData)
        })
        .done(function(data) {
            // 關閉Modal
            $('#exampleModal').modal('hide');

            // 清空表單
            $registerForm[0].reset();

            // 刷新 DataTable
            dataTable.ajax.reload();

            // 顯示成功消息
            alert("資料新增成功！");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Error:", errorThrown);
            alert("新增失敗：" + errorThrown);
        })
        .always(function() {
            // 隱藏進度條
            $loadingBar.hide();
        });
    });

    // 刪除用戶
    window.deleteUser = function(id) {
        // 先獲取要刪除的用戶資料
        $.ajax({
            url: `/api/users/${id}`,
            method: "GET"
        })
        .done(function(user) {
            // 顯示包含用戶姓名的確認對話框
            if (confirm(`確定要刪除此筆「${user.name}」的資料嗎？`)) {
                // 如果用戶確認，執行刪除操作
                $.ajax({
                    url: `/api/users/${id}`,
                    method: "DELETE"
                })
                .done(function(response) {
                    // 刷新 DataTable
                    dataTable.ajax.reload();
                })
                .fail(function(jqXHR, textStatus, error) {
                    alert("刪除失敗：" + error);
                });
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', errorThrown);
            alert('載入資料失敗');
        });
    };

    // 編輯用戶
    window.editUser = function(id) {
        // 先取得要編輯的使用者資料
        $.ajax({
            url: `/api/users/${id}`,
            method: "GET"
        })
        .done(function(user) {
            // 填充表單數據
            $('#editId').val(id);  // 隱藏的 ID 欄位
            $('#editName').val(user.name);
            $('#editEnglishName').val(user.englishName);
            $('#editDepartment').val(user.department);
            $('#editDepartmentEnglish').val(user.departmentEnglish);
            $('#editPosition').val(user.position);
            $('#editPositionEnglish').val(user.positionEnglish);
            $('#editImgPhoto').val(user.imgPhoto);

            // 顯示編輯 Modal
            $('#editModal').modal('show');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', errorThrown);
            alert('載入編輯資料失敗');
        });
    };

    // 編輯表單提交處理
    $('#editForm').on('submit', function(e) {
        e.preventDefault();

        const userId = $('#editId').val();
        const formData = {
            name: $('#editName').val(),
            englishName: $('#editEnglishName').val(),
            department: $('#editDepartment').val(),
            departmentEnglish: $('#editDepartmentEnglish').val(),
            position: $('#editPosition').val(),
            positionEnglish: $('#editPositionEnglish').val(),
            imgPhoto: $('#editImgPhoto').val()
        };

        $.ajax({
            url: `/api/users/${userId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData)
        })
        .done(function(data) {
            $('#editModal').modal('hide');
            // 刷新 DataTable
            dataTable.ajax.reload();
            alert("修改成功！");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Error:", errorThrown);
            alert("修改失敗：" + errorThrown);
        });
    });

    // 格式化日期時間
    function formatDateTime(dateTimeStr) {
        return dateTimeStr ? dateTimeStr.replace('T', ' ') : "";
    }
});
