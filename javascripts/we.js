angular.module('weApp', ['shackhand'])
    .config(function (ezfbProvider) {
            var myInitFunction = function ($window, $rootScope, $fbInitParams) {
                if (p.fbApp) $window.FB.init({ appId: '485195848253155'});
            }
    })
    .filter('toArray', function(){return toArray})
  .controller('SKH-Ctrl', ['$scope','$firebase', '$http','$window', myCtrl]);


function toArray(obj) {
    if (typeof(obj) == 'array') return obj; 
    if (!obj || typeof(obj) != 'object') return [];
    var array = [];
    var keys = Object.keys(obj);        
    for (var i = 0; i < keys.length; i++) {
        var o = obj[keys[i]];
        if (typeof(o) == 'object' && o) array.push(obj[keys[i]]);
    };
    return array;
}

function myCtrl($scope, $firebase, $http, $window){
  //models
  angular.extend($scope,{
    myH : {},
    myLastH : {},
    taiwanCenter: { //LEAFLET
        lat: 23.7,
        lng: 121.1,
        zoom: 7
    },
    markers : [],//LEAFLET,
    events: {  //LEAFLET
        map: {
            enable: ['zoomstart', 'drag', 'click', 'mousemove'],
            logic: 'emit'
        }
    },
    url : 'https://shackhand-autolearn.firebaseio.com/hands', //FIREBASE
    dataRef : '', //FIREBASE
    firebase : '',
    profileObject: '', //FIREBASE
    baseHands : [], // FIREBASE

    
    auth : '', // FIREBASE SIMPLE LOGIN
    root : {}, // CURRENT USER
    n : -1,   // CURRENT USER'S INDEX OF HANDS
    myOrd : 'lastUpdate',  // ORDER BY
    mySearch : '',  // SEARCH BY
    myRev: 1,
    opts : [
                      {h:'album',l:'當我們同在一起',s:'同在一起',g:'社群'},
                      {h:'map', l:'看地圖',s:'地圖',g:'在地'},
                      {h:'info',l:'在哪裡',s:'地址',g:'在地'},
                      {h:'freetime',l:'有空嗎',s:'有空',g:'交友'},
                      {h:'play',l:'找玩伴',s:'玩伴',g:'交友'},
                      {h:'share',l:'同分享',s:'分享',g:'互助'},
                      {h:'ask', l:'幫幫忙', s:'幫忙',g:'互助'},
                      {h:'personal', l:'我的互助',s:'我的互助',g:'參與'}
                    //{h:'suggest', l:'介紹',s:'介紹',g:'介紹'}
                    
           ],
    isLoggedIn : false,
    isJoined : false,
    isLoading : false,
    myAddress : '',
    local : {} // MAP CENTER
  })


  //methods

  angular.extend($scope, {

        fullWidth: function(){
          return $window.innerWidth;
        },

        halfHeight: function(){
          return $window.innerHeight * 0.67;
        },

        viewH : function(){
          $scope.myH = $scope.myH || new Object;
          $scope.myLastH = $scope.myLastH || new Object;
         
          if ($scope.myH.name) return $scope.myH;
          if ($scope.myLastH.name) return $scope.myLastH;
          return {};
        },
        open: function(url){
                $window.open(url);
        },

        checkLatLng: function(add,n) {
 //         console.log(add);
 //         console.log(n);

             $http.get("http://maps.google.com/maps/api/geocode/json?address="
                + add + ",+CA&sensor=false")
              .success(function( d ) {
                var lat, lng;
//                console.log(d);
                try {
                 lat = d.results[0].geometry.location.lat;
                 lng = d.results[0].geometry.location.lng;
                } catch(err) { console.log(err) }
                if (!lat || !lng) {
                    try {
                     lat = d.query.results.Result.latitude;
                     lng = d.query.results.Result.longitude;
                    } catch(err) { console.log(err) }
                }
                $scope.root.latlngColumn = lat+','+lng
             
                $scope.local.lat = parseFloat(lat);
                $scope.local.lng = parseFloat(lng);
            });
        },

        toAge: function(y){
          var ans = new Date().getFullYear() - parseInt(y);
          return ans;
        },

        toArray: toArray,

        bindMarkers :function(){
          $scope.markers = $scope.toArray($scope.baseHands)
          .filter(function(o){return o && o.latlngColumn})
          .map(function(h, index){
                    var m = {
                      lat: parseFloat(h.latlngColumn.split(',')[0]),
                      lng: parseFloat(h.latlngColumn.split(',')[1]),

                      message: h.name,
                      focus: false,
                      draggable: false,

                      icon: {
                        iconUrl: "http://graph.facebook.com/"+(h.fbid || h.id)+"/picture",            
                        iconSize: [40, 40]
                      }
                    };
                    /*** h to LeafLet Markers  ***/
                    return m;
                  });                     
        },

        submit: function (verb) {

                if (!$scope.root.latlngColumn || $scope.root.latlngColumn == 'undefined,undefined') {
                    window.alert('地址查找不到座標，請調整一下');
                    return;
                }
                
                var n = $scope.n;

                if (!$scope.baseHands || !$scope.baseHands[n] ||
                    $scope.baseHands[n].id == $scope.root.id ||
                    $scope.baseHands[n].name == $scope.root.name ||
                    $scope.baseHands[n].username == $scope.root.username)  {
                    var ks = Object.keys($scope.root);
                    for (var i = 0; i < ks.length; i++) {
                        if (typeof($scope.root[ks[i]]) == 'undefined') {
                            $scope.root[ks[i]] = false;
                        }
                    };

                    $scope.root.lastUpdate = new Date().getTime();

                      if (n == -1) {
                        $scope.n = $scope.profileArray.length;
                        $scope.firebase.$set($scope.n,
                                     angular.copy($scope.root))
                            .then(function(ref) {
                              console.log("created:" + ref.key());   // n
                            }, function(error) {
                              console.log("Error:", error);
                            });

                      } else {
                            console.log(n);

                          // change a message and save it
     // DOC SEE HERE: https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray-saverecordorindex

                          $scope.profileArray[n] = angular.copy($scope.root);
                          $scope.profileArray.$save(n).then(function(ref) {
                                console.log("updated:" + n);
                          });
                      }

                    var a = "成功!!歡迎隨時回來更新!!";                    
                    window.alert((verb + a) || a);
                } else {
                    window.alert("抱歉，出了未知的問題，請在錯誤回報上描述您遇到的情況，我們會盡快維修");
                    window.open("https://hackpad.com/gZL8jQ3iwgI#:h=錯誤回報");
                }
        },

        leaveOut : function(){
            $scope.firebase.$remove($scope.n);
            $scope.auth.logout();
            $scope.root = new Object;
            $scope.n = -1;
        },

        login : function (serviceProvider) {
            if($scope.isLoggedIn) {
              console.log("already logged in");
              return;
            }
            $scope.isLoading = true;
            if (serviceProvider == 'facebook') {
                $scope.auth = new FirebaseSimpleLogin($scope.dataRef, function(error, user) {
                    if (error) {
                      console.log('Authentication error: ', error);
                    } else if (user) {

                        console.log("Logged in as: " + user.uid);
                        var data = user.thirdPartyUserData;
                          angular.extend($scope.root, {
                            site : data.link,
                            id : data.id,
                            name : data.first_name
                          })

                        console.log(data);
                        console.log($scope.toArray($scope.baseHands));

                         for (var i = 0; i < $scope.toArray($scope.baseHands).length; i++) {
                              if (!$scope.baseHands[i]) continue;
                              if ($scope.baseHands[i].id == data.id || 
                                ( !$scope.baseHands[i].id 
                                  && $scope.baseHands[i].first_name
                                  && $scope.baseHands[i].first_name == $scope.root.name) )  {
                                  angular.extend($scope.root, $scope.baseHands[i]);
                                    
                                  $scope.isLoggedIn = true;
                                  $scope.myAddress = angular.copy($scope.root.address);
                                  $scope.n = i;

                                  $scope.myLastH = $scope.baseHands[i];
                                  $scope.myH = $scope.baseHands[i];
                        
                                  console.log(i);
                              
                              }
                          };
                          $scope.isLoading = false;

                      } else {
                      console.log("User is logged out.")
                    }
                });
                $scope.auth.login('facebook', {
                  rememberMe: true,   
                });
            }
        }
    });

   
  /* FIREBASE */
    $scope.dataRef = new Firebase($scope.url);
     // create a synchronized object, all server changes are downloaded in realtime

    $scope.firebase = $firebase($scope.dataRef);
  
    $scope.profileArray = $scope.firebase.$asArray();
    $scope.baseHands = $scope.profileArray;


//    $scope.profileObject = $scope.firebase.$asObject();
      // set up 3-way data-binding
//    $scope.profileObject.$bindTo($scope, "baseHands");



  /*  LEAFLET */

    $scope.$on('leafletDirectiveMarker.click', function(event,args){
        console.log(args);
        $scope.baseHands[args.markerName]
        $scope.myLastH = $scope.baseHands[args.markerName];
        $scope.v = 2;
    });

    $scope.$on('leafletDirectiveMarker.mouseover', function(event,args){
        console.log(args);
        $scope.myH = $scope.baseHands[args.markerName];
    });


}





