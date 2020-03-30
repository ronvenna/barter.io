'user strict';
var sql = require('../db.js');

var availableItemsInfo = function(availableItems){
    this.customerid = availableItems.customerid;
    this.itemid = availableItems.itemid;
    this.itemusername = availableItems.itemusername;
    this.itememail = availableItems.itememail;
    this.quantity = availableItems.quantity;
    this.location_lat = availableItems.location_lat;
    this.location_long = availableItems.location_long;
    this.zipcode = availableItems.zipcode;
};
availableItemsInfo.createAvailableItem = function (newitem, result) {
    sql.query("INSERT INTO availableitems set ?", newitem, function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
};
availableItemsInfo.getAvailableItemsByCustomer = function (customerid, result) {
        sql.query("Select * from availableitems where customerid = ? ", customerid, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
availableItemsInfo.getAvailableItemsByItemId = function (customerid, result) {
    sql.query("Select * from availableitems where itemid = ? ", itemid, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);

            }
        });
};
availableItemsInfo.getAllavailableItems = function (name,email,result) {
        sql.query("Select *,? AS name,? AS email from availableitems left outer join itemsinfo on availableitems.itemid = itemsinfo.itemid",[name,email], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);

                 result(null, res);
                }
            });
};
availableItemsInfo.insertAvailableItemsById = function(item, result){
    console.log(JSON.stringify(item))
  sql.query("INSERT INTO availableitems (customerid,itemid,quantity,location_lat,location_long,zipcode) = ?", [item.customerid,item.itemid,item.quantity,item.location_lat,item.location_long,item.zipcode], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);

        }
     });
};

availableItemsInfo.updateAvailableItemsById = function(id, item, result){
    sql.query("UPDATE availableitems SET quantity = ?,location_lat = ?,location_long = ?,zipcode = ? WHERE customerid = ? and itemid = ?", [item.quantity,item.location_lat,item.location_long,item.zipcode,item.customerid,item.itemid], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{
               result(null, res);
                  }
              });
  };
  availableItemsInfo.remove = function(id, result){
     sql.query("DELETE FROM availableitems WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= availableItemsInfo;
