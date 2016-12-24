'use strict'

angular.module('confusionApp')
        .controller('MenuController', ['$scope', 'menuFactory' ,function($scope, menuFactory){
          $scope.tab = 1; //Which tab is selected
          $scope.filtText = ''; //Filter food based on Type
          $scope.showDetails = false;
          //Get dishes from factory "menuFactory" in services.js
          $scope.dishes = menuFactory.getDishes();
                //this.dishes = dishes;
                //Tab Selection & Filtering based on Category
          $scope.select = function(setTab){
                  $scope.tab = setTab;

                  if(setTab===2)
                    $scope.filtText = "appetizer";
                  else if(setTab===3)
                    $scope.filtText = "mains";
                  else if(setTab===4)
                    $scope.filtText = "dessert";
                  else
                    $scope.filtText = "";
                }
                //Make selected tab active
                $scope.isSelected = function(checkTab){
                  return ($scope.tab === checkTab);
                }

                $scope.toggleDetails = function(){
                  $scope.showDetails = !$scope.showDetails;
                }
        }])

        .controller('ContactController', ['$scope', function($scope){
            $scope.feedback = {
              mychannel : "",
              firstName : "",
              lastName : "",
              agree : false,
              email : ""
            }

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

        .controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory){
            var dish = menuFactory.getDish(parseInt($routeParams.id,10));
            console.log($routeParams.id);
            $scope.dish = dish;

        }])


        .controller('FeedbackController', ['$scope', function($scope){
            $scope.sendFeedback = function(){
                console.log($scope.feedback);
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                  $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            }
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            var formComment = {
              author: "",
              ratingArray: [{id:1, text: "1"}, {id:2, text: "2"}, {id:3, text: "3"},{id:4, text: "4"},{id:5, text: "5"} ],
              comment: "",
              date: "",

            }
            
            $scope.formComment = formComment;
            $scope.submitComment = function() {
                
                //Step 2: This is how you record the date
                $scope.formComment.date = new Date().toISOString();
                
                // Step 3: Push your comment into the dish's comment array
                
                $scope.dish.comments.push($scope.formComment);
                
                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
                $scope.formComment = {
                  author: "",
                  ratingArray: [{id:1, text: "1"}, {id:2, text: "2"}, {id:3, text: "3"},{id:4, text: "4"},{id:5, text: "5"} ],
                  comment: "",
                  date: "",
                  rating: 5
                }
            }
        }])

;
