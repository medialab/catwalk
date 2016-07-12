<template>
  <div v-for="tweet in tweetsp" class="tweetContainer">
    <Tweet :tweet="tweet" ></Tweet>
  </div>
</template>

<script>
import Tweet from './Tweet'

export default {
  props: ['tweets','start','end'],
  components: {Tweet},
  computed: {
    tweetsp: function(){ return _.slice(this.tweets, this.start, this.end) }
  }
}
</script>
