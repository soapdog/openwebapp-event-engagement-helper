var AnalyticsDashboard = {
    downloadJournal: function(vnode) {
        analytics.downloadJournal();
    },
    summary: function() {
        var journal = analytics.getEntries();
        return [
            m("h2", "Total interactions"),
            m("p.analytics-large", journal.length),
            m("h2", "Emails sent"),
            m("p.analytics-large", analytics.countEmails()),
            m("h2", "Contact Sent"),
            m("p.analytics-large", (analytics.countAction("share-contact-by-email") + analytics.countAction("share-contact-by-qr-code"))),
        ]
    },
    view: function(vnode) {
        return [
            m(Sidebar),
            m("section#drawer[role=region]", {class: state.drawerOpen ? "drawer-open" : "" }, [
                m(Header),
                m("article.content.scrollable.header", [
                    m("h2.separator", "Analytics Dashboard"),
                    m(".center", [
                        this.summary()
                    ]),
                    m("br"),
                    m("button.recommend.go-subscribe-action", {onclick: this.downloadJournal},"Download Journal JSON")
                ])
            ])
        ]} 
};
