var connection = require("../config/connection.js");

function printQuestionMarks(num) {
//make array of ? to interact the mySql properly when a val.length gets pushed into num for the function
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
  }

//make the string bit more friendly to digest through function
function sqlize(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
};
var orm = {
  selcAll: function(tableInput, callback) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        console.log(err);
      }
      callback(result);
    });
  },
  createBurg: function(table, cols, vals, callback) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        console.log(err);
      }
      callback(result);
    });
  },

  update: function(table, objColVals, condition, callback) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += sqlize(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        console.log(err);
      }
      callback(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};
//being exproted to burger.js
module.exports = orm;