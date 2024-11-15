import mitt from "mitt";
const emitter = mitt();

export const EventBus = {
  emit: (event, ...args) => emitter.emit(event, ...args),
  on: (event, handler) => emitter.on(event, handler),
  off: (event, handler) => emitter.off(event, handler),
};

export default emitter;
