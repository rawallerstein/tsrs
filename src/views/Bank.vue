<template>
	<el-tabs v-model="activeBankTab">
		<el-tab-pane
			v-for="[category, items] of Object.entries(playerBank)"
			:key="category"
			:name="category"
			:label="titleCase(category)"
		>
			<el-row>
				<el-col
					v-for="[id, amount] of Object.entries(items).filter(
						([id, amount]) => {
							return !!amount
						}
					)"
					:key="id"
					span="1"
				>
					{{ titleCase(Items.get(Number(id)).name) }}: {{ amount }}
				</el-col>
			</el-row>
			<el-row>
				<el-col span="4">
					<el-button @click="addToBank"></el-button>
				</el-col>
				<el-col span="20">
					<el-input v-model="bankImport" type="textarea"></el-input>
				</el-col>
			</el-row>
		</el-tab-pane>
	</el-tabs>
</template>

<script lang="ts">
import { defineComponent, MethodOptions, reactive, toRefs } from 'vue'
import { Items } from 'oldschooljs'
import { ItemBank } from 'oldschooljs/dist/meta/types'

import { globalMutations, globalState } from '../store/index'
import Utils from '../utils'

export default defineComponent({
	setup() {
		const { addItemsToPlayerBank } = globalMutations
		const { playerBank } = globalState

		const state = reactive({
			activeBankTab: 'currency',
			bankImport: ''
		})

		function addToBank(): void {
			const toAdd: string = state.bankImport
			const parsedArray = toAdd.split(',')
			const items = parsedArray.reduce((acc: ItemBank, cur: string) => {
				const [id, value] = cur.trim().split(':')
				acc[id] = Number(value)
				return acc
			}, {})
			addItemsToPlayerBank(items)
		}

		const methods: MethodOptions = {
			addToBank,
			titleCase: Utils.titleCase
		}

		return { ...toRefs(state), playerBank, ...methods, Items }
	}
})
</script>

<style scoped></style>
