jive.tile.onOpen(function (config, options) {
    'use strict';


    if (typeof config !== 'object') {
        config = JSON.parse(JSON.parse(config || {}));
    }


    // update HTML with data pushed from service
    $("#data").text(config["pushData"]);

    config["pushCount"] = 10;

    $("#count").text(config["pushCount"]);

    for (var i = 0; i < 1000; i++) {
        setTimeout(function () {
        config["pushCount"] = i;
            $("#count").text(config["pushCount"]);
        }, 5000);

    }



    // open social 
    osapi.jive.corev3.people.getViewer().execute(
        function (response) {
            $('#test').html("<pre>" + JSON.stringify(response) + "</pre>");
            gadgets.window.adjustHeight();
        }
    );
    gadgets.window.adjustHeight();


    $("#config_string").text(config["configString"]);

    console.log(config);
    gadgets.window.adjustHeight();
});