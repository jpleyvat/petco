import axios from "axios";

export const state = () => ({
  dogs: [],
  breeds: [],
  query: "",
});

export const mutations = {
  addDogs(state, dog) {
    state.dogs.push(dog);
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
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch("fetchBreeds");
  },

  cleanDogs({ commit }) {
    commit("setDogs", []);
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
  addDog({ commit, dispatch }, src) {
    dispatch("getDogWithBreed", src).then((dog) => commit("addDogs", dog));
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
    return state.dogs;
  },

  getBreeds({ state }) {
    return state.breeds;
  },

  getQuery({ state }) {
    return state.query;
  },
};
