import { createProps } from '../../../baseComponent/mainStore/actions/props';
import { tween } from '../../../mobbu';

export const Legend = ({ onMount, render, props }) => {
    onMount(({ element }) => {
        const title = element.querySelector('.js-legend-title');
        const type = element.querySelector('.js-legend-type');
        const description = element.querySelector('.js-legend-description');
        const codeBtn = element.querySelector('.js-legend-code');

        let legendTween = tween.createTween({
            data: { opacity: 0, x: -200 },
            stagger: { each: 4 },
            duration: 1000,
            ease: 'easeOutQuad',
        });

        [title, type, description, codeBtn].forEach((item) => {
            legendTween.subscribe(({ opacity, x }) => {
                item.style.opacity = opacity;
                item.style.transform = `translateX(${x}px)`;
            });
        });

        legendTween.goTo({ opacity: 1, x: 0 });

        return () => {
            legendTween.destroy();
            legendTween = null;
        };
    });

    const { title, description, type, source } = props;
    return render(/* HTML */ `
        <div class="c-legend">
            <h2 class="c-legend__title js-legend-title">${title}</h2>
            <h4 class="c-legend__type js-legend-type">
                Type: <span class="fw-400">${type}</span>
            </h4>
            <p class="c-legend__description js-legend-description">
                ${description}
            </p>
            <div class="c-legend__code js-legend-code">
                <CodeButton
                    data-props="${createProps({
                        js: source.js,
                        scss: source.scss,
                        html: source.html,
                        style: 'green',
                    })}"
                >
                </CodeButton>
            </div>
        </div>
    `);
};
