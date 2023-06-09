var db = require('../db');
var Promise = require('bluebird');



module.exports = {
  getAll: function () {
    var queryString = 'SELECT * from messages';
    var queryArgs = [];

    var query = new Promise(function(resolve, reject) {
      db.query(queryString, queryArgs, (err, res) => {
        if (err) {
          reject(err);
        } else {
          // console.log(res);
          resolve(res);
        }
      });
    });

    return query;


  }, // a function which produces all the messages
  // db.connection.query()
  // sends query via mysql2 module to get message
  //
  create: function (body) {

    var userId;
    var userQueryString = 'SELECT id FROM users WHERE username = ?';
    var userQueryArgs = body.username;
    // check if user exists by quering username

    var queryASync = function (userQueryString, userQueryArgs, attribute) {
      return new Promise(function(resolve, reject) {
        db.query(userQueryString, userQueryArgs, (err, res) => {
          if (err) {
            reject(err);
          } else {
            if (!!res[0]) {
              console.log('RESPONSE: ', res[0][attribute]);
              resolve(res[0][attribute]);
            } else {
              reject();
            }
          }
        });
      });
    }

    var result = '';

    // console.log(queryASync);
    queryASync(userQueryString, userQueryArgs, 'id')
      .then ((userId) => {
        console.log(userId);
        var messageQueryString = 'INSERT INTO messages (content, user_id, roomname) values(?, ?, ?)';
        var messageQueryArgs = [body.content, userId, body.roomname];

        // queryASync(userQueryString, userQueryArgs, 'id');
        result = db.query(messageQueryString, messageQueryArgs, (err, res) => {
          if (err) {
            console.log('message not saved, err: ', err);
          } else {
            // console.log(res);
            return res;
          }
        });
      })
      .then (() => {
        console.log('response: ', result);
      })
      .catch (() => {
        console.log('no user');
      });
  }
  // a function which can be used to insert a message into the database
  // should send query via mysql2 module to insert (e.g. 'INSERT INTO messages VALUES (?, ?, ? ,?))
};
