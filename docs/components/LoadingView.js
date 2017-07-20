var LoadingView = {
    oninit: function(vnode) {
        console.log("loading data...");
        state.loadAllKPIs();
    },
    onupdate: function(vnode) {
        console.log("doneeeee!");
        if (state.status == "loaded") {
            m.route.set("/share-topics-by-email");
        }
    },
    view: function(vnode) {
        return [
            m("section[role=region]", [
                m("header", [
                    m("h1", config.appTitle)
                ]),
                m("article.content.scrollable.header", [
                    m(".center", [
                        m("i.fa.fa-hourglass-half.fa-5x.fa-spin"),
                        m("p", config.progressLabel)
                    ]),
                ])
            ])
        ]
    }
}
