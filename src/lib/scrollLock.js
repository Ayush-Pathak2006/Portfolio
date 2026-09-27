/**
 * Body scroll lock that also pauses Lenis. `overflow: hidden` alone is not
 * enough: Lenis drives scrolling with its own rAF loop and would keep moving
 * the page behind an open overlay.
 */

let scroller = null;
let locks = 0;

export const registerScroller = (instance) => {
    scroller = instance;
};

export const lockScroll = () => {
    locks += 1;
    if (locks > 1) return;
    document.documentElement.style.overflow = "hidden";
    scroller?.stop();
};

export const unlockScroll = () => {
    locks = Math.max(0, locks - 1);
    if (locks > 0) return;
    document.documentElement.style.overflow = "";
    scroller?.start();
};
