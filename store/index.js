import axios from "axios";

export const state = () => ({
  dogs: [],
  breeds: [],
});

export const mutations = {
  setDogs(state, dog) {
    state.dogs.push(dog);
  },
  setBreeds(state, breeds) {
    state.breeds = breeds;
  },
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch("fetchBreeds");
  },

  // Fetch
  fetchBreeds({ commit }) {
    return axios.get("https://dog.ceo/api/breeds/list/all").then((data) => {
      const breeds = [];
      const obj = data.data.message;
      for (let key in obj) {
        if (obj[key].length > 0) {
          for (let breed in obj[key]) {
            breeds.push(key.toString() + " " + obj[key][breed]);
          }
        }
      }
      commit("setBreeds", breeds);
    });
  },

  fetchRandomDog() {
    return axios.get("https://dog.ceo/api/breeds/image/random");
  },

  // Setters
  addDog({ commit, dispatch }, src) {
    dispatch("getDogWithBreed", src).then((dog) => commit("setDogs", dog));
  },

  // Getters
  getDogWithBreed(context, src) {
    const breed = src.split("breeds/").slice(-1)[0].split("/")[0];
    return { src: src, breed: breed };
  },

  getDogs({ state }) {
    return state.dogs;
  },

  getBreeds({ state }) {
    return state.breeds;
  },
};
