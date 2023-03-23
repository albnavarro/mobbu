import {
    // getElementById,
    setStateById,
} from '../../baseComponent/componentStore/action';
import { componentStore } from '../../baseComponent/componentStore/store';
import { createProps } from '../../baseComponent/mainStore';
import { addedData, originalData, removeData } from './data';

/**
 * On click function.
 */
function increment(event) {
    const target = event.currentTarget;
    const root = target.closest('.c-test-comp');
    const id = root.id;
    setStateById(id, 'counter', (prev) => prev + 1);
}

function decrement(event) {
    const target = event.currentTarget;
    const root = target.closest('.c-test-comp');
    const id = root.id;
    setStateById(id, 'counter', (prev) => prev - 1);
}

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

// const childProps = createProps({
//     valueFromParent: () => {
//         const { counter } = getState();
//         return counter * i;
//     },
// });

function addChildren({ data, getState }) {
    return data
        .map(({ label }, i) => {
            const { counter } = getState();
            const childProps = createProps({
                valueFromParent: `${label}, ${counter * i}`,
            });

            return `
                 <component data-props="${childProps}" data-key="${label}" data-cancellable data-component="TestComponent2"/>
            `;
        })
        .join('');
}
/**
 * Create component
 */
export const TestComponent = async ({
    props,
    getState,
    setState,
    getChildren,
    watch,
    render,
    onMount,
    updateList,
}) => {
    onMount(({ element }) => {
        const incrementBtn = element.querySelector('.increment');
        const decrementBtn = element.querySelector('.decrement');
        const debugBtn = element.querySelector('.debug');
        const childrenBtn = element.querySelector('.children');
        const counterEl = element.querySelector('.counter');
        const addEl = element.querySelector('.add');
        // const removeEl = element.querySelector('.remove');

        /**
         * Watch state mutation.
         */
        const unwatch = watch('counter', (val) => {
            const { data } = getState();
            counterEl.innerHTML = val;

            getChildren('TestComponent2').forEach((id, i) => {
                const { label } = data[i];
                setStateById(id, 'label', `${label}, ${val * i}`);
            });
        });

        /**
         * Update List if there is new element
         */
        const unwatchList = updateList({
            state: 'data',
            targetState: 'label',
            containerList: element.querySelector('.c-test-comp__list'),
            targetComponent: 'TestComponent2',
            key: 'label',
            callback: ({ current, i }) => {
                const { label } = current[i];
                const { counter } = getState();
                return `${label}, ${counter * i}`;
            },
        });

        /**
         * Add listener
         */
        incrementBtn.addEventListener('click', increment);
        decrementBtn.addEventListener('click', decrement);
        debugBtn.addEventListener('click', debug);
        childrenBtn.addEventListener('click', () => logChildren(getChildren));
        addEl.addEventListener('click', () => setState('data', addedData));
        // removeEl.addEventListener('click', () => setState('data', removeData));

        return () => {
            unwatch();
            unwatchList();
            incrementBtn.removeEventListener('click', increment);
            decrementBtn.removeEventListener('click', decrement);
            debugBtn.removeEventListener('click', decrement);
            element.remove();
        };
    });

    /**
     * Async test
     */
    await asyncTest();

    /**
     * Get props
     */
    const { label } = props;
    setState('data', originalData);
    const { data, counter } = getState();

    // test array
    return render(`
        <div class="c-test-comp">
            <div class="c-test-comp__label">
                <span>${label} : </span>
                <span class="counter">${counter}</span>
            </div>
            <div class="c-test-comp__top">
                <button class="c-test-comp__btn decrement">
                    decrement
                </button>
                <button class="c-test-comp__btn increment">
                    increment
                </button>
            </div>
            <div class="c-test-comp__top">
                <button class="c-test-comp__btn add">
                    add
                </button>
                <button class="c-test-comp__btn remove">
                    remove
                </button>
            </div>
            <div class="c-test-comp__top">
                <button class="c-test-comp__btn debug">
                    debug
                </button>
                <button class="c-test-comp__btn children">
                    Children
                </button>
            </div>
            <div class="c-test-comp__list">
                ${addChildren({ data, getState })}
            </div>
        </div>
    `);
};
