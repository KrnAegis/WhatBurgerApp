var orm = require("../config/orm.js");
//call functions from orm.js
var burger = {
  selcAll: function(callback) {
    orm.selcAll("burgers", function(res) {
      callback(res);
    });
  },

  createBurg: function(cols, vals, callback) {
    orm.createBurg("burgers", cols, vals, function(res) {
      callback(res);
    });
  },
  update: function(objColVals, condition, callback) {
    orm.update("burgers", objColVals, condition, function(res) {
      callback(res);
    });
  },
  delete: function(condition, callback) {
    orm.delete("burgers", condition, function(res) {
      callback(res);
    });
  }
};
//being exported to burgers_controllers.js
module.exports = burger;