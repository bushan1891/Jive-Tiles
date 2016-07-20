jive.tile.onOpen(function(config, options) {

    $("#config_string").text(config["configString"]);

    gadgets.window.adjustHeight();
});

var start = new Date;

setInterval(function() {
    $('#time').text((new Date - start) / 1000 + " Seconds");
}, 1000);