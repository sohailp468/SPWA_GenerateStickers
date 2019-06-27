 (function () {

    'use strict';

    // creates an angular module called  - bound to body through ng-app directive
    var app = angular.module('anti_park_spwa', [ 'monospaced.qrcode' ]);

    // creating controller
    app.controller('Main', control);

    // Inject the $http service. Need $http to make HTTP requests to the API
    control.$inject = ['$http'];

    // Pass any injected services to the controller constructor function
    function control($http) {

        var vm = angular.extend(this, {
            title: 'Welcome to the Sticker App',
            stickers: [],
            events: [],
            endpoint: '',
            
        });
    
        vm.init = function () {
            // get the endpoint from the config file
            $http.get('config.json').then(
                function success(response) {
                    vm.endpoint = response.data.endpoint;
                    console.info(response.data);
                },
                function failure(err) {
                    console.err(err);
                }
            )
        }

        vm.getData = function () {
            // Using an unauthenticated API here
            // Use $http service to send get request to API and execute different functions depending on whether it is successful or not
            $http.get(vm.endpoint + 'incidents/16d5b9d9-77a8-4709-bfc7-a080512af177').then(
                function success(response) {
                    vm.incident = response.data;
                    console.info(response);
                },
                function failure(err) {
                    console.error(err);
                }
            )
        };

        vm.postStickers = function () {
            // Using an unauthenticated API here
            var x = document.getElementById("form1");
            var y= "";
            y = x.elements[0].value;
            var z = parseInt(y);
            var jsonpayload={"num_requested":z};
            
             //Use $http service to send get request to API and execute different functions depending on whether it is successful or not
            $http.post(vm.endpoint + 'stickers/',JSON.stringify(jsonpayload)).then(
                function success(response) {
                    while(vm.stickers.length>0) {
                        vm.stickers.pop();
                    }
                    for (var i in response.data) {
                        vm.stickers.push(response.data[i]);
                    }
                    //vm.stickers = response.data;
                    console.log("vm.stickers: ",vm.stickers.length)
                    console.info(response);
                },
                function failure(err) {
                    console.error(err);
                }
            )
        };

        

        /* vm.printPage=function()
        {
            
            var print_div=document.getElementById("print-area-1");
           

            var printWin=window.open();
            

            printWin.document.write('<link rel="stylesheet" type="text/css" href="docs/generate/css/style.css"/>')
            printWin.document.write(print_div.innerHTML);
            
            printWin.document.close();
            printWin.focus();
            printWin.print();
            printWin.close();
        }  */

        vm.printPage=function()
        {
           var id=document.getElementById("non-printable");
           if (id.style.display==="none"){
               id.style.display="block";
               
               var btn=document.getElementById("btnprint");
               btn.innerText='PRINT';
               
                
           }
           else{
               id.style.display="none";
               window.print();
            var btn=document.getElementById("btnprint");
            btn.innerText='Show Generator';
           }
           
        }

        vm.windowEvent=function()
        {
            console.log("Here is an event");
        }
    
        vm.init();
    }

})();