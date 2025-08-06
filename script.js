function loco (){
//ye gsap ke scrolltrigger aur smooth scrolling js librabry- locomotive ko saath mei chla raha hai

// Wait for everything to load
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded");
    
    // Check if libraries are available
    // console.log("GSAP available:", typeof gsap !== 'undefined');
    // console.log("ScrollTrigger available:", typeof ScrollTrigger !== 'undefined');
    // console.log("LocomotiveScroll available:", typeof LocomotiveScroll !== 'undefined');
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        console.log("ScrollTrigger registered");
    }

    if (typeof LocomotiveScroll !== 'undefined') {
        // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
        const locoScroll = new LocomotiveScroll({
          el: document.querySelector("#main"),
          smooth: true
        });
        
        console.log("Locomotive Scroll initialized:", locoScroll);

        // Check if ScrollTrigger is available before setting up integration
        if (typeof ScrollTrigger !== 'undefined') {
            // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
            locoScroll.on("scroll", ScrollTrigger.update);

            // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
            ScrollTrigger.scrollerProxy("#main", {
              scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
              }, // we don't have to define a scrollLeft because we're only scrolling vertically.
              getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
              },
              // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
              pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
            });

            // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

            // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
            ScrollTrigger.refresh();
            
            console.log("ScrollTrigger integration setup complete");
        }
    } else {
        console.error("LocomotiveScroll not available");
    }
    
    // Initialize canvas and other DOM-dependent code after DOM is loaded
    initializeAnimations();//jese hi dom content load hoga - locomotive lg jayega and initializeAnimations() function bhi challu ho jayega
    canvas();//iske saath bhi same kkre hai 
    animations1();
    canvas1();
    canvas2(); // Add canvas2 here
  });
}

function initializeAnimations() {
    // Page2 text animation
    var clutter = "";
    const page2h1 = document.querySelector("#page2>h1");
    if (page2h1) {
        page2h1.textContent.split("").forEach(function(dets){
            clutter += `<span>${dets}</span>`
        });
        page2h1.innerHTML = clutter;
        
        gsap.to("#page2>h1>span",{
            scrollTrigger:{
                trigger:`#page2>h1>span`,
                start:`top bottom`,
                end:`bottom top`,
                scroller:`#main`,
                scrub:.5,
            },
            stagger:.2,
            color:`#fff`,
        });
    } 
}

function animations1(){
  //page4 animations
  var clutter1 = "";
    const page4h1 = document.querySelector("#page4>h1");
    if (page4h1) {
        console.log("Page4 h1 found, creating spans"); // Debug log
        page4h1.textContent.split("").forEach(function(dets){
            clutter1 += `<span>${dets}</span>`
        });
        page4h1.innerHTML = clutter1;
          
        gsap.to("#page4>h1>span",{
            scrollTrigger:{
                trigger:`#page4>h1>span`,
                start:`top bottom`,
                end:`bottom top`,
                scroller:`#main`,
                scrub:.5,
            },
            stagger:.2,
            color:`#fff` 
        });
    } 
}

loco();

function canvas(){
    console.log("Canvas function called");
    const canvas = document.querySelector("#page3>canvas");
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }
    
    console.log("Canvas element found:", canvas);
    const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log("Canvas dimensions set:", canvas.width, "x", canvas.height);

