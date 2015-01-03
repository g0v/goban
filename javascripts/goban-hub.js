angular.module("automap")
.factory("$hub", myHub)

function myHub ($firebase) {
	var $hub = {};

	var u = 'https://goban-hub.firebaseio.com/';
	var ref = new Firebase(u);

	// create an AngularFire reference to the data
    var sync = $firebase(ref);

 	// download the data into a local object
  	var syncObject = sync.$asObject();
  	// synchronize the object with a three-way data binding
  	// click on `index.html` above to see it used in the DOM!
  	syncObject.$bindTo($hub, "base");

	return $hub;
}


