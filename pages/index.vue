<template>
  <div id="app">
    <Logo></Logo>
    <div
      style="
         {
          background: grey;
          height: 5rem;
          width: 100vw;
        }
      "
    >
      Search
    </div>
    <ul>
      <li v-for="dog of dogs">
        <Card :src="dog.src" :breed="dog.breed"></Card>
      </li>
    </ul>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");
</style>

<script>
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      dogs: [],
    };
  },
  fetch() {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.data.message)
      .then((data) => {
        this.getRandomDog({ src: data, breed: this.getBreed(data) });
        this.dogs = this.$store.state.dogs;
      });
  },
  fetchOnServer: false,
  methods: {
    getBreed(src) {
      return src.split("breeds/").slice(-1)[0].split("/")[0];
    },
    getRandomDog(dog) {
      console.log(dog);
      this.$store.commit("setDogs", dog);
    },
  },
};
</script>
<!-- data = data.map((dog) => { -->
<!--   const breed = this.getBreed(dog); -->
<!--   return { -->
<!--     src: dog, -->
<!--     breed: breed, -->
<!--   }; -->
<!-- }); -->
