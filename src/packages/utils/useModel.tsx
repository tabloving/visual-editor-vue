import { computed, ref, watch, defineComponent } from "vue";

export function useModel<T>(getter: () => T, emitter: (val: T) => void) {
  const state = ref(getter()) as { value: T }

  watch(getter, val => {
    if (val !== state.value) {
      state.value = val
    }
  })

  return computed({
    get: () => state.value,
    set: (val: T) => {
      if (state.value !== val) {
        state.value = val;
        emitter(val)
      }
    }
  })
}



export const TestUseModel = defineComponent({
  props: {
    modelValue: { type: String }
  },
  emit: {
    'update:modelValue': (val?: string) => true
  },
  setup: (props, ctx) => {
    const model = useModel(() => props.modelValue, val => ctx.emit('update:modelValue', val))
    return () => (
      <div>
        自定义输入框
        <input type='text' v-model={model.value} />
      </div>
    )
  }
})