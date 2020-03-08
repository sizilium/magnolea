import { AureliaConfiguration } from 'aurelia-configuration';
import {SwitchControlCustomElement} from 'switch-control';
import {HttpClient} from 'aurelia-http-client';
import { mock, instance, resetCalls, verify, when, anyString } from 'ts-mockito';

describe('switch-control tests', () => {
  let testee: SwitchControlCustomElement;

  let httpClientMock: HttpClient = mock(HttpClient);
  let configMock: AureliaConfiguration = mock(AureliaConfiguration);

  beforeEach(() => {
    when(configMock.get(anyString()))
      .thenReturn('http://127.0.0.1:5000');

    testee = new SwitchControlCustomElement(instance(httpClientMock), instance(configMock));
  });

  it('when turn on eg-1 switch it should call service correctly', () => {
    testee.items = [{id: 'EG-1', name: 'EG-1'}];

    testee.onSwitch('EG-1');

    verify(httpClientMock.post('http://127.0.0.1:5000/switch/EG-1/on', '')).called();
  });

  it('when turn off eg-2 switch again it should call service correctly', () => {
    testee.items = [{id: 'EG-2', name: 'EG-2'}];

    testee.onSwitch('EG-2');
    resetCalls(httpClientMock);
    testee.onSwitch('EG-2');

    verify(httpClientMock.post('http://127.0.0.1:5000/switch/EG-2/off', '')).called();
  });
});
