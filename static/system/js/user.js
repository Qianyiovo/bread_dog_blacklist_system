// router
$(window).on("load", function () {
    let content = $("#content")
    let path = window.location.pathname;
    $("#footer").load("/copyright/");
    if (path == "/user/panel/") {
        // user
        content.load("/user/panel/content/")
    } else if (path == "/user/all-bans/") {
        content.load("/user/all-bans/content/")
    } else if (path == "/user/my-bans/") {
        content.load("/user/my-bans/content/")
    } else if (path == "/user/add-ban/") {
        content.load("/user/add-ban/content/")
    }
})
let nav = new mdui.Drawer("#drawer");
$("#menu").on("click", function () {
    nav.toggle();
})

let account_menu = new mdui.Menu("#account-btn", "#account-menu")
$("#account-btn").on("click", function () {
    account_menu.open()
})
$("#logout-btn").on("click", function () {
    $.ajax("/logout/", {
        type: "POST",
        success: function () {
            location.assign("/login/")
        }
    })
})
$("#copy-token").on("click", function () {
    $.ajax("/user/info/", {
        type: "GET",
        success: function (data) {
            let result = JSON.parse(data)
            if (result["status"] === 200) {
                navigator.clipboard.writeText(result["data"]["key"]).then(
                    function () {
                        mdui.snackbar({
                            message: "ε€εΆζε"
                        })
                    },
                    function (err) {
                        mdui.snackbar({
                            message: err
                        })
                    }
                )
            }
        }
    })
})
$("#change-password").on("click", function () {
    let dialog = new mdui.Dialog("#change-password-dialog")
    dialog.open()

    $("#change-password-dialog-cancel").on("click", function () {
        $("#old-password").val("")
        $("#new-password").val("")
        $("#confirm-password").val("")
        dialog.close()
    })
    $("#change-password-dialog-confirm").on("click", function () {
        let old_password = $("#old-password").val()
        let new_password = $("#new-password").val()
        let confirm_password = $("#confirm-password").val()
        if (old_password === "" || new_password === "" || confirm_password === "") {
            mdui.snackbar({
                message: "θ―·ε‘«εε?ζ΄"
            })
        } else {
            if (new_password !== confirm_password) {
                mdui.snackbar({
                    message: "δΈ€ζ¬‘ε―η δΈδΈθ΄"
                })
            }
            else {
                $.ajax("/user/change-password/", {
                    type: "POST",
                    data: {
                        old_password: old_password,
                        new_password: new_password
                    },
                    success: function (data) {
                        let result = JSON.parse(data);
                        if (result["status"] === 200) {
                            mdui.snackbar({
                                message: "δΏ?ζΉζεοΌε³ε°θ·³θ½¬θ³η»ε₯ι‘΅ι’οΌθ―·ιζ°η»ε₯"
                            })
                            dialog.close()
                            setTimeout(function () {
                                location.assign("/login/")
                            }, 2000)
                        }
                        else {
                            mdui.snackbar({
                                message: result["msg"]
                            })
                        }
                    }
                })
            }
        }
    })
})