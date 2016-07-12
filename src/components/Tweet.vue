<template>
  <div class="tweet">
    <span id={{'tw'+tweet.id}}></span>
  </div>
</template>

<script>
export default {
  props: ['tweet'],
  ready: function(){
    console.log(this.tweet.id)
    twttr.widgets.createTweet(this.tweet.id, document.getElementById('tw'+this.tweet.id));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
