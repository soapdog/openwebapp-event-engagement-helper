var state = {
    status: "loading",
    issues: [],
    refresh: function() {
        state.status = "loading";
         return m.request({
            method: "GET",
            url: "https://api.github.com/repos/mozilla/reps/issues?labels=Council Feedback Needed"
        })
        .then(function(result) {
            console.log("request", result);
            state.issues = result;
            state.status = "loaded";
        });
    }
}

var Header = {
    view: function(vnode) {
        function refreshIssuesList() {
            state.refresh();
        }
        return m("nav.navbar.reps-header", [
            m(".navbar-brand", [
                m("a.navbar-item", {href: "https://reps.mozilla.org"}, [
                    m("img", {src: "http://reps.mozilla.org/static/base/img/remo/remo_logo_medium.47fcd5d1baf0.png"}),
                    m("h1", "Mozilla Reps")
                ]),
                m("a.navbar-item", {href: "https://github.com/soapdog/webextension-reps-feedback-needed"}, [
                    m("i.fa.fa-github")
                ]),
                m("a.navbar-item", {onclick: refreshIssuesList}, [
                    m("i.fa.fa-refresh", {class: state.status == "loading" ? "fa-spin" : ""})
                ])
            ])
        ])
    }
}

var IssuesList = {
    oninit: function(vnode) {
       state.refresh();
    },
    onupdate: function() {
        console.log("update");
    },
    view: function(vnode) {
        return m(".container", [
            m(Header),
            m(".section", [
                state.issues.map(function(issue) {
                    return m(".container", [
                        m(".card", [
                            m("header.card-header", [
                                m("p.card-header-title", issue.number),
                                m("a.card-header-icon", [
                                    m("span.icon", [
                                        m("img", {src: issue.user.avatar_url})
                                    ])
                                ])
                            ]),
                            m(".card-content", [
                                m(".content", issue.title)
                            ]),
                            m("footer.card-footer", [
                                m("a.card-footer-item", {href: issue.html_url, target: "_blank"}, "Open"),
                                m("a.card-footer-item", {
                                    href: "/list/" + issue.number, 
                                    oncreate: m.route.link, 
                                    onupdate: m.route.link
                                }, "More Info"),
                            ])
                        ]),
                        m("br")
                    ])
                })
            ])
        ])
    }
};

var IssueDetail = {
    view: function(vnode) {
        var num = vnode.attrs.id;
        var issue = state.issues.find(function(el) {
            console.log(el.number);
            return el.number == num;
        });
        console.log("num", num);
        console.log("issue", issue);
        return m(".container", [
            m(Header),
            m(".detail-control", [
                m("a.button[href=/]", {oncreate: m.route.link}, "Go Back"),
                m("a.button", {href: issue.html_url, target: "_blank"}, "Open")
            ]),
            m("section.hero", [
                m(".hero-body", [
                    m(".container", [
                        m("h1.title", "#" + issue.number),
                        m("h2.subtitle", issue.title)
                    ])
                ])
            ]),
            m(".content", [
                m.trust(marked(issue.body))
            ])
        ])
    }
};


m.route(document.body, "/list", {
    "/list": IssuesList,
    "/list/:id": IssueDetail,
});