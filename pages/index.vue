<template>
  <div id="app">
    <Logo></Logo>
    <Search :setDogs="setDogs"></Search>
    <div id="container" v-if="!error">
      <container :id="1" :dogs="dogs[1]"></container>
      <container :id="2" :dogs="dogs[2]"></container>
      <container :id="3" :dogs="dogs[3]"></container>
      <container :id="4" :dogs="dogs[4]"></container>
      <container :id="5" :dogs="dogs[5]"></container>
      <container :id="6" :dogs="dogs[6]"></container>
      <container :id="7" :dogs="dogs[7]"></container>
    </div>
    <div id="container" v-if="error">
      <Error></Error>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
</style>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      dogs: {},
      error: false,
    };
  },
  fetch() {
    this.fetchRandomDog()
      .then((res) => res.data.message)
      .then((data) => this.addDog(data));
    this.getDogs().then((dogs) => {
      this.dogs = dogs;
    });
  },
  fetchOnServer: false,
  methods: {
    ...mapActions(['fetchRandomDog', 'addDog', 'getDogs']),
    setDogs() {
      this.getDogs()
        .then((dogs) => {
          this.dogs = dogs;
        })
        .then(() => (this.error = this.dogs[1].length === 0));
    },
  },
};
</script>
