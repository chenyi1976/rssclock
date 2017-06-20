var current_count = 900;
var max_count = 900;

function updateTime() {
    var now = moment().format("h:mm:ss");
    $('#clock').text(now);
    current_count = current_count - 1;
    if (current_count < 0)
        current_count = max_count;
    $('#progress-bar').css("width", Math.round(current_count * 1000 / max_count) / 10 + "%");
}

function generateCarousel() {
    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://www.ozbargain.com.au/deals/feed') + '&callback=?', function (data) {
        $("#deal_content").html('');

        var items = $($.parseXML( data.contents )).find('item')

        $.each(items, function (i, field) {
            $("#deal_content").append('<li>' + field.children[0].textContent + '</li>');
        });
        $("#progress-bar").text("Refreshed at " + moment().format("h:mm:ss"));
    });
}