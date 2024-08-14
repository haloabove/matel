import Vue from 'vue'
import Vuex from 'vuex'
import filterClient from '@/api/index';
import { ListItem, RootState, GettersRootState } from '@/models/index';
import { GetterTree } from 'vuex';

Vue.use(Vuex)
const client = filterClient('/');

const state: RootState = {
  listItems: []
}

const getters: GetterTree<GettersRootState, RootState> =  {
  listItems(state){
    return state.listItems;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations: {
    setListItems(state, payload){
      state.listItems = payload;
    },
    addItemToList( state, payload: ListItem){
      state.listItems.push(payload);
    }
  },
  actions: {
    async fetchListItems({commit}){
      const payload = await client.loadFile();

      commit('setListItems', payload);
    },
    addItem({commit}, payload){
      commit('addItemToList', payload);
    },
  },
  modules: {
  }
})


