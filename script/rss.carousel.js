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
    $.ajax({
        url: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.ozbargain.com.au%2Ffeed',
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            $("#deal_content").html('');
            $.each(data.items, function (i, field) {
                $("#deal_content").append('<div>', field.title, '</div>');
            });
            $("#progress-bar").text("Refreshed at " + moment().format("h:mm:ss"));
        },
        error: function () {
            $("#progress-bar").text("Failed at " + moment().format("h:mm:ss"));
        }
    });
    // , function (data) {
    //     $(data).find("item").each(function () { // or "item" or whatever suits your feed
    //         var el = $(this);
    //
    //         console.log("------------------------");
    //         console.log("title      : " + el.find("title").text());
    //         console.log("link     : " + el.find("link").text());
    //         console.log("media:thumbnail: " + el.find("media:thumbnail").text());
    //     });
    // });
    // myCarouselHtml += '<button>hhihihi</button>';
    // myCarouselHtml += 'hhihihi';
    // $('#testCarousel').html(myCarouselHtml);

}