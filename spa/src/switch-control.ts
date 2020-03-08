import { AureliaConfiguration } from 'aurelia-configuration';
import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

interface ISwitch {
  id: string,
  name: string,
  state?: boolean
}

@autoinject
export class SwitchControlCustomElement {

  private apiUrl: string;
  public items: ISwitch[];

  constructor(private api: HttpClient, private config: AureliaConfiguration) {
    this.apiUrl = config.get('api');
  }

  private async created() {
    const url: string = `${this.apiUrl}/switch`;

    try {
      const raw = await this.api.get(url);

      this.items = this.config.get('switches');
      this.items.map(i => {
        i.state = raw.content[i.id];
      });

    } catch (e) {
      console.error(e);
    }
  }

  public async onSwitch(id: string) {
    const item = this.items.find(i => i.id === id);
    item.state = !item.state;
    await this.switch(id, item.state);
  }

  private async switch(switchId: string, enable: boolean) {
    const url: string = `${this.apiUrl}/switch/${switchId}/${enable ? 'on' : 'off'}`;

    try {
      await this.api.post(url, '');
    } catch (e) {
      console.error(e);
    }
  }
}
