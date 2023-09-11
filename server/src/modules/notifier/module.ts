import axios from 'axios';
import { getEnv } from '../../AppConfigs';
import { logger } from '../../utils';

export class NotifierModule {
  static telegramBotToken = '6037335267:AAE9cefX2E0StEWd9TLZ-8MMnQwu8FcrvSY';
  static telegramGroupLogs: number = -919659647;

  static async sendTelegram(body: string, specific_chat_id?: number) {
    const env = getEnv('ENV');
    const chat_id = specific_chat_id || (env === 'production' ? -801777458 : -919659647);

    axios.post(`https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`, {
      chat_id,
      text: body,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    })
      .catch((error) => logger('ERROR', `${this.name}.sendTelegram`, error, false));
  }

  static async trackingError(message: string, stack?: any) {
    let stackOutput: any = "UNKNOW";

    try {
      stackOutput = JSON.stringify(stack, null, 2)
    } catch (error) { }

    return this.sendTelegram(`
    <strong>🔴🔴 [${getEnv('ENV').toUpperCase()}] Server Error</strong>
    • Message: ${message}
    • Stack: ${stackOutput}
    `, this.telegramGroupLogs)
  }
}