import {autoinject, observable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Configuration} from './configuration';

@autoinject
export class SwitchControlCustomElement {

  @observable public eg1: string = 'true';
  @observable public eg2: string = 'true';
  @observable public eg3: string = 'true';
  @observable public eg4: string = 'true';
  @observable public og1: string = 'true';
  @observable public og2: string = 'true';
  @observable public og3: string = 'true';
  @observable public og4: string = 'true';

  constructor(private api: HttpClient) {
  }

  private async eg1Changed(newValue) {
    await this.switch('EG-1', newValue);
  }

  private async eg2Changed(newValue) {
    await this.switch('EG-2', newValue);
  }

  private async eg3Changed(newValue) {
    await this.switch('EG-3', newValue);
  }

  private async eg4Changed(newValue) {
    await this.switch('EG-4', newValue);
  }

  private async og1Changed(newValue) {
    await this.switch('OG-1', newValue);
  }

  private async og2Changed(newValue) {
    await this.switch('OG-2', newValue);
  }

  private async og3Changed(newValue) {
    await this.switch('OG-3', newValue);
  }

  private async og4Changed(newValue) {
    await this.switch('OG-4', newValue);
  }

  private async switch(switchId: string, enable: string) {
    const url: string = `${Configuration.apiUrl}/${enable === 'true' ? 'switch-on' : 'switch-off'}/${switchId}`;

    try {
      await this.api.post(url, '');
    } catch (e) {
      console.error(e);
    }
  }
}
