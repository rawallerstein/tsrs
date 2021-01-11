declare module 'osrs-quest-tool' {
	interface Requirements {
		quests: Array<string>
		levels: Array<string>
	}

	interface ExperienceReward {
		skill: string
		amount: number
	}
	interface Rewards {
		Experience: Array<ExperienceReward>
		QuestPoints: number
	}
	interface Quest {
		miniquest: boolean
		Name: string
		shortName: string
		url: string
		members: boolean
		difficulty:
			| 'Novice'
			| 'Intermediate'
			| 'Experienced'
			| 'Master'
			| 'Grandmaster'
		questLength:
			| 'Short (<5 minutes)'
			| 'Short'
			| 'Short - Long'
			| 'Short â€“ Long'
			| 'Medium'
			| 'Medium - Long'
			| 'Long'
			| 'Very Long'
		requirements: Requirements
		rewards: Rewards
		eries: null
	}

	interface QuestObject {
		[index: string]: Quest
	}

	const questObject: () => QuestObject
	const questArray: () => Array<Quest>

	export default { questObject, questArray }
}
