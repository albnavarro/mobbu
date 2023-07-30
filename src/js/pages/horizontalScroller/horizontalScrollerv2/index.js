import { createProps } from '../../../mobjs';

export const horizontalScrollerModuleV2 = () => {
    return /* HTML */ `<div>
        <HorizontalScroller
            data-props="${createProps({
                animatePin: true,
            })}"
            data-cancellable
        ></HorizontalScroller>
    </div>`;
};
