<template>
	<div class="app">
		<h1>这是页面内容</h1>
		<visual-editor
			v-model="dataJson"
			:config="VisualConfig"
			:formData="formData"
		>
			<template #subBtn>
				<el-button type="info" v-if="formData.foodSelect === 'dangao'">自定义按钮</el-button>
				<el-tag v-else>自定义标签</el-tag>
			</template>
		</visual-editor>
		<div style="text-align: center">
			{{ JSON.stringify(formData) }}
		</div>
		<NumberRange
			v-model:start="formData.minLevel"
			v-model:end="formData.maxLevel"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { VisualEditor } from "@/packages/visual-editor";
	import { TestUseModel } from "@/packages/utils/useModel";
	import { VisualConfig } from "@/visual.config";
	import dataJson from "./data.json";
	import { NumberRange } from "@/packages/components/number-range/number-range";
	export default defineComponent({
		name: "App",
		data() {
			return {
				VisualConfig,
				dataJson,
				formData: {
					username: "admin",
				},
			};
		},
		components: {
			VisualEditor,
			NumberRange,
		},
	});
</script>

<style lang="scss">
	html,
	body {
		margin: 0;
		padding: 0;
	}
	.visual-editor-menu-item {
		input {
			width: 80px;
		}
	}
</style>