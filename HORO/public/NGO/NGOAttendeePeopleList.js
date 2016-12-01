/**
 * Created by Gaurang on 30-11-2016.
 */
/**
 * Created by Gaurang on 30-11-2016.
 */
//change this code

NGO.controller('NGOAttendeePeopleList', function($scope, $http,$state,$filter) {


    $http({
        method: "POST",
        url: '/getAllAttendeesInArea',
    }).success(function (data) {

        if (data.statusCode === 200) {
            console.log("Success");

            $scope.attendeeList = data.result;
            /* $scope.fname = data.Result[0].user_firstname;
             $scope.lname = data.Result[0].user_lastname;
             $scope.username = data.Result[0].username;
             */

        } else {
            console.log("Failure");
        }

    });

    $http({
        method: "POST",
        url: '/getAllCoursesInArea',
    }).success(function (data) {

        if (data.statusCode === 200) {
            console.log("Success");

            $scope.coursesInArea = data.result;
            /* $scope.fname = data.Result[0].user_firstname;
             $scope.lname = data.Result[0].user_lastname;
             $scope.username = data.Result[0].username;
             */

        } else {
            console.log("Failure");
        }

    });

    $scope.Account = function () {
        window.location.assign("/Account");
    }

    $scope.register = function(user){
        var user_id = user.user_id;
        var selectedcourse_id = $scope.selectedcourse_id;

        var SelectedcoursebyName =  document.getElementById("course").value;

        var Selectedcourse = $filter('filter')($scope.coursesInArea, function (d) {
            return d.course_name === SelectedcoursebyName;
        });


        $http({
            method: "POST",
            url: '/setCourseToAttendee',
            data:{
                user_id: user_id,
                course_id: Selectedcourse[0].course_id,
                progress:0
            }
        }).success(function (data) {

            if (data.statusCode === 200) {
                console.log("Success");

                //$scope.attendeeList = data.result;
                /* $scope.fname = data.Result[0].user_firstname;
                 $scope.lname = data.Result[0].user_lastname;
                 $scope.username = data.Result[0].username;
                 */

            }if(data.statusCode === 501){
                console.log("course is already registered.");
            }
            else {
                console.log("Failure");
            }

        });
    }

});