var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var dbcon = undefined;

exports.connectd = function(url) {
    console.log(typeof dbcon);
    return new Promise(function(fulfill, reject) {
        if (dbcon) {
            console.log('iam using already exist conaction');
            fulfill(dbcon);
        } else {


            MongoClient.connect(url, function(err, db) {
                if (err) {
                    reject(err);
                } else {
                    console.log('iam opining new  conaction');

                    dbcon = db;
                    fulfill(dbcon);

                }
            });



        }

    });

};



// inster data

exports.insertDocument = function(db,data ,colaction) {

return new Promise(function(fulfill , reject){

  db.collection(colaction).insertOne(data, function(err, result) {
    if (err){
      reject(err);
    } else {

      fulfill('data hase been isterted');
    }

  });

});
    db.collection(colaction).insertOne(data, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback("Inserted a document into the restaurants collection.");
    });

};




exports.manyinsert = function(db, callback, data ,colaction) {


    db.collection(colaction).insertMany([data, data, data, data, data], function(err, result) {
        assert.equal(err, null);
        console.log(result.insertedCount);
        callback('Inserted a document into the restaurants collection.' + result.insertedCount);
    });

};






exports.getById = function(id, cb, db , colaction) {

    if (ObjectId(id)) {
        var id2 = ObjectId(id);
        console.log('ok');
        db.collection(colaction).find({ "_id": id2 }).toArray(cb);
    } else {
        console.log('errror ');
    }

};


exports.getAll = function(ob, cb, db , colaction) {


    db.collection(colaction).find(ob).toArray(cb);


};
exports.updateId = function(db, newvlu, id , colaction) {

    return new Promise(function(fulfill, reject) {

        var id2 = ObjectId(id);


        db.collection(colaction).updateOne({ "_id": id2 }, { $set: newvlu },
            function(err, results) {

                if (err) {
                    reject(err);
                } else {
                    fulfill(results.result);
                }


            });

    });



};
exports.del = function(db, id , colaction) {

    return new Promise(function(fulfill, reject) {

        var id2 = ObjectId(id);

        db.collection(colaction).deleteOne({ "_id": id2 },
            function(err, results) {
                if (err) {
                    reject(err);
                } else {
                    console.log(results.result);
                    fulfill(results.result);
                }

            }
        );


    });

};
