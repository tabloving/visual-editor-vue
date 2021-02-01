import { computed, createApp, defineComponent, getCurrentInstance, inject, onBeforeUnmount, onMounted, PropType, provide, reactive, ref } from "vue";
import { defer } from "./defer";
import './dropdown-service.scss';

interface DropdownServiceOption {
  reference: MouseEvent | HTMLElement,
  content: () => JSX.Element
}

const DropdownServiceProvider = (() => {
  const DROPDOWN_SERVICE_PROVIDER = '@@DROPDOWN_SERVICE_PROVIDER'
  return {
    provide: (handler: { onClick: () => void }) => provide(DROPDOWN_SERVICE_PROVIDER, handler),
    inject: () => inject(DROPDOWN_SERVICE_PROVIDER) as { onClick: () => void }
  }
})()

const ServiceComponent = defineComponent({
  props: { option: { type: Object as PropType<DropdownServiceOption>, required: true } },
  setup(props) {

    const ctx = getCurrentInstance()!;
    const el = ref({} as HTMLDivElement);

    const state = reactive({
      option: props.option,
      showFlag: false,
      top: 0,
      left: 0,
      mounted: (() => {
        const dfd = defer()
        onMounted(() => {
          setTimeout(() => dfd.resolve(), 0)
        })
        return dfd.promise
      })()
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

      methods.show()

    }

    const methods = {
      show: async () => {
        await state.mounted
        state.showFlag = true
      },
      hide: () => { state.showFlag = false }
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

    const onMouseDownDocument = (e: MouseEvent) => {
      if (!(el.value).contains(e.target as HTMLElement)) {
        methods.hide();
      }
    }

    onMounted(() => document.body.addEventListener('mousedown', onMouseDownDocument, true))

    onBeforeUnmount(() => document.body.removeEventListener('mousedown', onMouseDownDocument, true))

    DropdownServiceProvider.provide({ onClick: methods.hide })

    return () => (
      <div class={classes.value} style={styles.value} ref={el}>
        {state.option.content()}
      </div>
    )

  }
})


export const DropdownOption = defineComponent({
  props: {
    label: { type: String },
    icon: { type: String },
    customClass: { type: String }
  },
  emits: {
    click: (e: MouseEvent) => true
  },
  setup(props, ctx) {

    const { onClick: dropdownClickhandler } = DropdownServiceProvider.inject()

    const handler = {
      onClick: (e: MouseEvent) => {
        ctx.emit('click', e)
        dropdownClickhandler()
      }
    }
    return () => (
      <div class={`dropdown-option dropdown-option-${props.customClass}`} onClick={handler.onClick}>
        <i class={`iconfont ${props.icon}`} />
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
      document.body.appendChild(el)
      const app = createApp(ServiceComponent, { option })
      ins = app.mount(el)
    }
    ins.service(option)
  }
})()