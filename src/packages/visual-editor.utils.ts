import { VisualEditorProps } from "./visual-editor-props";

export interface VisualEditorBlockData {
  componentKey: string,     // 映射 VisualEditorConfig中componentMap的component对象
  top: number,                       // 组件的的top定位
  left: number,                      // 组件的left定位
  adjustPosition: boolean,           // 是否需要调整位置 居中放置
  focus: boolean,                    // 当前是否为选中组件
  zIndex: number,                    // 组件的z-index
  width: number,                     // 组件宽度
  height: number,                    // 组件高度
  hasResized: boolean,               // 是否调整过宽度或者高度
  props: Record<string, any>,        // 组件的设计属性
  model: Record<string, string>,     // 绑定的字段
  slotName?: string,                // 组件唯一标识 
}

export interface VisualEditorModelValue {
  container: {
    width: number,
    height: number
  },
  blocks?: VisualEditorBlockData[]
}

export interface VisualEditorComponent {
  key: string,
  label: string,
  preview: () => JSX.Element,
  render: (data: {
    props: any,
    model: any,
    size: { width?: number, height?: number },
    custom: Record<string,any>,
  }) => JSX.Element,
  props?: Record<string, VisualEditorProps>,
  model?: Record<string, string>,
  resize?: { width?: boolean, height?: boolean },
}

export interface VisualEditorMarkLines {
  x: { left: number, showLeft: number }[],
  y: { top: number, showTop: number }[],
}

export function createVisualEditorConfig() {
  const componentList: VisualEditorComponent[] = [];
  const componentMap: Record<string, VisualEditorComponent> = {}

  return {
    componentList,
    componentMap,
    registry: <_,
      Props extends Record<string, VisualEditorProps> = {},
      Model extends Record<string, string> = {},
      >(key: string, component: {
        label: string,
        preview: () => JSX.Element,
        render: (data: {
          props: { [k in keyof Props]: any },
          model: Partial<{ [k in keyof Model]: any }>,
          size: { width?: number, height?: number },
          custom: Record<string,any>,
        }) => JSX.Element,
        props?: Props,
        model?: Model,
        resize?: { width?: boolean, height?: boolean },
      }) => {
      let comp = { ...component, key };
      componentList.push(comp);
      componentMap[key] = comp;
    }
  }
}

export function createNewBlock({
  component,
  left,
  top
}: {
  component: VisualEditorComponent,
  top: number,
  left: number
}): VisualEditorBlockData {
  return {
    top,
    left,
    componentKey: component!.key,
    adjustPosition: true,
    focus: false,
    zIndex: 0,
    width: 0,
    height: 0,
    hasResized: false,
    props: {},
    model: {},
  }
}
export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>