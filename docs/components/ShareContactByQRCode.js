var ShareContactByQRCode = {
    oncreate: function(vnode) {
        var data = localStorage.getItem("contact_info")

        if (data) {
            data = JSON.parse(data);
            console.log("loading from storage", data);

            var mecard = `MECARD:N:${data.name};TEL:${data.phone};EMAIL:${data.email};`;
            
            if (data.twitter) {
                mecard += `URL:${data.twitter};`
            }
            
            if (data.github) {
                mecard += `URL:${data.github};`
            } 

            if (data.mastodon) {
                mecard += `URL:${data.mastodon};`
            } 

            if (data.mozillians) {
                mecard += `URL:${data.mozillians};`
            } 

            if (data.site) {
                mecard += `URL:${data.site};`
            } 

            const qr = new QRious({
                element: document.getElementById('qrcode'),
                value: mecard,
                backgroundAlpha: 0.8,
                foreground: 'black',
                foregroundAlpha: 0.8,
                level: 'H',
                padding: 25,
                size: 300,
            });
        }
    },
    view: function(vnode)  {
        return [
            m(Sidebar),
            m("section#drawer[role=region]", {class: state.drawerOpen ? "drawer-open" : "" }, [
                m(Header),
                m("[role=main]", [
                    m("article.content.scrollable.header", [
                        m("h2.separator", "Personal Contact Information"),
                        m(".center", [
                            m("canvas#qrcode")
                        ]),
                        m("br"),
                    ])
                ])
            ])
        ]} 
};
