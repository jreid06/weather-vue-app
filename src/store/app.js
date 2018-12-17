import {
  apikey
} from './apikey';

const state = {
  status: '',
  key: apikey,
  city: {
    status: false,
    name: '',
    obj: ''
  },
  postcode: {
    status: false,
    name: '',
    region: '',
    obj: ''
  },
  coords: {
    status: false,
    name: '',
    obj: ''
  },
}

const getters = {
  getApiKey: state => {
    return state.key;
  },
  cityStatus: state => {
    return state.city.status;
  },
  cityName: state => {
    return state.city.name;
  },
  getCityObj: state => {
    if (Object.keys(state.city.obj).length === 0 || typeof state.city.obj !== 'object') {
      return false;
    }

    return state.city.obj;
  },
  postcodeStatus: state => {
    return state.postcode.status;
  },
  getPostcodeObj: state => {
    if (Object.keys(state.postcode.obj).length === 0 || typeof state.postcode.obj !== 'object') {
      return false;
    }

    return state.postcode.obj;
  }
}

const actions = {


}

const mutations = {
  updateCity: (state, payload) => {
    if (!state.city.status) {
      state.city.status = true;
    }

    state.city.name = payload;
  },
  updateCityObj: (state, payload) => {
    state.city.obj = payload;
  },
  updatePostcode: (state, payload) => {
    if (!state.postcode.status) {
      state.postcode.status = true;
    }

    state.postcode.name = payload.name;
    state.postcode.region = payload.region;
  },
  updatePostcodeObj: (state, payload) => {
    state.postcode.obj = payload;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
