var Sidebar = {
    menuAction: function(ev) {
        var route = ev.target.getAttribute("data-route");
        console.log("menu action", route);
        state.drawerOpen = false;
        setTimeout(function() {
            m.route.set(route);
        }, 300);
        
    },
    view: function(vnode) {
        return m("section[data-type=sidebar]", [
            m("header", [
                m("h1", "Menu")
            ]),
            m("nav", [
                m("h2", "Email actions"),
                m("ul", {onclick: this.menuAction}, [
                    m("li", [
                        m("a[data-route=/share-topics-by-email]", "Send topics by email")
                    ]),
                    m("li", [
                        m("a[data-route=/share-contact-by-email]", "Share contact by email")
                    ])
                ]),
                m("h2", "QR Code actions"),
                m("ul", {onclick: this.menuAction}, [
                    m("li", [
                        m("a[data-route=/share-contact-by-qr-code]", "Share contact by QR Code")
                    ])
                ]),
                m("h2", "Management"),
                m("ul", {onclick: this.menuAction}, [
                    m("li", [
                        m("a[data-route=/info]", "Personal contact information")
                    ]),
                     m("li", [
                        m("a[data-route=/analytics]", "Analytics dashboard")
                    ]),
                     m("li", [
                        m("a[data-route=/export]", "Export interactions data")
                    ]),
                    m("li", [
                        m("a[data-route=/about]", "About this app")
                    ])
                ])
            ])

        ])
    }
}
