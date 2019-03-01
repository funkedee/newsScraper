// when you click save article
$(document).on("click", ".saveArticle", function() {
    const article = {
        title: $(this).data("title"),
        link: $(this).data("link"),
        summary: $(this).data("summary")
    }
    $.post("/save-article", article, function(res) {
        console.log(res)
    });
});