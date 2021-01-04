import { Player } from 'oldschooljs'

import utils from '../utils/index'
import { TabbedBank } from './tabbed-bank'

export function getOrCreatePlayerProfile(): Player {
	const loaded = localStorage.getItem('playerProfile') || ''
	let profile: Player

	if (loaded) profile = new Player(JSON.parse(loaded))
	else profile = utils.genericPlayer()

	return new Player(profile)
}

export function getOrCreatePlayerBank(): TabbedBank {
	const loaded = localStorage.getItem('playerBank') || ''

	let bank = new TabbedBank()
	if (loaded) bank = JSON.parse(loaded)

	return bank
}
