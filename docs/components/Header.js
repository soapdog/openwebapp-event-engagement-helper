var Header = {
    toggleDrawer: function(vnode) {
        state.drawerOpen = !state.drawerOpen;
        console.log("drawer", state.drawerOpen);
    },
    view: function(vnode) {
        return  m("header", [
                    m("button",{ onclick: this.toggleDrawer }, [
                        m("a[href=#drawer", [
                            m("span.icon.icon-menu", "menu")
                        ])
                    ]),
                    m("h1", config.appTitle)
                ])
    }
}
