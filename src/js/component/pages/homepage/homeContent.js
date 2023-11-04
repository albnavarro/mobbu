import { tween } from '../../../mobMotion';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HomeContent = ({ onMount, html }) => {
    onMount(({ refs }) => {
        const { title } = refs;

        let contentTween = tween.createTween({
            data: { opacity: 0, scale: 1.1 },
            stagger: { each: 4 },
            duration: 500,
            ease: 'easeOutQuad',
        });

        [title].forEach((item) => {
            contentTween.subscribe(({ opacity, scale }) => {
                item.style.opacity = opacity;
                item.style.transform = `scale(${scale}) translateZ(1px)`;
            });
        });

        contentTween.goTo({ opacity: 1, scale: 1 });

        return () => {
            contentTween.destroy();
            contentTween = null;
        };
    });

    return html`
        <div class="l-index__content">
            <h1 class="l-index__title" ref="title">Lorem ipsum</h1>
        </div>
    `;
};
