import { getPropsById } from '../../baseComponent/componentStore/action/props';

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

function addStyle({ style, element }) {
    const className = {
        primary: 'c-code-btn--primary',
    };

    element.classList.add(className?.[style]);
}

/**
 * Create component
 */
export const CodeButton = ({ props, render, onMount }) => {
    onMount(({ element }) => {
        const { style } = props;
        addStyle({ style, element });
        element.addEventListener('click', onClick);

        return () => {
            element.removeEventListener('click', onClick);
            element.remove();
        };
    });

    return render(/* HTML */ `
        <button class="c-code-btn">
            <span><></span>
        </button>
    `);
};
