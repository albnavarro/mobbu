//@ts-check

import { mobCore } from '../../../mobCore';
import { tween } from '../../../mobMotion';
import { NOOP } from '../../../mobMotion/utils/functionsUtils';
import { Recursive3Dshape } from './partials/recursive3Dshape';
import { getChildrenMethod, getMove3DDimension } from './utils';

/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').Move3D>} */
export const Move3Dfn = ({
    onMount,
    html,
    getState,
    setRef,
    getRef,
    watchSync,
    computedSync,
    invalidate,
}) => {
    /**
     * base id for checlren instance
     */
    const childrenId = mobCore.getUnivoqueId();

    /**
     * Initial props state
     */
    let { yLimit, xLimit, yDepth, xDepth, centerToViewoport, drag } =
        getState();

    const { debug } = getState();

    /**
     * Mutable symbols
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
    let useScroll = drag && centerToViewoport;
    let unsubscribeTouchStart = NOOP;
    let unsubscribeTouchEnd = NOOP;
    let unsubscribeTouchDown = NOOP;
    let unsubscribeTouchUp = NOOP;
    let unsubscribeTouchMove = NOOP;
    let unsubscribeScroll = NOOP;
    let childrenMethods = [];

    /**
     * Create tween
     */
    let spring = tween.createSpring({ data: { ax: 0, ay: 0 } });

    /** @type{() => void } */
    const onMouseUp = () => {
        onDrag = false;
    };

    /** @type{() => void } */
    const onMove = () => {
        const { vw, vh } =
            centerToViewoport || drag
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
            centerToViewoport || drag
                ? {
                      ax: -(vw / 2 - xInMotion) / xDepth,
                      ay: (vh / 2 - yInMotion) / yDepth,
                  }
                : {
                      ax: -(vw / 2 - (xInMotion - offSetLeft)) / xDepth,
                      ay: (vh / 2 - (yInMotion - offSetTop)) / yDepth,
                  };

        const xlimitReached = Math.abs(ax) > xLimit;
        const ylimitReached = Math.abs(ay) > yLimit;

        const axLimited = (() => {
            if (!xlimitReached) return ax;
            return ax > 0 ? xLimit : -xLimit;
        })();

        const ayLimited = (() => {
            if (!ylimitReached) return ay;
            return ay > 0 ? yLimit : -yLimit;
        })();

        // TODO: calcolare il valore x y corrspondente all 'angolo limit e assegnarlo
        if (xlimitReached) dragX -= xgap;
        if (ylimitReached) dragY -= ygap;

        lastX = x;
        lastY = y;

        /*
         * Calcolo il valore da passare ai componenti figli per animarre l'asse Z.
         * Il delta sarà l'ipotenusa del triangolo formato dai volri ax e ay
         */
        const delta = Math.sqrt(
            Math.pow(Math.abs(ayLimited), 2) + Math.pow(Math.abs(axLimited), 2)
        );

        const limit = Math.sqrt(
            Math.pow(Math.abs(xLimit), 2) + Math.pow(Math.abs(yLimit), 2)
        );

        spring.goTo({ ax: axLimited, ay: ayLimited }).catch(() => {});

        /**
         * Move children
         */
        childrenMethods.forEach((moveChild) => {
            moveChild({ delta, limit });
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
        unsubscribeScroll = useScroll
            ? mobCore.useScroll(({ scrollY }) => {
                  onScroll(scrollY);
              })
            : () => {};
    };

    onMount(({ element }) => {
        const { scene, container } = getRef();

        /**
         * Handler
         */
        const unsubscribeSpring = spring.subscribe(({ ax, ay }) => {
            container.style.transform = `translate3D(0,0,0) rotateY(${ax}deg) rotateX(${ay}deg)`;
        });

        const unsubscribeOnComplete = spring.onComplete(({ ax, ay }) => {
            container.style.transform = `rotateY(${ax}deg) rotateX(${ay}deg)`;
        });

        const unsubscribeMouseMove = mobCore.useMouseMove(({ page }) => {
            pageCoord = { x: page.x, y: page.y };
            onMove();
        });

        /**
         * Root size
         */
        ({ height, width, offSetTop, offSetLeft } = getMove3DDimension({
            element,
        }));

        const unsubscribeResize = mobCore.useResize(() => {
            ({ height, width, offSetTop, offSetLeft } = getMove3DDimension({
                element,
            }));
        });

        /**
         * Update props
         */
        watchSync('perspective', (value) => {
            scene.style.perspective = `${value}px`;
        });

        watchSync('yLimit', (value) => {
            yLimit = value;
        });

        watchSync('xLimit', (value) => {
            xLimit = value;
        });

        watchSync('yDepth', (value) => {
            yDepth = value;
        });

        watchSync('xDepth', (value) => {
            xDepth = value;
        });

        watchSync('centerToViewoport', (value) => {
            centerToViewoport = value;
        });

        watchSync('drag', (value) => {
            drag = value;

            unsubscribeTouchMove();
            unsubscribeTouchUp();
            unsubscribeTouchDown();
            unsubscribeTouchEnd();
            unsubscribeTouchStart();

            if (drag) {
                dragX = window.innerWidth / 2;
                dragY = window.innerHeight / 2;
                element.classList.add('move3D--drag');

                unsubscribeTouchStart = mobCore.useTouchStart(({ page }) => {
                    onMouseDown({ page });
                });

                unsubscribeTouchEnd = mobCore.useTouchEnd(() => {
                    onMouseUp();
                });

                unsubscribeTouchDown = mobCore.useMouseDown(({ page }) => {
                    onMouseDown({ page });
                });

                unsubscribeTouchUp = mobCore.useMouseUp(() => {
                    onMouseUp();
                });

                unsubscribeTouchMove = mobCore.useTouchMove(({ page }) => {
                    pageCoord = { x: page.x, y: page.y };
                    onMove();
                });

                return;
            }

            element.classList.remove('move3D--drag');
        });

        /**
         * Initial useScroll
         */
        watchSync('useScroll', (value) => {
            unsubscribeScroll();

            if (value) {
                useScroll = value;
                addScrollListener();
            }
        });

        /**
         * Update useScroll
         */
        computedSync(
            'useScroll',
            ['centerToViewoport', 'drag'],
            ({ drag, centerToViewoport }) => {
                return !drag && !centerToViewoport;
            }
        );

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
        };
    });

    return html`<div class="c-move-3d">
        <div class="c-move-3d__scene" ${setRef('scene')}>
            <div class="c-move-3d__container" ${setRef('container')}>
                ${invalidate({
                    bind: 'shape',
                    afterUpdate: () => {
                        /**
                         * Update children's methods
                         */
                        childrenMethods = getChildrenMethod({
                            childrenId,
                        });
                    },
                    render: () => {
                        const { shape } = getState();
                        return Recursive3Dshape({
                            data: shape,
                            root: true,
                            childrenId,
                            debug,
                        });
                    },
                })}
            </div>
        </div>
    </div>`;
};