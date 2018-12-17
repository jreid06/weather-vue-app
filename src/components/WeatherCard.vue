<template>
	<div class="row">
	  <div class="col-12">
		<div class="card">
		  <div class="card-body">
			<h2 class="display-4"><img :src="`http://openweathermap.org/img/w/${weatherObj.weather[0].icon}.png`" :alt="weatherObj.weather[0].description"></h2>

			<ul class="list-inline">
				<li class="list-inline-item" v-for="(value, key) in weatherObj.main" :key="key">
					<span class="small">{{key}}: </span> <span class="badge badge-pill badge-light">{{value}}</span>
				</li>
			</ul>
			<h3 class="card-title">{{weatherObj.name}}</h3>
			<p class="card-text">Chance of clouds: {{weatherObj.clouds.all}}&nbsp;<i class="fas fa-percent"></i></p>
		  </div>

		</div>
	  </div>
	</div>	
</template>
<script>
export default {
	props:{
		weatherObj:{
			// type: Object,
			required: false
		}
	}
}
</script>
<style lang="scss" scoped>

</style>
