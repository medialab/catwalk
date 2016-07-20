<template>
    <div class="navbar navbar-fixed-bottom">
        <p class="col-sm-offset-2 col-sm-2">
          <img v-bind:src="[tweet.from_user_profile_image_url]">
            <strong >@{{tweet.from_user_name}}</strong>
        </p>
        <p class="col-sm-5">{{tweet.text}}</p>
        <p class="col-sm-1">{{twstate}}</p>
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


  .navbar {
    min-height: 70px;
  }
</style>
