import axios from 'axios';

export const actionsModule = () => ({
  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchBreeds');
  },

  cleanDogs({ commit }) {
    commit('setDogsSets');
    commit('setDogs', []);
    commit('setSorted');
  },

  // Fetch
  async fetchBreeds({ commit }) {
    const res = await axios.get('https://dog.ceo/api/breeds/list/all');
    const breeds_object = res.data.message;
    const breeds = [];
    for (let key in breeds_object) {
      const all_breeds = breeds_object[key];
      if (all_breeds.length > 0) {
        for (let breed in all_breeds[key]) {
          breeds.push(key.toString() + ' ' + breeds_object[key][breed]);
        }
        continue;
      }
      breeds.push(key.toString());
    }
    commit('setBreeds', breeds);
  },

  fetchRandomDog() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    return axios.get(url);
  },

  fetchByBreed({}, breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    return axios.get(url);
  },

  // Setters
  addDog({ commit, dispatch }, src) {
    dispatch('getDogWithBreed', src)
      .then((dog) => {
        commit('addDogs', dog);
      })
      .then(() => {
        dispatch('sort');
      });
  },

  addQuery({ commit }, query) {
    commit('setQuery', query);
  },

  // Getters
  getDogWithBreed({}, src) {
    const breed = src.split('breeds/').slice(-1)[0].split('/')[0];
    return { src: src, breed: breed };
  },

  getDogs({ state }) {
    return state.dogsSets;
  },

  getBreeds({ state }) {
    return state.breeds;
  },

  getQuery({ state }) {
    return state.query;
  },

  sort({ state, commit }) {
    if (state.dogs.length > 0) {
      for (let i = 0; i < state.dogs.length; i++) {
        if (i in state.sorted) continue;
        let index = i + 1;
        while (index >= 7) {
          index -= 7;
        }
        const set = index <= 7 ? (index === 0 ? 7 : index) : index;

        const dog = state.dogs[i];
        commit('addToDogsSets', { set, dog });
        commit('addToSorted', i);
      }
    }
  },
});
