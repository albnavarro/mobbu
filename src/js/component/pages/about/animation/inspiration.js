import { MobScroll, MobTween } from '../../../../mobMotion';

/** @type{import("../type").InspirationAnimation} */
export const inspirationAnimation = ({ inspirationItem }) => {
    const masterSequencer = MobTween.createMasterSequencer();

    const staggers = MobTween.createStaggers({
        items: inspirationItem,
        stagger: {
            type: 'end',
            each: 5,
            from: 'start',
        },
    });

    staggers.forEach(({ item, start, end, index }) => {
        const sequencer = MobTween.createSequencer({
            data: { x: 100 + index * 20 },
        }).goTo({ x: 0 }, { start, end });

        sequencer.subscribe(({ x }) => {
            item.style.transform = `translateX(${x}px)`;
        });

        masterSequencer.add(sequencer);
    });

    const inspirationScroller = MobScroll.createScrollTrigger({
        item: inspirationItem[0],
        propierties: 'tween',
        tween: masterSequencer,
        dynamicStart: {
            position: 'right',
            value: () => -20,
        },
        dynamicEnd: {
            position: 'left',
            value: () => window.innerWidth / 2,
        },
        ease: false,
    });

    return {
        inspirationScroller,
        masterSequencer,
    };
};
