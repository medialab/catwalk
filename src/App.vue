<template>
  <div id="app" >
        <h1 class="logo">CATWALK</h1>

    <Loader v-if="tweets.length < 1" :tweets="tweets"></Loader>
    <div class="controls" v-if="tweets.length > 0" >
      <div>
        <button v-on:click="prev">prev</button>
        {{start}}/{{tweets.length}}
        <button v-on:click="next">next</button>
        —
        display in <input type="checkbox">
        out <input type="checkbox">
        —
        <button v-on:click="save">get my data back !</button>
      </div>
    </div>

    <Twlist :tweets="tweets" :start="start" :end="end" ></Twlist>
    <!-- <Hints  v-if="tweets.length < 1" :tweets="tweets"></Hints> -->
  </div>
</template>

<script>
import Hello from './components/Hello'
import Loader from './components/Loader'
import Twlist from './components/Twlist'
import Hints from './components/Hints'
import _ from 'lodash'
const Papa = require('papaparse');

export default {
  data () {
    return {
      tweets:[],
      dataSetName:'none',
      start:0,
      end:1,
    }
  },
  created: function () {
    window.addEventListener('keyup', this.keyHandler);
    // window.addEventListener("beforeunload", function (e) {
    //     var confirmationMessage = 'It looks like you have been editing something. '
    //                             + 'If you leave before saving, your changes will be lost.';

    //     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    //     return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    // });
  },
  components: { Hello,Loader,Twlist,Hints },
  methods: {
    keyHandler: function (e) {
      var key = e.which || e.keyCode;
      console.log(key);

      if(key === 40) this.next();
      if(key === 38) this.prev();
      if(key === 83) this.save();
    },
    prev: function (){
      this.start = Math.abs(this.start-1);
      this.end   = this.start+1;
    },
    next: function (){
      this.start = (this.start + 1) % this.tweets.length;
      this.end   = this.start+1;
    },
    save: function(){
      var data = JSON.parse(JSON.stringify(this.$get('tweets')));
      var csv = Papa.unparse(data);
      var blob = new Blob([csv], {type: "octet/stream"});

      var d = new Date();
      var fileName = this.$get('dataSetName')+'_'+d.toString()+'.csv'

      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";

      var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }
  }
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Playfair+Display';

body, html {
  padding: 0;
  margin: 0;
  font-family: 'Playfair Display', serif;
  text-align: center;
  color: black;
}
.logo {
  text-align: center;
}

.twbox {
  width: 40vw;

  border-radius: 8px;
  transition-property: margin-left, border-left;
  transition-duration: 0.2s, 0.1s;
  transition-timing-function:ease-out, ease-out;
  max-width: 500px;
}
.out {
  border-top: tomato 2vw solid;
  margin-left: 25vw;
}
.in  {
  border-top: springgreen 2vw solid;
  margin-left: 45vw;
}
.controls {
  margin:24px;
}
button {
    background-color: white; /* Green */
    font-family: 'Playfair Display', serif;
    color: black;
    text-align: center;
    display: inline-block;
    font-size: 14px;
}

hr {
  height: 1px;
  border: none;
  background-color: black;
  width: 50%;
  margin-top:24px;
}
#filepicker {
  text-align: center;
  margin-top: 20vh;
}

</style>
