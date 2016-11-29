var ejs 		= require("ejs");
var winston = require('winston');
var mysql = require("./mysqlConnector");

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'ebayLog.log' })
    ]
});

var express = require('express');




exports.redirectToCourse = function(req, res) {

    ejs.renderFile('./views/Account.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("successfully rendered the signin module");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};


exports.get_course_details = function(req,res)
{
    console.log("in GET COURSE DETAILS");


}


exports.get_course_page = function(req,res)
{
    var vals = req.param("vals");
    req.session.selectedCourse = vals;

    var checkLoginQuery = "SELECT * FROM horodb.session where course_id = '" +vals.course_id+ "'";
    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error','Error of user :'+username+ ' Error: '+err);
        }
        else {
            if(results.length >0) {

                req.session.selectedCourseSessions = results;
                response={"statusCode" : 200, "Result"	:	results};
                res.send(response);



            }
            else{
                //logger.log('error', "Invalid Login for username Id: "+username +' user is not registered.');
                json_responses = {"statusCode": 401};
                console.log(json_responses);
                res.send(json_responses);
            }
        }
    }, checkLoginQuery);




}


exports.viewCoursePage = function(req,res)
{
    console.log("int viewCoursePage");
    response={"statusCode" : 200, "Sessions"	:   req.session.selectedCourseSessions, "Course"    :   req.session.selectedCourse};
    res.send(response);
}