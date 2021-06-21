import { mutationsModule } from './mutations';
import { actionsModule } from './actions';

export const state = () => ({
  dogs: [],
  breeds: [],
  query: '',
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

export const mutations = mutationsModule();
export const actions = actionsModule();
