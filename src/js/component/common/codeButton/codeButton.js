import { setStateById } from '../../../baseComponent/componentStore/action/state';

/**
 * Create component
 */
export const CodeButton = ({ props, render, onMount }) => {
    const { style, js, scss, html } = props;

    onMount(({ element }) => {
        element.addEventListener('click', () => {
            const overlayCode = document.querySelector('.js-overlay');
            setStateById(overlayCode.id, 'js', js);
            setStateById(overlayCode.id, 'scss', scss);
            setStateById(overlayCode.id, 'html', html);
            setStateById(overlayCode.id, 'activeContent', 'js');
            setStateById(overlayCode.id, 'isOpen', true);
        });

        return () => {
            element.remove();
        };
    });

    return render(
        /* HTML */ ` <button class="c-code-btn c-code-btn--${style}"></button> `
    );
};
