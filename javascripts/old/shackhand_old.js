var $$SKH = new SKH;

angular.module("shackhand",
        ['leaflet-directive','FBAngular','firebase','ezfb','ngStorage'])

    .service("$skhDefault", function($user){
        this.toDefaultIcon = function(zoomNow, whichGroup){
            zoomNow = parseInt(zoomNow);
            if (zoomNow <= 1) zoomNow = 10;

            var iconSize = $user.p.iconSize || [];
            var ii = (iconSize[whichGroup] || 60) * zoomNow / 5;

            return {
                iconUrl: 'module/src/images/200px-Smiley.svg.png',
                iconSize: [ii, ii],
                shadowUrl : '',// 'module/src/images/200px-Smiley.svg.png',
                shadowSize: [ii, ii],
            }
        }
    }).service("$SKH", SKH)
      .service('testService', function($rootScope, $http) {
        this.getJSON = function(url,cb) {
           $http.get(url).success(cb).
                error(function(data, status, headers, config) { console.lo(status)  });
            };

    }).provider('$user', function $userProvider() {
      var myP = {
        /* Default  */
      };

      this.initAll = function(userP) {
        myP = userP;
      };

      this.$get = ['$SKH', function $userFactory($SKH) {
        var p = angular.copy(myP);
                p.headers = p.headers || ['name','site'];
                p.lang = (p.lang || 'en');
                p.l = (p.l || {});
                p.toFlags = p.toFlags || [];
                p.toLabels = p.toLabels || [];
                p.logins = p.logins || [];
                p.latlngUsed = p.latlngUsed || [];
                p.hToM = (p.hToM || default_hToM);

                function toIcon (url, from, zoomNow, whichGroup) {
                   zoomNow = parseInt(zoomNow);
                  if (zoomNow <= 1) zoomNow = 10;                 

                   whichGroup = parseInt(whichGroup) || 0;
                   var iconSize = p.iconSize || [];
                   var layerIcons = p.layerIcons || [];
                  var ii = (iconSize[whichGroup] || 60) * zoomNow / 10;
                            
                   return { iconUrl: url,                    
                            iconSize: [ii, ii],
                            iconAnchor: [0,0],
                            labelAnchor: [0,0],
                            shadowAnchor: [10,10],
                            shadowUrl: layerIcons[whichGroup] || '', //module/src/images/200px-Smiley.svg.png',
                            shadowSize: [ii / 6, ii / 6]
                          };
                }

                function default_hToM (keys,h,i,llC,from,fbid,year,whichLable,whichGroup,zoomNow) {

                var key = keys[0];
                var nameKey = keys[1];
                var geoKey = keys[2];
                var hand = h;

                var layerIcons = p.layerIcons || [];

                if (!h.name) return;
                if (h.invis) return;

                if (hand.site && hand.site.indexOf('http') == -1 && hand.site.indexOf('@') == -1) hand.site = 'http://' + hand.site;
                hand.latlngColumn = hand.latlngColumn.replace('(','').replace(')','').replace('附近','').replace(/near\s?/,'');

                var fbIcon,googIcon,gitIcon,twitIcon,personIcon;

                if (hand.id || fbid) {
                    fbIcon = "http://graph.facebook.com/" + (hand.id || fbid) + "/picture";
                } else {  fbIcon = "";  }

                var icon = (h.img || h.icon || fbIcon || googIcon || gitIcon || twitIcon || personIcon || layerIcons[whichGroup]);
                h.icon = icon;

                var flag, label;

                flag = (p.toFlags[parseInt(whichGroup)] || toHackMapFlag || p.toFlags[0] || function () {return})(hand, i, icon, year);
                label = (p.toLabels[parseInt(whichGroup)] || //toHackMapLable ||
                                p.toLabels[0] || function () {return})(hand, i, icon, year, whichLable);


                if (key && key.length > 0) {
                    var re = new RegExp(('('+key+')').replace(/\s*(\s|or)\s*/gi, '|'), "gi");
                    if (flag.search(re) == -1 &&  
                            p.layers[parseInt(whichGroup)].search(re) == -1) {
                    
                            console.log('略過關鍵字不符者'); return;

                    } else {
                        flag = flag.replace(re, '<span class = "highlight">$1</span>');
                    }
                }
  //              console.log(h.name);
  //              console.log(llC);
            //      console.log(p.layerIcons);



                  var marker = {
                      lat: parseFloat(llC.split(/,\s*/)[0]),
                      lng: parseFloat(llC.split(/,\s*/)[1]),
                      layer: whichGroup,
                      message : flag,
                      h: h,
                      focus: false,
                      draggable: true,
                      hide: true,
              //        popupOptions: {
              //            autoPan: false
              //        },
                      label: {
                          message: label,
//                          options: {
//                              noHide: (label && label != ' ')
//                         }
                      },
                      icon: ((icon && toIcon(icon, (from || 0), zoomNow,  whichGroup))
                                     || $skhDefault.toDefaultIcon((zoomNow || 10), whichGroup)
                             )
                  }

                  return(marker);
            }


            function toHackMapFlag (shack, i, Icon, from) {

                    var middle = '';
                    for (var i = 0; i < p.headers.length; i++) {
                        if (shack[p.headers[i].n]) middle += '<br>' + p.headers[i].t + '：' + shack[p.headers[i].n] + '<br>'
                    };

                    return '<div class="flag">'
                                +((shack.site && '<a href = "'+$SKH.toHref(shack.site)+'" target = "_blank">'
                                  + '<img title = "' + shack.site
                                      +'"src = "http://www.google.com/s2/favicons?domain=' + shack.site +'">' ) || "")

                                +'<strong>'+ shack.name+'</strong></a><br />'

                                + middle


                                +'<hr>'
                                +( shack.note.replace(/\n/g, '<br>')|| "")+'<br />'
                                +'<hr>'

                                +((shack.site && '<a href = "'+$SKH.toHref(shack.site)+'" target = "_blank">'
                                  + '<img title = "' + shack.site
                                      +'"src = "http://www.google.com/s2/favicons?domain=' + shack.site +'">' ) || "")

                                +'<strong>'+ shack.name+'</strong></a><br />'

                            +'</div>';
                }
          console.log(p);
          return {p: p};
    }];
  });



