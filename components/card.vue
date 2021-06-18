<template>
  <div class="card">
    <img :src="src" />
    <div class="thumbnail">
      <h3>#{{ breed }}</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import("intersection-observer");

export default {
  props: {
    src: String,
    breed: String,
  },
  mounted() {
    const observer = this.getObserver();
    observer.observe(this.$el);
  },
  updated() {
    const observer = this.getObserver();
    observer.observe(this.$el);
  },
  fetchOnServer: false,
  methods: {
    ...mapActions([
      "fetchRandomDog",
      "fetchByBreed",
      "addDog",
      "getDogs",
      "getQuery",
      "getObserver",
    ]),
    getObserver() {
      return new window.IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          this.getQuery().then((query) => {
            const fetch = query ? this.fetchByBreed : this.fetchRandomDog;
            fetch(query)
              .then((res) => res.data.message)
              .then((data) => this.addDog(data));
            this.getDogs().then((dogs) => (this.dogs = dogs));
          });
        }
      });
    },
  },
};
</script>
