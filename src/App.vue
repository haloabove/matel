<template>
  <b-container class="bv-example-row" id="app">
    <nav>
      <router-link to="/">Statistics</router-link> |
      <router-link to="/table-view">Table view</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
 </b-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ListItem } from '@/models/index';
import {  Action } from 'vuex-class';

@Component({
})
export default class App extends Vue {
  @Action('fetchListItems') private fetchListItems!: () => Promise<ListItem[]>;

  created() {
    this.fetchListItems();
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
