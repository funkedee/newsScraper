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

    const url = "/delete-note/" + $(this).data("id") + "/" + $(this).prev().text();
    
    // ajax call to delete note
    $.post(url, function(req, res) {
        location.reload();
    });
});

// when you click on delete article
$(document).on("click", ".deleteArticle", function(event) {
    event.preventDefault();

    // ajax call to delete article
    $.post("delete-article/" + $(this).data("id"), function(req, res) {
        console.log("hey")
        location.reload();
    });
});