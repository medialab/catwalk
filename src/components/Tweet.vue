<template>
  <div class="tweet">
    <div class="col-sm-4" v-bind:class="['twbox', twstate, twposition]">
      <span class="badge {{twstate}}">{{twstate}}</span>
      <div id='twBox'></div>
      <h5 v-if="twlinks > 0">quotes …</h5>
      <div id="quoteBox"></div>
    </div>
  </div>
</template>
<script>
import state from './../state.js'

export default {
  data: function(){ return {state} },
  ready: function(){
    twttr.widgets.createTweet(this.tweet.id, document.getElementById('twBox'));
  },
  watch: {
    'tweet.id': function(){

      var twBox = document.getElementById('twBox');
      twBox.innerHTML = "";
      twttr.widgets.createTweet(this.tweet.id, twBox);

      var quoteBox = document.getElementById('quoteBox');
      quoteBox.innerHTML = "";

      this.twlinks.forEach(function(id){ twttr.widgets.createTweet(id, quoteBox) })
    }
  },
  computed:{
    tweet: function(){
      return this.state.tweets[this.state.start];
    },
    twposition: function(){
      if(_.isUndefined(this.tweet.in)) return 'col-sm-offset-4'
      return (this.tweet.in ? 'col-sm-offset-5' : 'col-sm-offset-3')
    },
    twstate: function(){
      if(_.isUndefined(this.tweet.in)) return 'undecided'
      return (this.tweet.in ? 'in' : 'out')
    },
    twlinks: function(){
      var links = this.tweet.links.split("|");
      return _(links).map(function(link){
          var re1='.*?'; // Non-greedy match on filler
          var re2='(twitter)';  // Word 1
          var re3='.*?';  // Non-greedy match on filler
          var re4='(\\d+)'; // Integer Number 1

          var p = new RegExp(re1+re2+re3+re4,["i"]);
          var m = p.exec(link);
          if (m != null) return m[2];
        })
        .toArray()
        .value()
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
