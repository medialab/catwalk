<template>
    <div id="filepicker" class="col-sm-6 col-sm-offset-2">
      <h1>CATWALK</h1>
      <div class="form-group">
        <label for="exampleInputFile">Add a CSV …</label>
        <input type="file" @change="onFileChange">
        <p class="help-block">tweets should have "id" in the "id" column.</p>
      </div>
    </div>
</template>

<script>
const Papa = require('papaparse');
import state from './../state.js'

export default {
  data: function(){ return {state} },
  ready (){
    console.log("state", this.state);
  },
  methods:{
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var file = files[0];
      var reader = new FileReader();
      reader.onload = () => {
        var results = Papa.parse(reader.result, {header: true})
        _.forEach(results.data, (t) => {
          if(_.isUndefined(t.in)) t.in = undefined;
        })
        this.state.tweets = results.data;
        this.state.dataSetName = file.name;
      }
      reader.readAsBinaryString(file);
    }
  }
}
</script>
<style scoped>
#filepicker {
  font-family: 'Playfair Display', serif;
}
</style>
