/**
 * STATE MANAGEMENT
 * 
 * This is a crude hack. If I was rebuilding this, I would have not built it this way but this app evolved from
 * a very simple PoC and I don't want to refactor at the moment.
 * 
 * This file deals with state management in the app. It is a silly global object that handles all the app state. 
 * The main difference between it and the config object is that except for the KPI data, the config object is not
 * supposed to change while the app is running, on the other hand the state object changes a lot.
 * 
 * The key state items managed:
 * - The drawer menu state (open or closed)
 * - The KPI (aka topics) loading
 * - The email sending
 * 
 * If a refactor ever happens, parts of this state management would go to their respective components. When this app 
 * started, it was a single component and a single state object, in hindsight that was not smart (but it was fast).
 * 
 * Still even with the blasfemous existence of this global object, the app still easy to manage...
 */

var state = {
    status: "loading",
    downloadQueue: [],
    selectedKPIs: [],
    drawerOpen: false,
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
        m.route.set("/success");

    }
}
