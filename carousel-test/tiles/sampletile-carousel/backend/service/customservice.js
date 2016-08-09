var appdir = require('app-root-path');


// https://unsplash.it/200/300/?random
//end-point where you can get random pictures

var customService = {

    customData: function () {
        try {
            var randomnumber = Math.random() * 100;
            console.log(randomnumber);
            var data = {
                data: {
                    "title": "bushan customData :" + randomnumber,
                    "contents": [
                        {
                            "titleText": "Hello ",
                            "titleLink": "http://www.jcsdemo.com",
                            "image": "https://unsplash.it/300/200/?random",
                            "imageURI": "",
                            "description": "This is the image 1"
                        },
                        {
                            "titleText": "Holla",
                            "titleLink": "http://www.jcsdemo.com",
                            "image": "https://unsplash.it/300/200",
                            "imageURI": "",
                            "description": "This is the image 2"
                        },
                        {
                            "titleText": "See yaa maniyana !! ",
                            "titleLink": "http://www.jcsdemo.com",
                            "image": "https://unsplash.it/300/201",
                            "imageURI": "",
                            "description": "This is the image 3"
                        }
                    ],
                    "config": {
                        "autoplay": true,
                        "speed": "medium",
                        "previewPane": true,
                        "transition": "fade"
                    }
                }
            };
        }
        catch (err) {
            console.log('error in the custom data ' + err);
        }
        return data;
    },
    sayHelloInEnglish: function () {
        return "HELLO";
    },

    sayHelloInSpanish: function () {
        return "Hola";
    }
}
module.exports = customService;