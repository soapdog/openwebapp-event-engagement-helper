m.route(document.body, "/loading", {
    "/loading": LoadingView,
    "/success": SuccessView,

    "/share-topics-by-email": ShareTopicsByEmail,
    "/share-contact-by-email": ShareContactByEmail,

    "/share-urls-by-qr-code": ShareTopicsByEmail,
    "/share-contact-by-qr-code": ShareContactByQRCode,

    "/info": PersonalContactInformation,
    "/export": ShareTopicsByEmail,
    "/analytics": ShareTopicsByEmail,
    "/about": About
});
