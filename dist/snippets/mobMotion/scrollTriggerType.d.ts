export interface scrollTrigger {
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
    dynamicRange?: () => number;
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
        | 'tween';
    tween?: Object;
    direction?: 'vertical' | 'horizontal';
    useWillChange?: boolean;
    invertSide?: boolean;
    pin?: boolean;
    animatePin?: boolean;
    forceTranspond?: boolean;
    anticipatePinOnLoad?: boolean;
    start?: string;
    end?: string;
    fromTo?: boolean;
    marker?: string;
    dynamicStart?: {
        position: 'bottom' | 'top' | 'left' | 'right';
        value: () => number;
    };
    dynamicEnd?: {
        position: 'bottom' | 'top' | 'left' | 'right';
        value: () => number;
    };
    animateAtStart?: boolean;
    onEnter?: () => void;
    onEnterBack?: () => void;
    onLeave?: () => void;
    onLeaveBack?: () => void;
    onTick?: () => void;
}
