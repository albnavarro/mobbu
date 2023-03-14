import {
    componentStore,
    setStateById,
    getParentIdById,
    getPropsById,
} from '../../baseComponent/componentStore';
import { createComponent } from '../../baseComponent/componentCreate';
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
    getProps,
    setState,
    getState,
    watch,
    getParentId,
    getPropsById,
}) {
    const { test } = getProps();
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

/**
 * Create component
 */
export const createTestComponent = ({ component = null }) => {
    if (!component) return;

    const {
        element,
        render,
        destroy,
        id,
        getParentId,
        getProps,
        getState,
        setState,
        watch,
    } = createComponent({
        component,
        className: ['c-test-comp'],
        type: 'button',
        state: {
            stato1: () => ({
                value: 0,
                type: Number,
            }),
            stato2: () => ({
                value: 0,
                type: Number,
            }),
        },
    });

    utilsTest({
        getProps,
        setState,
        getState,
        watch,
        getParentId,
        getPropsById,
    });

    addHandler({ element });

    const { test } = getProps();
    const childProps = createProps({
        jsProps: () => {
            const { stato1 } = getState();
            return stato1;
        },
    });

    render(`
        <span>${test}</span>
        <component data-props="${childProps}" data-component="test_component_2">
        </component>
    `);
    destroy(() => destroyComponent({ id }));
};
