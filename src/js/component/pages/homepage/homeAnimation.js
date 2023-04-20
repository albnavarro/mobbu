import { createProps } from '../../../baseComponent/mainStore/actions/props';
import { createCaterpillarAnimation } from './animation/caterpillarAnimation';

function createPath({ amountOfPath, rx, opacity }) {
    return [...Array(amountOfPath).keys()]
        .map((_item, i) => {
            const relativeIndex =
                i >= amountOfPath / 2
                    ? amountOfPath / 2 + (amountOfPath / 2 - i)
                    : i;

            const opacityParsed = relativeIndex * opacity;

            return `<g id="group-${i}"><rect rx="${rx}" stroke-opacity="${opacityParsed}" fill-opacity="${opacityParsed}"></rect></g>`;
        })
        .join('');
}

export const HomeAnimation = ({ onMount, render, props }) => {
    const {
        amountOfPath,
        rx,
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
        const rect = element.querySelectorAll('rect');
        const destroyAnimation = createCaterpillarAnimation({
            rect,
            xScale,
            yScale,
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
        <div>
            <HomeInteraction
                data-props="${createProps({ amountOfPath })}"
            ></HomeInteraction>
            <svg class="l-index__svg" viewBox="0 0 ${viewBox} ${viewBox}">
                ${createPath({ amountOfPath, rx, opacity })}
            </svg>
        </div>
    `);
};
