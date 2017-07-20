var SuccessView = {
    goBack: function(vnode) {
        history.back();
    },
    view: function(vnode) {
        return [
            m("section[role=region]", [
                 m("header", [
                    m("h1", config.appTitle)
                ]),
                m("article.content.scrollable.header", [
                    m(".center", [
                        m("img[src=images/smiley.svg]")
                    ]),
                    m("p", config.successMsg),
                    m("button.recommend.go-sign-up", {onclick: this.goBack}, config.goBackButtonLabel)
                ])
            ])
        ]
    }
}
