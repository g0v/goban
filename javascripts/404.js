var pth = location.pathname.split('/');
var userPath = pth[pth.length-1].replace('.html',''); 

var defaultPath = 'goban_intro';

if (userPath == '404') {
  userPath = defaultPath;
}

console.log(userPath);


angular.module("automap",['goban','ngAnimate','pascalprecht.translate'])
  
.controller('autoCtrl',  
    ['$scope','$window', '$goban', '$translate' ,'$langs'
      , autoCtrl])
  .filter('uriFix', myURI)
  ;

  function myURI() {
    return function(uri){
      return decodeURI(uri);
    }
  }

  function autoCtrl($scope, $window, $goban, $translate, $langs){
   
    $scope.goban = $goban.$default({
      path : 'https://ethercalc.org/',
      title : userPath || defaultPath,
      webConfig: true,
      colMax : 3
    });
    $scope.goban.init();


    $scope.navHeight = 50;
    $scope.countHeight = function(){
      return $window.innerHeight - 40;
    };


    $scope.langs = $langs;

    $scope.changeLanguage = function (key) {
      $translate.use(key);
    };

    console.log(navigator.language);
    if ($scope.langs.map(function(o){
      return o[0]
    }).indexOf(navigator.language) > -1){
      $scope.myLang = navigator.language
      $scope.changeLanguage($scope.myLang);
    }

    $scope.getFlag = function(l){
      return $scope.langs.filter(function(d){
        return d[0] == l;
      })[0][2]
    }
  } 
  




