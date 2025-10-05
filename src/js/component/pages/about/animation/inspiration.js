import { MobScroll, MobTween } from '@mobMotion';

/** @type {import('../type').InspirationAnimation} */
export const inspirationAnimation = ({
    weakInspirationitem,
    weakSectio4Title,
    weakContainer,
}) => {
    let masterSequencer = MobTween.createMasterSequencer();

    // Title animation
    let titleSequencer = MobTween.createSequencer({
        data: {
            xTitle: 400,
        },
    });

    titleSequencer.goTo({ xTitle: 0 }, { start: 0, end: 10 });

    titleSequencer.subscribe(({ xTitle }) => {
        if (!weakSectio4Title.deref()) return;

        // @ts-ignore
        weakSectio4Title.deref().style.transform = `translate3D(0,0,0) translateX(${xTitle}px)`;
    });

    titleSequencer.onStop(({ xTitle }) => {
        if (!weakSectio4Title.deref()) return;

        // @ts-ignore
        weakSectio4Title.deref().style.transform = ` translateX(${xTitle}px )`;
    });

    masterSequencer.add(titleSequencer);

    // Chips animation
    const staggers = MobTween.createStaggers({
        items: weakInspirationitem,
        stagger: {
            type: 'end',
            each: 5,
            from: 'start',
        },
    });

    staggers.forEach(({ item, start, end, index }) => {
        const sequencer = MobTween.createSequencer({
            data: { x: 100 + index * 20 },
        }).goTo({ x: 0, opacity: 1 }, { start, end });

        sequencer.subscribe(({ x }) => {
            if (!item.deref()) return;

            item.deref().style.transform = `translate3D(0,0,0) translateX(${x}px)`;
        });

        sequencer.onStop(({ x }) => {
            if (!item.deref()) return;

            item.deref().style.transform = `translateX(${x}px)`;
        });

        masterSequencer.add(sequencer);
    });

    let inspirationScroller = MobScroll.createScrollTrigger({
        item: weakContainer.deref(),
        propierties: 'tween',
        tween: masterSequencer,
        dynamicStart: {
            position: 'right',
            value: () => 0,
        },
        dynamicEnd: {
            position: 'left',
            value: () => {
                return 0;
            },
        },
        ease: false,
    });

    return {
        inspirationScroller,
        titleSequencer,
        masterSequencer,
        destroy: () => {
            inspirationScroller.destroy();
            // @ts-ignore
            inspirationScroller = null;
            titleSequencer.destroy();
            // @ts-ignore
            titleSequencer = null;
            masterSequencer.destroy();
            // @ts-ignore
            masterSequencer = null;
        },
    };
};
