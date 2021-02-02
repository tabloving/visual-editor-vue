import deepcopy from "deepcopy";
import { ElButton, ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber, ElOption, ElSelect } from "element-plus";
import { defineComponent, PropType, reactive, watch } from "vue";
import { TablePropEditor } from "./components/table-prop-editor/table-prop-editor";
import { VisualEditorProps, VisualEditorPropsType } from "./visual-editor-props";
import { VisualEditorBlockData, VisualEditorConfig, VisualEditorModelValue } from "./visual-editor.utils";

export const VisualEditorOperator = defineComponent({
  props: {
    block: { type: Object as PropType<VisualEditorBlockData> },
    config: {
      type: Object as PropType<VisualEditorConfig>,
      required: true
    },
    dataModel: {
      type: Object as PropType<{ value: VisualEditorModelValue }>,
      required: true
    },
    updateBlock: {
      type: Function as PropType<(newBlock: VisualEditorBlockData, oldBlock: VisualEditorBlockData) => void>,
      required: true
    },
    updateModelValue: {
      type: Function as PropType<((val: VisualEditorModelValue) => void)>,
      required: true
    }
  },
  setup(props) {

    const state = reactive({
      editData: {} as any,
    })

    const methods = {
      apply: () => {
        if (!props.block) {
          // 当前编辑容器属性
          props.updateModelValue({
            ...props.dataModel.value,
            container: state.editData
          })

        } else {
          // 当前编辑 block 属性
          const newBlock = state.editData
          props.updateBlock(newBlock, props.block)
        }
      },
      reset: () => {
        if (!props.block) {
          state.editData = deepcopy(props.dataModel.value.container)
        } else {
          state.editData = deepcopy(props.block)
        }
      }
    }

    watch(() => props.block, () => {
      methods.reset()
    }, { immediate: true })

    const renderEditor = (propName: string, propConfig: VisualEditorProps) => {
      return {
        [VisualEditorPropsType.input]: () => (<ElInput v-model={state.editData.props[propName]} />),
        [VisualEditorPropsType.color]: () => (<ElColorPicker v-model={state.editData.props[propName]} />),
        [VisualEditorPropsType.select]: () => (<ElSelect v-model={state.editData.props[propName]}>
          {(() => {
            return propConfig.options!.map(opt => (
              <ElOption label={opt.label} value={opt.val} />
            ))
          })()}
        </ElSelect>),
        [VisualEditorPropsType.table]: () => (
          <TablePropEditor
            v-model={state.editData.props[propName]}
            propConfig={propConfig}
          />
        ),
      }[propConfig.type]()
    }


    return () => {

      let content: JSX.Element[] = [];

      if (!props.block) {
        content.push(<>
          <ElFormItem label='容器宽度'>
            <ElInputNumber v-model={state.editData.width} {...{ step: 100 } as any} />
          </ElFormItem>

          <ElFormItem label='容器高度'>
            <ElInputNumber v-model={state.editData.height} {...{ step: 100 } as any} />
          </ElFormItem>
        </>)
      } else {
        const { componentKey } = props.block
        const component = props.config.componentMap[componentKey]
        if (!!component) {
          if (!!component.props) {
            content.push(<>
              {Object.entries(component.props).map(([propName, propConfig]) => (
                <ElFormItem label={propConfig.label} key={propName}>
                  {renderEditor(propName, propConfig)}
                </ElFormItem>
              ))}
            </>)
          }

          if (!!component.model) {
            content.push(<>
              {Object.entries(component.model).map(([moduleName,label]) =>(
                <ElFormItem label={label}>
                  <ElInput v-model={state.editData.model[moduleName]} />
                </ElFormItem>
              ))}
            </>)
          }
        }

      }

      return (
        <div class="visual-editor-operator">
          <ElForm labelPosition='top'>
            {content}
            <ElFormItem>
              <ElButton {...{ onClick: methods.reset } as any}>重置</ElButton>
              <ElButton type='primary' {...{ onClick: methods.apply } as any}>应用</ElButton>
            </ElFormItem>
          </ElForm>
        </div>
      )
    }
  }
})