import { MobScroll, MobTween } from '../../../../mobMotion';

/** @type{import("../type").InspirationAnimation} */
export const inspirationAnimation = ({ inspirationItem, section4_title }) => {
    const masterSequencer = MobTween.createMasterSequencer();

    // Title animation
    const titleSequencer = MobTween.createSequencer({
        data: {
            yTitle: 100,
            xTitle: 400,
        },
        ease: 'easeInOutQuad',
    });

    titleSequencer.goTo({ yTitle: 0, xTitle: 0 }, { start: 0, end: 10 });

    titleSequencer.subscribe(({ yTitle, xTitle }) => {
        section4_title.style.transform = `translate(${xTitle}px, ${yTitle}%)`;
    });

    masterSequencer.add(titleSequencer);

    // Chips animation
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
            data: { x: 300 + index * 20 },
            ease: 'easeInOutQuad',
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
        titleSequencer,
        masterSequencer,
    };
};
