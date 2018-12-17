<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h3 class>Check the weather in your favourite country or city</h3>
        <hr>
        <form>
          <div class="form-row animated fadeIn">
            <div class="col-12 col-lg-6 p-3">
              <transition
                name="alert-transition"
                enter-active-class="animated jello"
                leave-active-class="animated fadeOut"
              >
                <div class="alert alert-danger" role="alert" v-if="error.status">
                  <strong>{{error.message}}</strong>
                </div>
              </transition>

              <br>
              <div class="form-group">
                <!-- <label for="exampleInputEmail1">Enter your city here</label> -->
                <input
                  type="text"
                  class="form-control"
                  id="weather-city"
                  aria-describedby="weatherHelp"
                  placeholder="Enter a city ..."
                  v-model="city.name"
                >
              </div>
              <div class="form-group">
                <button
                  class="btn btn-light"
                  type="submit"
                  @click.prevent="getCityWeather"
                >Check Weather!</button>
              </div>
            </div>
            <div class="col-12 col-lg-6 p-3">
              <div class="form-group">
                <label>Click a flag below and get the weather!</label>
                <ul class="list-inline">
                  <li
                    class="list-inline-item flag-select animated"
                    v-for="(country, i) in allCountries"
                    :key="i"
                    @click="getFlagWeather"
                  >
                    <div class="p-2" :data-country="country.country">
                      <img
                        :src="`https://www.countryflags.io/${country.countryCode.toLowerCase()}/flat/64.png`"
                        :alt="country.country"
						:data-country="country.country"
                      >
                    </div>
                    <!-- <div class="p-2">{{country.country}}</div> -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
        <hr>
      </div>

      <div class="col-12 col-md-8 offset-md-2">
        <transition
          name="alert-transition"
          enter-active-class="animated jello"
          leave-active-class="animated fadeOut"
        >
          <weather-card :weather-obj="$store.getters.getCityObj" v-if="cityStatus"></weather-card>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
//
import WeatherCard from "./WeatherCard.vue";

//
import GlobalMixin from "./../mixins/globalMixin";
import Helpers from "./../mixins/Helpers.js";
const Joi = require("joi-browser");

export default {
  mixins: [GlobalMixin, Helpers],
  components: {
    "weather-card": WeatherCard
  },
  computed: {
    cityStatus() {
      return this.$store.getters.cityStatus;
    },
    allCountries() {
      return this.randomArray(this.countries);
    }
  },
  data() {
    return {
      city: {
        status: false,
        name: ""
      },
      error: {
        status: false,
        message: ""
      },
      timeout: "",
      countries: [
        {
          id: "",
          countryCode: "AR",
          country: "Argentina"
        },
        {
          id: "",
          countryCode: "BB",
          country: "Barbados"
        },
        {
          id: "",
          countryCode: "BE",
          country: "Belgium"
        },
        {
          id: "",
          countryCode: "DE",
          country: "Germany"
        },
        {
          id: "",
          countryCode: "GB",
          country: "United Kingdom"
        },
        {
          id: "",
          countryCode: "CH",
          country: "Switzerland"
        },
        {
          id: "",
          countryCode: "JM",
          country: "Jamaica"
        },
        {
          id: "",
          countryCode: "IT",
          country: "Italy"
        }
      ]
    };
  },
  watch: {
    "error.status": function(val) {
      const vm = this;
      clearTimeout(this.timeout);

      if (val) {
        this.timeout = setTimeout(function() {
          vm.error.status = false;
        }, 2000);
      }
    }
  },
  methods: {
    getFlagWeather(e) {
		const vm = this;

		let el = e.target,
			country = e.target.attributes['data-country'].value;

		vm.ccWeatherRequest(country);
	},
    getCityWeather() {
      const vm = this;
      let validatedCity = this.validateCity();

      if (validatedCity.error) {
        console.log(validatedCity);

        vm.error.status = true;
        vm.error.message = validatedCity.error.details[0].message;
        return;
      }

      //
      if (vm.city.name === vm.$store.getters.cityName) {
        return;
      }
      vm.ccWeatherRequest(vm.city.name);
    },
    citySchema() {
      const schema = Joi.object().keys({
        city: Joi.string().regex(/^[a-zA-Z]/)
      });

      return schema;
    },
    validateCity() {
      let city = this.city.name,
        schema = this.citySchema();

      return Joi.validate({ city: city }, schema);
    }
  }
};
</script>
<style lang="scss" scoped>
.flag-select {
  cursor: pointer;
}
</style>
