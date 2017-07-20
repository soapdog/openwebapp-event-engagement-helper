var analytics = {
    journal: [],
    loadJournal: function() {
        var j = localStorage.getItem("journal");

        if (j) {
            this.journal = JSON.parse(j);
        }

        if (!j) {
            this.journal = [];
        }
    },
    saveJournal: function() {
        localStorage.setItem("journal", JSON.stringify(this.journal));
    },
    eraseJournal: function() {
        this.journal = [];
        this.saveJournal();
    },
    recordAction: function(action, data) {
        if (typeof data == "undefined") {
            data = {};
        }

        var entry = {
            action: action,
            data: data,
            date: new Date()
        }

        this.loadJournal();
        this.journal.push(entry);
        this.saveJournal();
    },
    getEntries: function() {
        this.loadJournal();
        return analytics.journal;
    },
    countEmails: function() {
        this.loadJournal();
        var entry = {};
        var total = 0;
        for (var i = 0; i < this.journal.length; i++) {
            entry = this.journal[i];

            if (entry.action.indexOf("email") !== -1) {
                total++;
            }
        }

        return total;
    },
    countAction: function(action) {
        this.loadJournal();
        var entry = {};
        var total = 0;
        for (var i = 0; i < this.journal.length; i++) {
            entry = this.journal[i];

            if (entry.action == action) {
                total++;
            }
        }

        return total;
    },
    filterByAction: function(action) {
        this.loadJournal();
        var entry = {};
        var selected = [];
        for (var i = 0; i < this.journal.length; i++) {
            entry = this.journal[i];

            if (entry.action == action) {
                selected.push(entry);
            }
        }

        return selected;
    },
    downloadJournal: function() {
        this.loadJournal();
        var json = JSON.stringify(this.journal);
        var dataUri = 'data:text;charset=utf-8,' + json;
        window.location = dataUri;
    }
}
