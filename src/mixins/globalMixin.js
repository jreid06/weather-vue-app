 const $ = require('jquery');

 export default {
   data() {
     return {
       globalMixin: {
         status: 'installed'
       }
     }
   },
   methods: {
     // city-country
     ccWeatherRequest(city) {
       const vm = this;

       $.ajax({
         type: 'get',
         url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${vm.$store.getters.getApiKey}&units=metric`,
         success: function (response) {
           console.log(response);
           vm.$store.commit("updateCity", vm.city.name);
           vm.$store.commit('updateCityObj', response);
         },
         error: function (error) {
           console.log(error);

           console.log('error with ajax');
           vm.error.status = true;
           vm.error.message = 'Please enter a valid city!';

         }
       });
     },
     pcodeWeatherRequest(pcode, region) {
       const vm = this;

       $.ajax({
         type: 'get',
         url: `https://api.openweathermap.org/data/2.5/weather?zip=${pcode},${region}&APPID=${vm.$store.getters.getApiKey}&units=metric`,
         success: function (response) {
           console.log(response);
           vm.$store.commit("updatePostcode", {
             name: vm.postcode.name,
             region: vm.postcode.region
           });
           vm.$store.commit('updatePostcodeObj', response);
         },
         error: function (error) {
           console.log(error);

           console.log('error with ajax');
           vm.error.status = true;
           vm.error.message = 'Please enter a valid city!';

         }
       });
     }
   }
 }
