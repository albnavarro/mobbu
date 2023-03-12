import {
    addComponentToStore,
    getPropsById,
} from '../../baseComponent/componentStore';
import { componentInizialiazator } from '../../baseComponent/componetInizizializator';

/**
 * On click function.
 */
function onClick(event) {
    const target = event.currentTarget;
    const { id } = target.dataset;
    const props = getPropsById({ id });
    const { js, scss, html } = props;
    console.log(js, scss, html);
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
    const button = document.querySelector(`[data-id=${id}]`);
    if (!button) return;

    button.removeEventListener('click', onClick);
    button.remove();
}

/**
 * Create component
 */
export const createCodeButton = ({ component = null }) => {
    if (!component) return;

    const { element, props, id } = componentInizialiazator({
        component,
        className: 'c-code-btn',
        content: '<span><></span>',
        type: 'button',
    });

    addComponentToStore({
        props,
        destroy: () => destroyComponent({ id }),
        isCancellable: component.hasAttribute('data-cancellable'),
        id,
    });

    addHandler({ element });
};
