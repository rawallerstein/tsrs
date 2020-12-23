<template>
	<el-container class="fluid">
		<el-header>
			<el-menu
				:default-active="route.currentRoute.path"
				router
				mode="horizontal"
			>
				<el-menu-item index="/">Home</el-menu-item>
				<el-menu-item index="/profile">Profile</el-menu-item>
				<el-menu-item index="/settings">Settings</el-menu-item>
			</el-menu>
		</el-header>

		<el-main>
			<router-view />
		</el-main>
	</el-container>
</template>

<script>
import { reactive, toRefs } from 'vue'
import route from './router'
export default {
	name: 'App',
	setup() {
		const state = reactive({
			menu: true,
			route
		})

		return {
			...toRefs(state)
		}
	}
}
</script>

<style lang="scss" scoped></style>

<style>
html {
	margin: 0;
	height: 100%;
	width: 100%;
}

body {
	margin: 0;
	min-height: 100%;
	width: 100%;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
