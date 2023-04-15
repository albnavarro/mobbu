import { createProps } from '../../../baseComponent/mainStore/actions/props';
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
 * Create component
 */
export const TestComponent = async ({
    props,
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
                <span>${props.title}:</span>
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
                    label: () => `outer list el up`,
                })}"
            ></TestComponent2>
            <div class="c-test-comp__list">
                ${repeat({
                    watch: 'data',
                    component: 'TestComponent2',
                    key: 'label',
                    // eslint-disable-next-line no-unused-vars
                    props: ({ current, index }) => {
                        // console.log(index);
                        return { label: () => current.label };
                    },
                    // eslint-disable-next-line no-unused-vars
                    updateState: ({ current, index, setChildState }) => {
                        // console.log(current);
                        setChildState('index', index);
                    },
                    // beforeUpdate: ({ container, childrenId }) => {
                    //     console.log(`before update`);
                    // },
                    // afterUpdate: ({ container, childrenId }) => {
                    //     console.log(`after update`);
                    // },
                })}
            </div>
            <div class="c-test-comp__list">
                ${repeat({
                    watch: 'data',
                    component: 'TestComponent2',
                    key: 'label',
                    props: ({ current }) => {
                        return { label: () => `${current.label}2` };
                    },
                    updateState: ({ index, setChildState }) => {
                        setChildState('index', index + 1);
                    },
                    // beforeUpdate: ({ container, childrenId }) => {
                    //     console.log(`before update`);
                    // },
                    // afterUpdate: ({ container, childrenId }) => {
                    //     console.log(`after update`);
                    // },
                })}
            </div>
            <TestComponent2
                data-props="${createProps({
                    label: () => `outer list el down`,
                })}"
            >
                <div data-slotposition="slot1"><span>slot1</span></div>
                <Codebutton
                    data-slotposition="slot2"
                    data-props="${createProps({
                        js: 'test-js',
                        scss: 'test-scss',
                        html: 'test-html',
                        style: 'primary',
                    })}"
                >
                    slot
                </Codebutton>
            </TestComponent2>
        </div>
    `);
};
