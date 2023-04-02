import { componentStore } from '../../baseComponent/componentStore/store';
import { createProps } from '../../baseComponent/mainStore/actions/props';
import { addedData, originalData, removeData } from './data';

function logChildren(getChildren) {
    console.log(getChildren('TestComponent2'));
}

function debug() {
    componentStore.debugStore();
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
        const debugBtn = element.querySelector('.debug');
        const childrenBtn = element.querySelector('.children');
        const addEl = element.querySelector('.add');
        const removeEl = element.querySelector('.remove');
        setState('data', originalData);

        debugBtn.addEventListener('click', debug);
        childrenBtn.addEventListener('click', () => logChildren(getChildren));
        addEl.addEventListener('click', () => setState('data', addedData));
        removeEl.addEventListener('click', () => setState('data', removeData));

        return () => {
            debugBtn.removeEventListener('click', debug);
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
                <button class="c-test-comp__btn remove">remove</button>
            </div>
            <div class="c-test-comp__top">
                <button class="c-test-comp__btn debug">debug</button>
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
                    props: ({ current }) => {
                        return { label: () => current.label };
                    },
                    updateState: ({ index, setChildState }) => {
                        setChildState('index', index);
                    },
                    // onComplete: ({ container, childrenId }) => {
                    //     console.log(`complete update`, container, childrenId);
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
                    // onComplete: ({ container, childrenId }) => {
                    //     console.log(`complete update`, container, childrenId);
                    // },
                })}
            </div>
            <TestComponent2
                data-props="${createProps({
                    label: () => `outer list el down`,
                })}"
            ></TestComponent2>
        </div>
    `);
};
