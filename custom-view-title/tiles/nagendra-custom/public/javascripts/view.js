jive.tile.onOpen(function(config, options) {
    'use strict';


    if (typeof config !== 'object') {
        config = JSON.parse(JSON.parse(config || {}));
    }


    // update HTML with data pushed from service
    $("#data").text(config["pushData"]);

    $("#count").text(config["pushCount"]);

    for (var i = 0; i < 1000; i++) {
        $("#data").text(config["pushData"]).delay(1000);
        config["pushCount"] = i;

    }
     $('form').submit(function(){
     console.log('form submited');
     });
    // open social
    osapi.jive.corev3.people.getViewer().execute(
        function(response) {
            $('#data').html("<pre>" + JSON.stringify(response) + "</pre>");
            console.log('called');
            gadgets.window.adjustHeight();
        }
    );
  
    $("#config_string").text(config["configString"]);

    console.log(config);
    gadgets.window.adjustHeight();
});
