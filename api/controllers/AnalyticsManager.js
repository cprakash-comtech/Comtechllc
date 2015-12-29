var Location = require('../../models/Location'); // get the Location model 
exports.updateVisitCount = function(location, callback){
    Location.find({place_id : location.place_id}, function(err, found){
        if(err){
            callback(err);
        }
        else if(found.length){
            Location.update({place_id: location.place_id}, {$inc :{visitCount:1}},function(err){
                if(err){
                    callback(err);
                }
                else{
                    callback(null, 'success');
                }
            });
        }
        else if(!found.length){
            var newLocation = new Location(location); // create a new city in db
            newLocation.visitCount++;
            newLocation.save(function(err, ack){
                if(err){
                    callback(err);
                }
                else if(ack){
                    callback(null, 'success');
                }
            })
        }
    })
};

exports.getAnalytics = function(req, res){
  Location.find(function(err, locations){
      if(err){
          console.log(err);
      }
      if(locations.length){
          res.send(locations);
      }
  })
};