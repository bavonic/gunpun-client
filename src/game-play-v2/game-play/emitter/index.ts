import Phaser from 'phaser';
import { EmitterItem } from './emitter.types';

export class Emitter {
  private handler: Phaser.Events.EventEmitter;

  constructor() {
    this.handler = new Phaser.Events.EventEmitter();
  }

  emit(event: string, value?: any) {
    return this.handler.emit(event, value);
  }

  on(event: string, fn: (data?: any) => any): EmitterItem {
    this.handler.on(event, fn);
    return {
      destroy: () => {
        this.handler.removeListener(event, fn)
      }
    }
  }

  once(event: string, fn: (data?: any) => any): EmitterItem {
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

export * from './emitter.types'

