import { useModel } from "@/packages/utils/useModel";
import { ElInput } from "element-plus";
import { defineComponent } from "vue";
import './number-range.scss';

export const NumberRange = defineComponent({
  props: {
    start: { type: Number },
    end: { type: Number },
  },
  emits: {
    'update:start': (val?: number) => true,
    'update:end': (val?: number) => true,
  },
  setup(props, ctx) {
    const startModel = useModel(() => props.start, val => ctx.emit('update:start', val))
    const endModel = useModel(() => props.end, val => ctx.emit('update:end', val))

    return () => (
      <div class='number-range'>
        <ElInput type='number' v-model={startModel.value} />
        <span>~</span>
        <ElInput type='number' v-model={endModel.value} />
      </div>
    )
  }
})