import { NotifierModule } from "../modules/notifier/module";

export type LoggerType = 'INFO' | 'ERROR';

export const logger = (type: LoggerType, message: string, stack?: any, isTracking = true) => {
  const icon = type === 'ERROR' ? '🔴🔴🔴' : '🤖🤖🤖'
  console.log(`${icon} [${type}] [${new Date().toLocaleString('en-US')}] > ${message}`, stack || '');
  if (type === 'ERROR' && isTracking) NotifierModule.trackingError(message, stack);
}