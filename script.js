var app = angular.module('ngKeyboard', []);

app.controller('MainDivCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $http.get('layout.json').success(function(data) {
        $scope.layout = data;
    });

    $scope.keyPressed = function(value, action){
        $scope.someInput = value;
        $rootScope.$broadcast('keyPressed', $scope.someInput, action);
    }
}]);

app.directive('myText', ['$rootScope', function($rootScope) {
    return {
        link: function(scope, element, attrs) {
            $rootScope.$on('keyPressed', function(e, val, action) {
                var domElement = element[0];
                if (document.selection) {
                    domElement.focus();
                    var sel = document.selection.createRange();
                    sel.text = val;
                    domElement.focus();
                }
                else if (domElement.selectionStart || domElement.selectionStart === 0) {
                    var startPos = domElement.selectionStart;
                    var endPos = domElement.selectionEnd;
                    var scrollTop = domElement.scrollTop;

                    if(action === 'del'){
                        if(startPos === endPos){
                            domElement.value = domElement.value.substring(0, startPos-1) + domElement.value.substring(endPos, domElement.value.length);
                            domElement.focus();
                            domElement.selectionStart = startPos - 1;
                            domElement.selectionEnd = startPos - 1;
                        }
                        else{
                            domElement.value = domElement.value.substring(0, startPos) + domElement.value.substring(endPos, domElement.value.length);
                            domElement.focus();
                            domElement.selectionStart = startPos;
                            domElement.selectionEnd = startPos;
                        }

                        domElement.scrollTop = scrollTop;
                    }
                    else{
                        domElement.value = domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length);
                        domElement.focus();
                        domElement.selectionStart = startPos + val.length;
                        domElement.selectionEnd = startPos + val.length;
                        domElement.scrollTop = scrollTop;
                    }
                } else {
                    domElement.value += val;
                    domElement.focus();
                }
            });
        }
    }
}]);