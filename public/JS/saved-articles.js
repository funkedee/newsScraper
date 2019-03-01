// When you click add note
$(document).on("click", ".add-note", function(event) {
    event.preventDefault();

    // save note
    const note = $(".new-note").val().trim();

    // post request for note
    $.post("/add-note/" + $(this).data("id"), {note:note}, function(req, res) {
        location.reload();
    })
});

// when you click on delete note
$(document).on("click", ".delete-note", function(event) {
    event.preventDefault();
    console.log("hey")

    const url = "/delete-note/" + $(this).data("id") + "/" + $(this).prev().text();
    console.log(url);
    
    // ajax call to delete note
    $.post(url, function(req, res) {
        location.reload();
    })
});