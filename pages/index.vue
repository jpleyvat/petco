<template>
  <div id="app">
    <Logo></Logo>
    <Search :setDogs="setDogs"></Search>
    <div id="container">
      <ul class="cards" id="1">
        <li v-for="dog of dogs[1]">
          <Card :src="dog.src" :breed="dog.breed"></Card>
        </li>
      </ul>
      <ul class="cards" id="2">
        <li v-for="dog of dogs[2]">
          <Card :src="dog.src" :breed="dog.breed"></Card>
        </li>
      </ul>
      <ul class="cards" id="3">
        <li v-for="dog of dogs[3]">
          <Card :src="dog.src" :breed="dog.breed"></Card>
        </li>
      </ul>
      <ul class="cards" id="4">
        <li v-for="dog of dogs[4]">
          <Card :src="dog.src" :breed="dog.breed"></Card>
        </li>
      </ul>
      <ul class="cards" id="5">
        <li v-for="dog of dogs[5]">
          <Card :src="dog.src" :breed="dog.breed"></Card>
        </li>
      </ul>
      <ul class="cards" id="6">
        <li v-for="dog of dogs[6]">
          <Card :src="dog.src" :breed="dog.breed"></Card>
        </li>
      </ul>
      <ul class="cards" id="7">
        <li v-for="dog of dogs[7]">
          <Card :src="dog.src" :breed="dog.breed"></Card>
        </li>
      </ul>
    </div>
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
      dogs: {},
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
    ...mapActions(["fetchRandomDog", "addDog", "getDogs"]),
    setDogs() {
      this.getDogs().then((dogs) => {
        this.dogs = dogs;
      });
    },
  },
};
</script>
