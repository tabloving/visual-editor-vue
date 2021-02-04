import { useModel } from "@/packages/utils/useModel";
import { ElInput } from "element-plus";
import { defineComponent } from "vue";
import './number-range.scss';

export const NumberRange = defineComponent({
  props: {
    start: { type: String },
    end: { type: String },
  },
  emits: {
    'update:start': (val?: string) => true,
    'update:end': (val?: string) => true,
  },
  setup(props, ctx) {
    const startModel = useModel(() => props.start, val => ctx.emit('update:start', val))
    const endModel = useModel(() => props.end, val => ctx.emit('update:end', val))

    return () => (
      <div class='number-range'>
        <ElInput type='text' v-model={startModel.value} />
        <span>~</span>
        <ElInput type='text' v-model={endModel.value} />
      </div>
    )
  }
})