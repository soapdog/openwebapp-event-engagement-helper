var ShareTopicsByEmail = {
    sendKPIEmails: function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        console.log("email", state.email);
        console.log("selected", state.selectedKPIs);
        if (state.selectedKPIs.length > 0) {
            state.sendKPIEmail();
        }
    },
    toggleKPI: function(kpi) {
        console.log(kpi);
    },
    oninit: function(vnode) {
        if (typeof config.kpis[0].data == "undefined") {
            // KPI data not loaded, move to loading state...
            m.route.set("/loading");
        }
    },
    view: function(vnode)  {
        return [
            m(Sidebar),
            m("section#drawer[role=region]", {class: state.drawerOpen ? "drawer-open" : "" }, [
                m(Header),
                m("article.content.scrollable.header", [
                    m("p", config.description),
                    m("form", [
                        m("p", [
                            m(`input[id='email'][name='email'][placeholder='${config.emailLabel} '][type='email']`, {oninput: m.withAttr("value", state.updateEmail)})
                        ]),
                        m("section[data-type='list']", [
                            m("ul[data-type='edit']", [
                                config.kpis.map(function(kpi) {
                                    return m("li", [
                                        m("label.pack-checkbox", [
                                            m(`input.kpi-list[name='${kpi.id}-kpi'][type='checkbox'][value='${kpi.id}']`, {
                                                onclick: function(kpi) {
                                                    kpi.target.checked ? state.addToQueue(kpi.target.value) : state.removeFromQueue(kpi.target.value)
                                                }
                                            }),
                                            m("span")
                                        ]),
                                        m("a[href='#']", [
                                            m("p", `${kpi.name}`)
                                        ])
                                    ])
                                })
                        ])
                    ]),
                    m("br"),
                    m("button.recommend.go-subscribe-action", {onclick: this.sendKPIEmails},`${config.actionButtonLabel}`)
                ])
            ])
        ]) 
    ]}
};
