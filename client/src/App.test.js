import * as actions from './actions/listingAction'
import * as types from './actions/types'

import reducer from './reducers/reducer'

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './App';
import DashboardView from './components/DashboardView'

//-------------------------------------
// Testing backend redux action creators
//-------------------------------------

  describe('Listings actions', () => {
    it('should create a new listing', () => {
      const listings = 'A new product'
      const expectedAction = {
        type: types.NEW_LISTING,
        val: listings
      }
      expect(actions.newListingHandler(listings)).toEqual(expectedAction)
    })

    it('should set listings', () => {
      const listings = 'A set product'
      const expectedAction = {
        type: types.SET_LISTINGS,
        val: listings
      }
      expect(actions.listingHandler(listings)).toEqual(expectedAction)
    })

    it('should delete listings', () => {
      const id = '1'
      const expectedAction = {
        type: types.DELETE_LISTING,
        val: id
      }
      expect(actions.deletedListingHandler(id)).toEqual(expectedAction)
    })
  })

//-------------------------------------
// Testing backend redux reducers
//-------------------------------------

describe('Listings reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({"listings": []})
  })

  it('should handle NEW_LISTING', () => {
    expect(
      reducer([], {
        type: types.NEW_LISTING,
        text: 'New listing handled'
      })
    ).toEqual([
      {
        text: 'New listing handled',
        id: 0
      }
    ])
    expect(
      reducer(
        [
          {
            text: 'Pre-existing listing',
            id: 0
          }
        ],
        {
          type: types.NEW_LISTING,
          text: 'Additional listing'
        }
      )
    ).toEqual([
      {
        text: 'Additional listing',
        id: 1
      },
      {
        text: 'Pre-existing listing',
        id: 0
      }
    ])
  })

  it('should handle SET_LISTINGS', () => {
    expect(
      reducer([], {
        type: types.SET_LISTINGS,
        text: 'Listing set'
      })
    ).toEqual([
      {
        text: 'Listing set',
        id: 0
      }
    ])
    expect(
      reducer([
        {
          text: 'Pre-existing listing',
          id: 0
        }
      ], {
        type: types.SET_LISTINGS,
        text: 'Set listing'
      })
    ).toEqual([
      {
        text: 'Set listing',
        id: 0
      }
    ])
    expect(
      reducer([
        {
          text: 'Pre-existing listing',
          id: 0
        }
      ], {
        type: types.SET_LISTINGS,
        text: ''
      })
    ).toEqual([
      {
        text: '',
        id: 0
      }
    ])
  })

  it('should handle DELETE_LISTING', () => {
    expect(
      reducer([
        {
          text: 'Pre-existing listing',
          id: 0
        }
      ], {
        type: types.DELETE_LISTING,
        text: 'Pre-existing listing'
      })
    ).toEqual([])
    expect(
      reducer([
        {
          text: 'Additional listing',
          id: 1
        },
        {
          text: 'Pre-existing listing',
          id: 0
        }
      ], {
        type: types.DELETE_LISTING,
        text: 'Additional listing'
      })
    ).toEqual([
      {
        text: 'Pre-existing listing',
        id: 0
      }
    ])
   
  })
})

//-------------------------------------
// Testing frontend component rendering
//-------------------------------------

configure({ adapter: new Adapter() });

const setup = (component, props={}, state=null) => {
    const CompName = component
    return shallow(<CompName {...props} /> )
  }
  
  const findByTestAttr = (wrapper, val) => {
      return wrapper.find(`[data-test="${val}"]`);
  }

  describe('Components', () => {
    describe('App', () => { 
      it('should render without crashing', () => {
            const wrapper = setup(App);
            const appComponent = findByTestAttr(wrapper, 'component-app')
            expect(appComponent.length).toBe(1)
        });
    })

    describe('DashboardView', () => {
      it('should render self and sub-components', () => {
        const wrapper = setup(DashboardView);
        var appComponent = findByTestAttr(wrapper, 'dashboard');
        expect(appComponent.length).toBe(1);
        var appComponent = findByTestAttr(wrapper, 'header');
        expect(appComponent.length).toBe(1);
        var appComponent = findByTestAttr(wrapper, 'dashText');
        expect(appComponent.length).toBe(1);
        var appComponent = findByTestAttr(wrapper, 'listing');
        expect(appComponent.length).toBe(1);
      })
    })
  })
