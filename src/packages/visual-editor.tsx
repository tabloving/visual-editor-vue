import { defineComponent } from "vue";
import '@/packages/visual-editor.scss'
export const VisualEditor = defineComponent({
  props: {},
  setup(props) {
    return () => (
      <div class='visual-editor'>
        <div class="visual-editor-menu">
          visual-editor-menu
        </div>
        <div class="visual-editor-head">
          visual-editor-head
        </div>
        <div class="visual-editor-operator">
          visual-editor-operator
        </div>
        <div class="visual-editor-body">
          <div class="visual-editor-body-content">
          visual-editor-body
          </div>
        </div>
      </div>
    )
  }
})