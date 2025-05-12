const names = ['Liu Yunhao', 'Maximum', '刘运浩'];
let currentNameIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingDelay = 150;
const newNameDelay = 2000;

function typeEffect() {
    const currentName = names[currentNameIndex];
    const typedElement = document.getElementById('typed-name');
    if (!typedElement) return;
    if (isDeleting) {
        typedElement.textContent = currentName.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typedElement.textContent = currentName.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }
    if (!isDeleting && currentCharIndex === currentName.length) {
        isDeleting = true;
        setTimeout(typeEffect, newNameDelay);
        return;
    }
    if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentNameIndex = (currentNameIndex + 1) % names.length;
        setTimeout(typeEffect, typingDelay);
        return;
    }
    setTimeout(typeEffect, typingDelay);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate the hero section
    gsap.from(".hero-section", { duration: 1, opacity: 0, y: -50, ease: "power2.out" });

    // Animate the profile text
    gsap.from(".profile-text", { duration: 1, opacity: 0, x: -50, delay: 0.5, ease: "power2.out" });

    // Animate the profile image
    gsap.from(".profile-image", { duration: 1, opacity: 0, x: 50, delay: 0.5, ease: "power2.out" });
});

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const content = document.querySelector('#content');

// Making some circles noise
const simplex = new SimplexNoise();
for (let i = 0; i < 5000; i++) {
  const div = document.createElement('div');
  div.classList.add('circle');
  const n1 = simplex.noise2D(i * 0.003, i * 0.0033);
  const n2 = simplex.noise2D(i * 0.002, i * 0.001);
  
  const style = {
    transform: `translate(${n2 * 200}px) rotate(${n2 * 270}deg) scale(${3 + n1 * 2}, ${3 + n2 * 2})`,
    boxShadow: `0 0 0 .2px hsla(${Math.floor(i*0.3)}, 70%, 70%, .6)`
  };
  Object.assign(div.style, style);
  content.appendChild(div);
}
const Circles = document.querySelectorAll('.circle');

// Init ScrollSmoother
const scrollerSmoother = ScrollSmoother.create({
  content: content,
  wrapper: '#wrapper',
  smooth: 1,
  effects: false
});

// Scroll Trigger
const main = gsap.timeline({
  scrollTrigger: {
    scrub: .7,
    start: "top 25%",
    end: "bottom bottom"
  }
});
Circles.forEach((circle) => {
  main.to(circle, {
    opacity: 1,
  });
});
