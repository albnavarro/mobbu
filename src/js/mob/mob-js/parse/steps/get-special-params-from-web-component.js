/**
 * Create base DOM component from component tag.
 *
 * @param {object} obj
 * @param {import('../../web-component/type').UserComponent} obj.element
 * @param {boolean} obj.shouldBeComponent
 * @returns {Pick<import('./type').ComponentData, 'bindEffectInstanceId'>}
 */
export const getParamsFromCustomComponent = ({
    element,
    shouldBeComponent,
}) => {
    const bindEffectInstanceId = shouldBeComponent
        ? element.getBindEffectInstance()
        : undefined;

    return {
        bindEffectInstanceId,
    };
};
