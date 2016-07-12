<template>
  <div class="tweet">
    <div
      id={{'tw'+tweet.id}}
      v-bind:class="['twbox',tweet.in ? 'in' : 'out']"
      ></div>

    <p>
      {{tweet.id}} from <img v-bind:src="[tweet.from_user_profile_image_url]"> @{{tweet.from_user_name}}
    </p>

    <!-- <input v-model="tweet.in" type="checkbox"> -->
    <!-- <h3>{{inout}}</h3> -->
  </div>
</template>

<script>
export default {
  props: ['tweet'],
  created: function () {
    window.addEventListener('keyup', this.keyHandler)
  },
  ready: function(){
    twttr.widgets.createTweet(this.tweet.id, document.getElementById('tw'+this.tweet.id));
  },

  methods: {
    keyHandler: function (e) {
      var key = e.which || e.keyCode;
      if(key === 39) this.tweet.in = true;
      if(key === 37) this.tweet.in = false;
    }
  },
  computed:{
    inout: function(){ return this.tweet.in ? 'in' : 'out' }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
