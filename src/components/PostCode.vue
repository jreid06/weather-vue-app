<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h3 class>Check the weather for your post code</h3>
        <hr>
        <form>
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
            <div class="form-row">
              <div class="col-12 col-md-6">
                <label for="exampleInputEmail1">Enter your postcode here</label>
                <input
                  type="text"
                  class="form-control"
                  id="weather-city"
                  aria-describedby="weatherHelp"
                  placeholder="Enter a post code e.g W1, SW7, NW5, B21, M1 ..."
                  v-model="postcode.name"
                >
              </div>
              <div class="col-12 col-md-6 pt-3 pt-md-0">
                <label for="exampleInputEmail1">Select Region</label>
                <select class="custom-select" v-model="postcode.region">
					<option value="default">Please select an option</option>
					<option value="gb">United Kingdom</option>
				</select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <button
              class="btn btn-light"
              type="submit"
              @click.prevent="getPostCodeWeather"
            >Check Weather!</button>
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
          <weather-card :weather-obj="$store.getters.getPostcodeObj" v-if="postcodeStatus"></weather-card>
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
const Joi = require("joi-browser");

export default {
  mixins: [GlobalMixin],
  components: {
    "weather-card": WeatherCard
  },
  computed: {
    postcodeStatus() {
      return this.$store.getters.postcodeStatus;
	},
	regionSet(){
		return this.postcode.region ? this.postcode.region : false;
	}
  },
  data() {
    return {
      postcode: {
        status: false,
		name: "",
		region: ""
      },
      error: {
        status: false,
        message: ""
      },
      timeout: ""
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
    getPostCodeWeather() {
      const vm = this;
      let validatedPostCode = vm.validatePostCode();

      if (validatedPostCode.error || !vm.regionSet) {
        console.log(validatedPostCode);

		vm.error.status = true;
		if(validatedPostCode.error){
			vm.error.message = validatedPostCode.error.details[0].message;
			return; 
		}

        vm.error.message = 'please select a region';
        return;
      }

      //
      vm.pcodeWeatherRequest(vm.postcode.name, vm.regionSet);
    },
    postCodeSchema() {
      const schema = Joi.object().keys({
        pcode: Joi.string().max(5)
      });

      return schema;
    },
    validatePostCode() {
      let postCode = this.postcode.name,
        schema = this.postCodeSchema();

      return Joi.validate({ pcode: postCode }, schema);
    }
  }
};
</script>
