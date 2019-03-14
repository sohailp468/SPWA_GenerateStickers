(function () {

    'use strict';

    // creates an angular module called  - bound to body through ng-app directive
    var app = angular.module('anti_park_spwa', [ 'monospaced.qrcode' ]);

    // creating controller
    app.controller('Main', control);

    // Inject the $http service. Need $http to make HTTP requests to the API
    control.$inject = ['$http', 'uuid'];

    // Pass any injected services to the controller constructor function
    function control($http,uuid) {

        var vm = angular.extend(this, {
            title: 'Welcome to the Sticker App',
            stickers: [],
            events: [],
            endpoint: '',
            hasResponded:false,
            giveThanks:false
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

        /* vm.getData = function () {
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
        }; */
        vm.apologise=function()
        {            
            var z= true; 
            var urlParams = new URLSearchParams(window.location.search);
            var sticker_uuid=urlParams.get('uuid'); //getus uuid from url
            
            var responsejson={"has_apologised":true, "sticker_uuid":sticker_uuid,"apologyRec":true, "apologyPN":1};
            //Use $http service to send get request to API and execute different functions depending on whether it is successful or not

            var responsePayload = {
                recipient_id: "/topics/" + sticker_uuid,
                message_id: uuid.v4(),
                payload: JSON.stringify( responsejson )
            };      
            vm.sendPayload( responsePayload ).success(
                $http.post(vm.endpoint + 'responses/',JSON.stringify(responsejson)).then(
                    function success(response) {
                        vm.responses = response.data;
                        vm.hasResponded = true;
                        vm.giveThanks=true;
                        console.info(response);
                    },
                    function failure(err) {
                            console.error(err);
                        })
                    .error(function(err){
                        alert("fcm down! whoops!");
                        console.log(err);
                    })                
                )
            
        } ;//get UUIDshould change apologyRec to true; change apologyPN to 1






        vm.refuse=function()//should change apologyRec to true; change apologyPN to -1
        {
            var z= true; 
            var urlParams = new URLSearchParams(window.location.search);
            var sticker_uuid=urlParams.get('uuid'); //getus uuid from url
            
            var responsejson={"has_apologised":true, "sticker_uuid":sticker_uuid, "apologyRec":true, "apologyPN":-1};
            //Use $http service to send get request to API and execute different functions depending on whether it is successful or not

            var responsePayload = {
                recipient_id: "/topics/" + sticker_uuid,
                message_id: uuid.v4(),
                payload: JSON.stringify( responsejson )
            };
            vm.sendPayload( responsePayload ).success(
                $http.post(vm.endpoint + 'responses/',JSON.stringify(responsejson))
                .then(
                    function success(response) {
                        vm.responses = response.data;
                        vm.hasResponded = true;
                        vm.giveThanks=true;
                        console.info(response);
                    },
                    function failure(err) {
                        console.error(err);
                    })
                .error(function(err){
                    alert("fcm down! whoops!");
                    console.log(err);
                })                
            )


               

            vm.sendPayload = function sendPayload( payload ) {
                const SERVER_ROOT = "https://rescuestationpush.herokuapp.com:443"; // heroku service hides secret

                console.log( " → asked to send this payload:", payload );
          
                var sendRequest = { method: 'POST',
                                    url: SERVER_ROOT + '/messages',
                                    data: JSON.stringify(payload)
                                   };
          
                console.log('push.service.sendPayload - using ',sendRequest );
          
                return $http( sendRequest ); // send back a promise
                };


        }
        vm.init();
    }

})();