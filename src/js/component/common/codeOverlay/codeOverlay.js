import { createProps } from '../../../baseComponent/mainStore/actions/props';

const getButtons = ({ contents, setState }) => {
    return contents
        .map((key) => {
            return /*HTML*/ `<CodeOverlayButton data-props="${createProps({
                key,
                callback: () => {
                    setState('activeContent', key);
                },
            })}"></CodeOverlayButton>`;
        })
        .join('');
};

const printContent = ({ getState, contentEl, currentUrl }) => {
    const states = getState();

    // Arrivera un url per fare il fetch async awwait e print il fetch
    // url in states[currentUrl]
    contentEl.textContent = states[currentUrl];
};

export const CodeOverlay = ({
    render,
    onMount,
    props,
    setState,
    getState,
    watch,
}) => {
    const { contents } = props;

    onMount(({ element }) => {
        const contentEl = element.querySelector('.js-overlay-content');
        const closebtn = element.querySelector('.js-overlay-close');
        const background = element.querySelector('.js-overlay-background');

        /**
         * Print default content (js)
         */
        const { activeContent } = getState();
        printContent({ getState, contentEl, currentUrl: activeContent });

        /**
         * Watch content change, and update content.
         */
        const unWatchActiveContent = watch('activeContent', (currentUrl) =>
            printContent({ getState, contentEl, currentUrl })
        );

        /**
         * Close overlay.
         */
        closebtn.addEventListener('click', () => setState('isOpen', false));
        background.addEventListener('click', () => setState('isOpen', false));

        /**
         * Toggle visible state.
         */
        const unWatchVisibleState = watch('isOpen', (isOpen) => {
            if (isOpen) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
                contentEl.textContent = '';
            }
        });

        return () => {
            unWatchVisibleState();
            unWatchActiveContent();
        };
    });

    return render(/* HTML */ `
        <div class="code-overlay js-overlay">
            <span class="code-overlay__background js-overlay-background"></span>
            <div class="code-overlay__wrap js-overlay-wrap">
                <div class="code-overlay__header">
                    <button
                        type="button"
                        class="code-overlay__close js-overlay-close"
                    ></button>
                    ${getButtons({ contents, setState })}
                </div>
                <div class="code-overlay__content js-overlay-content"></div>
            </div>
        </div>
    `);
};
