<template>
  <div>
    <div v-if="this.$parent.tweets.length < 1" id="filepicker">
      <h2>select a CSV file from your desktop</h2>
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

      var reader = new FileReader();
      reader.onload = () => {
        var results = Papa.parse(reader.result, {header: true})
        this.$parent.tweets = results.data;
      }
      reader.readAsBinaryString(files[0]);
    }
  }
}
</script>
<style scoped>
  div {
    color: white;
  }
</style>
