import axios from 'axios'

export class BlockchainLogs {
  static telegramBotToken = '1882839496:AAFchz5EfaAAcqtDBh7VsNfF-6sL63Axz6g';

  static async sendTelegram(body: string) {
    const chat_id = -670118754;

    axios.post(`https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id,
        text: body,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      })
    })
      .catch((error) => console.error(`Error: BlockchainLogs.sendTelegram`, error));
  }
}