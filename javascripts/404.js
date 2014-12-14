var pth = location.pathname.split('/');
var userPath = pth[pth.length-1].replace('.html',''); 

var defaultPath = 'goban_intro';

if (userPath == '404') {
  userPath = defaultPath;
}

console.log(userPath);


angular.module("automap",['goban','pascalprecht.translate'])
  
.config(function($translateProvider) {

    var zhTW = {
      TITLE: '黑客棋盤',
      OPEN_BLANK: '按此可開啟新頁籤'
    };

    var zhCN = {
      TITLE: '黑客棋盘',
      OPEN_BLANK: '按此可开启新页签'
    }

    // Our translations will go in here
    $translateProvider.translations('en', {
      TITLE: 'hacker\'s goban',
      OPEN_BLANK: 'Click here to open a new tab'
    })
    .translations('de', {
      TITLE: 'Hacker Schachbrett',
      OPEN_BLANK: 'Klicken Sie hier, um einen neuen Tab zu öffnen'
    })
    .translations('ja', {
      TITLE: 'ハッカーのチェス盤',
      OPEN_BLANK: '新しいタブを開くには、ここをクリックしてください'
    })
    .translations('vi', {
      TITLE :'hackers bàn cờ',
      OPEN_BLANK : 'Nhấn vào đây để mở một tab mới'
    })
    .translations('zh', zhTW)
    .translations('zh-hk', zhTW)
    .translations('zh-HK', zhTW)
    .translations('zh-cn', zhCN)
    .translations('zh-CN', zhCN)
    .translations('zh-sg', zhTW)
    .translations('zh-tw', zhTW)
    .translations('zh-TW', zhTW);
    $translateProvider.preferredLanguage('en');
})

.controller('autoCtrl',  
    ['$scope','$window', '$goban', '$translate'
      , autoCtrl])
  .filter('uriFix', myURI)
  ;

  function myURI() {
    return function(uri){
      return decodeURI(uri);
    }
  }

  function autoCtrl($scope, $window, $goban, $translate){
   
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


    $scope.changeLanguage = function (key) {
      $translate.use(key);
    };

    console.log(navigator.language);
    if (['zh-TW','en','zh-cn'].indexOf(navigator.language) > -1){
      $scope.changeLanguage(navigator.language);
    }
  } 
  




