import { setStateById } from '../../baseComponent/componentStore/action';
import { createProps } from '../../baseComponent/mainStore';

/**
 * On click function.
 */
function onClick(event) {
    const target = event.currentTarget;
    const id = target.id;
    setStateById(id, 'stato1', (prev) => prev + 1);
}

/**
 * Add handler.
 */
function addHandler({ element }) {
    element.addEventListener('click', onClick);
}

/**
 * Destroy function.
 */
function destroyComponent({ id }) {
    const element = document.querySelector(`[data-id=${id}]`);
    if (!element) return;

    element.removeEventListener('click', onClick);
    element.remove();
}

function utilsTest({ props, setState, getState, watch }) {
    const { test } = props;
    console.log('props', test);
    setState('stato1', 20);
    const { stato1: stato1Test } = getState();
    console.log('init stato1 after setState:', stato1Test);
    watch('stato1', (newVal, oldVal) => {
        console.log('watch print stato1', newVal, oldVal);
    });
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
    onDestroy,
    id,
    props,
    getState,
    setState,
    watch,
    render,
    onMount,
}) => {
    utilsTest({
        props,
        setState,
        getState,
        watch,
    });

    onMount(({ element }) => {
        addHandler({ element });
    });

    const { test } = props;
    const childProps = createProps({
        jsProps: () => {
            const { stato1 } = getState();
            return stato1;
        },
    });

    onDestroy(() => destroyComponent({ id }));

    await asyncTest();

    return render(`
        <button class="c-test-comp">
            <span>${test}</span>
            <component data-props="${childProps}" data-cancellable data-component="TestComponent2">
        </button>
    `);
};
