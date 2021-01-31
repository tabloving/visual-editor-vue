import { onUnmounted, reactive } from "vue";
import { KeyboardCode } from "./keyboard-code";

export interface CommandExecute {
  undo?: () => void,
  redo: () => void,
}

export interface Command {
  name: string,  // 命令唯一标识符
  keyboard?: string | string[], // 命令监听的快捷键
  execute: (...args: any[]) => CommandExecute, // 命令被执行时所做的内容
  followQueue?: boolean, // 命令执行完后，是否需要将命令执行redo，undo存入命令队列
  init?: () => ((() => void) | undefined),   // 命令初始化函数
  data?: any
}


export function useCommander() {

  const state = reactive({
    current: -1,
    queue: [] as CommandExecute[],
    commandArray: [] as Command[],
    commands: {} as Record<string, (...args: any[]) => void>,
    destroyList: [] as ((() => void) | undefined)[],
  });

  const registry = (command: Command) => {
    state.commandArray.push(command);
    state.commands[command.name] = (...args) => {
      const { undo, redo } = command.execute(...args);
      redo();
      /*如果命令执行之后，不需要进入命令队列，则直接结束*/
      if (command.followQueue === false) return;
      /*否则，将命令队列中剩余的命令去除，保留current及其之前的命令*/
      let { queue, current } = state
      if (queue.length > 0) {
        queue = queue.slice(0, current + 1)
        state.queue = queue
      }
      /*设置命令队列中最后一个命令为当前执行的命令*/
      queue.push({ undo, redo })
      /*索引+1，指向队列中的最后一个命令*/
      state.current = current + 1;
    }
  }

  const keyboardEvent = (() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement !== document.body) return;
      const { shiftKey, ctrlKey, altKey, keyCode, metaKey } = e;
      let keyString: string[] = [];
      if (ctrlKey || metaKey) keyString.push('ctrl');
      if (shiftKey) keyString.push('shift');
      if (altKey) keyString.push('alt');
      keyString.push(KeyboardCode[keyCode]);
      const keyNames = keyString.join('+');
      state.commandArray.forEach(({keyboard, name}) => {
        if (!keyboard) return;
        const keys = Array.isArray(keyboard) ? keyboard : [keyboard];
        if(keys.indexOf(keyNames) > -1){
          state.commands[name]();
          e.stopPropagation();
          e.preventDefault();
        }
      })
    }
    const init = () => {
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }
    return init
  })();

  const init = () => {
    const onKeydown = (e: KeyboardEvent) => {
      // console.log('监听到键盘时间')
    }
    window.addEventListener('keydown', onKeydown)
    state.commandArray.forEach(command => !!command.init && state.destroyList.push(command.init()));
    state.destroyList.push(keyboardEvent());
    state.destroyList.push(() => window.removeEventListener('keydown', onKeydown))
  }

  registry({
    name: 'undo',
    keyboard: 'ctrl+z',
    followQueue: false,
    execute: () => {
      return {
        redo: () => {
          if (state.current === -1) return;
          const queueItem = state.queue[state.current];
          if (!!queueItem) {
            !!queueItem.undo && queueItem.undo();
            state.current--
          }


        },
      }
    }
  });

  registry({
    name: 'redo',
    keyboard: ['ctrl+y', 'ctrl+shift+z'],
    followQueue: false,
    execute: () => {
      return {
        redo: () => {
          const queueItem = state.queue[state.current + 1];
          if (!!queueItem) {
            queueItem.redo();
            state.current++
          }
        },
      }
    }
  })

  onUnmounted(() => state.destroyList.forEach(fn => !!fn && fn()))

  return {
    state,
    registry,
    init
  }
}


