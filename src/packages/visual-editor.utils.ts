export interface VisualEditorBlockData {
  componentKey: string,     // 映射 VisualEditorConfig中componentMap的component对象
  top: number,
  left: number,
  adjustPosition: boolean,
  focus: boolean,
  zIndex: number,
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
  preview: () => JSX.Element
  render: () => JSX.Element
}

export function createVisualEditorConfig() {
  const componentList: VisualEditorComponent[] = [];
  const componentMap: Record<string, VisualEditorComponent> = {}

  return {
    componentList,
    componentMap,
    registry: (key: string, component: Omit<VisualEditorComponent, 'key'>) => {
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
    zIndex: 0
  }
}
export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>