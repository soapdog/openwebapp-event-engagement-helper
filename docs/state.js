var state = {
    status: "loading",
    downloadQueue: [],
    selectedKPIs: [],
    addToQueue: function(kpi) {
        this.selectedKPIs.push(kpi);
    },
    removeFromQueue: function(kpi) {
        var i = this.selectedKPIs.indexOf(kpi);
        this.selectedKPIs.splice(i, 1);
    },
    updateEmail: function(email) {
        state.email = email;
    },
    setKPIData: function(kpi, data) {
        for(var i=0; i < config.kpis.length; i++) {
            if (config.kpis[i].id == kpi) {
                config.kpis[i].data = data;
            }
        }
    },
    loadAllKPIs: function() {
        state.status = "loading";
        state.downloadQueue = config.kpis.map(function(el) {return el.id});
        return state.loadKPI();
    },
    loadKPI: function() {
        var kpi = this.downloadQueue.pop();
        var url = `kpis/${kpi}.md`;
        console.log(`loading ${url}`);
        return m.request({
            method: "GET",
            url: url,
            deserialize: function(value) {return value} // we're not loading JSON
        }).then(function(result) {
            console.log("url", url);
            state.setKPIData(kpi, result);
            if (state.downloadQueue.length > 0) {
                return state.loadKPI();
            } else {
                console.log("All KPI loaded...");
                state.status = "loaded"
                return true;
            }
        }).catch(function(error) {
            console.log("error", error);
            if (state.downloadQueue.length > 0) {
                return state.loadKPI();
            } else {
                state.status = "loaded"
                console.log("All KPI loaded with errors...");
                return true;
            }
        })
    },
    sendKPIEmail: function() {
        var email = state.email;
        var subject = config.emailSubject;
        var KPIContent = state.selectedKPIs.reduce(function(acc, value) {
            var i = config.kpis.findIndex(function(el) {
                return el.id == value;
            });

            if (i > -1) {
                acc += config.kpis[i].data + `\n`;
            }

            return acc;

        }, "")
        console.log(config.kpis);
        var body = encodeURI(`${config.emailIntro}\n\n${KPIContent}\n\n${config.emailEnding}`);
        var url = `mailto:${email}?subject=${subject}&body=${body}`;
        window.location.href = url;
    }
}
