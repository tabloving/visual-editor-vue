<template>
	<div class="app">
		<h1 style='text-align:center'>这是页面内容</h1>
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
		<div style="text-align: center">
			{{ JSON.stringify(formData) }}
		</div>
		<!-- <NumberRange
			v-model:start="formData.minLevel"
			v-model:end="formData.maxLevel"
		/> -->
	</div>
</template>

<script>
	import { defineComponent } from "vue";
	import { VisualEditor } from "@/packages/visual-editor";
	import { VisualConfig } from "@/visual.config";
	import dataJson from "./data.json";

	export default defineComponent({
		name: "App",
		data() {
			return {
				VisualConfig,
				dataJson,
				formData: {
					username: "admin",
					author:'liuyang',
					frame:'vue',
					lang:'typescript',
					numMin:2020,
					numMax: 2021,
				},
				customProps:{

					frame:{
						onChange:(val)=>{
								this.$notify({
								message: `当前选择 ${val}`
							});
								this.formData.dynamicBtn = val
						}
					}
				}
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
		.number-range{
			input {
			width: 80px;
		}
		}
	}
</style>