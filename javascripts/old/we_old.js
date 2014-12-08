

var weApp = angular.module('weApp', ['shackhand'])
    .config(function (ezfbProvider) {
            var myInitFunction = function ($window, $rootScope, $fbInitParams) {
                if (p.fbApp) $window.FB.init({ appId: '485195848253155'});
            }
    }).config(["$userProvider", function($userProvider) {
     $userProvider.initAll({
                    checkList: [['learner_role','自學生|自學家長|獨立教育工作者','角色需為「自學生」「自學家長」「獨立教育工作者」之組合']],
                    whiteList: ['site2','connect_me','learner_habit','ask','username'],
                    layers: ['自學朋友'
                    //,'自學社團','自學課程','團體自學'
                      ],
                    urls: ['https://shackhand-autolearn.firebaseio.com'
                       // ,
                       //    'https://ethercalc.org/learnClub',
                       //    'https://ethercalc.org/learnCourse',
                      //     'https://ethercalc.org/learnGroup'
                      ],
                    layerIcons: ['https://www.moedict.tw/人.png?font=wt006',
                           //     'https://www.moedict.tw/社.png?font=wt006',
                           //     'https://www.moedict.tw/課.png?font=wt006',
                           //     'https://www.moedict.tw/團.png?font=wt006'
                      ],
                    types: ['firebase', 'hackmap', 'hackmap', 'hackmap'],
                    logins:['facebook'],
                    toFlags: [toFlag],
                    toLabels: [toLabel],
                    listKeys: ['name','note','address','share','ask'], //'connect_me',
                 });
  }]);


  function toLabel (hand, i, Icon, year, whichLabel) {
      //console.log(whichLabel); 
      if (!whichLabel) return ' ';
      var lable = " ";

      switch (whichLabel) {
        case 'name':
            lable += ((hand.name && hand.name) || "");
            break;
        case 'freetime':
            lable += ((hand.freetime && hand.freetime) || "");
            break;
        case 'learner_type':
            lable += (($$SKH.has(hand.learner_type) && hand.learner_type) || '');
            break;
        case 'learner_habit':
            lable += (($$SKH.has(hand.learner_habit) && hand.learner_habit) || '');
            break;
        case 'share':
            lable += (($$SKH.has(hand.share) && hand.share) || '');
            break;
        case 'ask':
            lable += (($$SKH.has(hand.ask) && hand.ask) || '');
            break;
        case 'age':
            lable += ($$SKH.has(hand.learner_birth) && $$SKH.toAge(hand.learner_birth)+'歲' || '');
            break;
        case 'childAge':
            lable += (($$SKH.has(hand.child_birth2) && $$SKH.toAge(hand.child_birth2) +'歲') || '')
                      +(($$SKH.has(hand.child_birth2) && '~') || '')
                      +(($$SKH.has(hand.child_birth) && $$SKH.toAge(hand.child_birth) +'歲') || '');
            break;
        default:
            break;

      }


      if (!lable) lable = ' ';
      return lable;

   }

   function toFlag(hand, i, Icon) {
       var flag =  '<div class = "flag">'
                      + ((hand.username && '<a href = "http://www.facebook.com/'+hand.username+'" target = "_blank"> <img id = "fb" src="'+ Icon +'" />' ) || '')

                      +((!hand.username && hand.id && '<a href = "https://www.facebook.com/profile.php?id=' + hand.id +'" target = "_blank"><img id = "fb" src="'+ Icon +'" />' ) || '')

                      +'<strong>第'+ (i+1) +'位支持者：'+ hand.name+'</strong></a><br />'

                      +($$SKH.has(hand.learner_birth) && $$SKH.toAge(hand.learner_birth)+'歲的' || '')
                      +hand.learner_role
                      +(($$SKH.has(hand.learner_type) && '('+hand.learner_type+')') || '')

                      +(($$SKH.has(hand.child_birth) && '孩子' + $$SKH.toAge(hand.child_birth) +'歲') || '')
                      +(($$SKH.has(hand.child_birth2) && '~' + $$SKH.toAge(hand.child_birth2) +'歲') || '')

                      +'<br>&nbsp;&nbsp;&nbsp;&nbsp;住在&nbsp;&nbsp;'+
                      '<a href = "https://maps.google.com.tw/maps?hl=zh-TW&q='
                      +hand.address+'" target = "_blank">'+hand.address+'</a>&nbsp;&nbsp;附近<hr>'

                      +((hand.site && '<b>個人網站: </b><a href = "'+$$SKH.toHref(hand.site)+'" target = "_blank">'
                        + '<img title = "' + hand.site
                            +'"src = "http://www.google.com/s2/favicons?domain=' + hand.site +'">'
                        + '</a>') || "")

                      +((hand.site2 && '<b>社群網站: </b><a href = "'+$$SKH.toHref(hand.site2)+'" target = "_blank">'
                        + '<img title = "' + hand.site2
                            + '" src = "http://www.google.com/s2/favicons?domain=' + hand.site2 +'">'
                        + '</a>') || "")

                       +'<br />'
                      +'<b>比較有空的時段：</b>'+( hand.freetime || "")+'<br />'
                      +'<b>聯絡方式：</b>'+( hand.connect_me || "")+'<br />'
                      +'<a href="https://www.facebook.com/messages/' + hand.id + '"target="_blank">FB訊息</a><br/>'
                      +'<hr>'
                      +'<b>興趣包含：</b>'+( hand.learner_habit || "")+'<br />'
                      +'<b>可分享：</b>'+( hand.share || "")+'<br />'
                      +'<b>尋找：</b>'+( hand.ask || "")+'<br />'
                      +'<hr>'
                      +'<b>自我介紹：</b>'+(( hand.note && hand.note.replace(/\n/g, '<br>')) || "")+'<br />'
                      +'<hr>'
                      +'</div>';
          return flag;
   }


