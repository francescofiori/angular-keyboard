var app = angular.module('ngKeyboard', []);

app.controller('MainDivCtrl', ['$scope', '$rootScope', 'function($scope, $rootScope) {
    $scope.layout = {"firstRow":[
        {"value": "1", "action": "char"},
        {"value": "2", "action": "char"},
        {"value": "3", "action": "char"},
        {"value": "4", "action": "char"},
        {"value": "5", "action": "char"},
        {"value": "6", "action": "char"},
        {"value": "7", "action": "char"},
        {"value": "8", "action": "char"},
        {"value": "9", "action": "char"},
        {"value": "0", "action": "char"}
    ],
        "secondRow":[
            {"value": "q", "action": "char"},
            {"value": "w", "action": "char"},
            {"value": "e", "action": "char"},
            {"value": "r", "action": "char"},
            {"value": "t", "action": "char"},
            {"value": "y", "action": "char"},
            {"value": "u", "action": "char"},
            {"value": "i", "action": "char"},
            {"value": "o", "action": "char"},
            {"value": "p", "action": "char"}
        ],
        "thirdRow":[
            {"value": "a", "action": "char"},
            {"value": "s", "action": "char"},
            {"value": "d", "action": "char"},
            {"value": "f", "action": "char"},
            {"value": "g", "action": "char"},
            {"value": "h", "action": "char"},
            {"value": "j", "action": "char"},
            {"value": "k", "action": "char"},
            {"value": "l", "action": "char"}
        ],
        "fourthRow":[
            {"value": "z", "action": "char"},
            {"value": "x", "action": "char"},
            {"value": "c", "action": "char"},
            {"value": "v", "action": "char"},
            {"value": "b", "action": "char"},
            {"value": "n", "action": "char"},
            {"value": "m", "action": "char"}
        ],
        "fifthRow":[
            {"value": "←", "action": "del"},
            {"value": "@", "action": "char"},
            {"value": ".", "action": "char"},
            {"value": "-", "action": "char"},
            {"value": "_", "action": "char"}
        ]

        /*
         * ! # $ % & ' * + - / = ? ^ _ ` { | } ~
         * */
    };

    $scope.keyPressed = function(value, action){
        $scope.someInput = value;
        $rootScope.$broadcast('keyPressed', $scope.someInput, action);
    }
});

app.directive('myText', ['$rootScope', function($rootScope) {
    return {
        link: function(scope, element, attrs) {
            $rootScope.$on('keyPressed', function(e, val, action) {
                var domElement = element[0];

                if (document.selection) {
                    console.log('selection');
                    domElement.focus();
                    var sel = document.selection.createRange();
                    sel.text = val;
                    domElement.focus();
                }
                else if (domElement.selectionStart || domElement.selectionStart === 0) {
                    console.log('element start');
                    if(action === 'del'){
                        var startPos = domElement.selectionStart;
                        var endPos = domElement.selectionEnd;
                        var scrollTop = domElement.scrollTop;

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
                        var startPos = domElement.selectionStart;
                        var endPos = domElement.selectionEnd;
                        var scrollTop = domElement.scrollTop;
                        domElement.value = domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length);
                        domElement.focus();
                        domElement.selectionStart = startPos + val.length;
                        domElement.selectionEnd = startPos + val.length;
                        domElement.scrollTop = scrollTop;
                    }
                } else {
                    console.log('else');
                    domElement.value += val;
                    domElement.focus();
                }

            });
        }
    }
}]);