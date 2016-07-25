<template>
    <div class="controls navbar navbar-fixed-top container-fluid" >
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
          Download |
          <span class="badge out">{{twout.length}}</span>
          <span class="badge undecided">{{twundecided.length}}</span>
          <span class="badge in">{{twin.length}}</span>
        </button>
      </div>
      </div>
    </div>
</template>

<script>
import state from './../state.js';
const Papa = require('papaparse');
const filesaver = require('file-saver');

export default {
  data: function(){ return {state:state} },
  created: function () {
    window.addEventListener('keyup', this.keyHandler)
  },
  methods: {
    keyHandler: function (e){
      var key = e.which || e.keyCode;

      if([32, 37, 38, 39, 40].indexOf(key) > -1) e.preventDefault();

      if(key === 85) this.setTwState(undefined);   // u
      if(key === 83) _.debounce(this.save(), 1000) // s

      if(key === 39) this.setTwState(true);        // right
      if(key === 37) this.setTwState(false);       // left

      if(key === 40) this.next();                 // bottom
      if(key === 38) this.prev();                 // top

    },
    setTwState: function (s){

      // the actual tweet
      this.state.tweets[this.state.start].in = s;

      // tweets who retweets this
      _(this.state.tweets)
        .filter({'retweeted_id':this.tweet.id})
        .forEach(function(tweet){ tweet.in = s })

      // tweets who is retweeted
      _(this.state.tweets)
        .filter({'id':this.tweet.retweeted_id})
        .forEach(function(tweet){ tweet.in = s })

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

      var d = new Date();
      var fileName = this.state.dataSetName+'_'+d.toISOString()+'.csv'

      var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
      filesaver.saveAs(blob, fileName, true);
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
