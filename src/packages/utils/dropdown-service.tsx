import { computed, createApp, defineComponent, getCurrentInstance, PropType, reactive } from "vue";
import './dropdown-service.scss';
interface DropdownServiceOption {
  reference: MouseEvent | HTMLElement,
  content: () => JSX.Element
}

const ServiceComponent = defineComponent({
  props: { option: { type: Object as PropType<DropdownServiceOption>, required: true } },
  setup(props) {

    const ctx = getCurrentInstance()!

    const state = reactive({
      option: props.option,
      showFlag: false,
      top: 0,
      left: 0
    })

    const service = (option: DropdownServiceOption) => {
      state.option = option;
      if ('addEventListener' in option.reference) {
        // option.reference is HTMLElement
        const { top, left, height } = option.reference.getBoundingClientRect()!;
        state.top = top + height;
        state.left = left
      } else {
        // option.reference is MouseEvent
        const { clientX, clientY } = option.reference
        state.top = clientY
        state.left = clientX
      }

      state.showFlag = true

    }

    const classes = computed(() => [
      'dropdown-service',
      {
        'dropdown-service-show': state.showFlag
      }
    ])

    const styles = computed(() => {
      return {
        top: `${state.top}px`,
        left: `${state.left}px`
      }
     
    })

    Object.assign(ctx.proxy, { service })
    return () => (
      <div class={classes.value} style={styles.value}>
        {state.option.content()}
      </div>
    )

  }
})


export const DropdownOption = defineComponent({
  props: {
    label: {type: String},
    icon: {type: String}
  },
  setup(props){

    return ()=>(
      <div class='dropdown-option'>
        <i class={`iconfont ${props.icon}`}></i>
        <span>{props.label}</span>
      </div>
    )
  }
})

export const $$dropdown = (() => {
  let ins: any;
  return (option: DropdownServiceOption) => {
    if (!ins) {
      const el = document.createElement('div')
      document.appendChild(el)
      const app = createApp(ServiceComponent, { option })
      ins.mount(el)
    }
    ins.service(option)
  }
})()