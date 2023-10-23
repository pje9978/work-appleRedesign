gsap.registerPlugin(ScrollTrigger);

const aniNav = gsap.timeline();
ScrollTrigger.create({
  animation: aniNav,
  trigger: "main",
  start: "top 5%",
  end: "+=10000",
  toggleClass: { targets: ".lnb", className: "active" },
  scrub: true,
  anticipatePin: 1,
  markers: {
    startColor: "red",
    endColor: "red",
  },
});

// 01 : 텍스트 확대하기
const ani1 = gsap.timeline();
ani1
  .fromTo(
    "#section1 h2 span:last-child",
    { x: 1000, duration: 10 },
    { x: 0, duration: 10 }
  )
  .to("#section1 h2:first-child", { scale: 60, duration: 2, autoAlpha: 1 })
  .to("#section1 h2:first-child", { autoAlpha: 0 })
  .fromTo(
    "#section1 figure",
    { autoAlpha: 0, y: 1000, duration: 10 },
    { autoAlpha: 1, y: 0, duration: 10 }
  );

ScrollTrigger.create({
  animation: ani1,
  trigger: "#section1",
  toggleClass: "active",
  start: "top top",
  end: "bottom",
  scrub: true,
  pin: "#section1",
  anticipatePin: 1,
  markers: false,
});

const ani2 = gsap.timeline();
ani2
  .to("#section2 video", {})
  .from("#section2 h4", { autoAlpha: 0, duration: 1, y: 100 })
  .fromTo(
    "#section2 h4 span:last-child",
    { autoAlpha: 0, x: 1000, duration: 2 },
    { autoAlpha: 1, x: 0, duration: 2 }
  )
  .from("#section2 video", { autoAlpha: 0 }, { autoAlpha: 1 });

ScrollTrigger.create({
  animation: ani2,
  pin: "#section2",
  start: "top 20%",
  // toggleAction:"restart,none,none,none",
  scrub: true,
  duration: 3,
  toggleClass: "active",
});

//video 재생

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

/* ---------------------------------- */
/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 10 },
  scrollTrigger: {
    trigger: "#section2",
    start: "top 80%",
    end: "top 20%",
    scrub: true,
    // duration: 10
  },
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0,
    },
    {
      currentTime: video.duration || 5,
    }
  );
});

/* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);



// let panels = gsap.utils.toArray(".colorProdWrap figure");
// let tops = panels.map(panel => ScrollTrigger.create({trigger: panel, start: "top 10%"}));

// const ani3 = gsap.timeline();
// ani3.to("#section3 figcaption",{x:200})



// panels.forEach((panel, i) => {
//     ScrollTrigger.create({
//         animation: ani3,
//         trigger: panel,
//         toggleAction:"play,none,none,none",
//         start: () => panel.offsetHeight < window.innerHeight ? "top 10%" : "top bottom",
//         pin: true, 
//         pinSpacing: false,
//         scrub: true
//     });
// });

// ScrollTrigger.create({
//     snap: {
//         snapTo: (progress, self) => {
//             let panelStarts = tops.map(st => st.start), 
//             snapScroll = gsap.utils.snap(panelStarts, self.scroll()); 
//             return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll); 
//         },
//         duration: 0.5
//     }
// });

//: 텍스트 제자리 애니메이션
const ani3 = gsap.timeline();
ani3.from("#section3 h4", {autoAlpha: 0, duration: 1, y: 100}, "+=1")
    .from("#section3 .color1", {autoAlpha: 0, duration: 1, y: -50}, "+=1")
    .to(".color1 figcaption",{autoAlpha: 1,  duration: 5, y: 100})
    .to("#section3 .color1", {autoAlpha: 0})
    .from("#section3 .color2", {autoAlpha: 0, duration: 1, y: 50}, "+=1")
    .to(".color2 figcaption",{autoAlpha: 1,  duration: 5, y: 100})
    .to("#section3 .color2", {autoAlpha: 0})
    .from("#section3 .color3", {autoAlpha: 0, duration: 1, y: 50}, "+=1")
    .to(".color3 figcaption",{autoAlpha: 1,  duration: 5, y: 100})
    .to("#section3 .color3", {autoAlpha: 0})
    .from("#section3 .color4", {autoAlpha: 0, duration: 1, y: 50}, "+=1")
    .to("#section3 .color4", {autoAlpha: 0})

ScrollTrigger.create({
    animation: ani3,
    trigger: "#section3",
    start: "top 20%",
    end: "+=7000",
    scrub: true,
    pin: true,
    markers: false,
    anticipatePin: 1
});