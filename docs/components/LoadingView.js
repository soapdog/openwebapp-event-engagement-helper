var LoadingView = {
    oninit: function(vnode) {
        console.log("loading data...");
        state.loadAllKPIs();
    },
    onupdate: function(vnode) {
        console.log("doneeeee!");
        if (state.status == "loaded") {
            m.route.set("/list");
        }
    },
    view: function(vnode) {
        return [
            m("header.fixed", [
                m("h1", config.appTitle)
            ]),
            m("article.content.scrollable.header", [
                m(".center", [
                    m("i.fa.fa-hourglass-half.fa-5x.fa-spin"),
                    m("p", config.progressLabel)
                ]),
            ])
        ]
    }
}
