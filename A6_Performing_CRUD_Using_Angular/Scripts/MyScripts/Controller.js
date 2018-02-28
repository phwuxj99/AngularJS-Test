
/// <reference path="../angular.js" />


/// <reference path="Module.js" />
 
//The controller is having 'crudService' dependency.
//This controller makes call to methods from the service 
app.controller('crudController', function ($scope, crudService) {
   
    $scope.IsNewRecord = 1; //The flag for the new record

    loadRecords(); 

    //Function to load all Employee records
    function loadRecords() {
        var promiseGet = crudService.getEmployees(); //The MEthod Call from service

        promiseGet.then(function (pl) { $scope.Employees = pl.data },
              function (errorPl) {
                  $log.error('failure loading Employee', errorPl);
              });
    }
    


    //The Save scope method use to define the Employee object.
    //In this method if IsNewRecord is not zero then Update Employee else 
    //Create the Employee information to the server
    $scope.save = function () {
        var Employee = {
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            DateOfCreated: $scope.DateOfCreated
        };


        //If the flag is 1 the it si new record
        if ($scope.IsNewRecord === 1) {
            var promisePost = crudService.post(Employee);
            promisePost.then(function (pl) {
                $scope.FirstName = pl.data.FirstName;
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        } else { //Else Edit the record
            var promisePut = crudService.put($scope.FirstName, Employee);
            promisePut.then(function (pl) {
                $scope.Message = "Updated Successfuly";
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }

        
            
    };

    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = crudService.delete($scope.FirstName);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.FirstName = "";
            $scope.LastName = "";
            $scope.DateOfCreated = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //Method to Delete
    $scope.delete2 = function (Emp) {
        //alert(Emp.FirstName);
        var promiseDelete = crudService.delete(Emp.FirstName);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.FirstName = "";
            $scope.LastName = "";
            $scope.DateOfCreated = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //Method to Get Single Employee based on EmpNo
    $scope.get = function (Emp) {
        var promiseGetSingle = crudService.get(Emp.FirstName);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.FirstName= res.FirstName;
            $scope.LastName = res.LastName;
            $scope.DateOfCreated = res.DateOfCreated;

            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                       console.log('failure loading Employee', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.FirstName = "";
        $scope.LastName = "";

        
        //Employee.DateOfCreated = date.getTime();
        $scope.DateOfCreated = new Date();
    }
});