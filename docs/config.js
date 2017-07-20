var config = {
	appTitle: "Engagement Helper",
	description: "Some handy links related to the conference topics.",
	emailLabel: "e-mail",
    progressLabel: "Loading Data...",
	actionButtonLabel: "Send information",
	goBackButtonLabel: "Back",
    emailIntro: `Oi,\n\nHere is the information you requested from the Mozilla Community.\n\n`,
    emailSubject: "[Mozilla Community] Handy Links",
	kpis: [
		{id: "webcompat", name: "Web Compatibility"},
        {id: "devtools", name: "Firefox Dev Tools"},
		{id: "webvr", name: "WebVR"},
		{id: "gamedev", name: "Game Development"},
        {id: "community", name: "Joining Mozilla Community"}
		
	],
	successMsg: "Just sent you a message with your choosen topics!",
	errorMsg: "Can't send the info :-("
}
