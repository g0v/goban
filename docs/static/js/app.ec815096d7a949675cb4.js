webpackJsonp([1],{0:function(t,e){},"3IJj":function(t,e){},MheO:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),r=a("yviF"),n=a.n(r),i=(a("hZls"),n.a.initializeApp({databaseURL:"https://goban-hub.firebaseio.com/"}).database()),o={name:"App",data:function(){return{gobans:void 0}},methods:{create:function(t){i.ref("gobans/"+t).set(t)}},firebase:{gobans:i.ref("gobans")}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"ui fixed top menu"},[e("router-link",{staticClass:"item",attrs:{to:"/"}},[e("sui-icon",{attrs:{name:"home"}})],1),e("router-link",{staticClass:"item",attrs:{to:"/star"}},[e("sui-icon",{attrs:{name:"star"}})],1),e("router-link",{staticClass:"item",attrs:{to:"/intro"}},[e("sui-icon",{attrs:{name:"question"}})],1),this._m(0)],1),e("router-view",{attrs:{gobans:this.gobans},on:{create:this.create}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"right menu"},[e("div",{staticClass:"item"},[e("iframe",{staticStyle:{border:"none",overflow:"hidden"},attrs:{src:"https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fgoban.tw&layout=button_count&size=small&appId=485195848253155&width=71&height=20",width:"71",height:"20",scrolling:"no",frameborder:"0",allowTransparency:"true",allow:"encrypted-media"}})])])}]};var l=a("VU/8")(o,c,!1,function(t){a("jRiJ")},null,null).exports,u=a("/ocq"),m=a("mvHQ"),d=a.n(m),h={data:function(){return{myKey:"",stars:{goban_intro:5}}},props:["gobans"],localStorage:{stars:{goban_intro:5}},methods:{create:function(t){this.$emit("create",t),this.$router.push("/see/"+t+"/0/new")},handleRate:function(t,e){this.stars[t]||(this.stars[t]=0),this.stars[t]+=e,10===this.stars[t]&&(this.stars[t]=0),this.$localStorage.set("stars",d()(this.stars)),this.$forceUpdate()},loadStars:function(){console.log(JSON.parse(this.$localStorage.get("stars"))),this.stars=JSON.parse(this.$localStorage.get("stars"))}},mounted:function(){this.loadStars()}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",{staticClass:"ui header"},[t._v("零時黑板")]),a("h3",{staticClass:"sub header"},[t._v("網址分享的好工具 "),a("router-link",{staticClass:"ui green button",attrs:{to:"intro"}},[t._v("瞭解更多"),a("i",{staticClass:"right arrow icon"})])],1),a("div",{staticClass:"ui form container"},[a("div",{staticClass:"field"},[a("input",{directives:[{name:"autofocus",rawName:"v-autofocus",value:t.dynamicvalue,expression:"dynamicvalue"},{name:"model",rawName:"v-model",value:t.myKey,expression:"myKey"}],attrs:{type:"search",name:"",placeholder:"搜詢黑板",autofocus:"true"},domProps:{value:t.myKey},on:{input:function(e){e.target.composing||(t.myKey=e.target.value)}}}),t.myKey?a("a",{staticClass:"ui green button",on:{click:function(e){return t.create(t.myKey)}}},[t._v("創建"+t._s(t.myKey))]):t._e()])]),a("div",{staticClass:"ui segment left aligned container"},[a("div",{staticClass:"ui grid"},[a("div",{staticClass:"doubling four column row"},t._l(Object.keys(t.gobans),function(e){return a("div",{directives:[{name:"show",rawName:"v-show",value:!t.myKey||e.match(new RegExp(t.myKey)),expression:"!myKey || g.match(new RegExp(myKey))"}],key:e,staticClass:"four wide doubling column"},[a("router-link",{attrs:{to:"see/"+e+"/0/0"}},[a("img",{attrs:{src:"/static/favicon.png"}}),t._v("            "+t._s(e))]),a("a",{on:{click:function(a){return t.handleRate(e,5)}}},[a("sui-icon",{class:t.stars[e]?"yellow":"gray",attrs:{name:"star"}})],1)],1)}),0)])])])},staticRenderFns:[]};var f=a("VU/8")(h,p,!1,function(t){a("MheO")},"data-v-3af89ae9",null).exports,g={name:"See",data:function(){return{data:[],name:""}},props:["gobans"],watch:{$route:function(t,e){this.reload()}},methods:{getSrc:function(){return"new"===this.$route.params.index?"https://ethercalc.org/"+this.$route.params.id+this.$route.params.lev:this.data[this.$route.params.index]?this.data[this.$route.params.index].url:void 0},tar:function(t){return(t.note+"").match(/blank/)?"_blank":"iframe"},reload:function(){var t=this;console.log("reload..."),this.$http.get("https://ethercalc.org/"+this.$route.params.id+this.$route.params.lev+".csv.json").then(function(e){t.data=t.parse(e.body),t.$forceUpdate()},function(e){console.log(e),t.data=[],t.$router.push("/see/"+t.$route.params.id+"/"+t.$route.params.lev+"/new")})},parse:function(t){t[1]&&(this.name=t[1][1]);var e,a=t.slice(2);return a=a.map(function(t){var e={};return e.name=t[1],e.url=t[0].replace("%20","").replace(" ",""),e.note=t[2],e}).filter(function(t){return t.name}).map(function(t,a){return t.url?(t.type="link",t.parentIndex=e):(t.type="folder",t.open=!0,(t.note+"").match(/close/)&&(t.open=!1),e=a),t}),console.log(a),a}},mounted:function(){this.reload()}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("div",{staticClass:"ui fixed top menu"},[a("router-link",{staticClass:"item",attrs:{to:"/"}},[a("sui-icon",{attrs:{size:"small",name:"home"}},[t._v("home")])],1),t._l([0,1,2,3],function(e){return a("router-link",{key:e,staticClass:"item",attrs:{to:"/see/"+t.$route.params.id+"/"+e+"/0"}},[t._v(t._s(e))])}),a("div",{staticClass:"right menu"},[t.data[t.$route.params.index]?a("a",{staticClass:"item",attrs:{href:t.data[t.$route.params.index].url,target:"_blank"}},[a("sui-icon",{attrs:{size:"small",name:"right arrow"}},[t._v("開新頁籤")])],1):t._e(),"new"==t.$route.params.index?a("a",{staticClass:"item",attrs:{href:"https://ethercalc.org/"+t.$route.params.id+t.$route.params.lev,target:"_blank"}},[a("sui-icon",{attrs:{size:"small",name:"right arrow"}},[t._v("開新頁籤")])],1):t._e()])],2),a("div",{staticClass:"ui grid"},[a("div",{staticClass:"four wide left aligned column"},[a("div",{staticClass:"ui list"},[a("router-link",{staticClass:"item",attrs:{to:"/see/"+t.$route.params.id+"/"+t.$route.params.lev+"/new"}},[a("img",{attrs:{src:"https://www.google.com/s2/favicons?domain=https://ethercalc.org/"}}),t._v(t._s(t.name||t.$route.params.id+t.$route.params.lev))]),a("hr"),t._l(t.data,function(e,s){return a("div",{key:e.name,staticClass:"item"},["link"==e.type?a("div",{directives:[{name:"show",rawName:"v-show",value:!e.parentIndex||t.data[e.parentIndex].open,expression:"!d.parentIndex || data[d.parentIndex].open"}]},[e.parentIndex?a("span"):t._e(),"_blank"==t.tar(e)?a("a",{attrs:{href:e.url,target:"_blank"}},[t._v(t._s(e.name)),a("img",{staticClass:"floating right",attrs:{src:"https://www.google.com/s2/favicons?domain="+e.url}}),a("sui-icon",{attrs:{name:"right arrow"}})],1):a("router-link",{attrs:{to:"/see/"+t.$route.params.id+"/"+t.$route.params.lev+"/"+s}},[t._v(t._s(e.name)),a("img",{staticClass:"floating right",attrs:{src:"https://www.google.com/s2/favicons?domain="+e.url}})])],1):t._e(),"folder"==e.type?a("div",[a("a",{on:{click:function(t){e.open=!e.open}}},[t._v(t._s(e.name)),a("img",{directives:[{name:"show",rawName:"v-show",value:!e.open,expression:"!d.open"}],staticClass:"ui mini image",attrs:{src:"/static/images/isClosed.png"}}),a("img",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"d.open"}],staticClass:"ui mini image",attrs:{src:"/static/images/isOpen.png"}})])]):t._e()])})],2)]),a("div",{staticClass:"twelve wide column",on:{mouseout:function(e){return t.reload()}}},[a("iframe",{attrs:{id:"iframe",name:"iframe",src:t.getSrc()}})])])])},staticRenderFns:[]};var y=a("VU/8")(g,v,!1,function(t){a("3IJj")},"data-v-6dba5d13",null).exports,w={data:function(){return{myKey:"",stars:{goban_intro:5}}},props:["gobans"],localStorage:{stars:{goban_intro:5}},methods:{create:function(t){this.$emit("create",t),this.$router.push("/see/"+t+"/0/new")},handleRate:function(t,e){this.stars[t]||(this.stars[t]=0),this.stars[t]+=e,10===this.stars[t]&&(this.stars[t]=0),this.$localStorage.set("stars",this.stars),this.$forceUpdate()},loadStars:function(){console.log(JSON.parse(this.$localStorage.get("stars"))),this.stars=JSON.parse(this.$localStorage.get("stars"))}},mounted:function(){this.loadStars()}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",{staticClass:"ui header"},[t._v("我的珍藏")]),a("h3",{staticClass:"sub header"},[t._v("我珍藏的黑板")]),a("div",{staticClass:"ui form container"},[a("div",{staticClass:"field"},[a("input",{directives:[{name:"autofocus",rawName:"v-autofocus",value:t.dynamicvalue,expression:"dynamicvalue"},{name:"model",rawName:"v-model",value:t.myKey,expression:"myKey"}],attrs:{type:"search",name:"",placeholder:"搜詢黑板",autofocus:"true"},domProps:{value:t.myKey},on:{input:function(e){e.target.composing||(t.myKey=e.target.value)}}}),t.myKey?a("a",{staticClass:"ui green button",on:{click:function(e){return t.create(t.myKey)}}},[t._v("創建"+t._s(t.myKey))]):t._e()])]),a("div",{staticClass:"ui segment left aligned container"},[a("div",{staticClass:"ui grid"},[a("div",{staticClass:"doubling four column row"},t._l(Object.keys(t.gobans),function(e){return t.stars[e]>0?a("div",{directives:[{name:"show",rawName:"v-show",value:!t.myKey||e.match(new RegExp(t.myKey)),expression:"!myKey || g.match(new RegExp(myKey))"}],key:e,staticClass:"column"},[a("router-link",{attrs:{to:"see/"+e+"/0/0"}},[a("img",{attrs:{src:"/static/favicon.png"}}),t._v("            "+t._s(e))]),a("a",{on:{click:function(a){return t.handleRate(e,5)}}}),a("sui-icon",{class:t.stars[e]?"yellow":"gray",attrs:{name:"star"}})],1):t._e()}),0)])])])},staticRenderFns:[]};var b=a("VU/8")(w,_,!1,function(t){a("jAgW")},"data-v-547412b4",null).exports,$={data:function(){return{myKey:"",stars:{goban_intro:5}}},props:["gobans"],localStorage:{stars:{goban_intro:5}},methods:{create:function(t){this.$emit("create",t),this.$router.push("/see/"+t+"/0/new")},handleRate:function(t,e){this.stars[t]||(this.stars[t]=0),this.stars[t]+=e,10===this.stars[t]&&(this.stars[t]=0),this.$localStorage.set("stars",this.stars),this.$forceUpdate()},loadStars:function(){console.log(JSON.parse(this.$localStorage.get("stars"))),this.stars=JSON.parse(this.$localStorage.get("stars"))}},mounted:function(){this.loadStars()}},C={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hello"},[e("h1",{staticClass:"ui header"},[this._v("如何使用")]),e("iframe",{attrs:{width:"560",height:"315",src:"https://www.youtube.com/embed/mWbvcHlGCOg",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:"allowfullscreen"}})])}]};var k=a("VU/8")($,C,!1,function(t){a("xZ1b")},"data-v-62c3a6ce",null).exports;s.a.use(u.a);var x=new u.a({routes:[{path:"/",name:"HelloWorld",component:f},{path:"/star",name:"Star",component:b},{path:"/see/:id/:lev/:index",name:"See",component:y},{path:"/intro",name:"Intro",component:k}]}),S=a("hnaQ"),K=a("8+8L"),N=a("myK/"),R=a.n(N),O=(a("kVq8"),a("UnSZ")),E=a.n(O),J=a("vVk6"),U=a.n(J);s.a.directive("autofocus",U.a),s.a.use(E.a),a("kgP6"),s.a.use(R.a),s.a.use(K.a),s.a.use(S.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:x,components:{App:l},template:"<App/>"})},jAgW:function(t,e){},jRiJ:function(t,e){},kVq8:function(t,e){},kgP6:function(t,e){},xZ1b:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.ec815096d7a949675cb4.js.map