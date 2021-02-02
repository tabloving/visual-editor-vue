export enum VisualEditorPropsType {
  input = 'input',
  color = 'color',
  select = 'select',
}

export type VisualEditorProps = {
  type: VisualEditorPropsType,
  label: string
} & {
  options?: VisualEditorSelectOptions
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
