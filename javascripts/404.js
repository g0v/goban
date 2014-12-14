var pth = location.pathname.split('/');
var userPath = pth[pth.length-1].replace('.html',''); 

var defaultPath = 'goban_intro';

if (userPath == '404') {
  userPath = defaultPath;
}

console.log(userPath);


angular.module("automap",['goban','pascalprecht.translate'])
  
.config(function($translateProvider) {
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
    .translations('zh', {
      TITLE: '黑客棋盤',
      OPEN_BLANK: '按此可開啟新頁籤'
    })
    .translations('zh-hk', {
      TITLE: '黑客棋盤',
      OPEN_BLANK: '按此可開啟新頁籤'
    })
    .translations('zh-cn', {
      TITLE: '黑客棋盘',
      OPEN_BLANK: '按此可开启新页签'
    })
    .translations('zh-sg', {
      TITLE: '黑客棋盤',
      OPEN_BLANK: '按此可開啟新頁籤'
    })
    .translations('zh-tw', {
      TITLE: '黑客棋盤',
      OPEN_BLANK: '按此可開啟新頁籤'
    });
    $translateProvider.preferredLanguage('zh-tw');
})

.controller('autoCtrl',  ['$scope','$window', '$goban', autoCtrl])
  .filter('uriFix', myURI)
  ;

  function myURI() {
    return function(uri){
      return decodeURI(uri);
    }
  }

  function autoCtrl($scope, $window, $goban){
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


    $scope.myOptsNew = [
      {h:'autolearn_main', n:'非學校教育'}
    ];

  } 
  

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-26178243-2']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();




