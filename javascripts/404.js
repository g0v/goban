var pth = location.pathname.split('/');
var userPath = pth[pth.length-1].replace('.html',''); 

console.log(userPath);


angular.module("automap",["goban"])
  .controller('autoCtrl',  ['$scope','$window', '$goban', autoCtrl]);

  function autoCtrl($scope, $window, $goban){
    $scope.goban = $goban.$default({
      path : 'https://ethercalc.org/',
      title : userPath || 'g0ban_intro',
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




