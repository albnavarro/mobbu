import { setStateById } from '../../baseComponent/componentStore/action';
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

function asyncTest() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
}

function addChildren({ children, getState }) {
    return children
        .map((_child, i) => {
            const childProps = createProps({
                valueFromParent: () => {
                    const { counter } = getState();
                    return counter * i;
                },
            });

            return `
                 <component data-props="${childProps}" data-cancellable data-component="TestComponent2">
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
    watch,
    render,
    onMount,
}) => {
    onMount(({ element }) => {
        const incrementBtn = element.querySelector('.increment');
        const decrementBtn = element.querySelector('.decrement');
        const counterEl = element.querySelector('.counter');
        const unwatch = watch('counter', (val) => {
            counterEl.innerHTML = val;
        });

        incrementBtn.addEventListener('click', increment);
        decrementBtn.addEventListener('click', decrement);

        return () => {
            unwatch();
            incrementBtn.removeEventListener('click', increment);
            decrementBtn.removeEventListener('click', decrement);
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
            </div>
            ${addChildren({ children: childArray, getState })}
        </div>
    `);
};
