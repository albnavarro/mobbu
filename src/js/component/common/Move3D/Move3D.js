//@ts-check

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { MobMotionCore, MobTween } from '@mobMotion';
import { Recursive3Dshape } from './partials/recursive3Dshape';
import { getChildrenMethod, getMove3DDimension } from './utils';

const NOOP = () => {};

/**
 * @import { MobComponent } from '../../../mob/mobjs/type';
 **/

/** @type {MobComponent<import('./type').Move3D>} */
export const Move3Dfn = ({
    onMount,
    setRef,
    getRef,
    watch,
    computed,
    invalidate,
    getProxi,
    bindEffect,
}) => {
    /**
     * base id for checlren instance
     */
    const childrenId = MobCore.getUnivoqueId();

    /**
     * State
     */
    const proxiState = getProxi();

    /**
     * Mutable scoped reference
     */
    let height = 0;
    let width = 0;
    let offSetLeft = 0;
    let offSetTop = 0;
    let lastX = 0;
    let dragX = 0;
    let lastY = 0;
    let dragY = 0;
    let onDrag = false;
    let firstDrag = false;
    let pageCoord = { x: 0, y: 0 };
    let lastScrolledTop = 0;
    let unsubscribeTouchStart = NOOP;
    let unsubscribeTouchEnd = NOOP;
    let unsubscribeTouchDown = NOOP;
    let unsubscribeTouchUp = NOOP;
    let unsubscribeTouchMove = NOOP;
    let unsubscribeScroll = NOOP;
    /** @type{any[]} */
    let childrenMethods = [];

    /**
     * Create tween
     */
    let spring = MobTween.createSpring({ data: { delta: 0, ax: 0, ay: 0 } });

    /** @type{() => void } */
    const onMouseUp = () => {
        onDrag = false;
    };

    /** @type{() => void } */
    const onMove = () => {
        const { vw, vh } =
            proxiState.centerToViewoport || proxiState.drag
                ? {
                      vw: window.innerWidth,
                      vh: window.innerHeight,
                  }
                : {
                      vw: width,
                      vh: height,
                  };

        const x = pageCoord.x;
        const y = pageCoord.y;

        const { xgap, ygap } = (() => {
            if (!onDrag) return { xgap: 0, ygap: 0 };

            if (firstDrag) {
                firstDrag = false;
                return {
                    xgap: 0,
                    ygap: 0,
                };
            } else {
                return {
                    xgap: x - lastX,
                    ygap: y - lastY,
                };
            }
        })();

        if (onDrag) {
            dragX += xgap;
            dragY += ygap;
        }

        const { xInMotion, yInMotion } = onDrag
            ? {
                  xInMotion: dragX,
                  yInMotion: dragY,
              }
            : {
                  xInMotion: x,
                  yInMotion: y,
              };

        /*
         * ax = grado di rotazione sull'asse X
         * ay = grado di rotazione sull'asse Y
         */
        const { ax, ay } =
            proxiState.centerToViewoport || proxiState.drag
                ? {
                      ax: -(vw / 2 - xInMotion) / proxiState.xDepth,
                      ay: (vh / 2 - yInMotion) / proxiState.yDepth,
                  }
                : {
                      ax:
                          -(vw / 2 - (xInMotion - offSetLeft)) /
                          proxiState.xDepth,
                      ay:
                          (vh / 2 - (yInMotion - offSetTop)) /
                          proxiState.yDepth,
                  };

        lastX = x;
        lastY = y;

        const xLimitReached = ax > proxiState.xLimit || ax < -proxiState.xLimit;
        const yLimitReached = ay > proxiState.yLimit || ay < -proxiState.yLimit;

        if (xLimitReached) dragX -= xgap;
        if (yLimitReached) dragY -= ygap;

        const axClamped = MobMotionCore.clamp(
            ax,
            -proxiState.xLimit,
            proxiState.xLimit
        );

        const ayClamped = MobMotionCore.clamp(
            ay,
            -proxiState.yLimit,
            proxiState.yLimit
        );

        /*
         * Calcolo il valore da passare ai componenti figli per animarre l'asse Z.
         * Il delta sarà l'ipotenusa del triangolo formato dai volri ax e ay
         */
        const delta = Math.sqrt(
            Math.pow(Math.abs(ayClamped), 2) + Math.pow(Math.abs(axClamped), 2)
        );

        spring.goTo({ delta, ax: axClamped, ay: ayClamped }).catch(() => {});

        /**
         * Move children
         */
        childrenMethods.forEach((moveChild) => {
            moveChild({ delta, factor: proxiState.factor });
        });
    };

    /** @type{(scrollY: number) => void} */
    const onScroll = (scrollY) => {
        if (lastScrolledTop !== scrollY) {
            pageCoord.y -= lastScrolledTop;
            lastScrolledTop = scrollY;
            pageCoord.y += lastScrolledTop;
        }

        onMove();
    };

    /** @type{(arg0: {page: { x: number, y:number }}) => boolean} */
    const draggable = ({ page }) => {
        return (
            page.y > offSetTop &&
            page.y < offSetTop + height &&
            page.x > offSetLeft &&
            page.x < offSetLeft + width
        );
    };

    /** @type{(arg0: {page: { x: number, y:number }}) => void } */
    const onMouseDown = ({ page }) => {
        if (draggable({ page })) {
            onDrag = true;
            firstDrag = true;
        }
    };

    /** @type{() => void } */
    const addScrollListener = () => {
        unsubscribeScroll();

        unsubscribeScroll = proxiState.useScroll
            ? MobCore.useScroll(({ scrollY }) => {
                  onScroll(scrollY);
              })
            : () => {};
    };

    onMount(({ element }) => {
        const { container } = getRef();
        proxiState.afterInit(element);

        /**
         * Handler
         */
        const unsubscribeSpring = spring.subscribe(({ delta, ax, ay }) => {
            container.style.transform = `translate3D(0,0,0) rotateY(${ax}deg) rotateX(${ay}deg)`;

            // Callback
            proxiState.onUpdate({ delta, deltaX: ax, deltaY: ay });
        });

        const unsubscribeOnComplete = spring.onComplete(({ ax, ay }) => {
            container.style.transform = `rotateY(${ax}deg) rotateX(${ay}deg)`;
        });

        const unsubscribeMouseMove = MobCore.useMouseMove(({ page }) => {
            pageCoord = { x: page.x, y: page.y };
            onMove();
        });

        /**
         * Update root size
         */
        const unsubscribeResize = MobCore.useResize(() => {
            ({ height, width, offSetTop, offSetLeft } = getMove3DDimension({
                element,
            }));
        });

        watch(
            'drag',
            (value) => {
                unsubscribeTouchMove();
                unsubscribeTouchUp();
                unsubscribeTouchDown();
                unsubscribeTouchEnd();
                unsubscribeTouchStart();

                if (value) {
                    dragX = window.innerWidth / 2;
                    dragY = window.innerHeight / 2;

                    unsubscribeTouchStart = MobCore.useTouchStart(
                        ({ page }) => {
                            onMouseDown({ page });
                        }
                    );

                    unsubscribeTouchEnd = MobCore.useTouchEnd(() => {
                        onMouseUp();
                    });

                    unsubscribeTouchDown = MobCore.useMouseDown(({ page }) => {
                        onMouseDown({ page });
                    });

                    unsubscribeTouchUp = MobCore.useMouseUp(() => {
                        onMouseUp();
                    });

                    unsubscribeTouchMove = MobCore.useTouchMove(({ page }) => {
                        pageCoord = { x: page.x, y: page.y };
                        onMove();
                    });

                    return;
                }
            },
            { immediate: true }
        );

        /**
         * Set useScroll
         */
        watch('useScroll', (value, prevValue) => {
            if (value) {
                addScrollListener();
                return;
            }

            if (value !== prevValue) unsubscribeScroll();
        });

        computed('useScroll', () => {
            return !proxiState.drag && !proxiState.centerToViewoport;
        });

        MobCore.useNextLoop(() => {
            ({ height, width, offSetTop, offSetLeft } = getMove3DDimension({
                element,
            }));

            pageCoord = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            onMove();
        });

        return () => {
            unsubscribeSpring();
            unsubscribeOnComplete();
            unsubscribeResize();
            unsubscribeMouseMove();
            unsubscribeScroll();
            unsubscribeTouchStart();
            unsubscribeTouchEnd();
            unsubscribeTouchDown();
            unsubscribeTouchUp();
            unsubscribeTouchMove();
            spring.destroy();
            childrenMethods = [];

            // @ts-ignore
            spring = null;
            // @ts-ignore
            height = null;
            // @ts-ignore
            width = null;
            // @ts-ignore
            offSetLeft = null;
            // @ts-ignore
            offSetTop = null;
            // @ts-ignore
            lastX = null;
            // @ts-ignore
            dragX = null;
            // @ts-ignore
            lastY = null;
            // @ts-ignore
            dragY = null;
            // @ts-ignore
            onDrag = null;
            // @ts-ignore
            firstDrag = null;
            // @ts-ignore
            pageCoord = null;
            // @ts-ignore
            lastScrolledTop = null;
        };
    });

    return html`<div
        class="c-move-3d"
        ${bindEffect({
            toggleClass: { 'move3D--drag': () => proxiState.drag },
        })}
    >
        <div
            class="c-move-3d__scene"
            ${bindEffect({
                toggleStyle: {
                    perspective: () => `${proxiState.perspective}px`,
                },
            })}
        >
            <div class="c-move-3d__container" ${setRef('container')}>
                ${invalidate({
                    bind: ['shape', 'debug'],
                    afterUpdate: () => {
                        /**
                         * Update children's methods
                         */
                        childrenMethods = getChildrenMethod({
                            childrenId,
                        });
                    },
                    render: () => {
                        return Recursive3Dshape({
                            data: proxiState.shape,
                            root: true,
                            childrenId,
                            debug: proxiState.debug,
                        });
                    },
                })}
            </div>
        </div>
    </div>`;
};
