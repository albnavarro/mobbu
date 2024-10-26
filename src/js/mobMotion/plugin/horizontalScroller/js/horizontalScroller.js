//@ts-check

import ParallaxClass from '../../../animation/parallax/parallax';
import {
    getTranslateValues,
    offset,
    outerHeight,
    outerWidth,
} from '../../../../mobCore/utils/index.js';
import { horizontalScrollerCss } from './horizontalScrollerCss.js';
import { mq } from '../../../utils/mediaManager.js';
import { horizontalScrollerContstant } from './horizontalScrollerConstant';
import { NOOP, pipe } from '../../../utils/functionsUtils';
import {
    breakpointIsValid,
    breakpointTypeIsValid,
    genericEaseTypeIsValid,
    valueIsBooleanAndReturnDefault,
    valueIsFunctionAndReturnDefault,
    valueIsNumberAndReturnDefault,
} from '../../../animation/utils/tweenAction/tweenValidation';
import { mobCore } from '../../../../mobCore';

export class HorizontalScroller {
    /**
     * @param  { import('./type.d.ts').HorizontalScroller } data
    *
    * @description
    *
    * Create new HorizontalScroller instance.
    *
    * Special attributes to handle shadow elements:
    * Apply the following data-attributes to any element
    *
    * `data-shadow="<String>"`
    * Create a vertical shadow element with a custom className.
    *
    * `data-debug`
    * Makes the shadow element visible
    *
    * Available methods:
    * myHorizontalScroller.init();
    * myHorizontalScroller.refresh();
    * myHorizontalScroller.destroy();
    *
    * @example
    *
    ```html
        HTML:
        <div class="root">
            <div class="container">
                <div class="row">
                    <section class="column" data-shadow="section1">
                        <h1>title</h1>
                    </section>
                    <section class="column">
                        <h1 data-shadow="title" data-debug>title</h1>
                    </section>
                    ...
                </div>
                <div class="trigger"></div>
            </div>
        </div>
    ```
    ```javascript
        JS:
        const myHorizontalScroller = new HorizontalScroller({
            root: '.root',
            container: '.container',
            row: '.row',
            column: '.column',
            trigger: '.trigger',
            shadowClass: '.myShadowClass,
            useThrottle: [ Boolean ],
            useSticky: [ Boolean ],
            animatePin: [ Boolean ],
            forceTranspond: [ Boolean ],
            useWillChange: [ Boolean ],
            animateAtStart: [ Boolean ],
            queryType: [ String ],
            breakpoint: [ String ],
            ease: [ Boolean ],
            easeType: [ String ],
            addCss: [ Boolean ],
            columnHeight: [ Number ],
            columnWidth: [ Number ],
            columnAlign: [ String ],
            children: [child1,child2, ...],
            onEnter: () => {
                ...
            },
            onEnterBack: () => {
                ...
            },
            onLeave: () => {
                ...
            },
            onLeaveBack: () => {
                ...
            },
            afterInit: () => {
                ...
            },
            onTick: ({ value, parentIsMoving, percent }) => {
                ...
            },
            afterRefresh: () => {
                ...
            },
            afterDestroy: () => {
                ...
            },
        });
    ```
    *
     */
    constructor(data) {
        /**
         * @private
         * @type {boolean}
         */
        this.propsisValid = true;

        /**
         * @private
         * @type {number}
         */
        this.triggerTopPosition = 0;

        /**
         * @private
         * @type {boolean}
         */
        this.touchActive = false;

        /**
         * @private
         * @type {number}
         */
        this.lastTouchValueX = 0;

        /**
         * @private
         * @type {number}
         */
        this.dragSecureAreaBottom = 100;

        /**
         * @private
         * @type {number}
         */
        this.dragSecureAreaTop = 100;

        /**
         * @private
         * @type boolean}
         */
        this.shouldDragValue = false;

        /**
         * @private
         * @type {HTMLElement[]}
         */
        this.button = [];

        /**
         * @private
         * @type {number}
         */
        this.scrollValue = 0;

        /**
         * @private
         * @type {() => void}
         */
        this.unsubscribeScroll = () => {};

        /**
         * @private
         * @type {boolean}
         */
        this.useDrag = valueIsBooleanAndReturnDefault(
            data?.useDrag,
            'HorizontalScroller: useDrag',
            false
        );

        /**
         * @private
         * @type {number}
         */
        this.threshold = valueIsNumberAndReturnDefault(
            data?.threshold,
            'HorizontalScroller: threshold',
            30
        );

        /**
         * @private
         * @type {boolean}
         */
        this.useWillChange = valueIsBooleanAndReturnDefault(
            data?.useWillChange,
            'HorizontalScroller: useWillChange',
            false
        );

        /**
         * @private
         * @type {import('../../../utils/type').mqValues}
         */
        this.breakpoint = breakpointIsValid(
            data?.breakpoint,
            'breakpoint',
            'horizontalScroller'
        );

        /**
         * @private
         * @type {import('../../../utils/type').mqAction}
         */
        this.queryType = breakpointTypeIsValid(
            data?.queryType,
            'queryType',
            'horizontalScroller'
        );

        /**
         * @private
         * @type {boolean}
         */
        this.forceTranspond = valueIsBooleanAndReturnDefault(
            data?.forceTranspond,
            'HorizontalScroller: forceTranspond',
            false
        );

        /**
         * @private
         * @type {boolean}
         */
        this.addCss = valueIsBooleanAndReturnDefault(
            data?.addCss,
            'HorizontalScroller: addCss',
            true
        );

        /**
         * @private
         * @type {boolean}
         */
        this.animateAtStart = valueIsBooleanAndReturnDefault(
            data?.animateAtStart,
            'HorizontalScroller: animateAtStart',
            false
        );

        /**
         * @private
         * @type {boolean}
         */
        this.ease = valueIsBooleanAndReturnDefault(
            data?.ease,
            'HorizontalScroller: ease',
            false
        );

        /**
         * @private
         * @type {'lerp'|'spring'}
         */
        this.easeType = genericEaseTypeIsValid(
            data?.easeType,
            'HorizontalScroller'
        );

        /**
         * @private
         * @type {boolean}
         */
        this.useSticky = valueIsBooleanAndReturnDefault(
            data?.useSticky,
            'HorizontalScroller: useSticky',
            false
        );

        /**
         * @private
         * @type {boolean}
         */
        this.animatePin = valueIsBooleanAndReturnDefault(
            data?.animatePin,
            'HorizontalScroller: animatePin',
            false
        );

        /**
         * @private
         * @type {boolean}
         */
        this.reverse = valueIsBooleanAndReturnDefault(
            data?.reverse,
            'HorizontalScroller: reverse',
            false
        );

        /**
         * @private
         * @type {boolean}
         */
        this.useThrottle = valueIsBooleanAndReturnDefault(
            data?.useThrottle,
            'HorizontalScroller: useThrottle',
            false
        );

        /**
         * @private
         * @type {number}
         */
        this.columnHeight = valueIsNumberAndReturnDefault(
            data?.columnHeight,
            'HorizontalScroller: columnHeight',
            100
        );

        /**
         * @private
         * @type {number}
         */
        this.columnWidth = valueIsNumberAndReturnDefault(
            data?.columnWidth,
            'HorizontalScroller: columnWidth',
            null
        );

        /**
         * @private
         * @type {string}
         */
        this.columnAlign = data?.columnAlign
            ? data.columnAlign.toUpperCase()
            : horizontalScrollerContstant.START;

        /**
         * @private
         * @type {() => void}
         */
        this.onEnter = valueIsFunctionAndReturnDefault(
            data?.onEnter,
            'HorizontalScroller: onEnter',
            NOOP
        );

        /**
         * @private
         * @type {() => void}
         */
        this.onEnterBack = valueIsFunctionAndReturnDefault(
            data?.onEnterBack,
            'HorizontalScroller: onEnterBack',
            NOOP
        );

        /**
         * @private
         * @type {() => void}
         */
        this.onLeave = valueIsFunctionAndReturnDefault(
            data?.onLeave,
            'HorizontalScroller: onLeave',
            NOOP
        );

        /**
         * @private
         * @type {() => void}
         */
        this.onLeaveBack = valueIsFunctionAndReturnDefault(
            data?.onLeaveBack,
            'HorizontalScroller: onLeaveBack',
            NOOP
        );

        /**
         * @private
         * @type {() => void}
         */
        this.afterInit = valueIsFunctionAndReturnDefault(
            data?.afterInit,
            'HorizontalScroller: afterInit',
            NOOP
        );

        /**
         * @private
         * @type {() => void}
         */
        this.afterRefresh = valueIsFunctionAndReturnDefault(
            data?.afterRefresh,
            'HorizontalScroller: afterRefresh',
            NOOP
        );

        /**
         * @private
         * @type {() => void}
         */
        this.afterDestroy = valueIsFunctionAndReturnDefault(
            data?.afterDestroy,
            'HorizontalScroller: afterDestroy',
            NOOP
        );

        /**
         * @private
         * @type {import('./type.d.ts').horizontalScrollerOnTick}
         */
        this.onTick = valueIsFunctionAndReturnDefault(
            data?.onTick,
            'HorizontalScroller: onTick',
            null
        );
        /**
         * Dom element
         */

        /**
         * @private
         * @type {HTMLElement}
         */
        // @ts-ignore
        this.mainContainer = mobCore.checkType(String, data.root)
            ? document.querySelector(data.root)
            : data.root;

        if (!this.mainContainer) {
            this.propsisValid = false;
            console.warn('horizontal custom: root node not found');
            return;
        }

        this.container = data?.container;

        /**
         * @private
         * @type {HTMLElement}
         */
        // @ts-ignore
        const scrollerTester = this.mainContainer.querySelector(this.container);
        if (!scrollerTester) {
            this.propsisValid = false;
            console.warn('horizontal custom: container node not found');
            return;
        }

        /**
         * @private
         * @type {HTMLElement}
         */
        // @ts-ignore
        this.trigger = this.mainContainer.querySelector(data.trigger);
        if (!this.trigger) {
            this.propsisValid = false;
            console.warn('horizontal custom: trigger node not found');
            return;
        }

        /**
         * @private
         * @type {HTMLElement}
         */
        // @ts-ignore
        this.row = this.mainContainer.querySelector(data.row);
        if (!this.row) {
            this.propsisValid = false;
            console.warn('horizontal custom: row node not found');
            return;
        }

        /**
         * @private
         * @type {NodeListOf<HTMLElement>}
         */
        this.columns = this.mainContainer.querySelectorAll(data.column);
        if (this.columns.length === 0) {
            this.propsisValid = false;
            console.warn('horizontal custom: column nodeList not found');
            return;
        }

        /**
         * @private
         * @type {NodeListOf<HTMLElement>}
         */
        this.shadows = this.mainContainer.querySelectorAll('[data-shadow]');
        const originalShadowClass = data?.shadowClass || 'shadow';

        /**
         * @private
         */
        this.shadowMainClassTransition = originalShadowClass.replace('.', '');

        /**
         * @private
         * @type {NodeListOf<HTMLElement>}
         *
         */
        // @ts-ignore
        this.button = this.row.querySelectorAll('a, button');

        /**
         * @private
         */
        this.moduleisActive = false;

        /**
         * @private
         * @type {number}
         */
        this.horizontalWidth = 0;

        /**
         * @private
         */
        this.scrollTriggerInstance = {};

        /**
         * @private
         * @type {number}
         */
        this.percentRange = 0;

        /**
         * @private
         *
         * @description
         * Initialize children.
         * @type {ParallaxClass[]}
         */
        this.children = data?.children || [];
        this.children.forEach((element) => {
            element.setScroller(this.row);
            element.setDirection('horizontal');
            element.setBreakPoint(this.breakpoint);
            element.setQueryType(this.queryType);
            element.init();
        });

        if (this.addCss)
            horizontalScrollerCss({
                mainContainer: this.mainContainer,
                queryType: this.queryType,
                breakpoint: this.breakpoint,
                container: this.container,
                trigger: data?.trigger ?? 'trigger',
                row: data.row,
                column: data.column,
                shadow: this.shadowMainClassTransition,
                useSticky: this.useSticky,
                columnHeight: this.columnHeight,
                columnWidth: this.columnWidth,
                columnAlign: this.columnAlign,
            });

        /**
         * Scoped event.
         * @type {(arg0: MouseEvent) => void}
         * @return {void}
         */
        this.onMouseMove = (event) => {
            if (!this.touchActive) return;

            const { movementX } = event;
            const value = this.reverse ? movementX : -movementX;
            this.onDrag(value);
            this.touchStart = false;
        };

        /**
         * @type {(arg0: MouseEvent) => void}
         * @return {void}
         */
        this.onMouseDown = () => {
            if (!mq[this.queryType](this.breakpoint)) return;

            if (this.shouldDragValue) this.row.style.cursor = 'move';
            this.touchActive = true;
            this.firstTouchValue = this.scrollValue;
        };

        /**
         * @type {(arg0: MouseEvent) => void}
         * @return {void}
         */
        this.onMouseUp = () => {
            this.touchActive = false;
            mobCore.useFrame(() => (this.row.style.cursor = ''));
        };

        /**
         * @type {(arg0: MouseEvent) => void}
         * @return {void}
         */
        this.onMouseLeave = () => {
            this.touchActive = false;
            mobCore.useFrame(() => (this.row.style.cursor = ''));
        };

        /**
         * @type {(arg0: TouchEvent) => void}
         * @return {void}
         */
        this.onTouchStart = (event) => {
            if (!mq[this.queryType](this.breakpoint)) return;

            this.lastTouchValueX = -event.touches[0].clientX;
            this.touchActive = true;
            this.firstTouchValue = this.scrollValue;
        };

        /**
         * @type {() => void}
         * @return {void}
         */
        this.onTouchEnd = () => {
            this.touchActive = false;
        };

        /**
         * @type {(arg0: TouchEvent) => void}
         * @return {void}
         */
        this.onTouchMove = (event) => {
            const touchValueX = -event.touches[0].clientX;
            const gapX = this.reverse
                ? -touchValueX + this.lastTouchValueX
                : touchValueX - this.lastTouchValueX;

            this.onDrag(gapX);
            this.lastTouchValueX = touchValueX;

            if (this.shouldDragValue && event.cancelable)
                event.preventDefault();
        };

        /**
         * @type {EventListener}
         * @return {void}
         */
        this.preventFireClick = (event) => {
            if (
                Math.abs(this.scrollValue - this.firstTouchValue) >
                this.threshold
            )
                event.preventDefault();
        };
    }

