<template>
  <div id="search">
    <input
      type="text"
      placeholder="Sniff breeds..."
      v-on:keyup="handleKyepress"
      v-on:focusout="clean"
      v-on:click="clean"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      breeds: [],
    };
  },
  fetch() {
    this.getBreeds().then((res) => (this.breeds = res));
  },
  methods: {
    ...mapActions(["getBreeds"]),
    handleKyepress(e) {
      e.code === "Enter" ? console.log("search") : console.log(e.target.value);
    },
    clean(e) {
      e.target.value = "";
    },
  },
};
</script>
