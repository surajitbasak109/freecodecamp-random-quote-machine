$(document).ready(function () {
    // retrieving json file using jquery ajax method
    $.getJSON("https://raw.githubusercontent.com/surajitbasak109/all_in_one/master/quotes.json", function (json) {
        function get_html_quote(args) {
            var html = '<blockquote class="blockquote">';
            html += '<p id="current_quote">' + args.quote + '</p>';
            html += '<footer id="current_author" class="blockquote-footer">' + args.author + '</footer>';
            html += '<input type="hidden" id="mark" value="' + args.id + '">';
            html += '</blockquote>';
            return html;
        }
        var random_val = Math.floor(Math.random() * json.length);
        $('#quote_wrapper').html(get_html_quote(json[random_val]));
        $("#shuffle").on("click", function () {
            var random_val = Math.floor(Math.random() * json.length);
            $('#quote_wrapper').html(get_html_quote(json[random_val]));
        });
        $('#rewind').on('click', function () {
            var mark = parseInt($('#mark').val());
            if (mark == 1) {
                $('#rewind').attr('disabled', true);                
            }
            else {
                var inser_html = get_html_quote(json[mark - 2]);
                $('#quote_wrapper').html(inser_html);
            }
        });
        $('#forward').on('click', function () {
            var mark = parseInt($('#mark').val());
            if (mark == 50) {
                $('#forward').attr('disabled', true);                
            }
            else {
                var insert_html = get_html_quote(json[mark + 1]);
                $('#quote_wrapper').html(insert_html);
            }
        });
    });
    $('#twitBtn').on('click', function () {
        var currentQuote = $('#current_quote').html();
        var currentAuthor = $('#current_author').html();
        encodedComponent = encodeURIComponent('"' + currentQuote + '" ' + currentAuthor);
        window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodedComponent);
    });
});