import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import ListItemsInTable from '@/components/ListItemsInTable.vue';
import Vuex from 'vuex';
import { LogData } from '@/models/index';

Vue.use(Vuex)

// Mock Vuex store
const store = new Vuex.Store({
  state: {
    listItems: [
      { ipAddress: '168.41.191.40', timestamp: '2024-08-14T10:00:00Z', method: 'GET', request: '/api/data', statusCode: 200, userAgent: 'Mozilla/5.0' },
      { ipAddress: '177.71.128.21', timestamp: '2024-08-14T10:05:00Z', method: 'POST', request: '/api/submit', statusCode: 500, userAgent: 'Chrome/91.0' },
    ] as LogData[],
  },
  getters: {
    listItems: (state) => state.listItems,
  },
});

describe('ListItemsInTable.vue', () => {
    
  it('renders correctly', () => {
    const wrapper = shallowMount(ListItemsInTable, {
      mocks: {
        $store: store,
      },
      stubs: {
        'b-container': true,
        'b-row': true,
        'b-col': true,
        'b-table': true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('displays sorting information', () => {
    const wrapper = shallowMount(ListItemsInTable, {
      mocks: {
        $store: store,
      },
      stubs: {
        'b-container': true,
        'b-row': true,
        'b-col': true,
        'b-table': true,
      },
    });

    expect(wrapper.find('b').text()).toContain('ipAddress');
  });
});