import { createProps } from '../../../baseComponent/mainStore/actions/props';
import { caterpillarSvgTimeline } from './animation/caterpillarSvgTimeline';

function createPath({
    amountOfPath,
    rx,
    opacity,
    xScale,
    yScale,
    fill,
    stroke,
}) {
    return [...Array(amountOfPath).keys()]
        .map((_item, i) => {
            const relativeIndex =
                i >= amountOfPath / 2
                    ? amountOfPath / 2 + (amountOfPath / 2 - i)
                    : i;

            const opacityParsed = relativeIndex * opacity;
            const unitInverse = amountOfPath - i;
            const width = `${unitInverse * xScale * i}px`;
            const height = `${unitInverse * yScale * i}px`;

            return /* HTML */ `<g id="group-${i}">
                <rect
                    rx="${rx}"
                    fill="${fill}"
                    stroke="${stroke}"
                    stroke-width="0.15"
                    stroke-opacity="${opacityParsed}"
                    fill-opacity="${opacityParsed}"
                    width="${width}"
                    height="${height}"
                >
                </rect>
            </g>`;
        })
        .join('');
}

export const CaterpillarSvg = ({ onMount, render, props }) => {
    const {
        amountOfPath,
        rx,
        fill,
        stroke,
        viewBox,
        xScale,
        yScale,
        xOffset,
        yOffset,
        xOrigin,
        yOrigin,
        opacity,
        duration,
    } = props;

    onMount(({ element }) => {
        const svg = element.querySelector('svg');
        const rect = element.querySelectorAll('rect');
        const destroyAnimation = caterpillarSvgTimeline({
            svg,
            rect,
            xOffset,
            yOffset,
            xOrigin,
            yOrigin,
            opacity,
            duration,
        });

        return () => {
            destroyAnimation();
        };
    });

    return render(/* HTML */ `
        <div class="caterpillar-svg">
            <CaterpillarSvgInteraction
                data-props="${createProps({ amountOfPath })}"
            ></CaterpillarSvgInteraction>
            <svg
                class="caterpillar-svg__svg"
                viewBox="0 0 ${viewBox} ${viewBox}"
            >
                ${createPath({
                    amountOfPath,
                    rx,
                    opacity,
                    xScale,
                    yScale,
                    fill,
                    stroke,
                })}
            </svg>
        </div>
    `);
};
