function changeValue(elm, v) {
    let $input = elm.parent().find('input')
    let count = parseInt($input.val()) + v
    count = Math.min(Math.max(0, count), 50)
    $input.val(count)
    $input.change()
    return false
}

function parseData(data) {
    let stt = data['status']
    let price = data['totalPrice']
    let items = data['items']
    let msg = data['message']

    $("#total-price").html(price)
    $("#notif").append(`<div class="alert alert-${stt}" role="alert">${msg}</div>`)
    for (item of items) {
        $("#item-panel").append(`<div class="item-list py-3 mb-0 small lh-sm border-bottom w-100 d-flex justify-content-auto">
        <h6 class="ms-0 me-auto" style="font-weight: normal !important;">${item.name}</h6>
        <h6 class="ms-auto me-0" style="font-weight: normal !important;">x ${item.quantity}</h6>
      </div>`)
    }
}
$(document).ready(function () {
    $('.minus').click(function () {
        changeValue($(this), -1)
    })
    $('.plus').click(function () {
        changeValue($(this), +1)
    })
    $('#btn-receipt').click(function () {
        $("#receipt").hide()
        $("#form-donation").fadeIn(500)
        $(".alert").remove()
        $(".item-list").remove()
    })
    $('#btn-donation').click(function () {
        let items = []
        for (let i = 0; i < 6; i++) {
            let q = parseInt($(`#donasi-${i}`).val())
            if (q <= 0 || q > 50) continue
            items.push({
                'id': i,
                'quantity': q
            })
        }
        $.ajax({
            type: "POST",
            url: "/donate",
            data: JSON.stringify({
                "items": items
            }),
            contentType: "application/json",
            success: (data) => {
                $("#form-donation").hide()
                $("#receipt").fadeIn(500)
                $("input").val(0)

                parseData(data)
            },
            dataType: "json"
        });
    })
})