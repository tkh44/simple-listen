import listen from '../lib/index';
import { expect } from 'code';


const createElement = (name) => {

    const element = {
        name,
        _added: [],
        _removed: [],
        addEventListener: (type, handler) => {

            element._added.push({ type, handler});
        },
        removeEventListener: (type) => {

            element._added = element._added.filter((storedHandler) => storedHandler.type !== type);
            element._removed.push(type);
        },
        fireEvent: (type) => {

            element._added.filter((storedHandler) => storedHandler.type === type).forEach((stored) => {

                stored.handler({ type: stored.type });
            })
        }
    };

    return element;
};


describe('listen', () => {
    it('listen exists', () => {

        expect(listen).to.exist();
    });

    it('attaches and removes listener', () => {

        const element = createElement('add-test');
        let handlerCalledCount = 0;
        var handler = (e) => {

            expect(e.type).to.equal('mouseup');
            ++handlerCalledCount;
        };

        const elementListener = listen(element, 'mouseup', handler);
        expect(element._added).to.have.length(1);
        const eventType = element._added[0].type;
        expect(eventType).to.equal('mouseup');
        element.fireEvent(eventType);
        expect(handlerCalledCount).to.equal(1);
        elementListener();

        expect(element._added).to.have.length(0);
        element.fireEvent(eventType);
        expect(handlerCalledCount).to.equal(1);
    });


    it('attaches and removes multiple listeners', () => {

        const element = createElement('add-test');
        let handlerCalledCount = 0;
        var handler = (e) => {

            (handlerCalledCount === 0 ?
                expect(e.type).to.equal('mouseup') :
                expect(e.type).to.equal('keyup'));

            ++handlerCalledCount;
        };

        const elementListener = listen(element, 'mouseup keyup', handler);
        expect(element._added).to.have.length(2);
        const eventType1 = element._added[0].type;
        const eventType2 = element._added[1].type;

        expect(eventType1).to.equal('mouseup');
        expect(eventType2).to.equal('keyup');
        element.fireEvent(eventType1);
        element.fireEvent(eventType2);
        expect(handlerCalledCount).to.equal(2);
        elementListener();

        expect(element._added).to.have.length(0);
        element.fireEvent(eventType1);
        element.fireEvent(eventType2);
        expect(handlerCalledCount).to.equal(2);
    });
});
