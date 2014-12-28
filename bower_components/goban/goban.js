// Generated by LiveScript 1.3.1
(function(){
  var toIndex, myHash, myGobanAnimate, myGoban;
  toIndex = function(){
    return function(list){
      var i$, to$, results$ = [];
      if (!list) {
        list = [];
      }
      for (i$ = 0, to$ = list.length - 1; i$ <= to$; ++i$) {
        results$.push(i$);
      }
      return results$;
    };
  };
  myHash = function(){
    return {
      data: location.hash,
      asArray: function(){
        return this.data.replace('#', '').split('&');
      },
      upDateFromArray: function(list){
        location.hash = '#' + list.join('&');
      }
    };
  };
  myGobanAnimate = function(){
    var GobanAnimate;
    GobanAnimate = new Object;
    angular.extend(GobanAnimate, {
      delay: 0
    });
    return GobanAnimate;
  };
  myGoban = function($rootScope, $http, $sce, $hash, $GobanAnimate, $timeout){
    var goban;
    goban = new Object;
    angular.extend(goban, {
      data: [],
      icons: [],
      related: [],
      path: 'https://ethercalc.org/',
      title: $hash.asArray()[0] || '',
      myI: $hash.asArray()[1] || 0,
      myJ: $hash.asArray()[2] || 0,
      myK: 0,
      colMax: 3,
      myColumnIndex: [0, 1, 2, 3],
      webConfig: false,
      pageLoading: false,
      animate: $GobanAnimate
    });
    angular.extend(goban, {
      setI: function(n){
        if (this.myI !== n) {
          this.maybeDelay();
          this.myI = n;
          this.updateHash();
          this.load(this.myI);
          goban.cast('dx', {
            d: 0,
            p: goban.myI
          });
        }
      },
      setJ: function(n){
        if (this.myJ !== n) {
          this.maybeDelay();
          this.myJ = n;
          this.updateHash();
          goban.cast('dy', {
            d: 0,
            p: goban.myJ
          });
        }
      },
      updateHash: function(){
        $hash.upDateFromArray([this.title, this.myI, this.myJ]);
      },
      updateIndex: function(){
        var res$, i$, to$, ridx$;
        res$ = [];
        for (i$ = 0, to$ = this.colMax; i$ <= to$; ++i$) {
          ridx$ = i$;
          res$.push(ridx$);
        }
        this.myColumnIndex = res$;
      },
      cast: function(eventName, arg){
        var broadcastName;
        broadcastName = 'goban.' + eventName;
        $rootScope.$broadcast(broadcastName, arg);
      },
      maybeDelay: function(){
        this.pageLoading = true;
        if (goban.animate.delay) {
          $timeout(function(){
            goban.pageLoading = false;
          }, goban.animate.delay);
        } else {
          this.pageLoading = false;
        }
      },
      load: function(num){
        num = num || 0;
        if (this.webConfig) {
          this.loadConfig(num);
        }
        $http({
          method: "GET",
          url: this.path + this.title + num + '.csv',
          dataType: "text"
        }).success(function(data){
          goban.data = goban.parseFromCSV(data);
          goban.updateHash();
          goban.cast('loaded', {
            p: 'data'
          });
        }).error(function(){
          goban.sectionTitle = null;
          goban.data = [];
          goban.cast('error', {
            p: 'data'
          });
        });
      },
      loadConfig: function(){
        var folderName;
        folderName = this.title + 'Config';
        console.log(goban.path + goban.title + 'Config.csv');
        $http({
          method: "GET",
          url: goban.path + goban.title + 'Config.csv.json',
          dataType: "text"
        }).success(function(data){
          var config;
          config = goban.parseConfigFromJSON(data);
          if (config.related && config.related.length) {
            goban.related = config.related.filter(function(o){
              return o && o.n && o.t;
            });
            goban.myName = config.myName;
            goban.myK = goban.related.map(function(o, index){
              return {
                name: o.n,
                index: index
              };
            }).filter(function(t){
              return t.name === goban.myName;
            }).map(function(t){
              return t.index;
            })[0];
          }
          goban.cast('loaded', {
            p: 'config'
          });
        }).error(function(){
          goban.cast('error', {
            p: 'config'
          });
          console.log('error:connot load webConfig');
        });
      },
      parseConfigFromJSON: function(data){
        var ans;
        ans = {
          myName: 'Goban',
          related: []
        };
        ans.related = data.slice(1).filter(function(l){
          return l[0];
        }).map(function(l){
          return {
            t: l[0],
            n: l[1] || l[0]
          };
        });
        return ans;
      },
      parseConfigFromCSV: function(csv){
        var ans, allTextLines, xAlts, zLines;
        ans = {
          myName: 'Goban',
          related: []
        };
        allTextLines = csv.split(/\r\n|\n/);
        xAlts = (allTextLines[1] || "").split(',').slice(2);
        ans.myName = allTextLines[1].split(',')[1];
        zLines = allTextLines.slice(1);
        ans.related = zLines.map(function(l){
          return {
            t: l.split(',')[0],
            n: l.split(',')[1]
          };
        });
        return ans;
      },
      redirect: function(url){
        if (url.indexOf(".csv") === -1) {
          url += '.csv';
        }
        $http({
          method: "GET",
          url: url,
          dataType: "text"
        }).success(function(data){
          goban.data = goban.parseFromCSV(data);
          goban.cast('loaded', {
            p: 'data',
            isRedirected: true
          });
        }).error(function(){
          goban.sectionTitle = null;
          goban.data = [];
          goban.cast('error', {
            p: 'data',
            isRedirected: true,
            isBroken: true
          });
        });
      },
      init: function(){
        this.load(this.myI);
        goban.cast('initialized', {
          i: this.myI
        });
      },
      parseFromCSV: function(csv){
        var allTextLines, maybeRedirect, bodyLines, goodList, lastFolderIndex, bestList;
        allTextLines = csv.split(/\r\n|\n/);
        this.sectionTitle = allTextLines[1].split(',')[1];
        maybeRedirect = allTextLines[0].split(',')[0];
        if (!this.sectionTitle && !maybeRedirect) {
          maybeRedirect = this.path + this.title;
        }
        if (maybeRedirect && maybeRedirect.substr(0, 1) !== '#') {
          goban.redirect(maybeRedirect);
          return;
        }
        bodyLines = allTextLines.slice(2);
        goodList = bodyLines.map(function(text){
          text = text.replace(/(html|css|js|output),/g, '$1COMMA');
          return text.split(',').map(function(str){
            return str.replace(/COMMA/g, ',');
          });
        }).filter(function(list){
          return list[1];
        });
        lastFolderIndex = 0;
        bestList = goodList.map(function(list, index){
          var isClosed, isBlank, isIsolate, obj;
          isClosed = false;
          if (!list[0]) {
            lastFolderIndex = index;
            if (list[2] && list[2].search(/exp[ea]nd(.+)true/ > -1)) {
              isClosed = false;
            }
            if (list[2] && list[2].search(/exp[ea]nd(.+)false/ > -1)) {
              isClosed = true;
            }
          } else {
            if (list[2] && list[2].search(/target(.+)_blank/ > -1)) {
              isBlank = true;
            }
            if (list[2] && list[2].search(/isolate(.+)true/ > -1)) {
              isIsolate = true;
            }
          }
          obj = (list[0] && {
            url: list[0].replace(/["\s]/g, ''),
            name: list[1].replace(/["\s]/g, ''),
            isFolder: false,
            pIndex: lastFolderIndex,
            isBlank: isBlank,
            isIsolate: isIsolate
          }) || {
            name: list[1],
            isFolder: true,
            isClosed: isClosed
          };
          return obj;
        });
        return bestList;
      },
      keyDown: function(e){
        var code;
        e.preventDefault();
        code = e.keyCode;
        switch (code) {
        case 40:
          if (event.shiftKey) {
            this.dz(1);
          } else {
            this.dy(1);
          }
          break;
        case 38:
          if (event.shiftKey) {
            this.dz(-1);
          } else {
            this.dy(-1);
          }
          break;
        case 37:
          this.dx(-1);
          break;
        case 39:
          this.dx(1);
          break;
        case 32:
          this.data[this.myJ].isClosed = !this.data[this.myJ].isClosed;
        }
      },
      dx: function(n, isLoop){
        var goX;
        goX = function(n){
          goban.myI = parseInt(goban.myI);
          goban.myI += n;
          if (goban.myI === -1) {
            goban.myI = goban.colMax;
          }
          if (goban.myI === goban.colMax) {
            if (!goban.hasLimit) {
              goban.colMax++;
              goban.updateIndex();
            }
          }
          if (goban.myI === goban.colMax + 1) {
            goban.myI = 0;
            if (!isLoop) {
              goban.dz(1);
            }
          }
          goban.updateHash();
        };
        this.maybeDelay();
        this.load(parseInt(this.myI) + n);
        if (this.animate.delay) {
          $timeout(goX(n), this.animate.delay);
        } else {
          goX(n);
        }
        goban.cast('dx', {
          d: n,
          p: goban.myI
        });
      },
      dy: function(n, isLoop){
        var goY;
        goY = function(n){
          goban.myJ = parseInt(goban.myJ);
          goban.myJ += n;
          if (goban.myJ === -1) {
            goban.myJ = (goban.data.length || 1) - 1;
            if (!isLoop) {
              goban.dx(-1);
            }
          } else if (goban.myJ >= goban.data.length) {
            goban.myJ = 0;
            if (!isLoop) {
              goban.dx(1);
            }
          }
          goban.updateHash();
        };
        this.maybeDelay();
        if (this.animate.delay) {
          $timeout(goY(n), this.animate.delay);
        } else {
          goY(n);
        }
        goban.cast('dy', {
          d: n,
          p: goban.myJ
        });
      },
      dz: function(n){
        var goZ;
        goZ = function(o, n){
          o.myK += n;
          if (this.related && this.related[0]) {
            this.title = this.related[this.myK].t;
          }
          o.load();
        };
        if (this.animate.delay) {
          $timeout(goZ(this(n)), this.animate.delay);
        } else {
          goZ(n);
        }
      },
      trust: function(url){
        return $sce.trustAsResourceUrl(url);
      },
      getCurrentURL: function(){
        this.data = this.data || [];
        if (this.data[this.myJ] && this.data[this.myJ].isBlank) {
          window.open(this.data[this.myJ].url);
          this.data[this.myJ].isBlank = false;
          return;
        }
        return this.trust((this.data[this.myJ] && this.data[this.myJ].url) || (this.data[this.myJ + 1] && this.data[this.myJ + 1].url));
      },
      backupAll: function(){
        var downloadURL, i$, ref$, len$, i;
        downloadURL = function(url, k){
          var hiddenIFrameID, iframe;
          hiddenIFrameID = 'hiddenDownloader' + k;
          iframe = document.getElementById(hiddenIFrameID);
          if (deepEq$(iframe, null, '===')) {
            iframe = document.createElement('iframe');
            iframe.id = hiddenIFrameID;
            iframe.name = url;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
          }
          return iframe.src = url;
        };
        for (i$ = 0, len$ = (ref$ = (fn$.call(this))).length; i$ < len$; ++i$) {
          i = ref$[i$];
          downloadURL(this.path + this.title + i + '.csv', i);
        }
        if (this.webConfig) {
          downloadURL(this.path + this.title + 'Config.csv', 'Config');
        }
        function fn$(){
          var i$, to$, results$ = [];
          for (i$ = 0, to$ = this.colMax; i$ <= to$; ++i$) {
            results$.push(i$);
          }
          return results$;
        }
      },
      $default: function(obj){
        angular.extend(this, obj);
        this.title = $hash.asArray()[0] || this.title;
        goban.updateIndex();
        if (location.hash.split('&')[0].replace('#', '')) {
          goban.title = location.hash.split('&')[0].replace('#', '');
        }
        return this;
      }
    });
    return goban;
  };
  angular.module('goban', []).factory('$hash', myHash).factory('$goban', ['$rootScope', '$http', '$sce', '$hash', '$timeout', myGoban]).filter('toIndex', toIndex);
  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    var first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) { if (stack[length] == a) { return true; } }
      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) {
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
        if (result) {
          sizeB = 0;
          for (key in b) {
            if (has(b, key)) { ++sizeB; }
          }
          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);
