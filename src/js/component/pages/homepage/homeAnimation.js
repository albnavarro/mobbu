import { createProps } from '../../../baseComponent/mainStore/actions/props';
import { createCaterpillarAnimation } from './animation/caterpillarAnimation';

function createPath({ amountOfPath, rx }) {
    return [...Array(amountOfPath).keys()]
        .map((_item, i) => {
            const relativeIndex =
                i >= amountOfPath / 2
                    ? amountOfPath / 2 + (amountOfPath / 2 - i)
                    : i;

            const opacity = relativeIndex * 0.06;

            return `<g id="group-${i}"><rect rx="${rx}" opacity="${opacity}"></rect></g>`;
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
            <HomeContent> </HomeContent>
            <svg class="l-index__svg" viewBox="0 0 ${viewBox} ${viewBox}">
                ${createPath({ amountOfPath, rx })}
            </svg>
        </div>
    `);
};
