<template>
    <div id="filepicker" class="col-sm-8 col-sm-offset-1">
      <h1>CATWALK</h1>
      <div class="form-group">
        <label for="exampleInputFile">Add a CSV with at least a column with tweets id (<a target="_blank" href="https://raw.githubusercontent.com/medialab/catwalk/master/sample.csv">CSV sample</a>)</label>
        <input type="file" @change="onFileChange">
      </div>

      <p class="col-xs-2 logo"><a href="http://www.medialab.sciences-po.fr/fr/" target="_blank" ><img class="img-responsive" src="http://www.medialab.sciences-po.fr/wp-content/uploads/2016/04/logo.png"></a></p>
      <p class="col-xs-9 comment">
        Discover other médialab's tools on: <a  target="_blank" href="http://tools.medialab.sciences-po.fr">tools.medialab.sciences-po.fr</a>
        <br>CATWALK is a free software under LGPL V3 licence. Source code and documentation available on <a  target="_blank" href="https://github.com/medialab/catwalk">GitHub</a>.

      </p>



    </div>
</template>

<script>
const Papa = require('papaparse');
import state from './../state.js'

export default {
  data: function(){ return {state} },
  methods:{
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var file = files[0];
      var reader = new FileReader();

      reader.onload = () => {
        var results = Papa.parse(reader.result, {header: true})
        _.forEach(results.data, (t) => {
          if(t.in === "true") t.in = true;
          else if(t.in === "false") t.in = false;
          else if(t.in === "") t.in = undefined;
          else if(_.isUndefined(t.in)) t.in = undefined; // creates column
        })

        this.state.tweets = results.data;
        this.state.dataSetName = file.name;
        this.state.start = _.findIndex(this.state.tweets, ['in',undefined])

      }
      reader.readAsText(file, 'UTF-8');
    }
  }
}
</script>
<style scoped>
  .logo {
    padding-left: 0;
    margin-top: 4px;
  }
  .comment {
    color: grey;
  }
  #filepicker {
    font-family: 'Playfair Display', serif;
  }
  input {
    margin-top: 20px;
    height: 30vh;
  }
</style>
