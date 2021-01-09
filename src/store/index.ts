import { Player } from 'oldschooljs'
import { ComputedOptions, MethodOptions, reactive, toRefs } from 'vue'

import { getOrCreatePlayerBank, getOrCreatePlayerProfile } from '../store/utils'
import { BankTab, TabbedBank } from './tabbed-bank'

/* Reactive Global State */
export const globalState = (() => {
	const reactiveState = reactive({
		playerBank: getOrCreatePlayerBank(),
		playerProfile: getOrCreatePlayerProfile()
	})

	return { ...toRefs(reactiveState) }
})()

/*
    Global Computed Properties
*/
export const globalGetters: ComputedOptions = (() => {
	return {}
})()

/* 
    Simple State Mutation Methods
*/
export const globalMutations: MethodOptions = (() => {
	function setPlayerProfile(player: Player) {
		console.info(
			'Setting Player Profile: ',
			JSON.parse(JSON.stringify(player)),
			JSON.parse(JSON.stringify(globalState))
		)

		localStorage.setItem('playerProfile', JSON.stringify(player))
		globalState.playerProfile.value = player
	}

	function setPlayerBank(bank: TabbedBank) {
		console.info(
			'Setting Player Profile: ',
			JSON.parse(JSON.stringify(bank)),
			JSON.parse(JSON.stringify(globalState))
		)

		localStorage.setItem('playerBank', JSON.stringify(bank))
		globalState.playerBank.value = bank
	}

	function addItemToPlayerBankTab(
		bankTab: BankTab,
		id: number | string,
		amount: number
	) {
		if (!amount) return
		if (Object.prototype.hasOwnProperty.call(bankTab, id)) {
			if (bankTab[id]) (bankTab[id] as number) += amount
			else bankTab[id] = amount
		}
	}

	function addItemsToPlayerBank(items: BankTab) {
		Object.values(globalState.playerBank.value).forEach(bankTab => {
			Object.entries(items).forEach(([id, amount]) => {
				addItemToPlayerBankTab(bankTab, id, Number(amount))
			})
		})

		setPlayerBank(globalState.playerBank.value)
	}

	return {
		addItemsToPlayerBank,
		setPlayerBank,
		setPlayerProfile
	}
})()

/*
    Complex Global Methods
*/
export const globalActions: MethodOptions = (() => {
	async function pullPlayer(): Promise<void> {
		const resp = await fetch(
			'http://localhost:8000/hiscores?username=' +
				globalState.playerProfile.value.username
		)

		globalMutations.setPlayerProfile(await resp.json())
	}

	return { pullPlayer }
})()
