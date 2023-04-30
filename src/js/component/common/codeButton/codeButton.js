import { setStateById } from '../../../baseComponent/componentStore/action/state';
import codeIcon from '../../../../svg/icon-code.svg';

/**
 * Create component
 */
export const CodeButton = ({ props, render, onMount }) => {
    const { style, description, js, scss, html } = props;

    onMount(({ element }) => {
        element.addEventListener('click', () => {
            const overlayCode = document.querySelector('.js-overlay');
            setStateById(overlayCode.id, 'description', description);
            setStateById(overlayCode.id, 'js', js);
            setStateById(overlayCode.id, 'scss', scss);
            setStateById(overlayCode.id, 'html', html);
            setStateById(overlayCode.id, 'activeContent', 'description');
            setStateById(overlayCode.id, 'isOpen', true);
        });

        return () => {
            element.remove();
        };
    });

    return render(/* HTML */ `
        <button class="c-code-btn c-code-btn--${style}">
            <span class="c-code-btn__icon">${codeIcon}</span>
        </button>
    `);
};
