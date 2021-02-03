import { VisualEditorBlockData, VisualEditorComponent } from "@/packages/visual-editor.utils";
import { defineComponent, PropType } from "vue";

enum Direction {
  start = 'start',
  center = 'center',
  end = 'end'
}

export const BlockResize = defineComponent({
  props: {
    block: { type: Object as PropType<VisualEditorBlockData>, required: true },
    component: { type: Object as PropType<VisualEditorComponent>, required: true },
  },
  setup(props, ctx) {

    const onMouseDown = (() => {
      let data = {
        startX: 0,
        startY: 0,
        startWidth: 0,
        startHeight: 0,
        startLeft: 0,
        startTop: 0,
        direction: { 
          horizontal: Direction.start, 
          vertical: Direction.start,
        }
      }

      const mousedown = (e: MouseEvent, direction: { horizontal: Direction, vertical: Direction }) => {
        e.stopPropagation();
        document.body.addEventListener('mousemove', mousemove)
        document.body.addEventListener('mouseup', mouseup)
        data ={
          startX: e.clientX,
          startY: e.clientY,
          startWidth:props.block.width,
          startHeight:props.block.height,
          startLeft:props.block.left,
          startTop:props.block.top,
          direction
        }
      }

      const mousemove = (e: MouseEvent) => {
        const {startX, startY,startWidth, startHeight} = data
        const {clientX:moveX, clientY:moveY} = e
        const durX = moveX - startX
        const durY = moveY - startY
        const width = startWidth + durX
        const height = startHeight + durY
        const block =props.block as VisualEditorBlockData
        block.width = width
        block.height = height
        block.hasResized = true

      }

      const mouseup = () => {
        document.body.removeEventListener('mousemove', mousemove)
        document.body.removeEventListener('mouseup', mouseup)
      }


      return mousedown
    })()



    return () => {
      const { width, height } = props.component.resize || {};

      return <>
        {!!height && <>
          <div class="block-resize block-resize-top"
            onMousedown={e => onMouseDown(e, { horizontal: Direction.center, vertical: Direction.start })} />
          <div class="block-resize block-resize-bottom"
            onMousedown={e => onMouseDown(e, { horizontal: Direction.center, vertical: Direction.end })} />
        </>}

        {!!width && <>
          <div class="block-resize block-resize-left"
            onMousedown={e => onMouseDown(e, { horizontal: Direction.start, vertical: Direction.center })} />
          <div class="block-resize block-resize-right"
            onMousedown={e => onMouseDown(e, { horizontal: Direction.end, vertical: Direction.center })} />
        </>}

        {!!width && !!height && <>
          <div class="block-resize block-resize-top-left"
            onMousedown={e => onMouseDown(e, { horizontal: Direction.start, vertical: Direction.start })} />
          <div class="block-resize block-resize-top-right"
            onMousedown={e => onMouseDown(e, { horizontal: Direction.end, vertical: Direction.start })} />
          <div class="block-resize block-resize-bottom-left"
            onMousedown={e => onMouseDown(e, { horizontal: Direction.start, vertical: Direction.end })} />
          <div class="block-resize block-resize-bottom-right"
            onMousedown={e => onMouseDown(e, { horizontal: Direction.end, vertical: Direction.end })} />
        </>}


      </>
    }
  }
})