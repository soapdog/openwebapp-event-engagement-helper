m.route(document.getElementById("app"), "/loading", {
    "/loading": LoadingView,
    "/list": ListView,
    "/success": SuccessView
});
