'user strict';
var sql = require('../db.js');

var availableItemsInfo = function(availableItems){
    this.customerid = availableitems.customerid;
    this.itemid = availableitems.itemid;
    this.quantity = availableitems.quantity;
    this.location_lat = availableitems.location_lat;
    this.location_long = availableitems.location_long;
    this.zipcode = availableitems.zipcode;
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
availableItemsInfo.getAllavailableItems = function (result) {
        sql.query("Select * from availableitems", function (err, res) {

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