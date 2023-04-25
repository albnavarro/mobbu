import { createProps } from '../../../baseComponent/mainStore/actions/props';

export const Legend = ({ onMount, render, props, setState, watch }) => {
    onMount(({ element }) => {
        const toggleBtn = element.querySelector('.js-legend-toggle');
        const overlay = element.querySelector('.js-legend-overlay');

        toggleBtn.addEventListener('click', () => {
            setState('isOpen', (val) => !val);
        });

        overlay.addEventListener('click', () => {
            setState('isOpen', false);
        });

        const unwatch = watch('isOpen', (isOpen) => {
            if (isOpen) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });

        return () => {
            unwatch();
        };
    });

    const { title, description, type, source } = props;
    return render(/* HTML */ `
        <div>
            <button
                type="button"
                class="c-legend__btn js-legend-toggle"
            ></button>
            <CodeButton
                data-props="${createProps({
                    js: source.js,
                    scss: source.scss,
                    html: source.html,
                    style: 'legend',
                })}"
            >
            </CodeButton>
            <button
                type="button"
                class="c-legend__overlay js-legend-overlay"
            ></button>
            <div class="c-legend">
                <div class="c-legend__wrap js-legend-wrap">
                    <h3 class="c-legend__title js-legend-title">${title}</h3>
                    <h4 class="c-legend__type js-legend-type">
                        Type: <span class="fw-400">${type}</span>
                    </h4>
                    <p class="c-legend__description js-legend-description">
                        ${description}
                    </p>
                    <div class="c-legend__code js-legend-code"></div>
                </div>
            </div>
        </div>
    `);
};
