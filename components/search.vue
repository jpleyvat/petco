<template>
  <div id="search">
    <div id="query" v-if="query">
      <span v-on:click="setQuery('')">{{ query }}</span>
    </div>
    <input
      type="text"
      placeholder="Sniff breeds..."
      v-on:keyup="handleKyepress"
      v-on:focusout="selectBreed"
    />
    <ul v-if="matches.length > 0">
      <li v-for="breed of matches" v-on:click="selectBreed" v-bind:key="breed">
        {{ breed }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      breeds: [],
      matches: [],
      query: '',
    };
  },
  fetch() {
    this.getBreeds().then((res) => {
      this.breeds = res;
    });
  },
  fetchOnServer: false,
  props: {
    setDogs: Function,
  },
  methods: {
    ...mapActions([
      'getBreeds',
      'cleanDogs',
      'addDog',
      'addQuery',
      'fetchByBreed',
      'fetchRandomDog',
    ]),
    search(query) {
      this.query = query;
      this.setQuery(query);
    },

    getMatches(value) {
      value = value.replace(' ', '');
      this.matches = this.breeds
        .map((breed) =>
          breed.includes(value.toLowerCase().replace(' ', '')) ? breed : undefined
        )
        .filter((match) => match !== undefined);
    },

    handleKyepress(e) {
      e.code === 'Enter'
        ? (this.search(e.target.value), this.clean(e))
        : this.getMatches(e.target.value);
    },

    selectBreed(e) {
      let value = '';
      try {
        value = e.explicitOriginalTarget.data
          ? e.explicitOriginalTarget.data.replace(/ /g, '').replace('\n', '')
          : '';
        e.target.value = value.replace(/\b\w/g, (c) => c.toUpperCase());
      } catch {}
      if (value) this.search(value);
      this.clean(e);
    },

    clean(e) {
      e.target.value = '';
      this.matches = [];
    },

    setQuery(query) {
      this.query = query.toLowerCase().replace(' ', '');
      this.addQuery(this.query);
      this.cleanDogs().then(() => {
        const fetch = query ? this.fetchByBreed : this.fetchRandomDog;
        fetch(this.query)
          .then((res) => res.data.message)
          .then((data) => {
            this.addDog(data);
            this.setDogs();
          })
          .catch((error) => this.setDogs());
      });
    },
  },
};
</script>
