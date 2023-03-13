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
    const element = document.querySelector(`[data-id=${id}]`);
    if (!element) return;

    element.removeEventListener('click', onClick);
    element.remove();
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

    addHandler({ element });

    addComponentToStore({
        component,
        element,
        props,
        destroy: () => destroyComponent({ id }),
        id,
    });
};
