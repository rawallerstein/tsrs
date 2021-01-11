<template>
	<div class="quests-container">
		<el-row v-for="quest in questArray" :key="quest.Name" class="quest-row">
			<el-card>
				<template #header>{{ quest.name }}</template>
				<div class="quest-card__content">
					<span>Miniquest? {{ quest.miniquest }}</span>
					<span
						>Wiki:
						<el-link type="primary" :href="quest.url">{{
							quest.url
						}}</el-link></span
					>
					<span>Members? {{ quest.members }}</span>
					<span>Difficulty: {{ quest.difficulty }}</span>
					<span>Length: {{ quest.questLength }}</span>
					<div>
						Requirements:
						<span>Quests: {{ quest.requirements.quests }}</span>
						<span>Skills: {{ quest.requirements.levels }}</span>
					</div>
					<div>
						Rewards
						<div>
							Experience:
							<span
								v-for="skillsReward of quest.rewards.Experience"
								:key="skillsReward.skill"
								>{{ skillsReward.skill }}: {{ skillsReward.amount }}
							</span>
						</div>
						<div>Quest Points: {{ quest.rewards.QuestPoints }}</div>
					</div>
					<span>Series {{ quest.eries }}</span>
				</div>
			</el-card>
		</el-row>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Quests from 'osrs-quest-tool'

export default defineComponent({
	setup() {
		const questArray = Quests.questArray()
		return { questArray }
	}
})
</script>

<style scoped lang="scss">
.quest-row {
	margin-bottom: 20px;
}
.quest-card {
	&__content {
		display: flex;
		flex-direction: column;
	}
}
</style>
