import events from 'events';
import { EmitterItem } from './emitter.types';

export class Emitter<Payload = any> {
  private handler: events.EventEmitter;

  constructor() {
    this.handler = new events.EventEmitter();
  }

  emit(event: string, payload?: Payload) {
    return this.handler.emit(event, payload);
  }

  on(event: string, fn: (data: Payload) => any): EmitterItem {
    this.handler.on(event, fn);
    return {
      destroy: () => {
        this.handler.removeListener(event, fn)
      }
    }
  }

  once(event: string, fn: (data: Payload) => any): EmitterItem {
    this.handler.once(event, fn);
    return {
      destroy: () => {
        this.handler.removeListener(event, fn)
      }
    }
  }

  removeAllListeners() {
    return this.handler.removeAllListeners();
  }
}

export * from './emitter.types';

