<template>
    <div id="filepicker" class="col-sm-4 col-sm-offset-1">
      <h1>CATWALK</h1>
      <div class="form-group">
        <label for="exampleInputFile">Add a CSV with at least a column with tweets id </label>
        <input type="file" @change="onFileChange">
      </div>
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
  #filepicker {
    font-family: 'Playfair Display', serif;
  }
</style>
