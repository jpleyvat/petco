export const mutationsModule = () => ({
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
});
