import { htmlObject } from '@mobJs';

/**
 * @import {
 *   GetRef,
 *   MobComponent,
 *   ProxiSelfState
 * } from '@mobJsType'
 */

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').DetailOffcanvasType>} params.proxi
 * @param {GetRef<import('./type').DetailOffcanvasType>} params.getRef
 */
const closeOverlay = ({ proxi, getRef }) => {
    proxi.active = false;
    getRef().dialog.close();
};

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').DetailOffcanvasType>} params.proxi
 * @param {GetRef<import('./type').DetailOffcanvasType>} params.getRef
 */
const openOverlay = ({ proxi, getRef }) => {
    proxi.active = true;
    getRef().dialog.showModal();
};

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').DetailOffcanvasType>} params.proxi
 * @param {GetRef<import('./type').DetailOffcanvasType>} params.getRef
 */
function backDropHandler({ proxi, getRef }) {
    return function onBackDrop(/** @type {MouseEvent} */ event) {
        if (event.target === getRef().dialog) {
            closeOverlay({ getRef, proxi });
        }
    };
}

/** @type {MobComponent<import('./type').DetailOffcanvasType>} */
export const DetailOffCanvasFn = ({
    delegateEvents,
    setRef,
    getRef,
    onMount,
    getSelfProxi,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
        const onBackDropSubscriber = backDropHandler({ proxi, getRef });
        getRef().dialog.addEventListener('click', onBackDropSubscriber);

        return () => {
            getRef().dialog.removeEventListener('click', onBackDropSubscriber);
        };
    });

    return htmlObject({
        className: 'c-detail-offcanvas',
        attributes: {
            id: 'detail-control',
            'aria-label': 'Detail controls',
        },
        content: [
            {
                tag: 'button',
                className: 'open',
                attributes: {
                    type: 'button',
                    'aria-controls': 'detail-control',
                    'aria-haspopup': 'dialog',
                },
                modules: delegateEvents({
                    click: () => {
                        openOverlay({ getRef, proxi });
                    },
                }),
                content: 'detail controls:',
            },
            {
                tag: 'dialog',
                modules: setRef('dialog'),
                content: {
                    className: 'container',
                    content: [
                        {
                            tag: 'button',
                            className: 'close',
                            attributes: {
                                type: 'button',
                                'aria-label': 'close detail dialog',
                            },
                            modules: delegateEvents({
                                click: () => {
                                    closeOverlay({ getRef, proxi });
                                },
                            }),
                        },
                        {
                            tag: 'mobjs-slot',
                        },
                    ],
                },
            },
        ],
    });
};
