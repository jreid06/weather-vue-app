<template>
  <div id="app">
    <div class="container p-5">
      <div class="row align-items-center border shadow-sm">
        <div class="col-12 p-3">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item text-capitalize" v-for="(tab,i) in tabs" :key="i">
              <router-link
                class="nav-link"
                :class="{'bg-light text-danger active': ($route.path === `/${tab.class}`)}"
                :id="`${tab.class}-tab`"
                data-toggle="pill"
                :to="tab.route"
                role="tab"
                :aria-controls="`${tab.class}`"
                :aria-selected="tab.hasOwnProperty('default')?true:false"
              >{{tab.title}}</router-link>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show"
              :class="{'show active': tab.hasOwnProperty('default')}"
              :id="`${tab.class}`"
              role="tabpanel"
              :aria-labelledby="`${tab.class}-tab`"
              v-for="(tab, i) in tabs"
              :key="i"
            >
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const $ = require('jquery');

export default {
  name: "app",
  data() {
    return {
      tabs: [
        {
          id: "#tab-city",
          class: "city",
          title: "city",
          default: true,
          route: "city"
        },
        {
          id: "#tab-post-code",
          class: "post-code",
          title: "post code",
          tooltip: true,
          tooltipContent: "zip-code",
          route: "post-code"
        },
        // {
        //   id: "#tab-coordinates",
        //   class: "coordinates",
        //   title: "coordinates",
        //   route: "coordinates"
        // }
      ]
    };
  },
  methods: {},
  mounted() {
    const vm = this;
    console.log(this.$route);

    console.log(this.$store.getters.getApiKey);
  

  }
};
</script>

<style lang="scss">
@import "./scss/custom-bootstrap.scss";
@import "./node_modules/bootstrap/scss/bootstrap.scss";

#app {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  @media screen and (min-width: 768px){
    width: 70%;
    margin: 0 auto;
  }

  @media screen and (min-width: 992px){
    // width: 55%;
  }
}

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
