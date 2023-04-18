import { createCaterpillarAnimation } from './animation/caterpillarAnimation';

function createPath({ amountOfPath, rx }) {
    return [...Array(amountOfPath).keys()]
        .map(() => {
            return `<rect stroke="url(#gradient)" rx="${rx}" ></rect>`;
        })
        .join('');
}

export const HomeAnimation = ({ onMount, render, props }) => {
    const { amountOfPath, rx, viewBox, startColor, endColor, multiplier } =
        props;

    onMount(({ element }) => {
        const rect = element.querySelectorAll('rect');
        const destroyAnimation = createCaterpillarAnimation({
            rect,
            multiplier,
        });

        return () => {
            destroyAnimation();
        };
    });

    return render(/* HTML */ `
        <svg class="l-index__svg" viewBox="0 0 ${viewBox} ${viewBox}">
            <lineargradient id="gradient">
                <stop offset="0%" stop-color="${startColor}"></stop>
                <stop offset="100%" stop-color="${endColor}"></stop>
            </lineargradient>
            ${createPath({ amountOfPath, rx })}
        </svg>
    `);
};
