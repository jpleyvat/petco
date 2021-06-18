import axios from "axios";

export const state = () => ({
  dogs: [],
});

export const mutations = {
  setDogs(state, dog) {
    state.dogs.push(dog);
  },
};

// export const
//   // nuxtServerInit({ commit }) {
//   //   actions.getDogs()  // },
// };
