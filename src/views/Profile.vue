<template>
	<el-form v-model="playerProfile">
		<el-form-item label="Username">
			<el-input v-model="playerProfile.username" />
		</el-form-item>
		<el-form-item
			v-for="[name, skill] of Object.entries(playerProfile.skills)"
			:key="name"
			size="mini"
			:label="name.charAt(0).toUpperCase() + name.slice(1)"
		>
			Level:
			<el-input-number
				:disabled="name === 'overall'"
				:model-value="skill.level"
				:min="0"
				step-strictly
				@change="updateSkill($event, 'level', skill)"
			/>
			Experience:
			<el-input-number
				:disabled="name === 'overall'"
				:model-value="skill.xp"
				:min="0"
				step-strictly
				@change="updateSkill($event, 'xp', skill)"
			></el-input-number>
		</el-form-item>
		<el-form-item>
			<el-tooltip content="Requires Username" placement="top" effect="light">
				<el-button type="success" @click="pullPlayer">Pull Data</el-button>
			</el-tooltip>
			<el-button type="primary" @click="setPlayerProfile(playerProfile)"
				>Save</el-button
			>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { defineComponent, MethodOptions } from 'vue'
import { convertLVLtoXP, convertXPtoLVL } from 'oldschooljs/dist/util'
import { SkillScore, SkillsScore } from 'oldschooljs/dist/meta/types'

import { globalMutations, globalState } from '../store/index'

export default defineComponent({
	setup() {
		const { setPlayerProfile } = globalMutations
		const { playerProfile } = globalState
		function getOverallSkillValue(
			type: 'level' | 'xp',
			skills: SkillsScore
		): number {
			return Object.entries(skills).reduce((acc, [name, skill]): number => {
				if (name === 'overall' || skill[type] === -1) return acc
				acc += skill[type]
				return acc
			}, 0)
		}

		function updateOverallSkill(): void {
			const skills = playerProfile.value.skills
			const { overall } = skills
			overall.level = getOverallSkillValue('level', skills)
			overall.xp = getOverallSkillValue('xp', skills)
		}
		function updateSkill(
			value: number,
			type: 'level' | 'xp',
			skill: SkillScore
		): void {
			if (type === 'level') {
				skill.level = value
				skill.xp = convertLVLtoXP(value)
			} else {
				skill.level = convertXPtoLVL(value)
				skill.xp = value
			}
			updateOverallSkill()
		}

		const methods: MethodOptions = {
			updateSkill,
			setPlayerProfile
		}
		return { ...methods, playerProfile }
	}
})
</script>

<style scoped></style>
