<template>
  <div id="app">
    <div class="outter-contianer">
      <div class="main-header">
        <div>
          <img src="./assets/ontario_logo.png">
        </div>
      </div>
      <div class="inner-container content-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.button {
  padding: 30px;
  background-color: green($color: #000000);
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
