import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').PageAsync} */
export const benchMark = async ({ props }) => {
    const { rootComponent } = props;

    return htmlObject({
        tag: rootComponent,
    });
};
