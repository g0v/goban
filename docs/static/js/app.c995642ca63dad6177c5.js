webpackJsonp([1],{0:function(t,e,a){a("u7Vc"),t.exports=a("NHnr")},1:function(t,e){},"60Q/":function(t,e,a){var s={"./NotFound":"UIzO","./NotFound.vue":"UIzO","./Profile":"MZV5","./Profile.vue":"MZV5"};function i(t){return a(r(t))}function r(t){var e=s[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}i.keys=function(){return Object.keys(s)},i.resolve=r,t.exports=i,i.id="60Q/"},"84zU":function(t,e){},AlFx:function(t,e){},MZV5:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("VU/8")(null,null,!1,null,null,null);e.default=s.exports},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i=a("yviF"),r=a.n(i),n=(a("hZls"),r.a.initializeApp({databaseURL:"https://goban-hub.firebaseio.com/"}).database()),o=n.ref("gobans"),l=(n.ref("chats"),{name:"App",data:function(){return{gobans:void 0}},methods:{iOS:function(){var t=!1,e=["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"];if(console.log(navigator.platform),navigator.platform)for(;e.length;)navigator.platform===e.pop()&&(t=!0);return console.log(t),t},create:function(t,e){var a=e||{id:t};a.id=t,a.t=a.t||t,a.hex=a.hex||"black",a.tags=a.tags||[t],a.related=a.related||[t],n.ref("gobans/"+t).set(a)}},firebase:{gobans:o}}),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("portal-target",{attrs:{id:"app",name:"semantic-ui-vue"}},[a("div",{staticClass:"ui fixed top labeled icon menu fat-only"},[a("router-link",{staticClass:"item",attrs:{to:"/"}},[a("i",{staticClass:"home icon"}),t._v("首頁")]),"/"!=t.$router.currentRoute.path?a("a",{staticClass:"item",on:{click:function(e){return t.$router.go(-1)}}},[a("i",{staticClass:"left arrow icon"}),t._v("回上一頁")]):t._e(),a("router-link",{staticClass:"item",attrs:{to:"/star"}},[a("i",{staticClass:"star icon"}),t._v("珍藏")]),a("router-link",{staticClass:"item",attrs:{to:"/intro"}},[a("i",{staticClass:"question icon"}),t._v("介紹")]),a("sui-dropdown",{staticClass:"item",attrs:{icon:"save outline"}},[t._v("工具"),a("sui-dropdown-menu",[a("sui-dropdown-item",{directives:[{name:"show",rawName:"v-show",value:!t.iOS(),expression:"!iOS()"}],on:{click:function(e){return t.$router.push("/myapp")}}},[t._v("手機App")]),a("sui-dropdown-item",{on:{click:function(e){return t.$router.push("/extension")}}},[t._v("瀏覽器插件")])],1)],1),a("div",{staticClass:"right menu"},[a("a",{staticClass:"item",attrs:{href:"https://github.com/g0v/goban",target:"_blank"}},[a("i",{staticClass:"github icon"}),t._v("原始碼")]),a("div",{staticClass:"item"},[a("iframe",{staticStyle:{border:"none",overflow:"hidden"},attrs:{src:"https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fgoban.tw&layout=button_count&size=small&appId=485195848253155&width=71&height=20",width:"71",height:"20",scrolling:"no",frameborder:"0",allowTransparency:"true",allow:"encrypted-media"}})])])],1),a("div",{staticClass:"ui fixed top menu thin-only"},[a("router-link",{staticClass:"item",attrs:{to:"/"}},[a("sui-icon",{attrs:{name:"home","data-content":"首頁",title:"首頁"}})],1),"/"!=t.$router.currentRoute.path?a("a",{staticClass:"item",attrs:{"data-content":"回上一頁",title:"回上一頁"},on:{click:function(e){return t.$router.go(-1)}}},[a("sui-icon",{attrs:{name:"left arrow"}})],1):t._e(),a("router-link",{staticClass:"item",attrs:{to:"/star","data-content":"珍藏",title:"珍藏"}},[a("sui-icon",{attrs:{name:"star"}})],1),a("router-link",{staticClass:"item",attrs:{to:"/intro"}},[a("sui-icon",{attrs:{name:"question","data-content":"介紹",title:"介紹"}})],1),a("sui-dropdown",{staticClass:"item",attrs:{icon:"save outline","data-content":"工具",title:"工具"}},[a("sui-dropdown-menu",[a("sui-dropdown-item",{directives:[{name:"show",rawName:"v-show",value:!t.iOS(),expression:"!iOS()"}],on:{click:function(e){return t.$router.push("/myapp")}}},[t._v("手機App")]),a("sui-dropdown-item",{on:{click:function(e){return t.$router.push("/extension")}}},[t._v("瀏覽器插件")])],1)],1),a("div",{staticClass:"right menu"},[a("a",{staticClass:"item",attrs:{href:"https://github.com/g0v/goban",target:"_blank","data-content":"原始碼",title:"原始碼"}},[a("i",{staticClass:"github icon"})])])],1),a("router-view",{attrs:{gobans:t.gobans},on:{create:t.create}})],1)},staticRenderFns:[]};var u=a("VU/8")(l,c,!1,function(t){a("pc6b")},null,null).exports,d=a("/ocq"),m=a("mvHQ"),h=a.n(m),p={data:function(){return{myKey:"",stars:{goban_intro:5}}},props:["gobans"],localStorage:{stars:{goban_intro:5}},methods:{iOS:function(){var t=!1,e=["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"];if(console.log(navigator.platform),navigator.platform)for(;e.length;)navigator.platform===e.pop()&&(t=!0);return console.log(t),t},create:function(t){this.$emit("create",t),this.$router.push("/see/"+t+"/0/new")},has:function(t,e){return new RegExp(e).test(t.id+t.t)},handleRate:function(t,e){this.stars[t]||(this.stars[t]=0),this.stars[t]===e?this.stars[t]=0:this.stars[t]=e,this.$localStorage.set("stars",h()(this.stars)),this.$forceUpdate()},loadStars:function(){console.log(JSON.parse(this.$localStorage.get("stars"))),this.stars=JSON.parse(this.$localStorage.get("stars"))}},mounted:function(){this.loadStars()}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",{staticClass:"ui header"},[t._v("共同筆記的公事包")]),a("h3",{staticClass:"sub header"},[t._v("搜詢或創建公事包，與他人分享網址")]),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.iOS(),expression:"!iOS()"}],staticClass:"ui button group thin-only"},[t._m(0),t._v(" ")]),a("div",{staticClass:"ui form container"},[a("div",{staticClass:"field"},[a("input",{directives:[{name:"autofocus",rawName:"v-autofocus"},{name:"model",rawName:"v-model",value:t.myKey,expression:"myKey"}],attrs:{type:"search",name:"",placeholder:"搜詢或創建新黑板",autofocus:"true",list:"gs"},domProps:{value:t.myKey},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.$router.push("/see/"+t.myKey+"/0/0")},input:function(e){e.target.composing||(t.myKey=e.target.value)}}}),a("datalist",{attrs:{id:"gs"}},t._l(t.gobans,function(e){return a("option",{key:e.id,domProps:{value:e.id}},[t._v(t._s(e.id))])}),0),t.myKey&&!t.gobans[t.myKey]?a("a",{staticClass:"ui green button",on:{click:function(e){return t.create(t.myKey)}}},[t._v("創建"+t._s(t.myKey))]):t._e()])]),t.myKey?a("div",{staticClass:"ui segment left aligned container"},[t.gobans?t._e():a("div",{staticClass:"ui active dimmer"},[a("div",{staticClass:"ui text loader"},[t._v("Loading...")])]),a("div",{staticClass:"ui grid"},[a("div",{staticClass:"doubling two column row"},t._l(t.gobans,function(e){return a("div",{key:e.id,staticClass:"column",attrs:{id:"goban"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.has(e,t.myKey),expression:"has(g, myKey)"}],staticClass:"inner"},[t._l([1,2,3,4,5],function(s){return a("a",{on:{click:function(a){return t.handleRate(e.id,s)}}},[a("sui-icon",{class:t.stars[e.id]>=s?"yellow":"gray",attrs:{name:"star"}})],1)}),a("router-link",{attrs:{to:"update/"+e.id,"data-content":"設定",title:"設定"}},[a("i",{staticClass:"cogs icon"})]),a("router-link",{attrs:{to:"see/"+e.id+"/0/0"}},[a("h2",{staticClass:"ui header",style:{color:e.hex||"#42b983"}},[t._v(t._s(e.id)+" - "+t._s(e.t))])]),a("p",[t._v("相關黑板:"),a("br"),t._l(e.related,function(e){return a("router-link",{key:e,staticClass:"r",attrs:{to:"see/"+e+"/0/0"}},[t._v(t._s(e))])})],2)],2)])}),0)])]):t._e(),a("router-link",{staticClass:"ui green button",attrs:{to:"intro"}},[t._v("瞭解更多"),a("i",{staticClass:"right arrow icon"})]),a("h3",{staticClass:"ui header"},[t._v("我的珍藏")]),t._l(t.gobans,function(e){return a("div",{key:e.id,staticClass:"span",attrs:{id:"fast"}},[t.stars[e.id]>0?a("div",{staticClass:"inner"},[a("router-link",{style:{color:e.hex||"#42b983"},attrs:{to:"see/"+e.id+"/0/0"}},[t._v(t._s(e.id)+" - "+t._s(e.t)),a("i",{staticClass:"right arrow icon"})])],1):t._e()])})],2)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"ui orange button",attrs:{href:"https://play.google.com/store/apps/details?id=tw.goban.app",target:"_blank"}},[e("i",{staticClass:"google play icon"}),this._v("App on Google Play")])}]};var f=a("VU/8")(p,v,!1,function(t){a("84zU")},"data-v-71116c7e",null).exports,g={name:"See",data:function(){return{data:[],name:"",stars:{goban_intro:5}}},props:["gobans"],watch:{$route:function(t,e){this.reload()}},methods:{downloadObjectAsJson:function(t,e){var a="data:text/json;charset=utf-8,"+encodeURIComponent(h()(t)),s=document.createElement("a");s.setAttribute("href",a),s.setAttribute("download",e+".json"),document.body.appendChild(s),s.click(),s.remove()},backup:function(t,e){this.downloadObjectAsJson(this.data,this.name+e)},getSrc:function(){return"new"===this.$route.params.index?"https://ethercalc.org/"+this.$route.params.id+this.$route.params.lev:this.data[this.$route.params.index]?decodeURIComponent(this.data[this.$route.params.index].url):void 0},tar:function(t){return(t.note+"").match(/blank/)?"_blank":"iframe"},reload:function(){var t=this;console.log("reload..."),this.$http.get("https://ethercalc.org/"+this.$route.params.id+this.$route.params.lev+".csv.json").then(function(e){t.data=t.parse(e.body),t.$forceUpdate()},function(e){console.log(e),t.data=[],t.$router.push("/see/"+t.$route.params.id+"/"+t.$route.params.lev+"/new")})},handleRate:function(t,e){this.stars[t]||(this.stars[t]=0),this.stars[t]===e?this.stars[t]=0:this.stars[t]=e,this.$localStorage.set("stars",h()(this.stars)),this.$forceUpdate()},loadStars:function(){console.log(JSON.parse(this.$localStorage.get("stars"))),this.stars=JSON.parse(this.$localStorage.get("stars"))},parse:function(t){t[1]&&(this.name=t[1][1]);var e,a=t.slice(2);return a=a.map(function(t){var e={};return e.name=t[1],e.url=t[0].replace("%20","").replace(" ",""),e.note=t[2],e}).filter(function(t){return t.name}).map(function(t,a){return t.url?(t.type="link",t.parentIndex=e):(t.type="folder",t.open=!0,(t.note+"").match(/close/)&&(t.open=!1),e=a),t}),console.log(a),a}},mounted:function(){this.reload(),this.loadStars()}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("div",{staticClass:"ui fixed top menu",attrs:{id:"navbar"}},[a("router-link",{staticClass:"item",attrs:{to:"/","data-content":"首頁",title:"首頁"}},[a("sui-icon",{attrs:{size:"small",name:"home"}})],1),a("router-link",{staticClass:"item",attrs:{to:"/stars","data-content":"珍藏",title:"珍藏"}},[a("sui-icon",{style:{color:t.stars[t.$route.params.id]?"yellow":"gray"},attrs:{size:"small",name:"star"}})],1),a("router-link",{staticClass:"item",attrs:{to:"/update/"+t.$route.params.id,"data-content":"設定",title:"設定"}},[a("i",{staticClass:"cogs icon"})]),a("sui-dropdown",{staticClass:"item",attrs:{text:"相關"}},[t.gobans[t.$route.params.id]&&t.gobans[t.$route.params.id].id?a("sui-dropdown-menu",t._l(t.gobans[t.$route.params.id].related,function(e){return a("sui-dropdown-item",{key:e,on:{click:function(a){return t.$router.push("/see/"+e+"/0/0")}}},[t._v(t._s(e))])}),1):t._e()],1),a("sui-dropdown",{staticClass:"item",attrs:{text:"等級"}},[a("sui-dropdown-menu",t._l([0,1,2,3],function(e){return a("sui-dropdown-item",{key:e,on:{click:function(a){return t.$router.push("/see/"+t.$route.params.id+"/"+e+"/0")}}},[t._v("等級"+t._s(e))])}),1)],1),a("div",{staticClass:"right menu"},[a("a",{staticClass:"item fat-only",attrs:{"data-content":"備份",title:"備份"},on:{click:function(e){return t.backup(t.$route.params.id,t.$route.params.lev)}}},[a("i",{staticClass:"cloud download icon"})]),t.data[t.$route.params.index]?a("a",{staticClass:"item",attrs:{href:t.data[t.$route.params.index].url,target:"_blank","data-content":"開新分頁",title:"開新分頁"}},[a("sui-icon",{attrs:{size:"small",name:"right arrow"}})],1):t._e(),"new"==t.$route.params.index?a("a",{staticClass:"item",attrs:{href:"https://ethercalc.org/"+t.$route.params.id+t.$route.params.lev,target:"_blank","data-content":"編輯",title:"編輯"}},[t._v("編輯"),a("sui-icon",{attrs:{size:"small",name:"right arrow"}})],1):t._e()])],1),a("div",{staticClass:"ui grid"},[a("div",{staticClass:"four wide left aligned column"},[a("div",{staticClass:"ui list"},[a("router-link",{staticClass:"item",attrs:{to:"/see/"+t.$route.params.id+"/"+t.$route.params.lev+"/new","data-content":"編輯",title:"編輯"}},[a("img",{staticClass:"fat-only",attrs:{src:"https://www.google.com/s2/favicons?domain=https://ethercalc.org/"}}),a("span",{style:{color:t.gobans[t.$route.params.id].hex||"blue"}},[t._v(t._s(t.name||t.$route.params.id+t.$route.params.lev))]),a("i",{staticClass:"inline edit large icon",style:{color:t.gobans[t.$route.params.id].hex||"blue"}})]),a("hr"),t._l(t.data,function(e,s){return a("div",{key:e.name+s,staticClass:"item"},["link"==e.type?a("div",{directives:[{name:"show",rawName:"v-show",value:!e.parentIndex||t.data[e.parentIndex].open,expression:"!d.parentIndex || data[d.parentIndex].open"}]},[e.parentIndex?a("span"):t._e(),"_blank"==t.tar(e)?a("a",{staticClass:"link",attrs:{href:decodeURIComponent(e.url),target:"_blank"}},[t._v(t._s(decodeURIComponent(e.name))),a("img",{staticClass:"floating right",attrs:{src:"https://www.google.com/s2/favicons?domain="+e.url}}),a("sui-icon",{attrs:{name:"right arrow"}})],1):a("router-link",{staticClass:"link",attrs:{to:"/see/"+t.$route.params.id+"/"+t.$route.params.lev+"/"+s}},[t._v(t._s(decodeURIComponent(e.name))),a("img",{staticClass:"floating right",attrs:{src:"https://www.google.com/s2/favicons?domain="+decodeURIComponent(e.url)}})])],1):t._e(),"folder"==e.type?a("div",[a("a",{on:{click:function(t){e.open=!e.open}}},[t._v(t._s(decodeURIComponent(e.name))),a("img",{directives:[{name:"show",rawName:"v-show",value:!e.open,expression:"!d.open"}],staticClass:"ui mini image",attrs:{src:"/static/images/isClosed.png"}}),a("img",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"d.open"}],staticClass:"ui mini image",attrs:{src:"/static/images/isOpen.png"}})])]):t._e()])})],2)]),a("div",{staticClass:"twelve wide column",on:{mouseout:function(e){return t.reload()}}},[t._l([1,2,3,4,5],function(e){return a("a",{on:{click:function(a){return t.handleRate(t.$route.params.id,e)}}},[a("sui-icon",{class:t.stars[t.$route.params.id]>=e?"yellow":"gray",attrs:{name:"star"}})],1)}),t.getSrc()?a("iframe",{attrs:{id:"iframe",name:"iframe",src:t.getSrc(),alt:"Loading..."}}):a("div",{staticClass:"ui active dimmer"},[a("div",{staticClass:"ui text loader"},[t._v("Loading...")])])],2)])])},staticRenderFns:[]};var C=a("VU/8")(g,_,!1,function(t){a("P+WA")},"data-v-d1e59552",null).exports,y={data:function(){return{myKey:"",stars:{goban_intro:5}}},props:["gobans"],localStorage:{stars:{goban_intro:5}},methods:{has:function(t,e){return new RegExp(e).test(t.id)},create:function(t){this.$emit("create",t),this.$router.push("/see/"+t+"/0/new")},handleRate:function(t,e){this.stars[t]||(this.stars[t]=0),this.stars[t]===e?this.stars[t]=0:this.stars[t]=e,this.$localStorage.set("stars",h()(this.stars)),this.$forceUpdate()},loadStars:function(){console.log(JSON.parse(this.$localStorage.get("stars"))),this.stars=JSON.parse(this.$localStorage.get("stars"))}},mounted:function(){this.loadStars()}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",{staticClass:"ui header"},[t._v("我的珍藏")]),a("div",{staticClass:"ui form container"},[a("div",{staticClass:"field"},[a("input",{directives:[{name:"autofocus",rawName:"v-autofocus"},{name:"model",rawName:"v-model",value:t.myKey,expression:"myKey"}],attrs:{type:"search",name:"",placeholder:"搜詢黑板",autofocus:"true"},domProps:{value:t.myKey},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.$router.push("/see/"+t.myKey+"/0/0")},input:function(e){e.target.composing||(t.myKey=e.target.value)}}})])]),a("div",{staticClass:"ui segment left aligned container"},[t.gobans?t._e():a("div",{staticClass:"ui active dimmer"},[a("div",{staticClass:"ui text loader"},[t._v("Loading...")])]),a("div",{staticClass:"ui grid"},[a("div",{staticClass:"doubling one column row"},t._l(t.gobans,function(e){return a("div",{key:e.id,staticClass:"column",attrs:{id:"goban"}},[t.stars[e.id]>0?a("div",{directives:[{name:"show",rawName:"v-show",value:!t.myKey||t.has(e,t.myKey),expression:"!myKey || has(g, myKey)"}],staticClass:"inner"},[t._l([1,2,3,4,5],function(s){return a("a",[a("sui-icon",{style:t.stars[e.id]>=s?"yellow":"gray",attrs:{name:"star"}})],1)}),a("router-link",{attrs:{to:"update/"+e.id,"data-content":"設定",title:"設定"}},[a("i",{staticClass:"cogs icon"})]),a("router-link",{attrs:{to:"see/"+e.id+"/0/0"}},[a("h2",{staticClass:"ui header",style:{color:e.hex||"#42b983"}},[t._v(t._s(e.id)+" - "+t._s(e.t))])]),a("p",[t._v("相關黑板:"),a("br"),t._l(e.related,function(e){return a("router-link",{key:e,staticClass:"r",attrs:{to:"see/"+e+"/0/0"}},[t._v(t._s(e))])})],2)],2):t._e()])}),0)])])])},staticRenderFns:[]};var w=a("VU/8")(y,b,!1,function(t){a("AlFx")},"data-v-78e78ce8",null).exports,k={data:function(){return{myKey:"",stars:{goban_intro:5}}},props:["gobans"],localStorage:{stars:{goban_intro:5}},methods:{create:function(t){this.$emit("create",t),this.$router.push("/see/"+t+"/0/new")},handleRate:function(t,e){this.stars[t]||(this.stars[t]=0),this.stars[t]+=e,10===this.stars[t]&&(this.stars[t]=0),this.$localStorage.set("stars",this.stars),this.$forceUpdate()},loadStars:function(){console.log(JSON.parse(this.$localStorage.get("stars"))),this.stars=JSON.parse(this.$localStorage.get("stars"))}},mounted:function(){this.loadStars()}},$={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",{staticClass:"ui header"},[t._v("如何使用")]),a("div",{staticClass:"ui container"},[a("div",{staticClass:"ui left aligned segment"},[a("h2",{staticClass:"ui header"},[t._v("簡介")]),a("p",[t._v("你知道嗎？近來的太陽花、停建核四等公民運動，都採用 hackfoldr（唸作 hack-folder）來架設資訊入口網站。")]),t._m(0),a("p",[t._v("現在，它是個開放給所有人使用的平台，你也可以為專案、活動，建立屬於自己的「黑客公事包」，讓所有文件、網頁一目了然。")]),t._m(1),t._m(2),a("p"),a("h2",{staticClass:"ui header"},[t._v("如何創建")]),a("div",{staticClass:"ui ordered list"},[a("div",{staticClass:"item"},[t._v("先進入首頁")]),a("div",{staticClass:"item"},[t._v("打上你的黑板的名字，按創建")]),a("div",{staticClass:"item"},[t._v("會進入一個試算表的頁面")]),a("div",{staticClass:"item"},[t._v("在B2欄位打上黑板的名字")]),a("div",{staticClass:"item"},[t._v("再往下的每個欄位中")]),a("div",{staticClass:"item"},[t._v("A的部分打上網址")]),a("div",{staticClass:"item"},[t._v("B的部分打上名字")]),a("div",{staticClass:"item"},[t._v("這樣就可以創建一個連結")]),a("router-link",{staticClass:"item",attrs:{to:"/see/test/0/0"}},[t._v("可以參考"),a("i",{staticClass:"edit icon"}),t._v("沙盒")])],1),a("h2",{staticClass:"ui header"},[t._v("馬上開始")]),a("div",{staticClass:"ui bulleted list"},[a("router-link",{staticClass:"item",attrs:{to:"/see/goban_intro/0/0/"}},[a("i",{staticClass:"question icon"}),t._v("更多說明")]),a("router-link",{staticClass:"item",attrs:{to:"/see/test/0/0"}},[a("i",{staticClass:"edit icon"}),t._v("沙盒")]),a("router-link",{staticClass:"item",attrs:{to:"/"}},[a("i",{staticClass:"home icon"}),t._v("回首頁")])],1),a("h2",[t._v("免責聲明")]),a("p",[t._v("零時黑板(Goban)和hackfoldr一樣，不會審查您所提供的網址，請注意僅放入合乎法律規範的網站超連結")])])]),a("iframe",{attrs:{width:"560",height:"315",src:"https://www.youtube.com/embed/uZo8eCfoS_Q",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:"allowfullscreen"}})])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("hackfoldr 是"),e("a",{attrs:{href:"http://g0v.tw",target:"_blank"}},[this._v("g0v社群")]),this._v("的開源專案之一，本來是為了整理社群在黑客松產出的大量文件而誕生。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("零時黑板(Goban)也是"),e("a",{attrs:{href:"http://g0v.tw",target:"_blank"}},[this._v("g0v社群")]),this._v("的開源專案之一。是一個類似hackfoldr的「黑客公事包」，其差別在於：")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ui ordered list"},[e("div",{staticClass:"item"},[this._v("您可以在各個公事包之間設立關聯")]),e("div",{staticClass:"item"},[this._v("您不僅可以創建，也可以搜詢到別人創建的公事包")]),e("div",{staticClass:"item"},[this._v("您可以和他人一起協作共用的公事包")])])}]};var x=a("VU/8")(k,$,!1,function(t){a("uOxq")},"data-v-c92e0514",null).exports,S={name:"PageIndex",props:["gobans"],data:function(){return{myRelated:[],myTags:[],hex:"green",colors:["red","green","blue","black","orange","brown"],stars:{goban_intro:5}}},methods:{adRel:function(t){this.myRelated.indexOf(t)>-1?this.myRelated=this.myRelated.filter(function(e){return e!==t}):this.myRelated.push(t)},create:function(t,e){this.$emit("create",t,e)},crt:function(){this.create(this.$route.params.id,{t:this.gobans[this.$route.params.id].t,related:this.myRelated,tags:this.myTags,hex:this.hex}),window.alert("更新成功")},reload:function(){this.$emit("reload")},getMyRelated:function(){var t=this.$route.params.id;return this.gobans[t].related.slice()},getHex:function(){var t=this.$route.params.id;return this.gobans[t].hex}},mounted:function(){this.myRelated=this.getMyRelated(),this.hex=this.getHex()}},R={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui container"},[a("div",{staticClass:"ui grid"},[a("div",{staticClass:"ui row"},[a("h2",{staticClass:"ui header",style:{color:t.hex||"black"}},[t._v("更新"+t._s(t.$route.params.id))])]),a("div",{staticClass:"ui row"},[a("div",{staticClass:"ui form"},[a("div",{staticClass:"field"},[a("div",{staticClass:"ui labeled input"},[a("div",{staticClass:"ui label"},[t._v("色碼:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.hex,expression:"hex"}],staticClass:"my-picker",attrs:{type:"search",name:"",list:"cs"},domProps:{value:t.hex},on:{input:function(e){e.target.composing||(t.hex=e.target.value)}}}),a("datalist",{attrs:{id:"cs"}},t._l(t.colors,function(e){return a("option",{key:e,domProps:{value:e}},[t._v(t._s(e))])}),0),a("div",{staticClass:"ui label",style:{"background-color":t.hex}},[t._v("  ")])]),a("div",{staticClass:"ui labeled input"},[a("div",{staticClass:"ui label"},[t._v("簡介:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.gobans[t.$route.params.id].t,expression:"gobans[$route.params.id].t"}],attrs:{type:"text",name:"",placeholder:"輸入黑板的簡介",autofocus:"true"},domProps:{value:t.gobans[t.$route.params.id].t},on:{input:function(e){e.target.composing||t.$set(t.gobans[t.$route.params.id],"t",e.target.value)}}})])])])]),a("div",{staticClass:"ui two column row"},[a("div",{staticClass:"column"},[t._v("相關黑板： "+t._s(t.myRelated))]),t._l(t.gobans,function(e){return a("div",{key:e.id,staticClass:"column"},[a("a",{class:t.myRelated.indexOf(e.id)>-1?"yellow":"gray",on:{click:function(a){return t.adRel(e.id)}}},[t._v(t._s(e.id))])])})],2),a("div",{staticClass:"ui row"},[a("div",{staticClass:"ui button group"},[t.$route.params.id?a("a",{staticClass:"ui blue huge button",on:{click:function(e){return t.crt()}}},[t._v(t._s("更新"+t.$route.params.id))]):t._e(),a("router-link",{staticClass:"ui green huge button",attrs:{to:"/see/"+t.$route.params.id+"/0/0"}},[t._v(t._s("前往"+t.$route.params.id))])],1)])])])},staticRenderFns:[]};var P=a("VU/8")(S,R,!1,function(t){a("Wj9k")},"data-v-7e290949",null).exports,O={data:function(){return{}},methods:{iOS:function(){var t=!1,e=["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"];if(console.log(navigator.platform),navigator.platform)for(;e.length;)navigator.platform===e.pop()&&(t=!0);return console.log(t),t}}},U={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hello"},[e("h1",{staticClass:"ui header"},[this._v("零時黑板-手機App")]),e("div",{staticClass:"ui button group"},[e("a",{directives:[{name:"show",rawName:"v-show",value:!this.iOS(),expression:"!iOS()"}],staticClass:"ui orange huge button",attrs:{href:"https://play.google.com/store/apps/details?id=tw.goban.app",target:"_blank"}},[e("i",{staticClass:"google play icon"}),this._v("App on Google Play")])])])},staticRenderFns:[]};var N=a("VU/8")(O,U,!1,function(t){a("vp8I")},"data-v-166bcf48",null).exports,E={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hello"},[e("h1",{staticClass:"ui header"},[this._v("零時黑板-瀏覽器插件")]),e("div",{staticClass:"ui button group"},[e("a",{staticClass:"ui orange huge button",attrs:{href:"https://addons.mozilla.org/zh-TW/firefox/addon/%E9%9B%B6%E6%99%82%E9%BB%91%E6%9D%BF/",target:"_blank"}},[e("i",{staticClass:"firefox icon"}),this._v("Firefox Add-on")])])])}]};var K=a("VU/8")({data:function(){return{}}},E,!1,function(t){a("WLqc")},"data-v-78fccbda",null).exports;s.default.use(d.a);var A=new d.a({routes:[{path:"/",name:"HelloWorld",component:f},{path:"/star",name:"Star",component:w},{path:"/see/:id/:lev/:index",name:"See",component:C},{path:"/intro",name:"Intro",component:x},{path:"/update/:id",name:"Update",component:P},{path:"/myapp",name:"MyApp",component:N},{path:"/extension",name:"Extension",component:K}]}),I=a("hnaQ"),F=a("8+8L"),V=a("myK/"),z=a.n(V),j=(a("kVq8"),a("UnSZ")),J=a.n(j),q=a("vVk6"),B=a.n(q),M=(a("u7Vc"),a("TX8X")),W=a.n(M),L=a("vk9Y"),T=a.n(L);window.eventBus=new s.default,s.default.use(T.a,{tagName:"app-view",bus:"eventBus",event:"error-page",resolver:function(t){return a("60Q/")("./"+t).default}}),s.default.use(W.a),s.default.directive("autofocus",B.a),s.default.use(J.a),a("kgP6"),s.default.use(z.a),s.default.use(F.a),s.default.use(I.a),s.default.config.productionTip=!1,new s.default({el:"#app",router:A,components:{App:u},template:"<App/>"})},"P+WA":function(t,e){},UIzO:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h1",[this._v("404 Error")]),this._v(" "),e("p",[this._v("The resource could not be found.")]),this._v(" "),e("router-link",{attrs:{to:"/",exact:""}},[this._v("\n        Go to home page\n    ")])],1)},staticRenderFns:[]},i=a("VU/8")(null,s,!1,null,null,null);e.default=i.exports},WLqc:function(t,e){},Wj9k:function(t,e){},kVq8:function(t,e){},kgP6:function(t,e){},pc6b:function(t,e){},uOxq:function(t,e){},vp8I:function(t,e){}},[0]);
//# sourceMappingURL=app.c995642ca63dad6177c5.js.map