jive.tile.onOpen(function (config, options) {

    'use strict';


    if (typeof config !== 'object') {
        config = JSON.parse(JSON.parse(config || {}));
    }


    $("#config_string").text(config["configString"]);
    gadgets.window.adjustHeight();

    $('#usernameForm').submit(function () {
        var email = document.getElementById('Email');
        var username = document.getElementById('Username');
        var fullname = document.getElementById('Fullname');
        var message = document.getElementById('Message');

        console.log('Value ' + email.value + '' + username.value + '' + fullname.value + '' + message.value);
        gadgets.window.adjustHeight();

        // crateing a discussion
        osapi.jive.corev3.discussions.create({
            type: "discussions",
            place: 'https://jivedemo-slicesoftware.jiveon.com/community/test',
            content: {
                type: "text/html",
                text: "<body><p>" + message.value + "</p></body>",
                url: 'https://jivedemo-slicesoftware.jiveon.com/community/test'
            },
            subject: "Username Change for : " + email.value
        }).execute(function (response) {
            console.log(response);
        });
        console.log('done');


        // sending user the notification that the request was sent 

        var jiveid = window.parent._jive_current_user.ID;
        var actionJSON =
            {
                "openSocial": {
                    "deliverTo": [
                        "https://jivedemo-slicesoftware.jiveon.com/api/core/v3/people/" + jiveid
                    ]
                },
                "title": "Request For Username Change Sent",
                "content": "User username Change has been sent",
                "object": {
                    "id": "https://jivedemo-slicesoftware.jiveon.com/docs/DOC-1693",
                    "summary": "See the attached document for more information.",
                },
                "verb": "announced"
            }
            ;

        osapi.jive.corev3.activities.create(actionJSON).execute(function (data) {
            console.log(data);
        });



        // push to the simple stream activity 


        var body = `{
                "title" : "Request For Username Change",
                "description" : "`+ " <h2>Email :</h2><br>" + email.value + "<h2>Username :</h2><br>" + username.value + "<h2>Fullname :</h2><br>" + fullname.value + "<h2>Message :</h2><br>" + message.value + `  ",
                "other" : "Request for username change"
                }`;
        console.log(body);
        osapi.http.post({
            method: "post",
            href: "https://jivedemo-slicesoftware.jiveon.com/api/core/v3/extstreams/activities/external/fc76d293-4878-c78a-b60a-7e20b3513415/stream-15465e71/KjvUI3iHiXSSYAJrRhQC0Mh5umckxdTu",
            body: body
        }).execute(function (response) {
            console.log(response);
        });
        console.log('done 2');

        document.getElementById("usernameForm").reset();
        alert('Thank you , request submited')
    });



    gadgets.window.adjustHeight();
});