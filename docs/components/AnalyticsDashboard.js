var AnalyticsDashboard = {
    downloadJournal: function(vnode) {
        analytics.downloadJournal();
    },
    eraseJournal: function() {
        console.log("dangegour operation...");
        var p = confirm("Are you sure you want to erase the journal data?");

        if (p) {
            analytics.eraseJournal();
        }
    },
    summary: function() {
        var journal = analytics.getEntries();
        return m(".center", [
            m("h2", "Total interactions"),
            m("p.analytics-large", journal.length),
            m("h2", "Emails sent"),
            m("p.analytics-large", analytics.countEmails()),
            m("h2", "Contact Sent"),
            m("p.analytics-large", (analytics.countAction("share-contact-by-email") + analytics.countAction("share-contact-by-qr-code"))),
        ]);
    },
    topicsBreakout: function() {
        var journal = analytics.getEntries();
        var totals = {};
        var entries = analytics.filterByAction("share-topics-by-email");
        var entry = {};
        var kpis = [];
        var retVal = [
            m("h2.separator", "Topics breakout")
        ];

        // Computing totals for each KPI
        for (var i = 0; i < entries.length; i++) {
            entry = entries[i];
            entry.data.kpis.map(function(kpi) {
                if (typeof totals[kpi] == "undefined") {
                    totals[kpi] = 1;
                } else {
                    totals[kpi]++;
                }
            })
        }

        // Display totals
        for (var kpi in totals) {
            if( totals.hasOwnProperty(kpi) ) {
                retVal.push(m("h2", kpi));
                retVal.push(m("p.analytics-large", totals[kpi]));
            } 
        }    

        return m(".center", retVal);
    },
    view: function(vnode) {
        return [
            m(Sidebar),
            m("section#drawer[role=region]", {class: state.drawerOpen ? "drawer-open" : "" }, [
                m(Header),
                m("article.content.scrollable.header", [
                    m("h2.separator", "Analytics Dashboard"),
                    this.summary(),
                    this.topicsBreakout(),
                    m("br"),
                    m("button.recommend.go-subscribe-action", {onclick: this.downloadJournal},"Download Journal JSON"),
                    m("button.danger.go-subscribe-action", {onclick: this.eraseJournal},"Erase Analytics Data")
                ])
            ])
        ]} 
};
