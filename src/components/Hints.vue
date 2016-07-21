<template>
  <div class="hints col-sm-2 ">
    <p><strong>shortcuts</strong></p>
    <p><code>↑</code> — <strong>previous</strong>
    <p><code>↓</code> — <strong>next</strong>
    <p><code>→</code> —  <span class="badge in">IN</span></p>
    <p><code>←</code> — <span class="badge out">OUT</span></p>
    <p><code>u</code> — <span class="badge undecided">UNDECIDED</span></p>
    <p><code>s</code> — <strong>save</strong></p>
  </div>
</template>

<style scoped>
  .hints {
    margin-top: 55px;
    position: fixed;
  }
  code {
    color: black;
    background: #eee;
  }
</style>
