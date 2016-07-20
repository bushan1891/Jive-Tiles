function transform(body, headers, options, callback)   {

/*
 * TO DO: Parse 'body' arg based on incoming event from 3rd party system.
 * TO DO: Replace the sample code below with your own transformation code.
 */

// Build activity object.
var activityInfo = {actor:{},object:{},jive:{}}; 


function clone(obj) {  
  if (null == obj || "object" != typeof obj) return obj;  
  var copy = {};  
  for (var attr in obj) {  
      copy[attr] = clone(obj[attr]);  
  }  
return copy;  
}  
body = clone(body);  
headers = clone(headers);  
options = clone(options);  
  
activityInfo.jive.app = {  
  'appUUID': "10ff749b-b0ff-4a91-a23b-74a3683380e6",  
  'view': "ext-object",  
  'context': {  
    'timestamp': new Date().getTime(),  
    'body': body,  
    'headers': headers,  
    'options': options,  
    'resources': {  
        'components': component,  
        'descriptions': desc  
    }  
  }  
}  

// Optional name of actor for this activity. Remove if n/a.
// activityInfo.actor.name = "Jane Doe";

// Optional email of actor for activity. Remove if n/a.
// activityInfo.actor.email = "janedoe@example.com";

// Optional URL for this activity. Remove if n/a.
activityInfo.object.url = "http://developer.jivesoftware.com";

// Required URL to the image for this activity.
activityInfo.object.image = "http://bit.ly/1wYwajm";

// Required title of the activity.
activityInfo.object.title = body.title;

// Optional HTML description of activity. Remove if n/a.
activityInfo.object.description = body.description;

/*
 * Call the callback function with our transformed activity information
 */

callback({ "activity" : activityInfo });

}