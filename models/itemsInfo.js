'user strict';
var sql = require('../db.js');
var itemsInfo = function(items){
    this.itemid = items.itemid;
    this.itemname = items.itemname;
    this.itemtype = items.itemtype;
    this.itempicturelocation = items.itemspicturelocation;
};
itemsInfo.createItem = function (newItem, result) {
        sql.query("INSERT INTO itemsinfo set ?", newItem, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });
};
itemsInfo.getItemDetailsById = function (itemId, result) {
        sql.query("Select * from itemsinfo where itemid = ? ", [itemId], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });
};
itemsInfo.getAllItems = function (result) {
        sql.query("Select * from itemsinfo", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            });
};
itemsInfo.updateItemById = function(item, result){
    var str = item.itempicturelocation.toString()
  sql.query("UPDATE itemsinfo SET itemname = ?,itemtype = ?,itempicturelocation = ? WHERE itemid = ?", [item.itemname,item.itemtype,str, item.itemid], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
itemsInfo.updateItemPictureById = function(id, item, result){
    sql.query("UPDATE itemsinfo SET itempicturelocation = ? WHERE itemid = ?", [item.itempicturelocation, item.itemid], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{
               result(null, res);
                  }
              });
  };
itemsInfo.remove = function(id, result){
     sql.query("DELETE FROM itemsinfo WHERE itemid = ?", [id], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            });
};
module.exports= itemsInfo;
