<template>
	<div class="app">
		<visual-editor v-model="dataJson" />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { VisualEditor } from "@/packages/visual-editor";
	import { TestUseModel } from "@/packages/utils/useModel";

	export default defineComponent({
		name: "App",
		data() {
			return {
				dataJson: {
					container: {
						height: 300,
						width: 400,
					},
					blocks: [
						{
							top: 100,
							left: 100,
						},
						{
							top: 200,
							left: 200,
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