import { getPropsById } from '../../baseComponent/componentStore';
import { createComponent } from '../../baseComponent/componentCreate';

/**
 * On click function.
 */
function onClick(event) {
    const target = event.currentTarget;
    const id = target.id;
    const props = getPropsById(id);
    const { js, scss, html } = props;
    console.log('props', js, scss, html);
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
    const element = document.querySelector(`#${id}`);
    if (!element) return;

    element.removeEventListener('click', onClick);
    element.remove();
}

function addStyle({ style, element }) {
    const className = {
        primary: 'c-code-btn--primary',
    };

    element.classList.add(className?.[style]);
}

/**
 * Create component
 */
export const createCodeButton = async ({ component = null }) => {
    if (!component) return;

    const { id, destroy, getProps, element, render } = await createComponent({
        component,
        className: ['c-code-btn'],
        type: 'button',
    });

    const { style } = getProps();
    addStyle({ style, element });
    addHandler({ element });
    destroy(() => destroyComponent({ id }));

    await render(`
        <span><></span>
    `);
};
