<template>
	<div class="app">
		<visual-editor v-model="dataJson" :config="VisualConfig" :formData='formData' />
		<div style="text-align: center">
			{{JSON.stringify(formData)}}
		</div>
		<NumberRange v-model:start='formData.minLevel' v-model:end='formData.maxLevel'/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { VisualEditor } from "@/packages/visual-editor";
	import { TestUseModel } from "@/packages/utils/useModel";
	import {VisualConfig} from '@/visual.config';
	import dataJson from './data.json';
	import {NumberRange} from '@/packages/components/number-range/number-range'
	export default defineComponent({
		name: "App",
		data() {
			return {
				VisualConfig,
				dataJson,
				formData:{
					username:'admin'
				}
			};
		},
		components: {
			VisualEditor,
			NumberRange
		},
	});
</script>

<style lang="scss">
	html,
	body {
		margin: 0;
		padding: 0;
	}
	.visual-editor-menu-item{
		input{
			width: 80px;
		}
	}
</style>