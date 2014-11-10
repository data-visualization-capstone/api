function init() {

    // Sample POST
    function sendMessage() {
        var outgoingMessage = $('#outgoingMessage').val();
        var name = $('#name').val();

        $.ajax({
            url: '/message',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                message: outgoingMessage,
                name: name
            })
        });
    }

    $('#send').on('click', sendMessage);
}

// Init doc.
$(document).on('ready', init);