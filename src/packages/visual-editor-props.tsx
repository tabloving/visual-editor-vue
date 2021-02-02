export enum VisualEditorPropsType {
  input = 'input',
  color = 'color',
  select = 'select',
  table = 'table',
}

export type VisualEditorProps = {
  type: VisualEditorPropsType,
  label: string
} & {
  options?: VisualEditorSelectOptions
} & {
  table?: VisualEditorTableOptions
}

/* ----------------------------------input------------------------------ */
export function createEditorInputProp(label: string): VisualEditorProps {
  return {
    type: VisualEditorPropsType.input,
    label
  }
}

/* ----------------------------------color------------------------------ */
export function createEditorColorProp(label: string): VisualEditorProps {
  return {
    type: VisualEditorPropsType.color,
    label
  }
}

/* --------------------------------select-------------------------------- */
export type VisualEditorSelectOptions = {
  label: string,
  val: string
}[]

export function createEditorSelectProp(label: string, options: VisualEditorSelectOptions): VisualEditorProps {
  return {
    type: VisualEditorPropsType.select,
    label,
    options
  }
}


/* --------------------------------table-------------------------------- */
export type VisualEditorTableOptions = {
  label: string,  // 列显示文本
  filed: string   // 列绑定的字段
}[]

export function createVisualEditorTableProp(label: string, table: VisualEditorTableOptions): VisualEditorProps{
  return {
    type: VisualEditorPropsType.table,
    label,
    table
  }
}