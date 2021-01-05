import { Page } from 'puppeteer';
import { AppSocketMsg } from 'shared';

export class MockSocket {
  constructor(private page: Page) {}

  async init() {
    await this.page.evaluateOnNewDocument(() => {
      const OrgWebSocket = WebSocket;
      class WebSocketStub {
        static CLOSING = 2;
        public onerror: (e: Error) => void = null;
        public onopen: () => void = null;
        public onmessage: (e: any) => void = null;
        protected isClosed = false;
        constructor(url: string, options: any) {
          if (!url.includes('/?token')) {
            return new OrgWebSocket(url, options) as any;
          }
          (window as any).mockSocket = this;
        }
        close() {
          this.isClosed = true;
        }
        addEventListener(name, onmessage) {
          if (name == 'message') {
            this.onmessage = onmessage;
          }
        }
        removeEventListener(name) {
          if (name == 'message') {
            this.onmessage = null;
          }
        }
      }
      window.WebSocket = WebSocketStub as any;
    });
  }

  async open() {
    await this.page.evaluate(() => {
      const mockSocket: any = (window as any).mockSocket;
      mockSocket.onopen();
    });
  }

  async error(msg: string) {
    await this.page.evaluate(msg => {
      const mockSocket: any = (window as any).mockSocket;
      mockSocket.onerror(new Error(msg));
    }, msg);
  }

  async sendMessage(message: AppSocketMsg) {
    await this.page.evaluate(data => {
      const mockSocket: any = (window as any).mockSocket;
      mockSocket.onmessage({
        data,
      });
    }, JSON.stringify(message));
    await this.page.waitFor(1);
  }
}
