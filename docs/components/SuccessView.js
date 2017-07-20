var SuccessView = {
    goBack: function(vnode) {
        m.route.set("/list");
    },
    view: function(vnode) {
        return [
            m("header.fixed", [
                m("h1", config.appTitle)
            ]),
            m("article.content.scrollable.header", [
                m(".center", [
                    m("img[src=images/smiley.svg]")
                ]),
                m("p", config.successMsg),
                m("button.recommend.go-sign-up", {onclick: this.goBack}, config.goBackButtonLabel)
            ])
        ]
    }
}
