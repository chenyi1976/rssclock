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
        // $("#deal_content").html('');
        $("#carousel-inner").html('');
        $("#carousel-indicators").html('');

        var items = $($.parseXML(data.contents)).find('item')

        $.each(items, function (i, field) {
            // $("#deal_content").append('<li>' + field.children[0].textContent + '</li>');
            if (i == 0) {
                $("#carousel-inner").append('<div class="item active"><div class="item_title">'
                    + field.children[0].textContent + '</div><div class="item_link">'
                    + '<a href="' + field.children[1].textContent + '"> ' + field.children[1].textContent + '</a></div><div class="item_description">'
                    + field.children[2].textContent + '</div></div>');
                $("#carousel-indicators").append('<li data-target="#myCarousel" data-slide-to="0" class="active"></li>');

            } else {
                $("#carousel-inner").append('<div class="item"><div class="item_title">'
                    + field.children[0].textContent + '</div><div class="item_link">'
                    + '<a href="' + field.children[1].textContent + '"> ' + field.children[1].textContent + '</a></div><div class="item_description">'
                    + field.children[2].textContent + '</div></div>');
                $("#carousel-indicators").append('<li data-target="#myCarousel" data-slide-to="' + i + '"></li>');
            }
        });

        $("#myCarousel").carousel();
        $(".item").click(function(){
            $("#myCarousel").carousel(1);
        });
        $("#progress-bar").text("Refreshed at " + moment().format("h:mm:ss"));
    });
}