    /**
     * @description
     * Initialize insatance
     *
     * @example
     * myInstance.init()
     */
    init() {
        if (!this.propsisValid) return;

        pipe(
            this.getWidth.bind(this),
            this.setDimension.bind(this),
            this.createShadow.bind(this),
            this.updateShadow.bind(this)
        )().then(() => {
            this.initScroller();
            if (this.useDrag) this.addDragListener();

            mobCore.useResize(({ horizontalResize }) =>
                this.onResize(horizontalResize)
            );

            mobCore.useFrameIndex(() => {
                mobCore.useNextTick(() => {
                    this.afterInit?.();
                    this.children.forEach((element) => {
                        element.refresh();
                    });
                });
            }, 3);
        });
    }

    /**
     * @private
     */
    setLinkAttribute() {
        [...this.button].forEach((item) =>
            item.setAttribute('draggable', 'false')
        );
    }

    /**
     * @private
     */
    removeLinkAttribute() {
        [...this.button].forEach((item) => item.removeAttribute('draggable'));
    }

    /**
     * @private
     * @param {number} value
     * @returns {void}
     */
    onDrag(value) {
        if (!this.shouldDragValue) return;
        mobCore.useFrame(() =>
            window.scrollBy({ top: value, left: 0, behavior: 'instant' })
        );
    }