function SKH() {
      this.year = new Date().getFullYear();
      this.has = function (val) {
              return (val && val != 'undefined');
      }
      this.toAge = function (str,year) {
          var age = (str && (year || this.year) - parseInt(str)) || '';
          return age;
      }
      this.toHref = function (str) {
          return (str.indexOf('http') > -1)? str : 'http://' + str;
      }
      this.isClose = function(l1, l2) {
              if (!l1 || !l2) return false;
              console.log(l2);
              return Math.pow(parseFloat(l1.split(',')[0]) - parseFloat(l2.split(',')[0]), 2) + Math.pow(parseFloat(l1.split(',')[0]) - parseFloat(l2.split(',')[0]), 2) < 0.0001;
      }
      this.modifyLatLng = function (latlngColumn, counter) {   //  "lat,lng"
          var lat = parseFloat(latlngColumn.split(',')[0]);
          var lng = parseFloat(latlngColumn.split(',')[1]);

          var r = counter / 1000 * 20;
          var theta = counter * Math.PI / 12;

          var lngOffSet = r * Math.cos(theta);    // x
          var latOffSet = r * Math.sin(theta) / 2;    // y

          return ((lat + latOffSet) + ',' + (lng + lngOffSet));
      }
}


/* DIRECTIVES */

angular.module("shackhand")
.directive('skhFblogin', function() {
      return {
          restrict: 'E',
          template: '<button id = "FBlogin" class="btn btn-primary" ng-click="login(\'facebook\')" ng-hide = "root.name">'
                      +'以Facebook登入'
                      +'</button>'
      }
  }).directive('skhFblogout', function() {
      return {
          restrict: 'E',
          template: '<button id = "FBlogin" class="btn btn-primary" ng-click="logout()" ng-show = "root.name">'
                      +'登出'
                      +'</button>'
      }
  })





//** FILTERS **//

///* TODO:  MOVE SOME FILTER FUNCTION TO FACTORY METHOD  *////

angular.module("shackhand")
    .filter('getKeys', getKeys)
    .filter('countDateDiff', countDateDiff)
    .filter('showTime', showTime)
    .filter('someFirst', someFirst)
    .filter('hideAncient',hideAncient)
    .filter('toMarkers', toMarkers)
    .filter('makeHref', makeHref)
    .filter('toWiki', toWiki)
    .filter('toList' ,toList)
    .filter('filterBy', filterBy);



/********/


function getKeys () {
  return function(obj) {
    return Object.keys(obj);
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



function someFirst() {
    return function(list, firstList){
        if (!list) return [];
        if (!firstList) return list;
        return list.sort(function(h){return $.inArray(h.id,firstList)});
    }
}

function hideAncient(){
    return function(list, hideAncient,year,from,to){
        if (hideAncient) list = list.filter(function(h){
            return (parseInt(h[from]) <= year && (year <= parseInt(h[to]) || !h[to] ))
        });

        return list;
    }
}

function toMarkers($SKH, $user) {
    return function (list, ks, maybeHideLatLng, expHand, year, whichLable, whichGroup, zoomNow) {
        var keys = [ks.key, ks.nameKey, ks.geoKey];
        var ms = [];
        var autos = angular.copy(list);
        var mllC = function(h){
          //重覆座標的解決  displacement algorithm
                var counter = 0;
                for (var j = 0; j < $user.p.latlngUsed.length; j++) {
                    if ($user.p.latlngUsed[j] == h.latlngColumn) counter++ ;
                };
                $user.p.latlngUsed.push(h.latlngColumn);
                var llC = "" + h.latlngColumn;
                if (counter > 0) llC = $SKH.modifyLatLng(h.latlngColumn, counter);
                return llC;
        }

        if (autos) {
            for (var i = 0; i < (autos.length || 0); i++) {
                var h = autos[i];

                if (!h) { console.log('略過空格'); continue; }

                if (maybeHideLatLng && $SKH.isClose(h.latlngColumn,maybeHideLatLng) && h.id != expHand.id) {
                    console.log('略過同地址'); continue;
                }

                var m = $user.p.hToM(keys,h,i,mllC(h),0,0,year,whichLable,whichGroup, zoomNow);

                if (m) ms.push(m);

            };
        }
        return ms;
    };
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

function toWiki(){
    return function(str,lang) {
            return 'http://'+(lang || 'zh')+'.wikipedia.org/wiki/'+str;
    }
}

function toList(){
    return function(obj) {
        if (!obj) return [];
        var array = $.map(obj, function(value, index) {
            return [value];
        });
        return array;
    }
}

function filterBy() {
    return function(list, key) {
        list = list || [];
        return list.filter(function(o){
            return Object.toString(o).indexOf(key) > -1
        })
    }
}