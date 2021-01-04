import { Player } from 'oldschooljs'
import { ItemBank } from 'oldschooljs/dist/meta/types'
import { ComputedOptions, MethodOptions, reactive, toRefs } from 'vue'

import { getOrCreatePlayerBank, getOrCreatePlayerProfile } from '../store/utils'
import { TabbedBank } from './tabbed-bank'

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

	function addItemsToPlayerBank(items: ItemBank) {
		Object.values(globalState.playerBank.value).forEach(category => {
			Object.entries(items).forEach(([id, amount]) => {
				if (Object.prototype.hasOwnProperty.call(category, id)) {
					category[id] = amount
				}
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
