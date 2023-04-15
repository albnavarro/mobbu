import { getPropsById } from '../../../baseComponent/componentStore/action/props';

/**
 * On click function.
 */
function onClick(event) {
    const target = event.currentTarget;
    const id = target.id;
    const props = getPropsById(id);
    const { js, scss, html, slotProps } = props;

    console.log('props', js, scss, html, slotProps);
}

/**
 * Create component
 */
export const CodeButton = ({ props, render, onMount }) => {
    const { style } = props;

    onMount(({ element }) => {
        element.addEventListener('click', onClick);

        return () => {
            element.removeEventListener('click', onClick);
            element.remove();
        };
    });

    return render(
        /* HTML */ ` <button class="c-code-btn c-code-btn--${style}"></button> `
    );
};
