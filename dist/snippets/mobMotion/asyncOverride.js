/*
 * myTimeline[action](
 *      myTweenInstance,
 *      { Object.<string, (Number|Function)> },
 *      {
 *          --------------
 *          `Tween`
 *          --------------
 *          ease?: String,
 *          duration?: ( Number|Function ),
 *
 *          --------------
 *          `Spring`
 *          --------------
 *          config?: String,
 *          configProp: {
 *             tension?: Number,
 *             mass?: Number,
 *             friction?: Number,
 *             velocity?: Number,
 *             precision?: Number,
 *          },
 *
 *          --------------
 *          `Lerp`
 *          --------------
 *          precision?: Number,
 *          velocity?: Number,
 *
 *          --------------
 *          `common`
 *          --------------
 *          delay?: Number,
 *      }
 *  )
 *  */

myTimeline.goTo(myTween, { x: 10, y: 10 }, { duration: 2000, delay: 500 });