// Test that canvas is working
context.fillStyle = "green";
context.fillRect(50, 50, 100, 100);
console.log("Test rectangle drawn on canvas");


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `./frames00007.png
./frames00010.png
./frames00013.png
./frames00016.png
./frames00019.png
./frames00022.png
./frames00025.png
./frames00028.png
./frames00031.png
./frames00034.png
./frames00037.png
./frames00040.png
./frames00043.png
./frames00046.png
./frames00049.png
./frames00052.png
./frames00055.png
./frames00058.png
./frames00061.png
./frames00064.png
./frames00067.png
./frames00070.png
./frames00073.png
./frames00076.png
./frames00079.png
./frames00082.png
./frames00085.png
./frames00088.png
./frames00091.png
./frames00094.png
./frames00097.png
./frames00100.png
./frames00103.png
./frames00106.png
./frames00109.png
./frames00112.png
./frames00115.png
./frames00118.png
./frames00121.png
./frames00124.png
./frames00127.png
./frames00130.png
./frames00133.png
./frames00136.png
./frames00139.png
./frames00142.png
./frames00145.png
./frames00148.png
./frames00151.png
./frames00154.png
./frames00157.png
./frames00160.png
./frames00163.png
./frames00166.png
./frames00169.png
./frames00172.png
./frames00175.png
./frames00178.png
./frames00181.png
./frames00184.png
./frames00187.png
./frames00190.png
./frames00193.png
./frames00196.png
./frames00199.png
./frames00202.png`;
  return data.split("\n")[index];
}

const frameCount = 66;

const images = [];
const imageSeq = {
  frame: 0,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  img.onload = () => {
    console.log(`Frame ${i} loaded:`, img.src);
    if (i === 0) render(); // Render when first image loads
  };
  img.onerror = () => {
    console.error(`Failed to load frame ${i}:`, img.src);
  };
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: .5,
    trigger: `#page3`,
    start: `top top`,
    end: `250% top`,
    scroller: `#main`,
    onUpdate: self => {
      console.log("Current frame:", Math.round(imageSeq.frame));
    }
  },
  onUpdate: render,
});

// Remove this line since we're handling it in the loop above
// images[0].onload = render;

function render() {
  if (images[imageSeq.frame] && images[imageSeq.frame].complete) {
    scaleImage(images[imageSeq.frame], context);
  }
}

function scaleImage(img, ctx) {
  if (!img || !img.complete || !img.naturalWidth) {
    console.log("Image not ready:", img?.src);
    return;
  }
  
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "#page3",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `250% top`,
});
}

function canvas1(){
    console.log("Canvas1 function called");
    const canvas1 = document.querySelector("#page5>canvas");
    if (!canvas1) {
        console.error("Canvas1 element not found");
        return;
    }
    
    console.log("Canvas1 element found:", canvas1);
    const context1 = canvas1.getContext("2d");

    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;

    console.log("Canvas1 dimensions set:", canvas1.width, "x", canvas1.height);

    // Test that canvas1 is working
    context1.fillStyle = "blue";
    context1.fillRect(50, 50, 100, 100);
    console.log("Test rectangle drawn on canvas1");

    window.addEventListener("resize", function () {
      canvas1.width = window.innerWidth;
      canvas1.height = window.innerHeight;
      render1();
    });

    function files1(index) {
      var data = `./bridges00004.png
./bridges00007.png
./bridges00010.png
./bridges00013.png
./bridges00016.png
./bridges00019.png
./bridges00022.png
./bridges00025.png
./bridges00028.png
./bridges00031.png
./bridges00034.png
./bridges00037.png
./bridges00040.png
./bridges00043.png
./bridges00046.png
./bridges00049.png
./bridges00052.png
./bridges00055.png
./bridges00058.png
./bridges00061.png
./bridges00064.png
./bridges00067.png
./bridges00070.png
./bridges00073.png
./bridges00076.png
./bridges00079.png
./bridges00082.png
./bridges00085.png
./bridges00088.png
./bridges00091.png
./bridges00094.png
./bridges00097.png
./bridges00100.png
./bridges00103.png
./bridges00106.png
./bridges00109.png
./bridges00112.png
./bridges00115.png
./bridges00118.png
./bridges00121.png
./bridges00124.png
./bridges00127.png
./bridges00130.png
./bridges00133.png
./bridges00136.png
./bridges00139.png
./bridges00142.png
./bridges00145.png
./bridges00148.png
./bridges00151.png
./bridges00154.png
./bridges00157.png
./bridges00160.png
./bridges00163.png`;
      return data.split("\n")[index];
    }

    const frameCount1 = 53;

    const images1 = [];
    const imageSeq1 = {
      frame: 0,
    };

    for (let i = 0; i < frameCount1; i++) {
      const img = new Image();
      img.src = files1(i);
      img.onload = () => {
        console.log(`Canvas1 Frame ${i} loaded:`, img.src);
        if (i === 0) render1(); // Render when first image loads
      };
      img.onerror = () => {
        console.error(`Canvas1 Failed to load frame ${i}:`, img.src);
      };
      images1.push(img);
    }

    gsap.to(imageSeq1, {
      frame: frameCount1 - 1,
      snap: "frame",
      ease: `none`,
      scrollTrigger: {
        scrub: .5,
        trigger: `#page5`,
        start: `top top`,
        end: `250% top`,
        scroller: `#main`,
        onUpdate: self => {
          console.log("Canvas1 Current frame:", Math.round(imageSeq1.frame));
        }
      },
      onUpdate: render1,
    });

    function render1() {
      if (images1[imageSeq1.frame] && images1[imageSeq1.frame].complete) {
        scaleImage1(images1[imageSeq1.frame], context1);
      }
    }

    function scaleImage1(img, ctx) {
      if (!img || !img.complete || !img.naturalWidth) {
        console.log("Canvas1 Image not ready:", img?.src);
        return;
      }
      
      var canvas = ctx.canvas;
      var hRatio = canvas.width / img.width;
      var vRatio = canvas.height / img.height;
      var ratio = Math.max(hRatio, vRatio);
      var centerShift_x = (canvas.width - img.width * ratio) / 2;
      var centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    }
    
    ScrollTrigger.create({
      trigger: "#page5",
      pin: true,
      scroller: `#main`,
      start: `top top`,
      end: `250% top`,
    });
}


