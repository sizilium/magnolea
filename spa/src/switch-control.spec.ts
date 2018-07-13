import {SwitchControlCustomElement} from 'switch-control';
import {HttpClient} from 'aurelia-http-client';
import {mock, instance, resetCalls, verify} from 'ts-mockito';

describe('switch-control tests', () => {
  let testee: SwitchControlCustomElement;

  let httpClientMock: HttpClient = mock(HttpClient);

  beforeEach(() => {
    testee = new SwitchControlCustomElement(instance(httpClientMock));
  });

  it('when turn on eg-1 switch it should call service correctly', () => {
    testee.eg1 = 'true';

    verify(httpClientMock.post('http://127.0.0.1:5000/switch-on/EG-1', '')).called();
  });

  it('when turn off eg-2 switch again it should call service correctly', () => {
    testee.eg2 = 'true';
    resetCalls(httpClientMock);
    testee.eg2 = 'false';

    verify(httpClientMock.post('http://127.0.0.1:5000/switch-off/EG-2', '')).called();
  });
});
