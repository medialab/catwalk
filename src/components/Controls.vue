<template>
    <div class="controls navbar navbar-fixed-top" >
      <h1 class="logo col-sm-5">CATWALK</h1>
      <div class="col-sm-2">
        <div class="input-group">
          <div class="input-group-btn">
            <button class="btn btn-default" @click="prev">prev</button>
          </div>
          <input
            type="text"
            class="start form-control"
            v-model="state.start"
            max="{{state.tweets.length}}"
            debounce="500">
          <div class="input-group-btn">
            <button class="btn btn-default" @click="next">next</button>
          </div>
        </div>
      </div>
      <div class="col-sm-2">

      </div>
      <div class="col-sm-2">

        <button class="btn btn-default" @click="save">
        Download
        <span class="badge in">{{twin.length}}</span>
        <span class="badge undecided">{{twundecided.length}}</span>
        <span class="badge out">{{twout.length}}</span></button>
      </div>
      </div>
    </div>
</template>

<script>
import state from './../state.js'
const Papa = require('papaparse');

export default {
  data: function(){ return {state:state} },
  created: function () {
    window.addEventListener('keyup', this.keyHandler)
  },
  methods: {
    keyHandler: function (e){
      var key = e.which || e.keyCode;

      console.log(key);

      if(key === 39) this.tweetIsIn(true);
      if(key === 37) this.tweetIsIn(false);
      if(key === 85) this.tweetIsIn(undefined);

      if(key === 39) this.next(); // right
      if(key === 37) this.prev(); // left
      if(key === 83) this.save(); // s
    },
    tweetIsIn: function (s){
      this.state.tweets[this.state.start].in = s;
    },
    prev: function (){
      this.state.start = Math.abs(this.state.start-1);
    },
    next: function (){
      this.state.start = (this.state.start + 1) % this.state.tweets.length;
    },
    save: function(){
      var data = JSON.parse(JSON.stringify(this.state.tweets));
      var csv = Papa.unparse(data);
      var blob = new Blob([csv], {type: "octet/stream"});
      var d = new Date();
      var fileName = this.state.dataSetName+'_'+d.toString()+'.csv'

      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";

      var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }
  },
  computed:{
    hasData: function(){
      return this.state.tweets.length > 1
    },
    tweet: function(){
      return this.state.tweets[this.state.start];
    },
    twin: function(){return _.filter(this.state.tweets,{'in':true} ) },
    twout: function(){return _.filter(this.state.tweets,{'in':false} ) },
    twundecided: function(){return _.filter(this.state.tweets,{'in':undefined} ) }
  }
}
</script>
<style scoped>

  .controls {
    padding-top:24px;
    height: 80px;
  }
  .start {
    text-align: center;
  }

  .logo {
    text-align: center;
    margin:0;
  }
</style>
