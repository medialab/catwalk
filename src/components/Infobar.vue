<template>
    <div class="navbar navbar-fixed-bottom container-fluid">
        <p class="col-sm-3">
          <a target="_blank" :href="[('https://twitter.com/' + (tweet.from_user_screenname || tweet.user_screen_name))]">
            <img v-bind:src="[(tweet.from_user_profile_image_url || tweet.user_image).replace(/^https?:/, '')]">
            <strong>@{{tweet.from_user_screenname || tweet.user_screen_name || tweet.from_user_name || tweet.user_name}}</strong>
          </a>
        </p>
        <p class="col-sm-7">{{tweet.full_text || tweet.text}}</p>
        <p class="col-sm-7"><a target="_blank" :href="[(tweet.url || 'https://twitter.com/' + (tweet.from_user_screenname || tweet.user_screen_name) + '/status/' + tweet.id)]">&#128279; link</a></p>
    </p>
    </div>
</template>
<script>
  import state from './../state.js'

  export default {
    data: function(){ return {state:state} },
    computed:{
      tweet: function(){
        return this.state.tweets[this.state.start];
      },
      twstate: function(){
        if(_.isUndefined(this.tweet.in)) return 'undecided'
        return (this.tweet.in ? 'in' : 'out')
      }
    }
  }
</script>
<style scoped>
  .navbar { min-height: 70px; }
</style>
