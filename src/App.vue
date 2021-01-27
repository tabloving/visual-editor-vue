<template>
	<div class="app">
		<visual-editor v-model="dataJson" :config="VisualConfig" />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { VisualEditor } from "@/packages/visual-editor";
	import { TestUseModel } from "@/packages/utils/useModel";
	import {VisualConfig} from '@/visual.config'
	export default defineComponent({
		name: "App",
		data() {
			return {
				VisualConfig,
				dataJson: {
					container: {
						height: 300,
						width: 400,
					},
					blocks: [
						{
							top: 100,
							left: 100,
							componentKey:'button',
							focus:true
						},
						{
							top: 200,
							left: 200,
							componentKey:'input'
						},
					],
				},
			};
		},
		components: {
			VisualEditor,
		},
	});
</script>

<style lang="scss">
	html,
	body {
		margin: 0;
		padding: 0;
	}
</style>