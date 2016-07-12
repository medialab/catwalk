<template>
  <div id="app">
    <Loader :tweets="tweets"></Loader>
    <Explore id="explore-list" :tweets="tweets" start="0" end="20"></Explore>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Loader from './components/Loader'
import Explore from './components/Explore'
import _ from 'lodash'

export default {
  data () {
    return {
      tweets:[]
    }
  },
  components: { Hello,Loader,Explore }
}
</script>

<style>
body, html {
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-family: sans-serif;
}
#explore-list {
  text-align: center;
}

#out { right: 0; background: tomato;}
#in  { left: 0;  background: springgreen;}

#filepicker {
  position: absolute;
  z-index: 2000;

  top: 15vh;
  left: calc(25vw - 4vh);
  width: 50vw;
  height: 20vh;
  background-color: royalblue;

  text-align: center;
  padding: 4vh;

}

</style>
