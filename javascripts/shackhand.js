
angular.module('shackhand',['FBAngular','firebase','ezfb','leaflet-directive'])
    .filter('countDateDiff', countDateDiff)
    .filter('showTime', showTime)
    .filter('makeHref', makeHref)
    .filter('searchBy', searchBy)
    .filter('nullToZero', nullToZero)
.directive('skhFblogout', myFbLogOut);

function nullToZero() {
    return function(list,k) {
        return list.map(function(o){
            o[k] = o[k] || 0;
            return o;
        })
    }
}


function searchBy(){
    return function(l,k){
        if (!k) return l;
        return l.filter(function(o){
            return (o.name + o.address + o.note + o.share + o.ask).indexOf(k) > -1})
    }
}


function countDateDiff () {
    return function(num){
        if (!num) return '';
        var ans = new Date(num).toLocaleDateString();
        return ans;
    }
}


function showTime(){
      return function(n){
        return n;   //  暫時

        /// *  TODO  *///
        var sec = Math.floor(n / 1000);
        var min = Math.floor(sec / 60);
        var hour = Math.floor(min / 60);
        var day = Math.floor(hour / 24);
        var week = Math.floor(day / 7);
        var month = Math.floor(week / 4.2);
        var year = Math.floor(month / 12);

        return  test([Math.floor(year),'年']) || 
                test([Math.floor(month),'月']) || 
                test([Math.floor(week),'週']) || 
                test([Math.floor(day),'天']) || 
                test([Math.floor(hour),'小時']) || 
                test([Math.floor(min),'分鐘']) || 
                test([Math.floor(sec),'秒']) || [0,'秒']
      }
}



function makeHref (){
    return function(str) {
        if (!str) return "";
        var ans = "" + str;
        if (str.indexOf('http://') == -1) {
            ans = 'http://' + str;
        }
        ans = ans.replace('https://','');
        return ans;
    }
}





function myFbLogOut() {
      return {
          restrict: 'E',
          template: '<button id = "FBlogin" class="btn btn-primary" ng-click="logout()" ng-show = "root.name">'
                      +'登出'
                      +'</button>'
      }
}