interface MobScroller {
    /**
     * Paralalx/scrollTrigger common params:
     */
    item?: string | HTMLElement;
    scroller?: string | HTMLElement | Window;
    screen?: string | HTMLElement | Window;
    trigger?: string | HTMLElement;
    applyTo?: string | HTMLElement;
    breakpoint?:
        | 'xSmall'
        | 'small'
        | 'medium'
        | 'tablet'
        | 'desktop'
        | 'large'
        | 'xLarge';
    queryType?: 'min' | 'max';
    disableForce3D?: boolean;
    useThrottle?: boolean;
    range?: string | number;
    perspective?: number;
    ease?: boolean;
    easeType?: 'spring' | 'lerp';
    lerpConfig?: number;
    springConfig?: 'default' | 'gentle' | 'wobbly' | 'bounce' | 'scroller';
    propierties?:
        | 'y'
        | 'x'
        | 'rotate'
        | 'rotateY'
        | 'rotateX'
        | 'rotateZ'
        | 'opacity'
        | 'scale'
        | 'scaleX'
        | 'scaleY'
        | 'tween';
    tween?: Object;
    direction?: 'vertical' | 'horizontal';
    useWillChange?: boolean;

    /**
     * Specific parallax params:
     */
    align?:
        | 'start'
        | 'top'
        | 'right'
        | 'center'
        | 'bottom'
        | 'left'
        | 'end'
        | number;
    onSwitch?: 'in-stop' | 'in-back' | 'out-stop' | 'out-back';
    reverse?: boolean;
    opacityStart?: number;
    opacityEnd?: number;
    limiterOff?: boolean;
}
