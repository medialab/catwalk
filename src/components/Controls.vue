<template>
    <div class="controls navbar navbar-fixed-top container" >
      <h1 class="logo col-sm-4">CATWALK</h1>
      <div class="col-sm-4">
        <div class="input-group">
          <div class="input-group-btn">
            <button class="btn btn-default" @click="prev">prev</button>
          </div>
          <input
            type="number"
            class="start form-control"
            v-model="state.start"
            max="{{state.tweets.length}}"
            debounce="500" number>
          <div class="input-group-btn">
            <button class="btn btn-default" @click="next">next</button>
          </div>
        </div>
      </div>
      <div class="col-sm-2"></div>
      <div class="col-sm-2">
        <button class="btn btn-default" @click="save">
        Download —
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

      if(key === 85) this.setTwState(undefined);   // u
      if(key === 73) this.setTwState(true);        // i
      if(key === 79) this.setTwState(false);       // o

      if(key === 70) this.next();                 // right
      if(key === 68) this.prev();                 // left
      if(key === 83) _.debounce(this.save(), 1000) // s

    },
    setTwState: function (s){

      // the actual tweet
      this.state.tweets[this.state.start].in = s;

      // tweets who retweets this
      _(this.state.tweets)
        .filter({'retweeted_id':this.tweet.id})
        .forEach(function(tweet){ tweet.in = s })
        .value();

      // tweets who is retweeted
      _(this.state.tweets)
        .filter({'id':this.tweet.retweeted_id})
        .forEach(function(tweet){ tweet.in = s })
        .value();
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
    padding-top:12px;
    height: 60px;
  }
  .start {
    text-align: center;
  }

  .logo {
    margin:0;
  }
</style>
