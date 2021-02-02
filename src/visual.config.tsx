import { createVisualEditorConfig } from "./packages/visual-editor.utils";
import { ElButton, ElInput, ElOption, ElSelect } from 'element-plus'
import { createEditorColorProp, createEditorInputProp, createEditorSelectProp, createVisualEditorTableProp } from "./packages/visual-editor-props";
export const VisualConfig = createVisualEditorConfig();

/*----------------------文本----------------------*/
VisualConfig.registry('text', {
  label: '文本',
  preview: () => '预览文本',
  render: ({ props }) => <span style={{ color: props.color, fontSize: props.size }}>{props.text || '默认文本'}</span>,
  props: {
    text: createEditorInputProp('显示文本'),
    color: createEditorColorProp('字体颜色'),
    size: createEditorSelectProp('字体大小', [
      { label: '14px', val: '14px' },
      { label: '18px', val: '18px' },
      { label: '24px', val: '24px' },
    ])


  }
})

/*----------------------按钮----------------------*/
VisualConfig.registry('button', {
  label: '按钮',
  preview: () => <ElButton>预览按钮</ElButton>,
  render: ({ props }) => <ElButton type={props.type} size={props.size}>{props.text || '按钮'}</ElButton>,
  props: {
    text: createEditorInputProp('显示文本'),
    type: createEditorSelectProp('按钮类型', [
      { label: '基础', val: 'primary' },
      { label: '成功', val: 'success' },
      { label: '警告', val: 'warning' },
      { label: '危险', val: 'danger' },
      { label: '信息', val: 'info' },
      { label: '文本', val: 'text' },
    ]),
    size: createEditorSelectProp('按钮大小', [
      { label: '默认', val: '' },
      { label: '中等', val: 'medium' },
      { label: '小型', val: 'small' },
      { label: '迷你', val: 'mini' },
    ])
  }
})

/*----------------------输入框----------------------*/
VisualConfig.registry('input', {
  label: '输入框',
  preview: () => <ElInput />,
  render: () => <ElInput />,
})

/*----------------------下拉框----------------------*/
VisualConfig.registry('select', {
  label: '下拉框',
  preview: () => <ElSelect />,
  render: ({ props }) => <ElSelect>
    {(props.options || []).map((opt: { label: string, value: string }, index: number) => (
      <ElOption label={opt.label} value={opt.value} key={index} />
    ))}
  </ElSelect>,
  props: {
    options: createVisualEditorTableProp('下拉选项', {
      options:[
        { label: '显示值', filed: 'label' },
        { label: '绑定值', filed: 'value' },
        { label: '备注', filed: 'comments' },
      ],
      showKey:'label'
    })
  }
})
