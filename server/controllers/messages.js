var models = require('../models');

module.exports = {
  get: function (req, res) {
    var allMessages = models.messages.getAll();
    var status = 200;

    allMessages
      .then((data) => {
        res.status(status).send(data);
      });


  },
  // a function which handles a get request for all messages
  // should invoke the model getAll function, which interacts with the DB



  post: function (req, res) {
    // console.log(req);
    // console.log(req.body);
    var body = req.body;
    // console.log(body);
    // console.log(models.messages.create(body));
    models.messages.create(body);
    var status = 200;
    res.status(status).send(body);
  }
  // a function which handles posting a message to the database
  // invokes model create function
};