    shouldDrag() {
        const documentScrollTop = window.scrollY;

        this.shouldDragValue =
            this.triggerTopPosition - this.dragSecureAreaTop <
                documentScrollTop &&
            this.triggerTopPosition +
                this.dragSecureAreaBottom +
                this.horizontalWidth >
                documentScrollTop + window.innerHeight;
    }

    addDragListener() {
        this.unsubscribeScroll = mobCore.useScroll(() => this.shouldDrag());
        this.shouldDrag();

        this.row.addEventListener('click', this.preventFireClick, {
            passive: false,
        });

        this.row.addEventListener('mousedown', this.onMouseDown, {
            passive: true,
        });

        this.row.addEventListener('mouseup', this.onMouseUp, {
            passive: true,
        });

        this.row.addEventListener('mouseleave', this.onMouseLeave, {
            passive: true,
        });

        this.row.addEventListener('touchstart', this.onTouchStart, {
            passive: true,
        });

        this.row.addEventListener('touchend', this.onTouchEnd, {
            passive: true,
        });

        this.row.addEventListener('mousemove', this.onMouseMove, {
            passive: true,
        });

        this.row.addEventListener('touchmove', this.onTouchMove, {
            passive: true,
        });
    }

    removeDragListener() {
        this.unsubscribeScroll();
        this.row.removeEventListener('click', this.preventFireClick);
        this.row.removeEventListener('mousedown', this.onMouseDown);
        this.row.removeEventListener('mouseup', this.onMouseUp);
        this.row.removeEventListener('mouseleave', this.onMouseLeave);
        this.row.removeEventListener('touchstart', this.onTouchStart);
        this.row.removeEventListener('touchend', this.onTouchEnd);
        this.row.removeEventListener('mousemove', this.onMouseMove);
        this.row.removeEventListener('touchmove', this.onTouchMove);
    }

