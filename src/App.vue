<template>
  <div id="app" class="container" >
    <Loader v-if="!hasData"></Loader>
    <Controls v-if="hasData"></Controls>
    <Hints></Hints>
    <Tweet v-if="hasData"></Tweet>
    <Infobar v-if="hasData"></Infobar>
  </div>
</template>

<script>
import Loader from './components/Loader'
import Tweet from './components/Tweet'
import Controls from './components/Controls'
import Infobar from './components/Infobar'
import Hints from './components/Hints'
import state from './state.js'
import _ from 'lodash'
const Papa = require('papaparse')

export default {
  data: function(){ return {state} },
  created: function () {
    window.addEventListener('keyup', this.keyHandler);
    window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = 'It looks like you have been editing something. '
                                + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
  },
  components: {Loader, Tweet, Controls, Infobar, Hints },
  computed:{
    hasData: function(){
      return this.state.tweets.length > 1
    },
    tweet: function(){
      return this.state.tweets[this.state.start];
    },
  }
}
</script>

<style>
  @import 'https://fonts.googleapis.com/css?family=Playfair+Display';

  body, html {
   padding-bottom: 15vh;
  }
  h1 {
    font-family: 'Playfair Display', serif;
    color: black;
  }
  #app {
    margin-top: 80px;
  }
  hr {
    height: 1px;
    border: none;
    background-color: black;
    width: 50%;
    margin-top:24px;
  }

  .badge {
    transition-property: background-color;
    transition-duration: 0.1s;
    transition-timing-function:ease-out;
      text-transform: uppercase;

  }

  .badge.in {
    background-color: #4CD563 !important;
  }
  .badge.out {
    background-color: tomato !important;
  }
  .badge.undecided {
    background-color: grey !important;
  }


</style>
