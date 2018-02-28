/// <reference path="../angular.js" />
/// <reference path="Module.js" />


app.service('crudService', function ($http) {

    
    //Create new record
    this.post = function (Employee) {
        var request = $http({
            method: "post",
            url: "/api/EmployeesAPI",
            data:  Employee
        });
        return request;
    }
    //Get Single Records
    this.get = function (FirstName) {
        return $http.get("/api/EmployeesAPI/" + FirstName);
    }

    //Get All Employees
    this.getEmployees = function () {
        return $http.get("/api/EmployeesAPI"); 
    }


    //Update the Record
    this.put = function (FirstName, Employee) {
        var request = $http({
            method: "put",
            url: "/api/EmployeesAPI/" + FirstName,
            data: Employee
        });
        return request;
    }
    //Delete the Record
    this.delete = function (FirstName) {
        var request = $http({
            method: "delete",
            url: "/api/EmployeesAPI/" + FirstName
        });
        return request;
    }

});
