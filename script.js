const ani1 = gsap.timeline();

ani1.from("#section1 .title1",{y:100,autoAlpha:0})
    .from("#section1 .title2",{y:100,autoAlpha:0})
    // .to("#section1 .title-group",{y:100,autoAlpha:1})
    .from("#section1 .title3",{y:100,autoAlpha:0})
    // .from("#section1 img",{y:100,autoAlpha:0})
    .to("#section1",{y:100, autoAlpha:0})


ScrollTrigger.create({
    animation:ani1,
    trigger:"#section1",
    start:"top top",
    end:"+=3000",
    scrub:true,
    pin:true,
    // markers:false,
    anticipatePin:1
})


const ani2 = gsap.timeline();
ani2.from("#section2",{duration:0.2, autoAlpha:0})


ScrollTrigger.create({
    animation:ani2,
    trigger:"#section2",
    start:"top top",
    end:"+=2000",
    pin:true,
    anticipatePin:1,
    scrub:true,
    // markers:false,
})

const ani3 = gsap.timeline();
ani3.from("#section3 img",{duration:0.2, scale:1.3, autoAlpha:0.4})
    .to("#section3 img",{duration:0.2, scale:1, autoAlpha:1});

ScrollTrigger.create({
    animation:ani3,
    trigger:"#section3",
    start:"top top",
    end:"+=3000",
    pin:true,
    anticipatePin:1,
    scrub:true,
    // markers:false,
})

const ani4 = gsap.timeline();
ani4.from("#section4>img",{duration:0.2, scale:1.2, autoAlpha:0.4})
    .to("#section4>img",{duration:0.2, scale:1, autoAlpha:1});

ScrollTrigger.create({
    animation:ani4,
    trigger:"#section4",
    start:"top top",
    end:"+=3000",
    pin:true,
    anticipatePin:1,
    scrub:true,
    // markers:false,
})

/* =============================================================================   스크롤시 자동 애니메이션 */

const hide = (item) => {
    gsap.set(item, {autoAlpha:0});
}

const animate = (item) => {
    let x =0;
    let y=0;
    let delay = item.dataset.delay;

    if(item.classList.contains("reveal_LR")){
        x = -100;
        y = 0;
    }else if(item.classList.contains("reveal_BT")){
        x = 0;
        y = 100;
    }else if(item.classList.contains("reveal_TB")){
        x = 0;
        y = -100;
    }else{
        x=100;
        y=0;
    }
    gsap.fromTo(item,
        {autoAlpha: 0, x:x, y:y},
        {autoAlpha: 1, x:0, y:0, delay:delay, duration: 1.25, overwrite:"auto", ease:"expo"})
}
gsap.utils.toArray(".reveal").forEach((item) => {
    hide(item);
    ScrollTrigger.create({
        start: "top 50%",
        end: "bottom 20%",
        trigger: item,
        // markers:true,
        onEnter: () => {animate(item)},
    });
});