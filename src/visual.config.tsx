import { createVisualEditorConfig } from "./packages/visual-editor.utils";
import { ElButton, ElInput, ElOption, ElSelect } from 'element-plus'
import { createEditorColorProp, createEditorInputProp, createEditorSelectProp, createVisualEditorTableProp } from "./packages/visual-editor-props";
import { NumberRange } from "./packages/components/number-range/number-range";
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
  render: ({ props, size, custom }) => (
    <ElButton
      {...custom}
      type={props.type}
      size={props.size}
      style={{
        width: !!size.width ? `${size.width}px` : null,
        height: !!size.height ? `${size.height}px` : null,
      }}>
      {props.text || '按钮'}
    </ElButton>
  ),
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
    ]),
  },
  resize: { width: true, height: true },
})

/*----------------------输入框----------------------*/
VisualConfig.registry('input', {
  label: '输入框',
  preview: () => <ElInput modelValue={""} />,
  render: ({ model, size, custom }) => {
    return <ElInput
      {...custom}
      {...model.default}
      style={{ width: !!size.width ? `${size.width}px` : null }} />
  },
  resize: { width: true },
  model: {
    default: '绑定字段'
  }
})

/*----------------------下拉框----------------------*/
VisualConfig.registry('select', {
  label: '下拉框',
  preview: () => <ElSelect />,
  render: ({ props, model, custom ,size}) => (
    <ElSelect
      key={(props.options || []).map((opt: any) => opt.value).join('.')}
      style={{ width: !!size.width ? `${size.width}px` : null }}
      {...model.default}
      {...custom}
    >
      {(props.options || []).map((opt: { label: string, value: string }, index: number) => (
        <ElOption label={opt.label} value={opt.value} key={index} />
      ))}
    </ElSelect>
  ),
  props: {
    options: createVisualEditorTableProp('下拉选项', {
      options: [
        { label: '显示值', field: 'label' },
        { label: '绑定值', field: 'value' },
        { label: '备注', field: 'comments' },
      ],
      showKey: 'label'
    })
  },
  model: {
    default: '绑定字段'
  },
  resize: { width: true },
})

/*----------------------数字范围----------------------*/
VisualConfig.registry('number-range', {
  label: '数字范围输入框',
  preview: () => <NumberRange />,
  render: ({ model, size }) => (
    <NumberRange
      style={{ width: !!size.width ? `${size.width}px` : null }}
      {...{
        start: model.start.value,
        'onUpdate:start': model.start.onChange,
        end: model.end.value,
        'onUpdate:end': model.end.onChange,
      }} />
  ),
  model: {
    start: '起始绑定字段',
    end: '结尾绑定字段'
  },
  resize: { width: true },
})

/*----------------------图片----------------------*/
VisualConfig.registry('image', {
  label: '图片',
  resize: {
    width: true,
    height: true,
  },
  preview: () => (
    <div style='text-align: center'>
      <div style='font-size:20px;background-color:#f2f2f2;color:ccc;display:inline-flex;width:100px;height:100px'>
        <i class='el-icon-picture' />
      </div>
    </div>
  ),
  render: ({ props, size }) => {
    return (
      <div style={{ height: `${size.height || 100}px`, width: `${size.width || 100}px` }} class='visual-block-image'>
        <img src={props.url || 'https://cn.vuejs.org/images/logo.png'} />
      </div>
    )
  },
  props: {
    url: createEditorInputProp('地址')
  }
})