import { staticProps } from '../../../mobjs';

export const horizontalScrollerV2 = () => {
    return /* HTML */ `<div>
        <HorizontalScroller
            ${staticProps({ animatePin: true })}
        ></HorizontalScroller>
    </div>`;
};
