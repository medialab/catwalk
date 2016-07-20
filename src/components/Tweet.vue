<template>
  <div class="tweet">
    <div>
      <div class="col-sm-4" v-bind:class="['twbox', twstate, twposition]">
        <span class="badge {{twstate}}">{{twstate}}</span>
          <div id={{'tw'+tweet.id}}></div>
        </div>
    </div>

  </div>
</template>

<script>

import state from './../state.js'

export default {
  data: function(){ return {state} },
  ready: function(){
    console.log(this.state.tweet)
    // twttr.widgets.createTweet(this.tweet.id, document.getElementById('tw'+this.tweet.id));
  },
  watch: {
    'tweet.id': function(){
      var elmt = document.getElementById('tw'+this.tweet.id);
      elmt.innerHTML = "";
      twttr.widgets.createTweet(this.tweet.id, elmt);
    }
  },
  computed:{
    tweet: function(){
      return this.state.tweets[this.state.start];
    },
    twposition: function(){
      if(_.isUndefined(this.tweet.in)) return 'col-sm-offset-2'
      return (this.tweet.in ? 'col-sm-offset-3' : 'col-sm-offset-1')
    },
    twstate: function(){
      if(_.isUndefined(this.tweet.in)) return 'undecided'
      return (this.tweet.in ? 'in' : 'out')
    }
  }
}
</script>

<style scoped>

.twbox {
  border-radius: 8px;
  transition-property: margin-left, background-color;
  transition-duration: 0.2s, 0.1s;
  transition-timing-function:ease-out, ease-out;
}
.badge {
  width: 100%;
  font-size: 24px;
}

</style>
