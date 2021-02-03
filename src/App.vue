<template>
	<div class="app">
		<visual-editor v-model="dataJson" :config="VisualConfig" :formData='formData' />
		<div style="text-align: center">
			{{JSON.stringify(formData)}}
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { VisualEditor } from "@/packages/visual-editor";
	import { TestUseModel } from "@/packages/utils/useModel";
	import {VisualConfig} from '@/visual.config';
	import dataJson from './data.json';
	export default defineComponent({
		name: "App",
		data() {
			return {
				VisualConfig,
				flag:false,
				dataJson,
				formData:{
					username:'admin'
				}
			};
		},
		components: {
			VisualEditor
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