import { autoinject } from 'aurelia-framework';
import { AureliaConfiguration } from 'aurelia-configuration';

@autoinject
export class App {
  title = 'Magnolea';

  constructor(config: AureliaConfiguration) {
    this.title = config.get('title');
  }
}
