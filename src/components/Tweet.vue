<template>
  <div class="tweet">
    <div class="col-sm-4"
      id={{'tw'+tweet.id}}
      v-bind:class="['twbox', twstate, twposition]"
      ></div>
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
  transition-property: margin-left, border-top;
  transition-duration: 0.2s, 0.1s;
  transition-timing-function:ease-out, ease-out;
}

.out {
  border-top: tomato 2vw solid;
  /*margin-left: 25vw;*/
}

.in {
  border-top: #4CD563 2vw solid;
  /*margin-left: 45vw;*/
}

.undecided {
  border-top: grey 2vw solid;
  /*margin-left: 32vw;*/
}

</style>
