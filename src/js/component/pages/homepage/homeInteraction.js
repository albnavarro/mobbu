import { createProps } from '../../../baseComponent/mainStore/actions/props';

const createAreas = ({ amountOfPath }) => {
    return [...Array(amountOfPath).keys()]
        .map((_item, index) => {
            return `<HomeInteractionItem data-props="${createProps({
                index,
            })}"></HomeInteractionItem>`;
        })
        .join('');
};

export const HomeInteraction = ({ render, props }) => {
    const { amountOfPath } = props;

    return render(/* HTML */ `
        <div class="l-index__interaction">${createAreas({ amountOfPath })}</div>
    `);
};