    /**
     * @private
     */
    setDimension() {
        if (!this.trigger || !this.mainContainer || !this.row) {
            return new Promise((resolve) => {
                resolve(true);
            });
        }

        return new Promise((resolve) => {
            mobCore.useFrame(() => {
                const width = this.horizontalWidth;
                this.percentRange = (100 * (width - window.innerWidth)) / width;

                if (width > 0) {
                    this.trigger.style.height = `${width}px`;
                    this.mainContainer.style.height = `${width}px`;
                    this.row.style.width = `${width}px`;
                }

                resolve(true);
            });
        });
    }

    /**
     * @private
     */
    getWidth() {
        return new Promise((resolve) => {
            mobCore.useFrame(() => {
                if (!mq[this.queryType](this.breakpoint)) {
                    resolve(true);
                    return;
                }

                this.horizontalWidth = [...this.columns]
                    .map((item) => {
                        return outerWidth(item);
                    })
                    .reduce((a, b) => a + b, 0);

                resolve(true);
            });
        });
    }

    /**
     * @private
     */
    createShadow() {
        if (!this.trigger) {
            return new Promise((resolve) => {
                resolve(true);
            });
        }

        return new Promise((resolve) => {
            mobCore.useFrame(() => {
                if (!mq[this.queryType](this.breakpoint)) {
                    resolve(true);
                    return;
                }

                const shadowsTransition = [...this.shadows]
                    .map((item) => {
                        const shadowClass = item.dataset['shadow'];
                        const debug = item.dataset['debug'] ? 'debug' : '';
                        const left = item.dataset['debug']
                            ? `left left : ${shadowClass}`
                            : '';
                        const inCenter = item.dataset['debug']
                            ? `in center : ${shadowClass}`
                            : '';
                        const outCenter = item.dataset['debug']
                            ? `center out : ${shadowClass}`
                            : '';
                        const end = item.dataset['debug']
                            ? `in out : ${shadowClass}`
                            : '';

                        return `
                            <div class='${this.shadowMainClassTransition} ${this.shadowMainClassTransition}--${shadowClass}' data-shadow='${shadowClass}'>
                                <span class="${this.shadowMainClassTransition}--in-center ${debug}">
                                    ${inCenter}
                                </span>
                                <span class="${this.shadowMainClassTransition}--out-center ${debug}">
                                    ${outCenter}
                                </span>
                                <span class="${this.shadowMainClassTransition}--left ${debug}">
                                    ${left}
                                </span>
                                <span class="${this.shadowMainClassTransition}--end ${debug}">
                                    ${end}
                                </span>
                            </div>`;
                    })
                    .join('');

                this.trigger.innerHTML = shadowsTransition;
                resolve(true);
            });
        });
    }

