import { createProps } from '../../../baseComponent/mainStore/actions/props';

const createChildren = ({ amountOfPath }) => {
    return [...Array(amountOfPath).keys()]
        .map((_item, index) => {
            return `<CaterpillarSvgInteractionItem data-props="${createProps({
                index,
            })}"></CaterpillarSvgInteractionItem>`;
        })
        .join('');
};

export const CaterpillarSvgInteraction = ({ render, props }) => {
    const { amountOfPath } = props;

    return render(/* HTML */ `
        <div class="caterpillar-svg__interaction">
            ${createChildren({ amountOfPath })}
        </div>
    `);
};
