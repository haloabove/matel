import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Statistics from '@/views/Statistics.vue'
import ListItemsInList from '@/components/ListItemsInList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Statistics.vue', () => {
  let wrapper: any
  let store: any

  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        listItems: () => [
          { ipAddress: '192.168.0.1', request: '/home' },
          { ipAddress: '192.168.0.2', request: '/about' },
          { ipAddress: '192.168.0.1', request: '/contact' },
          { ipAddress: '192.168.0.3', request: '/home' },
          { ipAddress: '192.168.0.2', request: '/home' },
        ]
      }
    })

    wrapper = shallowMount(Statistics, {
      store,
      localVue,
      stubs: {
        'b-container': true,
        'b-row': true,
        ListItemsInList: true
      }
    })
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('computes uniqueIpAddresses correctly', () => {
    expect(wrapper.vm.uniqueIpAddresses).toHaveLength(3)
    expect(wrapper.vm.uniqueIpAddresses[0].item).toBe('192.168.0.1')
  })

  it('computes topUrls correctly', () => {
    expect(wrapper.vm.topUrls).toHaveLength(3)
    expect(wrapper.vm.topUrls[0].item).toBe('/home')
    expect(wrapper.vm.topUrls[0].count).toBe(3)
  })

  it('computes topIpAddress correctly', () => {
    expect(wrapper.vm.topIpAddress).toHaveLength(3)
    expect(wrapper.vm.topIpAddress[0].item).toBe('192.168.0.1')
    expect(wrapper.vm.topIpAddress[0].count).toBe(2)
  })

  it('renders ListItemsInList components with correct props', () => {
    const listItems = wrapper.findAllComponents(ListItemsInList)
    expect(listItems).toHaveLength(3)

    expect(listItems.at(0).props('text')).toContain('The number of unique IP addresses is: 3')
    expect(listItems.at(0).props('model')).toEqual(wrapper.vm.uniqueIpAddresses)

    expect(listItems.at(1).props('text')).toBe('The top 3 most visited URLs are:')
    expect(listItems.at(1).props('model')).toEqual(wrapper.vm.topUrls)

    expect(listItems.at(2).props('text')).toBe('The top 3 most active IP addresses:')
    expect(listItems.at(2).props('model')).toEqual(wrapper.vm.topIpAddress)
  })
})