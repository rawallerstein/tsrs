<template>
	<el-row gutter="12">
		<el-col
			v-for="[id, amount] of Object.entries(currentBankTab).filter(
				([id, amount]) => !!amount
			)"
			:key="id"
			class="osrstooltip"
			span="1"
		>
			<el-card class="bank-card">
				<span>{{ getItemName(id) }}</span>
				<div class="bank-item">
					<div class="bank-item__column">
						<el-avatar
							size="medium"
							shape="square"
							fit="contain"
							:src="`https://www.osrsbox.com/osrsbox-db/items-icons/${id}.png`"
						></el-avatar>
						<span>{{ amount }}</span>
					</div>
					<div class="bank-item__column">
						<el-button
							size="mini"
							type="danger"
							class="ma-0"
							@click="removeFromBank(id, false)"
							>- 1</el-button
						>
						<el-button
							size="mini"
							type="danger"
							class="ma-0"
							@click="removeFrombank(id, true)"
							>- all</el-button
						>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
	<el-row class="bank-actions">
		<el-col span="4">
			<el-button type="primary" @click="addToBank">Add</el-button>
		</el-col>
		<el-col span="20">
			<el-input v-model="itemId" placeholder="Item ID or Name" />
			<el-input
				v-model="itemQuantity"
				placeholder="Item Quantity"
				type="number"
			/>
		</el-col>
	</el-row>
</template>

<script lang="ts">
import { computed, defineComponent, MethodOptions, reactive, toRefs } from 'vue'
import { Items } from 'oldschooljs'

import { globalMutations, globalState } from '../store/index'
import Router from '../router/index'
import Utils from '../utils'
import { BankTab } from '../store/tabbed-bank'

export default defineComponent({
	setup() {
		const { addItemsToPlayerBank } = globalMutations
		const { playerBank } = globalState

		const state = reactive({
			activeBankTab: 'currency',
			itemId: '',
			itemQuantity: 0
		})

		const currentBankTab = computed(
			(): BankTab => {
				const tabName: string = Router.currentRoute.value.hash.slice(1)
				return playerBank.value[tabName]
			}
		)

		const currentItemId = computed((): number | void => {
			const id = Number(state.itemId) || state.itemId
			const gotItem = Items.get(id)
			if (!gotItem) return

			return gotItem.id
		})

		const computedProperties = {
			currentBankTab,
			currentItemId
		}

		function addToBank(): void {
			const id = computedProperties.currentItemId.value
			if (!id) return

			addItemsToPlayerBank({ [id]: state.itemQuantity })
		}

		function removeFromBank(id: number, all: boolean): void {
			let amount = -1
			if (all) {
				amount = currentBankTab.value[id] || 0
			}

			addItemsToPlayerBank({ [id]: amount })
		}

		function getItemName(id: string | number): string {
			const item = Items.get(Number(id))
			if (!item) return ''
			return Utils.titleCase(item.name)
		}

		const methods: MethodOptions = {
			addToBank,
			getItemName,
			removeFromBank
		}

		return {
			...toRefs(state),
			playerBank,
			...methods,
			...computedProperties,
			Items
		}
	}
})
</script>

<style scoped lang="scss">
.bank-actions {
	padding-top: 20px;
}
.bank-card {
	width: 240px;
}
.bank-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	&__column {
		display: flex;
		flex-direction: column;
	}
}
</style>
