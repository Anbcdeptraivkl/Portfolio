var heroBlock = document.querySelector(".hero-block");
var heroContent = document.querySelector(".hero-block .content");
var onScrollElements = document.querySelectorAll(".scroll-reveal");

// On Page Load Animations
function onLoadAnimations() {
    let timeline = gsap.timeline();
    timeline
        .to(heroBlock, {duration: 0.75, opacity: 1})
        .from(heroContent, {duration: 0.5, opacity: 0, x: -200, onComplete: readyEvents(heroContent)}, "-=0.5");
}

function readyEvents(element) {
    element.style.pointerEvents = "auto";
}

// Reveal on Scrolls Animations

// Check if ELements are Visible on Scrolled Viewport, even if just a reach
function reachedViewPort(element) {
    let bounding = element.getBoundingClientRect();
    let inViewPort = (
        bounding.bottom >= 0 &&
        bounding.top < (window.innerHeight || document.documentElement.clientHeight)
    );
    return inViewPort;
}

// Play Animation
function scrollRevealAnimations(timeline) {
    for (let i = 0; i < onScrollElements.length; i++) {
        if (reachedViewPort(onScrollElements[i]) && onScrollElements[i].classList.contains("scroll-reveal")) {
            onScrollElements[i].classList.remove('scroll-reveal');
            onScrollElements[i].classList.add('scrolled');
            
            if (onScrollElements[i].classList.contains("scroll-slide")) {
                timeline.add(gsap.fromTo(
                    onScrollElements[i], 
                    {opacity: 0, y: 100},
                    {duration: 0.3, opacity: 1, y: 0, onComplete: readyEvents(onScrollElements[i])}),
                );
            } else if (onScrollElements[i].classList.contains("scroll-pop")) {
                timeline.add(gsap.fromTo(
                    onScrollElements[i], 
                    {opacity: 0, scaleX: 0, scaleY: 0},
                    {duration: 0.3, opacity: 1, scaleX: 1, scaleY: 1, onComplete: readyEvents(onScrollElements[i])}),
                );
            }
        }
    }
}

/* UPDATE */
// Update function will be called each frame (60ms) continously
function update() {
    let scrollTimeline = gsap.timeline();
    scrollRevealAnimations(scrollTimeline);
}

/* MAIN */
// All Processes will be Executed sequentially here
window.onload = onLoadAnimations();
setInterval(update, 16);