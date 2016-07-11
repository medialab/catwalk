const glob = require("glob");
const lodash = require("lodash");
const path = require('path');
const csv = require('csv');
const fs = require('fs');
const Vue = require('vue');

var state = new Vue({
  data: function(){
    return {
      tweets:[],
      test:'testoff',
      nodata:true
    }
  },
  computed: {
    first: function(){
      return this.test.replace('off','on');
    }
  }
})

window.state = state;

var tweet = new Vue({
  el:"#tweet",
  ready: function(){
    console.log(this.twid)
    // twttr.widgets.createTweet(this.twid, document.getElementById('tw'+this.twid));
  }
})
// state
var app = new Vue({
  el: '#waitingList',
  components:{tweet:tweet},
  data: function(){
    return {
      state: state
    }
  }
})

var filepicker = new Vue({
  el: '#filepicker',
  methods:{

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      fs.readFile(files[0].path, (err, data) => {
        csv.parse(data,{columns: true}, function(err, data){
          state.tweets = data;
        });
      });

      if (!files.length)
        return;
    }
  }

})
