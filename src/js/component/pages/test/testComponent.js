import { createProps } from '../../../mobjs';
import { addedData, addedData2, originalData, removeData } from './data';

function logChildren(getChildren) {
    console.log(getChildren('TestComponent2'));
}

function asyncTest() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const TestComponent = async ({
    getState,
    setState,
    getChildren,
    render,
    onMount,
    repeat,
}) => {
    onMount(({ element }) => {
        const childrenBtn = element.querySelector('.children');
        const addEl = element.querySelector('.add');
        const addEl2 = element.querySelector('.add2');
        const removeEl = element.querySelector('.remove');
        setState('data', originalData);

        childrenBtn.addEventListener('click', () => logChildren(getChildren));
        addEl.addEventListener('click', () => setState('data', addedData));
        addEl2.addEventListener('click', () => setState('data', addedData2));
        removeEl.addEventListener('click', () => setState('data', removeData));

        return () => {
            element.remove();
        };
    });

    /**
     * Async test
     */
    await asyncTest();

    return render(/* HTML */ `
        <div class="c-test-comp">
            <div class="c-test-comp__label">
                <span>${getState().title}:</span>
            </div>
            <div class="c-test-comp__top">
                <button class="c-test-comp__btn add">add</button>
                <button class="c-test-comp__btn add2">add2</button>
                <button class="c-test-comp__btn remove">remove</button>
            </div>
            <div class="c-test-comp__top">
                <button class="c-test-comp__btn children">Children</button>
            </div>
            <TestComponent2
                data-props="${createProps({
                    label: `outer list el up`,
                })}"
            ></TestComponent2>
            <div class="c-test-comp__list">
                ${repeat({
                    watch: 'data',
                    key: 'key',
                    component: 'TestComponent2',
                    props: ({ current, index }) => {
                        const { label } = current;
                        return { label, index };
                    },
                    // beforeUpdate: ({ container, childrenId }) => {
                    //     console.log(
                    //         `before update: ${(container, childrenId)}`
                    //     );
                    // },
                    // afterUpdate: ({ container, childrenId }) => {
                    //     console.log(`after update: ${(container, childrenId)}`);
                    // },
                })}
            </div>
            <div class="c-test-comp__list">
                ${repeat({
                    watch: 'data',
                    key: 'key',
                    component: 'TestComponent2',
                    props: ({ current, index }) => {
                        const { label } = current;
                        return { label, index };
                    },
                    // beforeUpdate: ({ container, childrenId }) => {
                    //     console.log(
                    //         `before update: ${(container, childrenId)}`
                    //     );
                    // },
                    // afterUpdate: ({ container, childrenId }) => {
                    //     console.log(`after update: ${(container, childrenId)}`);
                    // },
                })}
            </div>
            <TestComponent2
                data-props="${createProps({
                    label: `outer list el down`,
                })}"
            >
                <div data-slotposition="slot1"><span>slot1</span></div>
                <Codebutton
                    data-slotposition="slot2"
                    data-props="${createProps({
                        drawers: {
                            js: 'test-js',
                            scss: 'test-scss',
                            component: 'test-html',
                        },
                        style: 'primary',
                    })}"
                >
                </Codebutton>
            </TestComponent2>
        </div>
    `);
};
