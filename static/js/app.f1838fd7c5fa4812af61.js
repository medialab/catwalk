webpackJsonp([1,0],[function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}var o=n(3),i=s(o),a=n(25),r=s(a);new i["default"]({el:"body",components:{App:r["default"]}})},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),i=(s(o),function(){return{tweets:[],dataSetName:"none",start:0}}());e["default"]=i},,,function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(29),i=s(o),a=n(30),r=s(a),d=n(26),u=s(d),f=n(28),c=s(f),l=n(27),p=s(l),v=n(1),_=s(v),w=n(18);s(w),n(2);e["default"]={data:function(){return{state:_["default"]}},created:function(){window.addEventListener("keyup",this.keyHandler),window.addEventListener("beforeunload",function(t){var e="It looks like you have been editing something. If you leave before saving, your changes will be lost.";return(t||window.event).returnValue=e,e})},components:{Loader:i["default"],Tweet:r["default"],Controls:u["default"],Infobar:c["default"],Hints:p["default"]},computed:{hasData:function(){return this.state.tweets.length>1},tweet:function(){return this.state.tweets[this.state.start]}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(9),i=s(o),a=n(1),r=s(a),d=n(2);e["default"]={data:function(){return{state:r["default"]}},created:function(){window.addEventListener("keyup",this.keyHandler)},methods:{keyHandler:function(t){var e=t.which||t.keyCode;[32,37,38,39,40].indexOf(e)>-1&&t.preventDefault(),85===e&&this.setTwState(void 0),83===e&&_.debounce(this.save(),1e3),39===e&&this.setTwState(!0),37===e&&this.setTwState(!1),40===e&&this.next(),38===e&&this.prev()},setTwState:function(t){this.state.tweets[this.state.start]["in"]=t,_(this.state.tweets).filter({retweeted_id:this.tweet.id}).forEach(function(e){e["in"]=t}),_(this.state.tweets).filter({id:this.tweet.retweeted_id}).forEach(function(e){e["in"]=t})},prev:function(){this.state.start=Math.abs(this.state.start-1)},next:function(){this.state.start=(this.state.start+1)%this.state.tweets.length},save:function(){var t=JSON.parse((0,i["default"])(this.state.tweets)),e=d.unparse(t),n=new Blob([e],{type:"octet/stream"}),s=new Date,o=this.state.dataSetName+"_"+s.toString()+".csv",a=document.createElement("a");document.body.appendChild(a),a.style="display: none";var r=window.URL.createObjectURL(n);a.href=r,a.download=o,a.click(),window.URL.revokeObjectURL(r)}},computed:{hasData:function(){return this.state.tweets.length>1},tweet:function(){return this.state.tweets[this.state.start]},twin:function(){return _.filter(this.state.tweets,{"in":!0})},twout:function(){return _.filter(this.state.tweets,{"in":!1})},twundecided:function(){return _.filter(this.state.tweets,{"in":void 0})}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=s(o);e["default"]={data:function(){return{state:i["default"]}},computed:{tweet:function(){return this.state.tweets[this.state.start]},twstate:function(){return _.isUndefined(this.tweet["in"])?"undecided":this.tweet["in"]?"in":"out"}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=s(o),a=n(2);e["default"]={data:function(){return{state:i["default"]}},methods:{onFileChange:function(t){var e=this,n=t.target.files||t.dataTransfer.files;if(n.length){var s=n[0],o=new FileReader;o.onload=function(){var t=a.parse(o.result,{header:!0});_.forEach(t.data,function(t){"true"===t["in"]?t["in"]=!0:"false"===t["in"]?t["in"]=!1:""===t["in"]?t["in"]=void 0:_.isUndefined(t["in"])&&(t["in"]=void 0)}),e.state.tweets=t.data,e.state.dataSetName=s.name,e.state.start=_.findIndex(e.state.tweets,["in",void 0])},o.readAsText(s,"UTF-8")}}}}},function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=s(o);e["default"]={data:function(){return{state:i["default"]}},ready:function(){twttr.widgets.createTweet(this.tweet.id,document.getElementById("twBox"))},watch:{"tweet.id":function(){var t=document.getElementById("twBox");t.innerHTML="",twttr.widgets.createTweet(this.tweet.id,t);var e=document.getElementById("quoteBox");e.innerHTML="",this.twlinks.forEach(function(t){twttr.widgets.createTweet(t,e)})}},computed:{tweet:function(){return this.state.tweets[this.state.start]},twposition:function(){return _.isUndefined(this.tweet["in"])?"col-sm-offset-4":this.tweet["in"]?"col-sm-offset-5":"col-sm-offset-3"},twstate:function(){return _.isUndefined(this.tweet["in"])?"undecided":this.tweet["in"]?"in":"out"},twlinks:function(){if(_.isUndefined(this.tweet.links))return[];var t=this.tweet.links.split("|");return _(t).map(function(t){var e=".*?",n="(twitter)",s=".*?",o="(\\d+)",i=new RegExp(e+n+s+o,["i"]),a=i.exec(t);if(null!=a)return a[2]}).toArray().value()}}}},,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,function(t,e){t.exports=" <div id=app class=container-fluid> <loader v-if=!hasData></loader> <controls v-if=hasData></controls> <hints></hints> <tweet v-if=hasData></tweet> <infobar v-if=hasData></infobar> </div> "},function(t,e){t.exports=' <div class=tweet _v-0c97e21a=""> <div class=col-sm-4 v-bind:class="[\'twbox\', twstate, twposition]" _v-0c97e21a=""> <span class="badge {{twstate}}" _v-0c97e21a="">{{twstate}}</span> <div id=twBox _v-0c97e21a=""></div> <h5 v-if="twlinks > 0" _v-0c97e21a="">quotes …</h5> <div id=quoteBox _v-0c97e21a=""></div> </div> </div> '},function(t,e){t.exports=' <div class="controls navbar navbar-fixed-top container-fluid" _v-28e56f1d=""> <h1 class="logo col-sm-4" _v-28e56f1d="">CATWALK</h1> <div class=col-sm-4 _v-28e56f1d=""> <div class=input-group _v-28e56f1d=""> <div class=input-group-btn _v-28e56f1d=""> <button class="btn btn-default" @click=prev _v-28e56f1d="">prev</button> </div> <input type=number class="start form-control" v-model=state.start max={{state.tweets.length}} debounce=500 number="" _v-28e56f1d=""> <div class=input-group-btn _v-28e56f1d=""> <button class="btn btn-default" @click=next _v-28e56f1d="">next</button> </div> </div> </div> <div class=col-sm-2 _v-28e56f1d=""></div> <div class=col-sm-2 _v-28e56f1d=""> <button class="btn btn-default" @click=save _v-28e56f1d=""> Download — <span class="badge out" _v-28e56f1d="">{{twout.length}}</span> <span class="badge undecided" _v-28e56f1d="">{{twundecided.length}}</span> <span class="badge in" _v-28e56f1d="">{{twin.length}}</span> </button> </div> </div> '},function(t,e){t.exports=' <div id=filepicker class="col-sm-4 col-sm-offset-1" _v-578f49ba=""> <h1 _v-578f49ba="">CATWALK</h1> <div class=form-group _v-578f49ba=""> <label for=exampleInputFile _v-578f49ba="">Add a CSV with at least a column with tweets id </label> <input type=file @change=onFileChange _v-578f49ba=""> </div> </div> '},function(t,e){t.exports=' <div class="hints col-sm-offset-10 col-sm-2" _v-60b4e8f5=""> <p _v-60b4e8f5=""><code _v-60b4e8f5="">↑</code> — <strong _v-60b4e8f5="">previous</strong> </p><p _v-60b4e8f5=""><code _v-60b4e8f5="">↓</code> — <strong _v-60b4e8f5="">next</strong> </p><p _v-60b4e8f5=""><code _v-60b4e8f5="">→</code> — <span class="badge in" _v-60b4e8f5="">IN</span></p> <p _v-60b4e8f5=""><code _v-60b4e8f5="">←</code> — <span class="badge out" _v-60b4e8f5="">OUT</span></p> <p _v-60b4e8f5=""><code _v-60b4e8f5="">u</code> — <span class="badge undecided" _v-60b4e8f5="">UNDECIDED</span></p> <p _v-60b4e8f5=""><code _v-60b4e8f5="">s</code> — <strong _v-60b4e8f5="">save</strong></p> </div> '},function(t,e){t.exports=' <div class="navbar navbar-fixed-bottom container-fluid" _v-e9641be4=""> <p class=col-sm-3 _v-e9641be4=""> <img v-bind:src=[tweet.from_user_profile_image_url] _v-e9641be4=""> <strong _v-e9641be4="">@{{tweet.from_user_name}}</strong> </p> <p class=col-sm-7 _v-e9641be4="">{{tweet.text}}</p> <p _v-e9641be4=""></p> </div> '},function(t,e,n){var s,o;n(12),s=n(4),o=n(19),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports["default"]),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var s,o;n(14),s=n(5),o=n(21),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports["default"]),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var s,o;n(16),o=n(23),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports["default"]),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var s,o;n(17),s=n(6),o=n(24),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports["default"]),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var s,o;n(15),s=n(7),o=n(22),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports["default"]),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var s,o;n(13),s=n(8),o=n(20),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports["default"]),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)}]);
//# sourceMappingURL=app.f1838fd7c5fa4812af61.js.map