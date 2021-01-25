<template>
	<div class="app">
		<!-- <visual-editor /> -->
		<test-use-model v-model="val" />
		<test-use-model v-model="val" />
		val:{{ val }}
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
				val: "",
			};
		},
		components: {
			// VisualEditor,
			TestUseModel,
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