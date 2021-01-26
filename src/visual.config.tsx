import { createVisualEditorConfig } from "./packages/visual-editor.utils";
import {ElButton, ElInput} from 'element-plus'
export const VisualConfig = createVisualEditorConfig();
VisualConfig.registry('text', {
  label: '文本',
  preview: () => '预览文本',
  render: () => '渲染文本',
})

VisualConfig.registry('button', {
  label: '按钮',
  preview: () => <ElButton>预览按钮</ElButton>,
  render: () => <ElButton>渲染按钮</ElButton>,
})

VisualConfig.registry('input', {
  label: '输入框',
   preview: () => <ElInput />,
   render: () => <ElInput />,
})