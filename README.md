Goban.tw
========

Use Goban to manage series of hackfoldrs.

# Examples

For a simple example, see here: [https://bestian.github.io/frontend]
For a complex example, see here: [https://glassy.github.io/link]

# Getting Started with Goban

## Why Goban?

[http://hackfoldr.org] is an awesome tool to share and collaborate about 20~30 urls with friends by its grouping power and its ethercalc base.

If you have series of hackfolders or you have about 30~500 urls to share, you might wish to collect them into a single-page web app. This is what Goban does.

## Mindset

The Goban mindset it just like a real world goban, using coordinates (i,j,k) to locate an object from a table-like data.

![Example] (http://upload.wikimedia.org/wikipedia/commons/6/63/Goban_19x19_vide.png)

## Notes

Goban is under construction and not stable right now. the code may be change later after a new release. before you update goban module, please check README.md for possible incompatible change first.

## Installation and Updating

install goban from bower:

```bash
$ bower install goban 
```

```bash
$ bower update goban 
```

To install goban in your angular app, use following code:

```bash
angular.module('yourApp', ['goban'])

```

## Configuaration and initialization

Config goban with $default and then use $goban.init() to initialize:

```bash
angular.module('goban')
```

In your controller, use the following to start data binding:

```bash
function yourCtrl($goban) {
    $scope.goban = $goban.$default({
      title: 'your_title',
    });
    $goban.init();
}

```

Using the example code above, Goban will automantically send http GET request to these url when needed: 
	
* https://ethercalc.org/your_title0.csv
* https://ethercalc.org/your_title1.csv
* https://ethercalc.org/your_title2.csv
* https://ethercalc.org/your_title3.csv

Default path is 'https://ethercalc.org/'.

You may change it to any other path, but your have to save your data use .csv file with same formet as ethercalc, and the path you link must allow http GET request.

The `colMax`settings defaults is 3, which makes goban load 4 csvs. you may change it before or after app start.

To customize path and colMax before before app start, simply use following:
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

One can also change `path`, `title` and `colMax` after app start:


```bash
  <a ng-click = "goban.path = 'another_path'">
```

or use:

```bash
  $scope.chPath = function(p){
    $goban.path = p;
  }
```

then apply it using angular's apply method.

You may also set custom folder names to manage existing hackfolders:
(note: this feature will be marged into goban-z later, and the code will be changed, too)

```bash
  $goban.folderNames = ["foo","bar","baz"]
```

# Binding Goban data

For now, Goban has only one-way binding feature, but potentially it can grow a two-way binding feature using http POST request to ethercalc.

## Simple binding

```bash
	{{goban.data[i][j]}}
```


## dynamic binding

```bash
	{{goban.data[goban.myI][goban.myJ]}}
```

## Keyboard Control(optional)


```bash
<body ng-keydown="goban.keyDown($event)">
	<!-- HTML -->
</body>

```

## Using ng-repeat, goban.setI, goban.setJ
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

https://github.com/g0v/goban

## Improve project

If you'd like to contribute to Goban, please contact with: bestian@gmail.com
