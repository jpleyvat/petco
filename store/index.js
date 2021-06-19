import axios from "axios";
import Vue from "vue";

export const state = () => ({
  dogs: [],
  breeds: [],
  query: "",
  sorted: [],
  dogsSets: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  },
});

export const mutations = {
  addDogs(state, dog) {
    state.dogs.push(dog);
  },
  addToSorted(state, index) {
    state.sorted.push(index);
  },
  setDogs(state, dogs) {
    state.dogs = dogs;
  },
  setBreeds(state, breeds) {
    state.breeds = breeds;
  },
  setQuery(state, query) {
    state.query = query;
  },
  addToDogsSets(state, { set, dog }) {
    state.dogsSets[set].push(dog);
  },
  setSorted(state) {
    state.sorted = [];
  },
  setDogsSets(state) {
    Object.keys(state.dogsSets).forEach((key) => {
      state.dogsSets[key] = [];
    });
  },
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch("fetchBreeds");
  },

  cleanDogs({ commit, state }) {
    commit("setDogsSets");
    commit("setDogs", []);
    commit("setSorted");
  },

  // Fetch
  fetchBreeds({ commit }) {
    return axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((data) => data.data.message)
      .then((breeds_object) => {
        const breeds = [];
        for (let key in breeds_object) {
          const all_breeds = breeds_object[key];
          if (all_breeds.length > 0) {
            for (let breed in all_breeds[key]) {
              breeds.push(key.toString() + " " + breeds_object[key][breed]);
            }
            continue;
          }
          breeds.push(key.toString());
        }
        commit("setBreeds", breeds);
      });
  },

  fetchRandomDog() {
    const url = "https://dog.ceo/api/breeds/image/random";
    return axios.get(url);
  },

  fetchByBreed(context, breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    return axios.get(url);
  },

  // Setters
  addDog({ state, commit, dispatch }, src) {
    dispatch("getDogWithBreed", src)
      .then((dog) => {
        commit("addDogs", dog);
      })
      .then(() => {
        dispatch("sort");
      });
  },

  addQuery({ commit }, query) {
    commit("setQuery", query);
  },

  // Getters
  getDogWithBreed(context, src) {
    const breed = src.split("breeds/").slice(-1)[0].split("/")[0];
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
        commit("addToDogsSets", { set, dog });
        commit("addToSorted", i);
      }
    }
  },
};
