import { EventMap, onEvent, offEvent, noop } from '../../../src/shared/utils';
import type { Stub } from '../../_helper/stub';
import { removeStub, resetStub, stubMethod, verifyCall } from '../../_helper/stub';

const {
    POINTERDOWN,
    RESIZE,
} = EventMap;

describe('shared/utils/event', () => {
    describe('onEvent, offEvent', () => {
        let addEventListenerStub: Stub;
        let removeEventListenerStub: Stub;

        const handler = jest.fn();

        const OBJECT_STUB = {
            addEventListener: noop,
            removeEventListener: noop,
        } as unknown as EventTarget;

        afterEach(() => {
            resetStub();
        });

        afterAll(() => {
            removeStub([addEventListenerStub, removeEventListenerStub]);
        });

        it('Should call addEventListener to assign listener', () => {
            addEventListenerStub = stubMethod('addEventListener', document);

            onEvent(document, POINTERDOWN, handler);

            verifyCall(addEventListenerStub, {
                args: [POINTERDOWN, handler],
            });
        });

        it('Should call addEventListener to assign and remove listener', () => {
            addEventListenerStub = stubMethod('addEventListener', document);
            removeEventListenerStub = stubMethod('removeEventListener', document);

            onEvent(document, POINTERDOWN, handler);
            offEvent(document, POINTERDOWN, handler);

            verifyCall(removeEventListenerStub, {
                args: [POINTERDOWN, handler],
            });
        });

        it('Should call addEventListener to assign listener on custom object', () => {
            addEventListenerStub = stubMethod('addEventListener', OBJECT_STUB);

            onEvent(OBJECT_STUB, RESIZE, handler);

            verifyCall(addEventListenerStub, {
                args: [RESIZE, handler],
            });
        });

        it('Should call addEventListener to assign and remove listener on custom object', () => {
            removeEventListenerStub = stubMethod('removeEventListener', OBJECT_STUB);

            onEvent(OBJECT_STUB, RESIZE, handler);
            offEvent(OBJECT_STUB, RESIZE, handler);

            verifyCall(removeEventListenerStub, {
                args: [RESIZE, handler],
            });
        });
    });
});
