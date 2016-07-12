<template>
  <div>
    <div id="filepicker">
      <h2>First, a CSV …</h2>
      <p>We will look for tweets "id" in the "id" column.</p>
      <input type="file" @change="onFileChange">
    </div>
  </div>
</template>

<script>
const Papa = require('papaparse');

export default {
  methods:{

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var file = files[0];
      var reader = new FileReader();
      reader.onload = () => {
        var results = Papa.parse(reader.result, {header: true})
        _.forEach(results.data, (t) => {
            if(_.isUndefined(t.in)) t.in = false;
        })
        this.$parent.tweets = results.data;
        this.$parent.dataSetName = file.name;
      }
      reader.readAsBinaryString(file);
    }
  }
}
</script>
<style scoped>

</style>