    /**
     * @private
     */
    removeShadow() {
        if (this.trigger) this.trigger.innerHTML = '';
    }

    /**
     * @private
     */
    updateShadow() {
        return new Promise((resolve) => {
            if (!mq[this.queryType](this.breakpoint)) {
                resolve(true);
                return;
            }

            mobCore.useFrame(() => {
                [...this.shadows].forEach((item) => {
                    const percentrange = this.percentRange / 100;
                    const shadowData = item.dataset['shadow'];
                    const width = outerWidth(item);
                    const height = outerHeight(this.row);
                    const { x } = getTranslateValues(this.row);
                    const offset = this.reverse
                        ? this.horizontalWidth -
                          (item.getBoundingClientRect().right - x)
                        : item.getBoundingClientRect().left - x;
                    const screenRatio = window.innerWidth / window.innerHeight;
                    const windowDifference =
                        window.innerWidth - window.innerHeight;
                    const widthAmount = offset / screenRatio;
                    const diffAmount = offset - offset / screenRatio;

                    /**
                     * @type {HTMLElement|null}
                     */
                    const shadowTransitionEl = this.mainContainer.querySelector(
                        `.${this.shadowMainClassTransition}[data-shadow="${shadowData}"]`
                    );

                    /**
                     * @type {HTMLElement|null|undefined}
                     */
                    const inCenterMarker = shadowTransitionEl?.querySelector(
                        `.${this.shadowMainClassTransition}--in-center`
                    );

                    /**
                     * @type {HTMLElement|null|undefined}
                     */
                    const outCenterMarker = shadowTransitionEl?.querySelector(
                        `.${this.shadowMainClassTransition}--out-center`
                    );

                    /**
                     * @type {HTMLElement|null|undefined}
                     */
                    const leftMarker = shadowTransitionEl?.querySelector(
                        `.${this.shadowMainClassTransition}--left`
                    );

                    /**
                     * @type {HTMLElement|null|undefined}
                     */
                    const endMarker = shadowTransitionEl?.querySelector(
                        `.${this.shadowMainClassTransition}--end`
                    );

                    // Strength shadow end item to bottom of page
                    const plusFull =
                        window.innerWidth > window.innerHeight
                            ? window.innerHeight
                            : 0;

                    // Strength center in out item to bottom of page
                    const plusHalf =
                        window.innerWidth > window.innerHeight
                            ? window.innerHeight / 2
                            : 0;

                    const start = (() => {
                        switch (offset) {
                            case 0: {
                                return 0;
                            }

                            default: {
                                return (
                                    widthAmount +
                                    diffAmount / percentrange -
                                    windowDifference / percentrange
                                );
                            }
                        }
                    })();

                    const left = (() => {
                        const val =
                            window.innerWidth > window.innerHeight
                                ? windowDifference / percentrange
                                : windowDifference / percentrange +
                                  window.innerWidth / screenRatio;

                        switch (offset) {
                            case 0: {
                                return 0;
                            }

                            default: {
                                return val;
                            }
                        }
                    })();

                    const end = (() => {
                        const val1 = width / screenRatio;
                        const val2 =
                            (width - width / screenRatio) / percentrange;
                        return val1 + val2 + left;
                    })();

                    const inCenter = (() => {
                        return end / 2 + plusHalf;
                    })();

                    if (this.useSticky) {
                        this.trigger.style['margin-top'] = `-${height}px`;
                    }

                    if (shadowTransitionEl)
                        shadowTransitionEl.style.top = `${start}px`;

                    if (inCenterMarker)
                        inCenterMarker.style.height = `${inCenter}px`;

                    if (outCenterMarker)
                        outCenterMarker.style.height = `${inCenter}px`;

                    if (outCenterMarker)
                        outCenterMarker.style.top = `${inCenter}px`;

                    if (leftMarker) leftMarker.style.height = `${left}px`;

                    if (endMarker)
                        endMarker.style.height = `${end + plusFull}px`;

                    if (shadowTransitionEl)
                        shadowTransitionEl.style.height = `${left}px`;
                });

                resolve(true);
            });
        });
    }

