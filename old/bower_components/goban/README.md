Goban 棋盤
=====

use Goban to manage series of  hackfoldrs

# Example 例子
For a simple example, see here: [https://bestian.github.io/frontend]
For a complex example, see here: [https://glassy.github.io/link]


# Getting Started with Goban 上手寫棋盤

##why Goban? 為何用棋盤?

[http://hackfoldr.org] is an awesome tool to share and collaborate about 20~30 urls with friends by its grouping power and its ethercalc base.

if you have series of hackfolders or you have about 30~500 urls to share, you might wish to collect them into a single-page web app. This is what Goban does.

黑客公事包非常好用，因為以醚算表(ethercalc)為底，在分享與協作20~30個網址時十分有用。

如果你有一系列的黑客公事包，或是想要分享與協作30~500個網址，你或許會想將它們集中到單一的不換算網路APP。這就是棋盤的用途。

## Mindset 概念

The Goban mindset it just like a real world goban, using coordinates (i,j,k) to locate an object from a table-like data.

棋盤的概念恰如實體世界的棋盤，用座標(i,j,k)從表格中來定位資料。

![Example] (http://upload.wikimedia.org/wikipedia/commons/6/63/Goban_19x19_vide.png)

##notification 注意

goban is under construction and not stable right now. the code may be change later after a new release. before you update goban module, please check README.md for possible incompatible change first.

棋盤還在建構中，尚不穩定。新版釋出時，程式碼的寫法可能會有所變動。在更新模組前請先檢閱新的「README」來檢視可能存在的不相容寫法。


##installation and updating 安裝與更新

install goban from bower: 用射手(bower)來安裝與更新

```bash
$ bower install goban 
```

```bash
$ bower update goban 
```

install goban in your angular app, use following code: 在您的angular程式中安裝棋盤：

```bash
angular.module('yourApp', ['goban'])

```

##configuaration and initialization 設定與初始化

config goban with $default and then use $goban.init() to initialize, 用$default的寫法來設定，再用$goban.init()來初始化

```bash
angular.module('goban')
```

in your controller, use following:

```bash
function yourCtrl($goban) {
    $scope.goban = $goban.$default({
      title: 'your_title',
    });
    $goban.init();
}

```
to start data binding.
use the example code above, Goban will automantically send http GET request to these url when needed: 
	
* https://ethercalc.org/your_title0.csv
* https://ethercalc.org/your_title1.csv
* https://ethercalc.org/your_title2.csv
* https://ethercalc.org/your_title3.csv

default path is 'https://ethercalc.org/'.

you may change it to any other path, but your have to save your data use .csv file with same formet as ethercalc, and the path you link must allow http GET request.

default colMax is 3, which makes goban load 4 csvs. you may change it before or after app start.


to customize path and colMax before before app start, simply use following:
(note: path customizing and change feature will be marged into goban-z later, and the code will be changed, too)

```bash
function yourCtrl($goban) {
    $scope.goban = $goban.$default({
      path: 'your_path'
      title: 'your_title',
      colMax: 7
    });
    $scope.goban.init();
}

```

to change,path,titilem and colMax after app start, simply change it. like following:


```bash
  <a ng-click = "goban.path = 'another_path'">
```

or use

```bash
  $scope.chPath = function(p){
    $goban.path = p;
  }
```

then apply it use angular way.



you may also set costum folder names to manage existing hackfolders:
(note: this feature will be marged into goban-z later, and the code will be changed, too)

```bash
  $goban.folderNames = ["foo","bar","baz"]
```

# binding Goban data

for now, Goban has only one-way binding feature, but potentially it can grow a two-way binding feature using http POST request to ethercalc.

##simple binding

```bash
	{{goban.data[i][j]}}
```


##dynamic binding

```bash
	{{goban.data[goban.myI][goban.myJ]}}
```

##keyBorad Control(optional)


```bash
<body ng-keydown="goban.keyDown($event)">
	<!-- HTML -->
</body>

```

## use ng-repeat, goban.setI, goban.setJ
```bash
<li ng-repeat = "i in [0,1,2,3,4,5]">
	<a ng-class="{active: goban.myI == i}" ng-click="goban.setI(i)">
	<!-- HTML -->
	</a>
</li>
```


```bash
<li ng-repeat = "j in goban.data | toIndex">
	<a ng-class="{active: goban.myJ == j}" ng-click="goban.setJ(j)">
		<!-- HTML -->
	</a>
</li>
```

note that toIndex filter is well defined form Goban Module.


## get $sce trusted current url


```bash
<iframe ng-src = "{{goban.getCurrentURL()}}"></iframe>
```


# Contributing


## Bug report

please write a gitbug issue

## Improve project

If you'd like to contribute to Goban, please contact with: bestian@gmail.com