function canvas2(){
  console.log("Canvas2 function called");
  const canvas2 = document.querySelector("#page7>canvas");
  if (!canvas2) {
    console.error("Canvas2 element not found");
    return;
  }
  
  console.log("Canvas2 element found:", canvas2);
  const context2 = canvas2.getContext("2d");

  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;

  console.log("Canvas2 dimensions set:", canvas2.width, "x", canvas2.height);

  window.addEventListener("resize", function () {
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    render2();
  });

  function files2(index) {
    var data = `https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2`;
    return data.split("\n")[index];
  }

  const frameCount2 = 136;

  const images2 = [];
  const imageSeq2 = {
    frame: 0,
  };

  for (let i = 0; i < frameCount2; i++) {
    const img = new Image();
    img.src = files2(i);
    img.onload = () => {
      console.log(`Canvas2 Frame ${i} loaded:`, img.src);
      if (i === 0) render2(); // Render when first image loads
    };
    img.onerror = () => {
      console.error(`Canvas2 Failed to load frame ${i}:`, img.src);
    };
    images2.push(img);
  }

  gsap.to(imageSeq2, {
    frame: frameCount2 - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page7`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
      onUpdate: self => {
        console.log("Canvas2 Current frame:", Math.round(imageSeq2.frame));
      }
    },
    onUpdate: render2,
  });

  function render2() {
    if (images2[imageSeq2.frame] && images2[imageSeq2.frame].complete) {
      scaleImage2(images2[imageSeq2.frame], context2);
    }
  }

  function scaleImage2(img, ctx) {
    if (!img || !img.complete || !img.naturalWidth) {
      console.log("Canvas2 Image not ready:", img?.src);
      return;
    }
    
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  
  ScrollTrigger.create({
    trigger: "#page7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}

gsap.to(".page7-cir",{
  scrollTrigger:{
    trigger:`.page7-cir`,
    start:`top center`,
    end:`bottom top`,
    scroller:`#main`,
    scrub:.5
  },
  scale:1.5
})



gsap.to(".page7-cir-inner",{
  scrollTrigger:{
    trigger:`.page7-cir-inner`,
    start:`top center`,
    end:`bottom top`,
    scroller:`#main`,
    scrub:.5
  },
  backgroundColor : `#0a3bce91`,
})








