import { computed, defineComponent, PropType, ref } from "vue";
import '@/packages/visual-editor.scss'
import { VisualEditorComponent, VisualEditorConfig, VisualEditorModelValue } from "./visual-editor.utils";
import { useModel } from "./utils/useModel";
import { VisualEditorBlock } from "./visual-editor-block";
export const VisualEditor = defineComponent({
  props: {
    modelValue: { type: Object as PropType<VisualEditorModelValue>, required: true },
    config: { type: Object as PropType<VisualEditorConfig>, required: true }
  },
  emits: {
    'update:modelValue': (val?: VisualEditorModelValue) => true
  },
  setup(props, ctx) {
    const dataModel = useModel(() => props.modelValue, val => ctx.emit('update:modelValue', val));

    const containerRef = ref({} as HTMLDivElement);

    const containerStyles = computed(() => ({
      width: `${dataModel.value.container.width}px`,
      height: `${dataModel.value.container.height}px`
    }))
    // console.log(props.config)

    const menuDraggier = (() => {
      let component = null as null | VisualEditorComponent;
      const blockHandler = {
        /**
         * 处理拖拽菜单组件开始动作
         */
        dragstart: (e: DragEvent, current: VisualEditorComponent) => {
          containerRef.value.addEventListener('dragenter', containerHandler.dragenter);
          containerRef.value.addEventListener('dragover', containerHandler.dragover);
          containerRef.value.addEventListener('dragleave', containerHandler.dragleave);
          containerRef.value.addEventListener('drop', containerHandler.drop);
          component = current
        },
        /**
         * 处理拖拽菜单结束动作
         */
        dragend: () => {
          containerRef.value.removeEventListener('dragenter', containerHandler.dragenter);
          containerRef.value.removeEventListener('dragover', containerHandler.dragover);
          containerRef.value.removeEventListener('dragleave', containerHandler.dragleave);
          containerRef.value.removeEventListener('drop', containerHandler.drop);
          component = null
        },
      };

      const containerHandler = {
        /* 拖拽菜单组件进入容器的时候，设置鼠标为可放置状态 */
        dragenter: (e: DragEvent) => e.dataTransfer!.dropEffect = 'move',
        /* 拖拽菜单组件在容器中移动时候，禁用默认事件 */
        dragover: (e: DragEvent) => e.preventDefault(),
        /* 如果拖拽过程中鼠标离开了容器，设置鼠标为不可放置状态 */
        dragleave: (e: DragEvent) => e.dataTransfer!.dropEffect = 'none',
        /* 在容器中放置的时候，通过事件对象的offsetX、offsetY添加一条组件数据 */
        drop: (e: DragEvent) => {
          const blocks = dataModel.value.blocks || [];
          blocks.push({
            top: e.offsetY,
            left: e.offsetX
          })
          dataModel.value = { ...dataModel.value, blocks }
        }
      }
      return blockHandler
    })();
    return () => (
      <div class='visual-editor'>
        <div class="visual-editor-menu">
          {props.config.componentList.map(component => (
            <div class="visual-editor-menu-item"
              draggable
              onDragstart={(e) => menuDraggier.dragstart(e, component)}
              onDragend={menuDraggier.dragend}>
              <span class="visual-editor-menu-item-label">
                {component.label}
              </span>
              {component.preview()}
            </div>
          ))}
        </div>
        <div class="visual-editor-head">
          visual-editor-head
        </div>
        <div class="visual-editor-operator">
          visual-editor-operator
        </div>
        <div class="visual-editor-body">
          <div class="visual-editor-content">
            <div class="visual-editor-container" style={containerStyles.value} ref={containerRef}>
              {!!dataModel.value.blocks && (dataModel.value.blocks.map((block, index) => (
                <VisualEditorBlock block={block} key={index} />
              ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
})