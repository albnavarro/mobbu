import {
    // getElementById,
    setStateById,
} from '../../baseComponent/componentStore/action';
import { componentStore } from '../../baseComponent/componentStore/store';
import { createProps } from '../../baseComponent/mainStore';

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

function addChildren({ children, getState }) {
    return children
        .map((_child, i) => {
            const { counter } = getState();
            const childProps = createProps({
                valueFromParent: counter * i,
            });

            return `
                 <component data-props="${childProps}" data-cancellable data-component="TestComponent2"/>
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
    getChildren,
    watch,
    render,
    onMount,
}) => {
    onMount(({ element }) => {
        const incrementBtn = element.querySelector('.increment');
        const decrementBtn = element.querySelector('.decrement');
        const debugBtn = element.querySelector('.debug');
        const childrenBtn = element.querySelector('.children');
        const counterEl = element.querySelector('.counter');

        /**
         * Watch state mutation.
         */
        const unwatch = watch('counter', (val) => {
            counterEl.innerHTML = val;
            getChildren('TestComponent2').forEach((id, i) => {
                setStateById(id, 'counter', val * i);
            });
        });

        incrementBtn.addEventListener('click', increment);
        decrementBtn.addEventListener('click', decrement);
        debugBtn.addEventListener('click', debug);
        childrenBtn.addEventListener('click', () => logChildren(getChildren));

        return () => {
            unwatch();
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
    const { childNumbers, counter } = getState();

    // test array
    const childArray = [...Array(childNumbers).keys()];

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
                <button class="c-test-comp__btn debug">
                    debug
                </button>
                <button class="c-test-comp__btn children">
                    Children
                </button>
            </div>
            ${addChildren({ children: childArray, getState })}
        </div>
    `);
};
