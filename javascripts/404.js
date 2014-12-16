var pth = location.pathname.split('/');
var userPath = pth[pth.length-1].replace('.html',''); 

var defaultPath = 'goban_intro';

if (userPath == '404') {
  userPath = defaultPath;
}

console.log(userPath);


angular.module("automap",['goban','ngAnimate','pascalprecht.translate'])
  
.controller('autoCtrl',  
    ['$scope','$window', '$timeout', '$goban', '$translate' ,'$langs'
      ,'$tips', autoCtrl])
  .filter('uriFix', myURI)
  ;

  function myURI() {
    return function(uri){
      return decodeURI(uri);
    }
  }

  function autoCtrl($scope, $window, $timeout, $goban, $translate, $langs, $tips){
   
    $scope.goban = $goban.$default({
      path : 'https://ethercalc.org/',
      title : userPath || defaultPath,
      webConfig: true,
      colMax : 3
    });

    $scope.goban.init();


    //display
    $scope.navHeight = 50;
    $scope.countHeight = function(){
      return $window.innerHeight - 40;
    };



    //tips
    angular.extend($scope,
    {
      tips: $tips,
      t: 0
    });

    // langs

    $scope.langs = $langs;
    $scope.myScale = 'small';
    $scope.scales = [['tiny','50%'],
                      ['small','100%'],
                        ['big','150%'],
                            ['gaint','200%']];

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

    //nation flag

    $scope.getFlag = function(l){
      return $scope.langs.filter(function(d){
        return d[0] == l;
      })[0][2]
    }


    //events

    angular.extend($scope,{
      countD: 0,
      countC: 0,
    })


    $scope.$on('goban.error',function(event,args){
        if (args.p == 'data' && $scope.countD < 5) {            
            $timeout($goban.load, 500);
            $scope.countD++;
        }
        else if (args.p == 'config' && $scope.countC < 5) {
            console.log("try reload config");
            $timeout($goban.loadConfig, 500);
            $scope.countC++;
        }
    });

    $scope.$on('goban.loaded',function(event,args){
        if (args.p == 'data') {
            $scope.countD = 0;
            console.log("data loaded");
        }
        else if (args.p == 'config') {
          $scope.countC = 0;
          console.log("config loaded");
        }
    })

  } 
  




