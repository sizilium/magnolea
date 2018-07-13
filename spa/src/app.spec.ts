import {App} from './app';

describe('the app', () => {
  it('says hello', () => {
    expect(new App().title).toBe('Magnolea Home-Automation');
  });
});