    /**
     * @private
     */
    initScroller() {
        if (!this.trigger || !mq[this.queryType](this.breakpoint)) return;

        const scrollTriggerInstance = new ParallaxClass({
            type: 'scrolltrigger',
            item: this.row,
            useWillChange: this.useWillChange,
            trigger: this.trigger,
            propierties: 'x',
            breakpoint: 'xSmall',
            pin: !this.useSticky,
            animatePin: this.animatePin,
            ease: this.ease,
            forceTranspond: this.forceTranspond,
            useThrottle: this.useThrottle,
            easeType: this.easeType,
            springConfig: 'scroller',
            animateAtStart: this.animateAtStart,
            fromTo: this.reverse,
            dynamicRange: () => {
                return -(this.horizontalWidth - window.innerWidth);
            },
            dynamicStart: {
                position: 'bottom',
                value: () => {
                    return window.innerHeight;
                },
            },
            dynamicEnd: {
                position: 'bottom',
                value: () => {
                    return this.horizontalWidth;
                },
            },
            onTick: ({ value, parentIsMoving }) => {
                const valueParsed = value ?? 0;

                const percent = Math.abs(
                    -Math.round(
                        (valueParsed * 100) /
                            (this.horizontalWidth - window.innerWidth)
                    )
                );

                this.scrollValue = valueParsed;

                // onTick standalone methods.
                if (this.onTick)
                    this.onTick({
                        value: valueParsed,
                        parentIsMoving,
                        percent: this.reverse ? 100 - percent : percent,
                    });

                // Builtin children onTick;
                this.children.forEach((element) => {
                    element.move({ value: valueParsed, parentIsMoving });
                });
            },
            onEnter: this.onEnter,
            onEnterBack: this.onEnterBack,
            onLeave: this.onLeave,
            onLeaveBack: this.onLeaveBack,
        });
        scrollTriggerInstance.init();

        this.moduleisActive = true;
        this.scrollTriggerInstance = scrollTriggerInstance;
        this.triggerTopPosition = offset(this.trigger).top;
        this.setLinkAttribute();
    }

