import {
    componentStore,
    setStateById,
    getParentIdById,
    getPropsById,
} from '../../baseComponent/componentStore';
import { createProps, mainStore } from '../../baseComponent/mainStore';

/**
 * On click function.
 */
function onClick(event) {
    const target = event.currentTarget;
    const id = target.id;

    /**
     * TEST !
     */
    console.log('click parentId:', getParentIdById(id));
    setStateById(id, 'stato1', (prev) => prev + 1);
    console.log('-----');
    console.log('Debug main componentStore:');
    componentStore.debugStore();
    console.log('Debug props mainStore:');
    mainStore.debugStore();
    console.log('-----');
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

function utilsTest({
    props,
    setState,
    getState,
    watch,
    getParentId,
    getPropsById,
}) {
    const { test } = props;
    console.log('props', test);
    setState('stato1', 20);
    const { stato1: stato1Test } = getState();
    console.log('init stato1 after setState:', stato1Test);
    watch('stato1', (newVal, oldVal) => {
        console.log('watch print stato1', newVal, oldVal);

        const parentId = getParentId();
        console.log('watch print parentId', parentId);

        const parentProps = getPropsById(parentId);
        console.log('watch print parent props', parentProps);
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
    element,
    onDestroy,
    id,
    getParentId,
    props,
    getState,
    setState,
    watch,
    render,
}) => {
    utilsTest({
        props,
        setState,
        getState,
        watch,
        getParentId,
        getPropsById,
    });

    addHandler({ element });

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
        <span>${test}</span>
        <component data-props="${childProps}" data-cancellable data-component="TestComponent2"/>
    `);
};
