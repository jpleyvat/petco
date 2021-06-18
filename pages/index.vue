<template>
  <div id="app">
    <Logo></Logo>
    <Search></Search>
    <ul>
      <li v-for="dog of dogs">
        <Card :src="dog.src" :breed="dog.breed"></Card>
      </li>
    </ul>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      dogs: [],
    };
  },
  fetch() {
    this.fetchRandomDog()
      .then((res) => res.data.message)
      .then((data) => this.addDog(data));
    this.getDogs().then((dogs) => (this.dogs = dogs));
  },
  fetchOnServer: false,
  methods: {
    ...mapActions(["fetchRandomDog", "addDog", "getDogs"]),
  },
};
</script>
