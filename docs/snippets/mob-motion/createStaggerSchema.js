const staggers = MobTween.createStaggers({
    items: Array<HTMLElement|WeakRef|Object>,
    stagger?: {
        type?: String,
        from?: Number|String|{x:number,y:number},
        grid?: {
            col?: Number,
            row?: Number,
            direction?: String
        },
    },
    duration?: Number,
});