(function(d, s, id) {
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) return;
   js = d.createElement(s); js.id = id;
   js.src = "http://connect.facebook.net/zh_TW/all.js#xfbml=1&appId=485195848253155";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 $.post(
   'https://graph.facebook.com',
   {   id: location.href,
       scrape: true  }, function(response){
       console.log(response);
   }
 );  // FB API






 ///* TODO : CHANGE CONTROLLER INTO A FACTORY  *///


angular.module("shackhand")  .filter('toAge', function (){
     return function(y) { 
            console.log(y);  
            console.log(new Date().getFullYear() - parseInt(y));     
            return new Date().getFullYear() - parseInt(y);
        }
      })
    .controller('SKH-Ctrl', function($scope, $window,
               $skhDefault, $SKH,
                $user, leafletEvents,
                $firebase, $filter, $timeout,
                $http ){

            $scope.opts = [
                      {h:'album',l:'當我們同在一起',s:'臉譜'},
                      {h:'info',l:'在哪裡',s:'通訊'},
                      {h:'freetime',l:'有空嗎',s:'空閒'},
                      {h:'play',l:'找玩伴',s:'玩伴'},
                      {h:'share',l:'來學習',s:'學習'},
                      {h:'ask', l:'幫幫忙', s:'幫忙'},
                      {h:'map', l:'地圖',s:'地圖', d:1}
           ];

           //methods

           angular.extend($scope, {
              open: function(url){
                $window.open(url);
              },
              toAge: function(y){
                var ans = new Date().getFullYear() - parseInt(y);
                return ans;
              }
           })


        /* OLD  */


            $scope.frames = $user.p.frames || [];
            
            $scope.markers = [];
            $scope.root = {};
            $scope.events = {
                markers: {
                    enable: leafletEvents.getAvailableMarkerEvents(),
                }
            };

            $scope.eventDetected = "No events yet...";
            var markerEvents = leafletEvents.getAvailableMarkerEvents();
            for (var k in markerEvents){
                var eventName = 'leafletDirectiveMarker.' + markerEvents[k];
                $scope.$on(eventName, function(event, args){
        //            console.log(event);
        //            console.log(args);
                    $scope.eventDetected = event.name;
                    $scope.eventMarkerIndex = args.markerName;

        //            console.log($scope.markers[$scope.eventMarkerIndex]);

                    if ($scope.eventDetected == "leafletDirectiveMarker.mouseover"
                        || $scope.eventDetected == "leafletDirectiveMarker.popupopen") {

                       //     $scope.frameUrl = $scope.markers[$scope.eventMarkerIndex].site;
                            if ($scope.currentMarker != $scope.markers[$scope.eventMarkerIndex]) {
                                $scope.currentMarker = $scope.markers[$scope.eventMarkerIndex];

                                $("#skh-frame1").children('iframe').attr("src",$scope.currentMarker.h.site || ($user.p.frames && $user.p.frames[1]) || '');
                            }
                    }

                    if ($scope.eventDetected == "leafletDirectiveMarker.popupopen") {
                        $scope.toggleWatch($scope.currentMarker.h,'name',1);
                    }


//                    if ($scope.eventDetected == "leafletDirectiveMarker.popupopen") console.log("beep");

                });
            }

            // for history map
            $scope.year = $SKH.year;
            $scope.speed = 0;
            $scope.from = ($user.p.from || 'birth');
            $scope.to = ($user.p.to ||'death');
            /*****  ***/


            $scope.onTimeout = function(){

                if ($user.p.movie) {

                    if (!$scope.pause) $scope.year += $scope.speed;

                    $scope.markers = [];
                    $scope.clearMarker();
                    $scope.makeMarkers();

                    $(".leaflet-marker-icon").hover(
                        function(){$(this).css('z-index', 999999)},
                        function(){$(this).css('z-index', 100008)});
                }

                $scope.left = (($scope.left || 0) - 32) % 128;
                $('#skh-sprite').css('left', $scope.left + 'px');

                mytimeout = $timeout($scope.onTimeout,1000);
            }

            var mytimeout = $timeout($scope.onTimeout,1000);

            $scope.lang = $user.p.lang || navigator.language || navigator.userLanguage || '"zh-tw"';
            $scope.listKeys = $user.p.listKeys;
            $scope.listKeyNames = $user.p.listKeyNames;



            angular.extend($scope, {
                center: {
                    autoDiscover: true,
                    lat: ($user.p.lat || 24.704894502324912),
                    lng: ($user.p.lng || 121.19355468749999),
                    zoom: $user.p.zoom || ($(window).width() < 480 && 12) || 10
                },

                local: {
          //          autoDiscover: true,
                    lat: 23.704894502324912,
                    lng: 120.89355468749999,
                    zoom: $user.p.zoom || ($(window).width() < 480 && 12) || 10
                },

                taiwan: {
                    lat: 23.704894502324912,
                    lng: 120.89355468749999,
                    zoom: 7,
                },

                eagle: ($user.p.eagle || {
                    lat: 23.704894502324912,
                    lng: 120.89355468749999,
                    zoom: 7
                }),

                layers: {
                    baselayers: {
                        openStreetMap: {
                            name: 'OpenStreetMap',
                            type: 'xyz',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        }
                    },
                    overlays: {
                    }
                },

                toggleLayer: function(type) {
                    $scope.layers.overlays[type].visible = !$scope.layers.overlays[type].visible;
                }

            });

                    if ($user.p.eagle) {
                        $scope.center = $scope.eagle;
                    } 


            $scope.$watch('center.zoom', function(newValue, oldValue) {
               if (newValue != oldValue) {
                  $scope.clearMarker();
                  $scope.makeMarkers();
     //                   $scope.shiftMarkers();
                 }
            });

            $scope.bindHash = function(){            
                    location.hash = '#' + ($scope.loc || '') 
                                  + '#' +  ($scope.key || '');
            }

            $scope.$watch('loc', function(newValue,oldValue) {
                if (newValue != oldValue) {
                        $scope.bindHash();
                }
            })

            $scope.$watch('key', function(newValue,oldValue) {
                if (newValue != oldValue) {
                        $scope.bindHash();
                }
            })

    /*      $scope.shiftMarkers = function(){
                for (var i = 0; i < $scope.markers.length; i++) {
                    $scope.markers[i].icon.iconSize = $scope.markers[i].icon.iconSize;
                };
            }  */

            $scope.clearMarker = function(){
                $scope.markers = [];
                $('leaflet-marker-icon').hide();
                $user.p.latlngUsed = [];

            }

            $scope.makeMarkers = function(maybeHideLatLng, expHand){
                var ks = {
                    key : $scope.key,
                    nameKey: $scope.nameKey,
                    geoKey: $scope.geoKey
                }

                $scope.markers = $scope.markers || [];

                for (var i = 0; i < $user.p.layers.length; i++) {

                    if (!$scope.base || !$scope.base ) continue;

                    var show = $filter('hideAncient')($scope.base.hands,$scope.hideAncient,$scope.year,$scope.from,$scope.to);

                    $scope.markers = $scope.markers.concat(($filter('toMarkers')(show, ks, maybeHideLatLng,
                                        expHand,$scope.year,$scope.whichLable, "" + i,
                                          $scope.center.zoom )));
                };
            };

            $scope.askGeo = function(place){

                if (place == '?') place = prompt("您在哪兒呢?", $user.p.at || '');

                if (place) {
                    $scope.loc = place;
                } else {
                    return;
                }

                $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select+%2A+from+geo.placefinder+where+text%3D%22"+ encodeURI(place) +"%22+and+locale%3D%22zh_TW%22&format=json", function( d ) {
            //        console.log(d);
                    var lat, lng;

                    try {
                     lat = d.query.results.Result[0].latitude;
                     lng = d.query.results.Result[0].longitude;
                    } catch(err) { }

                    if (!lat || !lng) {
                        try {
                         lat = d.query.results.Result.latitude;
                         lng = d.query.results.Result.longitude;
                        } catch(err) {  }
                    }

                    if (lat) $scope.local.lat = parseFloat(lat);
                    if (lng) $scope.local.lng = parseFloat(lng);
                    if (lat) $scope.local.zoom = $user.p.zoom || 13;

               //     if ($user.p.eagle) {
               //         $scope.center = $scope.eagle;
               //     } else {
                      $scope.center = $scope.local;
               //     }

                    $scope.$apply();
                });
            };


            var h = location.hash.split(/#\/?/);

               $scope.key = decodeURI(h[2] || '') || $user.p.key || '';
               $scope.loc = decodeURI(h[1] || '') || $user.p.at || '';

                if (h && h.length > 1) {
                    $timeout(function(){
                        var firstMapOffset = ($("#local").position() && $("#local").position().top)
                         || ($("#eagle").position() && $("#eagle").position().top) || 0;

                    //    $("body,html").animate({scrollTop:firstMapOffset + 50}, "slow");
                    }, 2000);
                }

            $scope.askGeo($scope.loc);

            $scope.base = {hands: [], shacks: []};

/*    */

            function makeLayer(n) {
                var title = $user.p.layers[n];
                var type = $user.p.types[n];
                var url = $user.p.urls[n];
                var login = ($user.p.logins && $user.p.logins[n]) || undefined;
                var toFlag = ($user.p.toFalgs && $user.p.toFlags[n]) || undefined;
                var toLabel = ($user.p.toLables && $user.p.toLables[n]) || undefined;
                var visible;  try {visible = p.visibles[n]} catch(err) {};

                $scope.layers.overlays = $scope.layers.overlays || {};
                $scope.layers.overlays[n] = {
                            type: 'group',
                            name: (title || 'hands'),
                            visible: (visible || true)
                        };
                  // for backend firebase

                  /* maybe Bug here */

                if (type == 'firebase') {

                    $scope.dataRefs = $scope.dataRefs || [];
                    $scope.dataRefs[n] = new Firebase(url);

                    $scope.bases = $scope.bases || [];
                    $scope.bases[n] = $firebase($scope.dataRefs[n]);


                    // create a synchronized object, all server changes are downloaded in realtime
                    var profileObject = $scope.bases[n].$asObject();

                    // set up 3-way data-binding
                    profileObject.$bindTo($scope, "base");

                } 

                //for backend static jsons
                if (type == 'json') {
                            $.getJSON(url,function(data){
                                    $scope.bases = $scope.bases || [];
                                    $scope.bases[n].hands = data;
                            });
                }

                //for backend ethercalc using hackfoler format ==> hackmap
                if (type == 'hackmap') {
                    var hackmap = url;

                    /*  get the .CSV data  ==>  auto complete latlng ==> POST back   */                   

                            $http({
                                method: "GET",
                                url: hackmap + '.csv',
                                dataType: "text"})
                                    .success(function(data) { 
                                          console.log(data);
                                          $scope.bases = $scope.bases || [];
                                          $scope.bases[n] = {hands: processHackMapData(data, url)};
                                          
                                          $timeout(function(){
                                                        $scope.clearMarker();
                                                        $scope.makeMarkers();
                                                    }, 1000);
                                        })
                                    .error(function(XMLHttpRequest, textStatus, errorThrown){

                                        console.log("Status: " + textStatus);
                                        console.log("Error: " + errorThrown); 

                                    });

                }  /* type end */


                if (type == 'ethercalc') {

                    /*  get the .CSV data  ==>  auto complete latlng ==> POST back   */  

                   $http({
                        method: "GET",
                        url: url + '.csv',
                        dataType: "text"})
                          .success(function(data) { 
                              console.log(data);
                              $scope.bases = $scope.bases || [];
                              $scope.bases[n] = {hands: processEthercalcData(data, url)};                             

                              
                              $timeout(function(){
                                            $scope.clearMarker();
                                            $scope.makeMarkers();
                                        }, 1000);

                            })
                        .error(function(XMLHttpRequest, textStatus, errorThrown){

                                console.log("Status: " + textStatus);
                                console.log("Error: " + errorThrown); 
                        });

                }


                function setElem (url,cell,text) {     // "https://ethercalc.org/_/farmer", A1, "mewMew"

                            var hackUrl = url.replace(/([^\/])\/([^\/])/, '$1'+ '/_/' +'$2');

                            $.ajax({
                                url: hackUrl,
                                type: 'POST',
                                dataType: 'application/json',
                                contentType: 'text/plain',
                                processData: false,
                                data: ('set ' + cell +' text t ' + text)
                            });

                }

                function backfire(url, shack, colNum) {

                        $http.get("http://query.yahooapis.com/v1/public/yql?q=select+%2A+from+geo.placefinder+where+text%3D%22"
                         + encodeURI(shack.address.replace(/\s/g,'')) +"%22+and+locale%3D%22zh_TW%22&format=json").success(function( d ) {

                            var lat, lng;

                            try {
                             lat = d.query.results.Result[0].latitude;
                             lng = d.query.results.Result[0].longitude;
                            } catch(err) { }

                            if (!lat || !lng) {
                                try {
                                 lat = d.query.results.Result.latitude;
                                 lng = d.query.results.Result.longitude;
                                } catch(err) {  }
                            }

                            if (lat && lng) {
                                var backfireData = parseFloat(lat) + '?? ' + parseFloat(lng);

                                
                                setElem(url,
['A','B','C','D','E','F','G','H','I','J'][colNum || 6] + (shack.n + 1) , backfireData); // to Ethercalc

                            }
                        });
                    }


                function processHackMapData (allText, url) {
                        var allTextLines = allText.split(/\r\n|\n/);
                        var headers = allTextLines[0].split(',');
                        var list = [];
                        for (var i=2; i < allTextLines.length; i++) {
                            var datas = allTextLines[i].replace(/(\d+)\,\s?(\d+)/, '$1?? $2').split(',');
                            var shack = {
                                         n: i,
                                         site: datas[0],
                                         name: (datas[1] && datas[1].replace(/"/g,'')) || '',
                                         address: datas[5],
                                         latlngColumn: (datas[6] && datas[6].replace(/\?\?\s?/,',').replace(/"/g,'')) || '',
                                         freetime: datas[7] || '',
                                         note: ((datas[3] && datas[3].split(':')[0].replace(';',':')+'<hr>') || '') + datas[4]
                                     };

                            for (var k = 0; k < headers.length; k++) {
                                if (headers[k]) shack[headers[k]] = datas[k];
                            };

                            if (shack.address) {
                                    if (!shack.latlngColumn) {                                      
                                        backfire(url, shack);
                                } else {
                                    list.push(shack);
                                }
                            }
                        }
                        return list;
                    }

                    function processEthercalcData(allText,url){
                        var allTextLines = allText.split(/\r\n|\n/);
                        var headers = allTextLines[0].split(',');
                        var latlngColumnNum = headers.indexOf('latlngColumn');
                            if (latlngColumnNum == -1) latlngColumnNum = undefined;
                        var list = []; 

                        for (var i=2; i < allTextLines.length; i++) {
                            if (!allTextLines[i]) continue;

                            var datas = allTextLines[i].replace(/(\d+)\,\s?(\d+\.\d+)/, '$1?? $2').split(',');
                            var shack = { n: i };

                            for (var k = 0; k < headers.length; k++) {

                                console.log(headers[k]);
                                console.log(datas[k]);

                                if (k == latlngColumnNum) {
                                    shack[headers[k]] = (datas[k] || "").replace(/\?\?\s?/,',').replace(/"/g,'') || '';
                                

                                console.log("happy");
                                console.log(shack[headers[k]]);

                                } else {
                                    if (headers[k]) shack[headers[k]] = datas[k];
                                }

                                console.log(shack[headers[k]]);
                            };


                            if (shack.address) {
                                if (!shack.latlngColumn) {                                 
                                        backfire(url, shack, latlngColumnNum);
                                } else {
                                    list.push(shack);
                                }
                            }
                        }
                        return list;
                    }

            }

        for (var i = 0; i < $user.p.layers.length; i++) {       
                makeLayer(i);
        };







        if ($user.p.ethercalcs) {
            /*  getAll  CSV  datas ==>  auto complete latlng ==> POST back   */
        }


        //for backend static csvs
        if ($user.p.csvs) {
            var myCsvs = $user.p.csvs || [];
       //     if (p.ethercalc) myCsvs.unshift(p.ethercalc);

            function processCsvData (allText) {
            //    console.log(allText);
                var list = [];
                var allTextLines = allText.split(/\r\n|\n/);
                var headers = allTextLines[0].split(',');

                for (var i=1; i < allTextLines.length; i++) {
                    var datas = allTextLines[i].replace(/(\d+)\,\s?(\d+)/, '$1?? $2').split(',');
                    if (datas.length == headers.length) {
                        var hand = {};
                        for (var j=0; j < headers.length; j++) {
                            if (headers[j] == 'latlngColumn') datas[j] = datas[j].replace(/\?\?\s?/,',') .replace(/"/g,'');
                            hand[headers[j]] = datas[j];
                        };
                        list.push(hand);
                    }
                }
                return list;
            }

            for (var i = 0; i < myCsvs.length; i++) {
                $.ajax({
                type: "GET",
                url: myCsvs[i],
                dataType: "text",
                    success: function(data) {
                      $scope.base.hands = $scope.base.hands.concat(processCsvData(data));
                      $scope.clearMarker();
                      $scope.makeMarkers();
                    }
                 });
            };
        }
           $scope.qWatch = function(obj,q) {
              q = q || 'name';
              return !($scope.myWatches.map(function(t){return t[q]}).indexOf(obj[q]) == -1);
           }

            $scope.toggleWatch = function(obj, q, sure) {
               if (!$scope.qWatch(obj,q)) {
                 $scope.myWatches.push(obj);
               } else {
                  if (!sure) {
                        $scope.myWatches.remove(obj);
                    }
               }
            }

            $scope.clearWatch = function(){
                while($scope.myWatches.length) {
                    $scope.myWatches.remove($scope.myWatches[0]);
                    $scope.center.zoom -= 3;
                }
            }

        $scope.focus = function(hand) {

            var firstMapOffset = ($("#local").position() && $("#local").position().top)
                     || ($("#eagle").position() && $("#eagle").position().top) || 0;

            $("body,html").animate({scrollTop:firstMapOffset}, "slow");

            $scope.toggleWatch(hand, 'name', 1);

            if (!hand) return;

            $scope.center = $scope.local;

            $scope.local.lat = parseFloat(hand.latlngColumn.split(',')[0]);
            $scope.local.lng = parseFloat(hand.latlngColumn.split(',')[1]);
            $scope.local.zoom = 13;

                $scope.eagle.lat = parseFloat(hand.latlngColumn.split(',')[0]);
                $scope.eagle.lng = parseFloat(hand.latlngColumn.split(',')[1]);

            $scope.key = "";
            $scope.nameKey = "";
            $scope.geoKey = "";

            $scope.top = 0;
            $scope.left = 0;

            if($user.p.movie) {
                $scope.hideAncient = true;
                $scope.year = parseInt(hand[$scope.from]) + 15;
            }
            $scope.toggleFollow(hand);
        }

        $scope.checkLatLng = function(add,n,k) {

             $http.get("http://query.yahooapis.com/v1/public/yql?q=select+%2A+from+geo.placefinder+where+text%3D%22"+ add +"%22+and+locale%3D%22zh_TW%22&format=json").success(function( d ) {

                var lat, lng;

                try {
                 lat = d.query.results.Result[0].latitude;
                 lng = d.query.results.Result[0].longitude;
                } catch(err) { console.log(err) }

                if (!lat || !lng) {
                    try {
                     lat = d.query.results.Result.latitude;
                     lng = d.query.results.Result.longitude;
                    } catch(err) { console.log(err) }
                }

                if (k) { $scope.root.friends[k].latlngColumn = lat+','+lng }
                    else { $scope.root.latlngColumn = lat+','+lng }
                if ($scope.markers[n]) $scope.markers[n].lat = parseFloat(lat);
                if ($scope.markers[n]) $scope.markers[n].lng = parseFloat(lng);

                $scope.local.lat = parseFloat(lat);
                $scope.local.lng = parseFloat(lng);

            });
        }

        $scope.login = function (serviceProvider) {
            $scope.status = '資料讀取中...請稍候';
            for (var i = 0; i < $user.p.layers.length; i++) {

                if ($user.p.logins[i] != serviceProvider) continue;
                if (serviceProvider == 'facebook') {

                    auth = new FirebaseSimpleLogin($scope.dataRefs[i], function(error, user) {

                          if (error) {
                            // an error occurred while attempting login
                            console.log(error);
                          } else if (user) {

                            var data = user.thirdPartyUserData;

                                $scope.root.site = data.link;
                                $scope.root.note = data.bio;

                                if (data.hometown && data.hometown.name) $scope.root.hometown = data.hometown.name;
                                $scope.root.id = data.id;
                                $scope.root.username = data.username;

                                $timeout(function(){
                                         if (data.hometown && data.hometown.name) $scope.root.hometown = data.hometown.name;
                                        $scope.root.id = data.id;
                                        $scope.root.username = data.username;
                                },2000);
                                $scope.status = '讀取完畢!請修改後發佈';
                                if ($scope.root.hometown) $scope.askGeo($scope.root.hometown);

                            $http.get('http://graph.facebook.com/' + user.id).success(function(d){
                                console.log(d);
                                $scope.ttName = d.name + "";
                                $scope.root.name = d.name + "";

                               for (var i = 0; i < $scope.base.hands.length; i++) {

                                    if (!$scope.base.hands[i]) continue;
                                    if ($scope.base.hands[i].id == data.id || ( !$scope.base.hands[i].id && $scope.base.hands[i].name && $scope.base.hands[i].name == $scope.root.name) )  {

                                        var usrNameBuf = $scope.root.username +"";
                                        var idBuf = $scope.root.id +"";
                                        var htBuf = $scope.root.hometown +"";

                                        $scope.root = angular.copy($scope.base.hands[i]);
                                        $scope.root.invis = false;
                                        $scope.root.username = usrNameBuf;
                                        $scope.root.id = idBuf;
                                        $scope.root.hometown = htBuf;
                                        $scope.n = i;
                                        $scope.imp = true;
                                        $scope.loc = angular.copy($scope.root.address);
                                    
                                        $scope.myH = $scope.root;
                                    
                                        $scope.$apply();

                                    }
                                };
                            });

                          } else {
                            console.log('user is logged out');
                            // user is logged out
                          }
                    });

                    auth.login('facebook', {
                      rememberMe: true,
                 //     scope: 'email'
                    });
                }
            }
        };

        $scope.logout = function () {
            auth.logout();
            $scope.root = new Object;
            $scope.n = $scope.base.hands.length;
        }

        $scope.out = function () {
            if (confirm("確定要移除旗幟??這將會讓許多朋友失去一條找到您的路。")) {

//                  $scope.base.$child('hands').$child($scope.n).$child('invis').$set(true);
                $scope.base.$child('hands').$child($scope.n).$remove();

                for (var i = $scope.n; i < $scope.base.hands.length - 1; i++) {
                    $scope.base.$child('hands').$child(i).$set(angular.copy($scope.base.hands[i+1]));
                };

                $scope.base.$child('hands').$child($scope.base.hands.length - 1).$remove();

                $scope.root = new Object;
                $scope.status = "";
            }
        }

        $scope.submit = function (verb,target) {

            if (!target) target = 0;

            $http.get("http://query.yahooapis.com/v1/public/yql?q=select+%2A+from+geo.placefinder+where+text%3D%22"+ $scope.root.address +"%22+and+locale%3D%22zh_TW%22&format=json")
                .success(function( d ) {

                var whiteList = $user.p.whiteList || [];
                var checkList = $user.p.checkList || [];

                var lat;
                var lng;

                try {
                 lat = d.query.results.Result[0].latitude;
                 lng = d.query.results.Result[0].longitude;
                } catch(err) { console.log(err) }

                if (!lat || !lng) {
                    try {
                     lat = d.query.results.Result.latitude;
                     lng = d.query.results.Result.longitude;
                    } catch(err) { console.log(err) }
                }

                $scope.root.latlngColumn = lat+','+lng;
                console.log($scope.root.latlngColumn);

                if (!$scope.root.latlngColumn || $scope.root.latlngColumn == 'undefined,undefined') {
                    window.alert('地址查找不到座標，請調整一下');
                    return;
                }

                var n = $scope.n;

                if (!$scope.base.hands ||
                    !$scope.base.hands[n] ||
                    $scope.base.hands[n].id == $scope.root.id ||
                    $scope.base.hands[n].name == $scope.root.name ||
                    $scope.base.hands[n].username == $scope.root.username)  {


                    if (checkList) {
                        for (var i = 0; i < checkList.length; i++) {

                            var x = checkList[i][0];
                            var y = checkList[i][1];
                            var z = checkList[i][2];

                            var re = new RegExp(y,"g");
                            if ($scope.root[x] && $scope.root[x].search(re) == -1) {
                                window.alert(z);
                                return;
                            }
                        };
                    }

                    for (var i = 0; i < whiteList.length; i++) {
                        var w = whiteList[i];
                            if (!$scope.root[w] || $scope.root[w] == 'undefined') $scope.root[w] = "";
                    };

                 //   console.log($scope.base.hands[n]);
                    var ks = Object.keys($scope.root);

                    for (var i = 0; i < ks.length; i++) {
                        if (typeof($scope.root[ks[i]]) == 'undefined') {
                            $scope.root[ks[i]] = false;
                        }
                    };


                    $scope.root.lastUpdate = new Date().getTime();

        //            $scope.base.hands.$update("n", angular.copy($scope.root));
                    $scope.base.hands[n] = angular.copy($scope.root);

                    var a = "成功!!歡迎隨時回來更新!!";
                    
                    window.alert((verb + a) || a);

                } else {
                    window.alert("抱歉，出了未知的問題");
                }
        });
    }
});

