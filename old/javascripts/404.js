var pth = location.pathname.split('/');

var userPath = pth[pth.length-1] != ''
      ? pth[pth.length-1].replace('.html','')
      : pth[pth.length-2].replace('.html',''); 

var defaultPath = 'goban_intro';

if (userPath == '404') {
  userPath = defaultPath;
}

console.log(userPath);


angular.module("automap",[
    'goban',
    'pascalprecht.translate',
    'ngTouch',
    'ngStorage',
    'firebase',
    'ngEthercalc'])  
.controller('autoCtrl', 
    ['$scope','$window', '$swipe',
    '$timeout', '$goban',
     '$translate','$langs'
      ,'$tips','$localStorage',
      '$firebase','$ethercalc', autoCtrl])
.filter('uriFix', myURI)
.filter('makeQR', makeQR);

  function makeQR(){
    return function(str){
      return (str||"")
      .replace('https://','')
      .replace('http://','');
    }
  }

  function myURI() {
    return function(uri){
      return decodeURI(uri);
    }
  }

  function autoCtrl($scope, $window, $swipe, $timeout, $goban, $translate, $langs, $tips, $localStorage, $firebase, $ethercalc){
   
    //Display Params
    angular.extend($scope, {
      myScale : 'small',
      scales : [['tiny','80%'],
                      ['small','100%'],
                        ['big','130%'],
                            ['gaint','150%']],
      navHeight : 50,
      countHeight : function(){
        return $window.innerHeight - 40;
      }
    });

    //Swipe <--

    var startX, startY, endX, endY;

    $swipe.bind(angular.element(document.getElementById('body')), {
      start: function(coords) {
        startX = coords.x;
        startY = coords.y;
      },
      move: function(coords) {
        // ...
      },
      end: function(coords) {
        endX = coords.x;
        endY = coords.y;
        if (endY - startY > 50) {
            $scope.toggleAnchor($scope.objNow());
            // TODO: 改為只存不刪
        } else if (endY - startY < -50) {
              $scope.toggleAnchor($scope.objNow());
              // TODO: 改為只刪不存
        }
      },
      cancel: function(coords) {
        // ...
      }
    });


    //Storage  <--
    $scope.$s = $localStorage.$default({
      myAnchors: []
    });

    angular.extend($scope, {
      isInAnchor: function(obj) {
        return ($localStorage.myAnchors.filter(function(o){
          return angular.equals(o, obj);
        })[0]) ? true : false;
      },

      showStar: function(obj){
        return $scope.isInAnchor(obj) ? 'images/star.png' : 'images/star_white.png';
      },

      isOutdatedAnchor: function(obj) {
        return ($localStorage.myAnchors.filter(function(o){
          return (o.x == obj.x) && (o.y == obj.y)
                    && (o.t == obj.t) && (o.n != obj.n);
        })[0]) ? true : false;
      },

      toggleAnchor: function(obj){
        if ($scope.isOutdatedAnchor(obj)) {
          $localStorage.myAnchors = $localStorage.myAnchors
            .map(function(o){
              return (o.x == obj.x && o.y == obj.y
                    && o.t == obj.t && o.n != obj.n) ? obj : o;
            })
        } else if ($scope.isInAnchor(obj)) {
          $localStorage.myAnchors = $localStorage.myAnchors
            .filter(function(o){
              return !angular.equals(o, obj)
            })
        } else {
          $localStorage.myAnchors.push(obj);
        }
      },

      resetAnchors: function(){
          if ($localStorage.myAnchors[0]) {
            $scope.myZan = angular.copy($localStorage.myAnchors);
            $localStorage.myAnchors = $localStorage.myAnchors.filter(function(o){
              return false;
            })
          } else {
            $localStorage.myAnchors = $scope.myZan;
          }
      }
    });

    //Goban <--
    $scope.goban = $goban.$default({
      path : 'https://ethercalc.org/',
      title : userPath || defaultPath,
      webConfig: true,
      colMax : 3
    });

    $scope.goban.init();


    //Tips  <- 123tips.js
    angular.extend($scope,
    {
      tips: $tips,
      t: 0
    });

    //Methods <--
    angular.extend($scope,
    {
      getURL: function(){
        if ($scope.editBack) {
          return $goban.trust($scope.editBack);
        }
        return $goban.getCurrentURL();
      },

      sleep: function(){
        $scope.editBack = ''; // not in Ethercalc
        console.log($scope.editBack);
      },

      toggleSideBar: function(){
          $scope.hideSideBar = !$scope.hideSideBar
      },

      initConfig: function(){
        $ethercalc.post({
                title: $goban.title,
                sur:'Config',
                cell: "A2",
                text: $goban.title});
      },

      maybeExtend: function(){
        if ($goban.myI == $goban.colMax) {
          $goban.colMax++;
          $goban.updateIndex();
        }
      },

      goEdit: function(c){
          var sur = (c || $goban.myI);
          $scope.editBack = $goban.path + $goban.title + sur;
      },


      //not called?
      myKeydown: function(e) {
        $goban.keyDown(e);
       // console.log(e.which);
        if (e.which == 90) {
          $scope.testing = !$scope.testing;
        }
      },

      relationChanged: function(){
            $goban.load();
      },

      blurFrame: function(){
        if ($scope.editBack == $goban.path + $goban.title + 'Config') {
          $goban.loadConfig();
        } else {
          if ($scope.editBack) {
          	$goban.load($goban.myI);
          }
        }
        $scope.hideCtrl = 0;
      },

      objNow: function(){
        return {t: $goban.title,
                x: $goban.myI,
                y: $goban.myJ,
                url: $goban.data && $goban.data[$goban.myJ] && $goban.data[$goban.myJ].url,
                n: (($goban.data && $goban.data[$goban.myJ]) || {}).name}
      }
    });


    // Langs  <-- translate/

    angular.extend($scope, {
      langs : $langs,
      changeLanguage: function (key) {
        $translate.use(key)
      }
    })


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


    //Events for event-driven programming

    angular.extend($scope,{
      countD: 0,
      countC: 0,
    })

    $scope.$on('goban.dx', function(event,args){
      
      $scope.bufferI = parseInt($goban.myI);

      if ($scope.editBack) {
        $scope.goEdit();
      }
    })

    $scope.$on('goban.error',function(event,args){
        console.log("Error on:" + args.p);
    });

    $scope.$on('goban.loaded',function(event,args){
        
        if ($scope.editBack && $scope.editBack.indexOf('Config') > -1){
          $scope.goEdit('Config');
        }

        $scope.bufferI = parseInt($goban.myI);

        if (args.p == 'data') {
            console.log("data loaded");

            
        } else if (args.p == 'config') {
          $scope.countC = 0;
          console.log("config loaded");


          //autocomplete

          if (!$goban.related || !$goban.related.length) {
          	$scope.initConfig();
          }
        }

    })




  } 
  




