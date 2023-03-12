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
function destroyComponent({ idClass }) {
    const button = document.querySelector(`.${idClass}`);
    if (!button) return;

    button.removeEventListener('click', onClick);
    button.remove();
}

/**
 * Create component
 */
export const createCodeButton = ({ component = null }) => {
    if (!component) return;

    const { element, idClass, props, id } = componentInizialiazator({
        component,
        className: 'c-code-btn',
        content: '<span><></span>',
        type: 'button',
    });

    addComponentToStore({
        element,
        props,
        destroy: () => destroyComponent({ idClass }),
        isCancellable: component.hasAttribute('data-cancellable'),
        id,
    });

    addHandler({ element });
};