    /**
     * @private
     */
    createScroller() {
        pipe(
            this.getWidth.bind(this),
            this.setDimension.bind(this),
            this.createShadow.bind(this),
            this.updateShadow.bind(this)
        )().then(() => {
            this.initScroller();
            this.refreshChildren();
        });
    }

    /**
     * @private
     */
    refreshChildren() {
        mobCore.useFrameIndex(() => {
            mobCore.useNextTick(() => {
                this.afterRefresh?.();
                this.children.forEach((element) => {
                    element?.refresh?.();
                });
            });
        }, 3);
    }

    /**
     * @description
     * Refresh instance
     *
     * @example
     * myInstance.refresh()
     */
    refresh() {
        if (!this.moduleisActive || !mq[this.queryType](this.breakpoint))
            return;

        return new Promise((resolve) => {
            pipe(
                this.getWidth.bind(this),
                this.setDimension.bind(this),
                this.updateShadow.bind(this)
            )().then(() => {
                this.scrollTriggerInstance?.stopMotion?.();
                this.triggerTopPosition = offset(this.trigger).top;

                if (this.moduleisActive) {
                    this.scrollTriggerInstance?.refresh?.();
                    this.refreshChildren();
                }
                resolve(true);
            });
        });
    }

    /**
     * @private
     */
    killScroller({ destroyAll = false }) {
        if (this.moduleisActive || destroyAll) {
            this.scrollTriggerInstance?.destroy?.();
            // @ts-ignore
            this.scrollTriggerInstance = null;
            if (this.trigger) this.trigger.style.height = '';
            if (this.mainContainer) this.mainContainer.style.height = '';
            if (this.trigger) this.trigger.style.marginTop = '';
            this.removeShadow();
            this.removeLinkAttribute();
            this.moduleisActive = false;

            // Make sure that if component is running with ease the style is removed.
            mobCore.useFrameIndex(() => {
                // this.row.style = '';
                this.row.attributeStyleMap.clear();

                if (destroyAll && this.mainContainer) {
                    if (this.useDrag) this.removeDragListener();

                    const styleDiv =
                        this.mainContainer.querySelector('.scroller-style');
                    if (styleDiv) styleDiv.remove();

                    /**
                     * All element is null only on Destroy.
                     * Avoid to use union type with null.
                     */

                    // @ts-ignore
                    this.mainContainer = null;
                    // @ts-ignore
                    this.trigger = null;
                    // @ts-ignore
                    this.row = null;
                    // @ts-ignore
                    this.columns = [];
                    // @ts-ignore
                    this.shadows = null;
                    this.afterInit = NOOP;
                    this.afterRefresh = NOOP;
                    this.onTick = NOOP;
                    this.onEnter = NOOP;
                    this.onEnterBack = NOOP;
                    this.onLeave = NOOP;
                    this.onLeaveBack = NOOP;
                    this.scrollTriggerInstance = undefined;
                    this.moduleisActive = false;
                    this.button = [];

                    // @ts-ignore
                    this.mainContainer = null;
                    // @ts-ignore
                    this.container = null;
                    // @ts-ignore
                    this.trigger = null;
                    // @ts-ignore
                    this.row = null;

                    mobCore.useNextTick(() => {
                        this.afterDestroy?.();
                        this.afterDestroy = NOOP;
                        this.children.forEach((element) => {
                            element?.destroy?.();
                            // @ts-ignore
                            element = null;
                        });
                        this.children = [];
                    });
                }
            }, 3);
        }
    }

    /**
     * @param {boolean} horizontalResize
     */
    onResize(horizontalResize) {
        if (this.moduleisActive && mq[this.queryType](this.breakpoint)) {
            if (horizontalResize) this.refresh();
        } else if (
            !this.moduleisActive &&
            mq[this.queryType](this.breakpoint)
        ) {
            this.createScroller();
        } else if (
            this.moduleisActive &&
            !mq[this.queryType](this.breakpoint)
        ) {
            this.killScroller({ destroyAll: false });
        }
    }

    /**
     * @description
     * Destroy instance
     *
     * @example
     * myInstance.destroy()
     */
    destroy() {
        this.killScroller({ destroyAll: true });
    }
}
