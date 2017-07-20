var ShareContactByEmail = {
    goBack: function(vnode) {
        history.back();
    },
    sendEmail: function(vnode) {
        var data = localStorage.getItem("contact_info")

        if (data) {
            data = JSON.parse(data);
            console.log("loading from storage", data);

            var email = `${config.emailIntro}\n\n${data.name}\n${data.phone}\n${data.email};`;
            
            if (data.site) {
               email += `\n${data.site};`
            } 

            if (data.twitter) {
                email += `\n${data.twitter};`
            }
            
            if (data.github) {
                email += `\n${data.github};`
            } 

            if (data.mastodon) {
                email += `\n${data.mastodon};`
            } 

            if (data.mozillians) {
                email += `\n${data.mozillians};\n\n`
            } 

            email += config.emailEnding;

            var to = document.querySelector("input[name=email]").value || ""
        
            window.location.href = `mailto:${to}?body=` + encodeURI(email);

            analytics.recordAction("share-contact-by-email", {to: to})

        } else {
            m.route.set("/info");
        }
    },
    view: function(vnode) {
        return [
            m(Sidebar),
            m("section#drawer[role=region]", {class: state.drawerOpen ? "drawer-open" : "" }, [
                m(Header),
                m("article.content.scrollable.header", [
                    m("p", "Send contact information by email"),
                    m("form", [
                        m("p", [
                            m(`input[id='email'][name='email'][placeholder='${config.emailLabel} '][type='email']`)
                        ]),
                    ]),
                    m("br"),
                    m("button.recommend.go-subscribe-action", {onclick: this.sendEmail},`${config.actionButtonLabel}`)
                ])
            ])
        ]} 
};
