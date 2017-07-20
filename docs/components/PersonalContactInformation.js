var PersonalContactInformation = {
    saveContactData: function(vnode) {
        var fields = ["name", "email", "site", "phone", "twitter", "github", "mastodon", "mozillians"];
        var data = {};
        var field = "";
        for (var i = 0; i < fields.length; i++) {
            field = fields[i];
            data[field] = document.querySelector(`input[name=${field}]`).value;
        }
        console.log("Saving contact info", data);
        localStorage.setItem("contact_info", JSON.stringify(data));
    },
    oncreate: function(vnode) {
        var data = localStorage.getItem("contact_info")

        if (data) {
            data = JSON.parse(data);
            console.log("loading from storage", data);

            var fields = ["name", "email", "site", "phone", "twitter", "github", "mastodon", "mozillians"];
            var field = "";
            for (var i = 0; i < fields.length; i++) {
                field = fields[i];
                document.querySelector(`input[name=${field}]`).value = data[field];
            }
        }
    },
    makeInput: function(name, label, type) {
        if (typeof type == "undefined") {
            type = "text";
        }
        return m("p", [
            m(`input[type=${type}]`, {name: name, placeholder: label}),
            m("button[type=reset]", "Clear")
        ]);
    },
    view: function(vnode)  {
        return [
            m(Sidebar),
            m("section#drawer[role=region]", {class: state.drawerOpen ? "drawer-open" : "" }, [
                m(Header),
                m("article.content.scrollable.header", [
                    m("h2.separator", "Personal Contact Information"),
                    m("form", [
                        this.makeInput("name", "Your Name"),
                        this.makeInput("email", "Email", "email"),
                        this.makeInput("site", "Website"),
                        this.makeInput("phone", "Phone number", "tel"),
                    ]),
                    m("h2.separator", "Social Networks"),
                    m("form", [
                        this.makeInput("twitter", "Twitter"),
                        this.makeInput("github", "Github"),
                        this.makeInput("mastodon", "Mastodon"),
                        this.makeInput("mozillians", "Mozillians profile"),
                    ]),
                    m("br"),
                    m("button.recommend.go-sign-up", {onclick: this.saveContactData}, config.saveButtonLabel)
                ])
            ])
        ]} 
};
