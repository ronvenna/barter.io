'user strict';
var sql = require('../db.js');

var customerInfo = function(customer){
    this.customerid = customer.customerid;
    this.email = customer.email;
    this.phone_number = customer.phone_number;
    this.address = customer.address;
    this.address_lat = customer.address_lat;
    this.address_long = customer.address_long;
    this.zipcode = customer.zipcode;
    this.customerpicturelocation = customer.customerpicturelocation;
};
customerInfo.createCustomer = function (newCustomer, result) {
        sql.query("INSERT INTO customerinfo set ?", newCustomer, function (err, res) {

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

customerInfo.getCustomerDetailsById = function (customerId, result) {
    sql.query("Select email from customerinfo where customerid = ? ", customerId, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);


            }
        });
};
customerInfo.getCustomerDeatailsByEmail = function (email, result) {
    console.log(email);
    sql.query("Select * from customerinfo where email = ? ", email, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);

            }
        });
};
customerInfo.getAllCustomers = function (result) {
        sql.query("Select * from customerinfo", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                result(null, res);
                }
            });
};
customerInfo.updateEmailById = function(email,id, result){
  sql.query("UPDATE customerinfo SET email = ? WHERE customerid = ?", [email, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
customerInfo.updateCustomerPictureById = function(id, customer, result){
    sql.query("UPDATE customerinfo SET customerpicturelocation = ? WHERE customerid = ?", [customer,id], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{
               result(null, res);
                  }
              });
  };
customerInfo.updateAddressById = function(customer, result){
    sql.query("UPDATE customerinfo SET address = ?,address_lat = ?,address_long = ?,zipcode = ? WHERE customerid = ?", [customer.address,customer.address_lat,customr.address_long,customer.zipcode, customer.customerid], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{
               result(null, res);
                  }
              });
  };
customerInfo.remove = function(id, result){
     sql.query("DELETE FROM customerinfo WHERE customerid = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= customerInfo;
