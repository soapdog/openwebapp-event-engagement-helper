var About = {
    goBack: function(vnode) {
        history.back();
    },
    oninit: function(vnode) {
        this.aboutText = marked(this.aboutText)
    }, 
    aboutText: `
# About this app
This app was created by [Andre Alves Garzia](http://andregarzia.com) to help [Mozillians](http://mozillians.org) 
around the world.

# Tech stack used
It was built with:

* [Mithril](http://mithril.js.org) as the main driver framework.
* [Gaia Building Blocks](https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/Firefox_OS_apps/Building_blocks/1.x) for the pretty UI.
* [Marked](https://github.com/chjj/marked) to process [markdown](http://markdown.org) files.
* [QRious](https://neocotic.com/qrious/) to generate QR codes.

# Source code
The source code for it is available at [this github repository](https://github.com/soapdog/openwebapp-event-engagement-helper) and the license is 
MPL-2.0.
`,
    view: function(vnode) {
        return [
            m("section[role=region]", [
                m("header", [
                    m("h1", config.appTitle)
                ]),
                m("article.content.scrollable.header", [
                    m(".center", [
                        m("img[src=images/smiley.svg]", {style: "width: 60%"})
                    ]),
                    m.trust(this.aboutText),
                    m("button.recommend.go-sign-up", {onclick: this.goBack}, config.goBackButtonLabel)
                ])
            ])
        ]
    }
}
