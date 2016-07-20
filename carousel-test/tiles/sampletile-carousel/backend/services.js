/*
 * Copyright 2013 Jive Software
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

var jive = require("jive-sdk");
var q = require('q');

/**
 * Handles actually pushing data to the tile instance
 * @param instance
 */
function processTileInstance(instance) {
    jive.logger.debug('running pusher for ', instance.name, 'instance', instance.id);


    // creates a data update structure
    function getFormattedData(count) {
console.log(count);


//this below line fucked up
var ran = Math.random();


        return {
            data: {
                 "title": "bushan enabled :"+ ran,
                 "contents": [
            {
                "titleText": "Jive Software - Carousel 1",
                "titleLink": "http://developer.jivesoftware.com",
                "image": "https://scontent-lax3-1.xx.fbcdn.net/t31.0-8/13584996_1153192918035860_6484145054112512893_o.jpg",
                "imageURI": "https://scontent-lax3-1.xx.fbcdn.net/t31.0-8/13584996_1153192918035860_6484145054112512893_o.jpg",
                "description": "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
            },
            {
                "titleText": "Jive Software - Carousel 2",
                "titleLink": "https://community.jivesoftware.com/community/developer",
                "image": "https://scontent-lax3-1.xx.fbcdn.net/t31.0-8/12646696_1059400397415113_7514092999118023978_o.jpg",
                "imageURI": "https://scontent-lax3-1.xx.fbcdn.net/t31.0-8/12646696_1059400397415113_7514092999118023978_o.jpg",
                "description": "$$$$$$$$$$$$$$$$$$$$$$$$$"
            },
            {
                "titleText": "Jive Software - Carousel 3",
                "titleLink": "https://community.jivesoftware.com/community/developer",
                "image": "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/11800005_970595246295629_208946994346608696_n.jpg?oh=2c9c6b597afaded3ca18839e4f10f8c2&oe=57F65B00",
                "imageURI": "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/11800005_970595246295629_208946994346608696_n.jpg?oh=2c9c6b597afaded3ca18839e4f10f8c2&oe=57F65B00",
                "description": "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
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

    var store = jive.service.persistence();
    return store.find('exampleCarouselStore', { 'key': 'count' } ).then(function(found) {
        
        found = found.length > 0 ? found[0].count : parseInt(instance.config.startSequence, 10);

        store.save('exampleCarouselStore', 'count', {
            'key':'count',
            'count':found + 1 ,
        }).then(function() {
            return jive.tiles.pushData(instance, getFormattedData(found));
        });
    }, function(err) {
        jive.logger.debug('Error encountered, push failed', err);
    });
}

/**
 * Iterates through the tile instances registered in the service, and pushes an update to it
 */
var pushData = function() {
    var deferred = q.defer();
    jive.tiles.findByDefinitionName('sampletile-carousel').then(function(instances) {
        if (instances) {
            console.log(instances);
            q.all(instances.map(processTileInstance)).then(function() {
                console.log('pushed to jive');
                deferred.resolve(); //success
            }, function() {
                console.log('Failed to push');
                deferred.reject(); //failure
            });
        } else {
            jive.logger.debug("No jive instances to push to");
            deferred.resolve();
        }
    });
    return deferred.promise;
};

/**
 * Schedules the tile update task to automatically fire every 10 seconds
 */
exports.task = [
    {
        'interval' : 6000,
        'handler' : pushData
    }
];

/**
 * Defines event handlers for the tile life cycle events
 */
exports.eventHandlers = [

    // process tile instance whenever a new one is registered with the service
    {
        'event' : jive.constants.globalEventNames.NEW_INSTANCE,
        'handler' : processTileInstance
    },

    // process tile instance whenever an existing tile instance is updated
    {
        'event' : jive.constants.globalEventNames.INSTANCE_UPDATED,
        'handler' : processTileInstance
    }
];


