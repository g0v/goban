webpackJsonp([1],{0:function(e,t){},Fvpm:function(e,t){},NG9Y:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("7+uW"),s=a("yviF"),r=a.n(s),i=(a("hZls"),r.a.initializeApp({databaseURL:"https://goban-hub.firebaseio.com/"}).database()),o={name:"App",data:function(){return{gobans:void 0}},methods:{create:function(e){i.ref("gobans/"+e).set(e)}},firebase:{gobans:i.ref("gobans")}},c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view",{attrs:{gobans:this.gobans},on:{create:this.create}})],1)},staticRenderFns:[]};var u=a("VU/8")(o,c,!1,function(e){a("yy0n")},null,null).exports,l=a("/ocq"),m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("h1",{staticClass:"ui header"},[e._v("零時黑板")]),e._v(" "),a("div",{staticClass:"ui form container"},[a("div",{staticClass:"field"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.myKey,expression:"myKey"}],attrs:{type:"search",name:"",placeholder:"搜詢黑板",autofocus:"true"},domProps:{value:e.myKey},on:{input:function(t){t.target.composing||(e.myKey=t.target.value)}}}),e._v(" "),e.myKey?a("a",{staticClass:"ui green button",on:{click:function(t){return e.create(e.myKey)}}},[e._v("創建"+e._s(e.myKey))]):e._e()])]),e._v(" "),a("div",{staticClass:"ui segment container"},[a("div",{staticClass:"ui divided horizontal list"},e._l(Object.keys(e.gobans),function(t){return a("div",{directives:[{name:"show",rawName:"v-show",value:!e.myKey||t.match(new RegExp(e.myKey)),expression:"!myKey || g.match(new RegExp(myKey))"}],key:t,staticClass:"item"},[a("router-link",{attrs:{to:"see/"+t+"/0/0"}},[a("img",{attrs:{src:"/static/favicon.png"}}),e._v("\n          "+e._s(t)+"\n        ")])],1)}),0)])])},staticRenderFns:[]};var d=a("VU/8")({data:function(){return{myKey:""}},props:["gobans"],methods:{create:function(e){this.$emit("create",e),this.$router.push("/see/"+e+"/0/new")}}},m,!1,function(e){a("Fvpm")},"data-v-d96fa7f4",null).exports,p={name:"See",data:function(){return{data:[],name:""}},props:["gobans"],watch:{$route:function(e,t){this.reload()}},methods:{tar:function(e){return(e.note+"").match(/blank/)?"_blank":"iframe"},reload:function(){var e=this;console.log("reload..."),this.$http.get("https://ethercalc.org/"+this.$route.params.id+this.$route.params.lev+".csv.json").then(function(t){e.data=e.parse(t.body),e.$forceUpdate()},function(e){console.log(e)})},parse:function(e){this.name=e[1][1];var t,a=e.slice(2);return a=a.map(function(e){var t={};return t.name=e[1],t.url=e[0].replace("%20","").replace(" ",""),t.note=e[2],t}).filter(function(e){return e.name}).map(function(e,a){return e.url?(e.type="link",e.parentIndex=t):(e.type="folder",e.open=!0,(e.note+"").match(/close/)&&(e.open=!1),t=a),e}),console.log(a),a}},mounted:function(){this.reload()}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("div",{staticClass:"ui fixed top menu"},[a("router-link",{staticClass:"item",attrs:{to:"/"}},[a("sui-icon",{attrs:{size:"small",name:"home"}}),e._v(" home\n    ")],1),e._v(" "),e._l([0,1,2,3],function(t){return a("router-link",{key:t,staticClass:"item",attrs:{to:"/see/"+e.$route.params.id+"/"+t+"/0"}},[e._v("\n      "+e._s(t)+"\n    ")])}),e._v(" "),a("div",{staticClass:"right menu"},[a("a",{staticClass:"item",attrs:{href:e.data[e.$route.params.index].url,target:"_blank"}},[a("sui-icon",{attrs:{size:"small",name:"right arrow"}}),e._v(" 開新頁籤\n      ")],1)])],2),e._v(" "),a("div",{staticClass:"ui grid"},[a("div",{staticClass:"four wide right aligned column"},[a("div",{staticClass:"ui list"},[a("div",{staticClass:"item"},[a("router-link",{attrs:{to:"/see/"+e.$route.params.id+"/"+e.$route.params.lev+"/new"}},[a("img",{attrs:{src:"https://www.google.com/s2/favicons?domain=https://ethercalc.org/"}}),e._v("\n            "+e._s(e.name||e.$route.params.id+e.$route.params.lev)+"\n          ")])],1),e._v(" "),a("hr"),e._v(" "),e._l(e.data,function(t,n){return a("div",{key:t.name,staticClass:"item"},["link"==t.type?a("div",{directives:[{name:"show",rawName:"v-show",value:!t.parentIndex||e.data[t.parentIndex].open,expression:"!d.parentIndex || data[d.parentIndex].open"}]},[t.parentIndex?a("span",[e._v("    ")]):e._e(),e._v(" "),a("router-link",{attrs:{to:"/see/"+e.$route.params.id+"/"+e.$route.params.lev+"/"+n}},[a("img",{attrs:{src:"https://www.google.com/s2/favicons?domain="+t.url}}),e._v(e._s(t.name))])],1):e._e(),e._v(" "),"folder"==t.type?a("div",[a("a",{on:{click:function(e){t.open=!t.open}}},[e._v("\n              "+e._s(t.name)+"\n              "),a("img",{directives:[{name:"show",rawName:"v-show",value:!t.open,expression:"!d.open"}],staticClass:"ui mini image",attrs:{src:"/static/images/isClosed.png"}}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"d.open"}],staticClass:"ui mini image",attrs:{src:"/static/images/isOpen.png"}})])]):e._e()])})],2)]),e._v(" "),a("div",{staticClass:"twelve wide column",on:{mouseout:function(t){return e.reload()}}},[a("iframe",{attrs:{id:"iframe",name:"iframe",src:"new"==e.$route.params.index?"https://ethercalc.org/"+e.$route.params.id+e.$route.params.lev:e.data[e.$route.params.index].url}})])])])},staticRenderFns:[]};var f=a("VU/8")(p,v,!1,function(e){a("NG9Y")},"data-v-06207372",null).exports;n.a.use(l.a);var h=new l.a({routes:[{path:"/",name:"HelloWorld",component:d},{path:"/see/:id/:lev/:index",name:"See",component:f}]}),g=a("hnaQ"),_=a("8+8L"),y=a("myK/"),w=a.n(y);a("kVq8");a("kgP6"),n.a.use(w.a),n.a.use(_.a),n.a.use(g.a),n.a.config.productionTip=!1,new n.a({el:"#app",router:h,components:{App:u},template:"<App/>"})},kVq8:function(e,t){},kgP6:function(e,t){},yy0n:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.74f5f247edd5e14ec304.js.map