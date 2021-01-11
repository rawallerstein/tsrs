<template>
	<el-container class="fluid">
		<el-header>
			<el-menu
				:default-active="Router.currentRoute.path"
				router
				mode="horizontal"
			>
				<el-menu-item index="/">Home</el-menu-item>
				<el-menu-item index="/quests">Quests</el-menu-item>
				<el-submenu index="/bank">
					<template #title>
						Bank
					</template>
					<el-menu-item
						v-for="key of Object.keys(playerBank)"
						:key="key"
						:index="`/bank#${key}`"
						>{{ titleCase(key) }}</el-menu-item
					>
				</el-submenu>
				<el-menu-item index="/profile">Profile</el-menu-item>
			</el-menu>
		</el-header>

		<el-main>
			<router-view />
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { reactive, toRefs, MethodOptions, defineComponent } from 'vue'

import Router from './router'
import Utils from './utils'
import { globalState } from './store/index'

export default defineComponent({
	name: 'App',
	setup() {
		const { playerBank } = globalState
		const { titleCase } = Utils
		const state = reactive({
			menu: true,
			playerBank,
			Router
		})

		const methods: MethodOptions = {
			titleCase
		}
		return {
			...toRefs(state),
			...methods
		}
	}
})
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

.d-flex {
	display: flex !important;
}

.ma-0 {
	margin: 0 !important;
}
</style>
