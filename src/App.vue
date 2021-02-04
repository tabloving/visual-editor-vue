<template>
	<div class="app">
		<h2 style="text-align: center; color: #3fb280; margin-bottom: 14px">
			以下为页面内容
		</h2>
		<visual-editor
			v-model="dataJson"
			:config="VisualConfig"
			:formData="formData"
			:customProps="customProps"
		>
			<!-- <template #subBtn>
				<el-button type="info" v-if="formData.food === 'dangao'">自定义按钮</el-button>
				<el-tag v-else>自定义标签</el-tag>
			</template> -->
		</visual-editor>

		<!-- <NumberRange v-model:start="formData.min" v-model:end="formData.max" /> -->

		<div style="text-align: center">
			{{ JSON.stringify(formData) }}
		</div>
	</div>
</template>

<script>
	import { defineComponent } from "vue";
	import { VisualEditor } from "@/packages/visual-editor";
	import { VisualConfig } from "@/visual.config";
	import dataJson from "./data.json";
	import { NumberRange } from "./packages/components/number-range/number-range";

	export default defineComponent({
		name: "App",
		data() {
			return {
				VisualConfig,
				dataJson,
				formData: {
					author: "liuyang",
					frame: "vue",
					lang: "typescript",
					min: 2020,
					max: 2021,
				},
				customProps: {
					// langSelector:{
					// 	onChange:()=>{

					// 	}
					// },

					frameSelector: {
						onChange: (val) => {
							this.$notify({
								message: `当前选择 ${val}`,
							});
						},
					},
				},
			};
		},
		components: {
			VisualEditor,
			// NumberRange,
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
		.number-range {
			input {
				width: 80px;
			}
		}
	}
</style>