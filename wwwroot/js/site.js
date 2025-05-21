// Index.cshtml
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

    // AboutMe卡片顶部大学图标点动画
    const eduIcon = document.querySelector('.edu-icon i');
    if (eduIcon) {
        gsap.to(eduIcon, {
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            duration: 0.5,
            ease: "power1.inOut"
        });
    }

    // AboutMe卡片logo鼠标悬停和点击动画
    const logoImg = document.querySelector('img[alt="Xiamen University Logo"]');
    if (logoImg) {
        logoImg.style.cursor = 'pointer';
        logoImg.addEventListener('mouseenter', () => {
            gsap.to(logoImg, { scale: 1.15, rotateY: 360, duration: 0.6, ease: "power2.out" });
        });
        logoImg.addEventListener('mouseleave', () => {
            gsap.to(logoImg, { scale: 1, rotateY: 0, duration: 0.6, ease: "power2.inOut" });
        });
        logoImg.addEventListener('click', () => {
            window.open('https://en.xmu.edu.cn/main.htm', '_blank');
        });
        // AboutMe页面入场动画：logo
        gsap.from(logoImg, { opacity: 0, y: -40, scale: 0.7, duration: 1, ease: "power2.out" });
    }

    // AboutMe页面入场动画：卡片
    const aboutMeCard = document.querySelector('.card');
    if (aboutMeCard) {
        gsap.from(aboutMeCard, { opacity: 0, y: 60, scale: 0.95, duration: 1, delay: 0.2, ease: "power2.out" });
    }
});

//AboutMe.cshtml
document.addEventListener('DOMContentLoaded', () => {
    // 初始化 ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 为每个技术栈卡片添加滚动动画
    const techCards = document.querySelectorAll('.row .col');
    techCards.forEach((card, index) => {
        // 滚动动画
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out"
        });

        // 鼠标悬停动画
        const cardElement = card.querySelector('.card');
        const iconElement = card.querySelector('.mb-3 img, .mb-3 i');
        const titleElement = card.querySelector('.card-title');
        const textElement = card.querySelector('.card-text');

        cardElement.addEventListener('mouseenter', () => {
            gsap.to(cardElement, {
                y: -12,
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.45)",
                duration: 0.4,
                ease: "power2.out"
            });
            gsap.to(iconElement, {
                scale: 1.2,
                duration: 0.4,
                ease: "power2.out"
            });
            gsap.to([titleElement, textElement], {
                y: -2,
                duration: 0.4,
                ease: "power2.out"
            });
            gsap.to(titleElement, {
                color: "#3498db",
                duration: 0.4,
                ease: "power2.out"
            });
        });

        cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
                y: 0,
                scale: 1,
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
                duration: 0.4,
                ease: "power2.out"
            });
            gsap.to(iconElement, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
            gsap.to([titleElement, textElement], {
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            });
            gsap.to(titleElement, {
                color: "#2c3e50",
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });

    // 为技术栈标题添加动画
    const techTitle = document.querySelector('.container.mt-5 h2');
    if (techTitle) {
        gsap.from(techTitle, {
            scrollTrigger: {
                trigger: techTitle,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    }

    // GitHub Contribution Activity 动画
    const githubCard = document.querySelector('.github-activity-card');
    if (githubCard) {
        gsap.from(githubCard, {
            scrollTrigger: {
                trigger: githubCard,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
        });
    }
});

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // 横滑区域
    const slider = document.getElementById('project-slider');
    if (slider) {
        const cards = slider.querySelectorAll('.project-card');
        const cardCount = cards.length;
        const container = slider.parentElement;
        const containerWidth = container.offsetWidth;
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || 0, 10);

        // 横向滚动总宽度
        const totalScroll = cardWidth * cardCount - containerWidth;

        // 横向滚动动画
        gsap.to(slider, {
            x: () => -(totalScroll),
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".project-slider-section",
                start: "top top",
                end: () => `+=${totalScroll}`,
                scrub: 0.6,
                pin: true,
                anticipatePin: 1,
                snap: {
                    snapTo: 1 / (cardCount - 1),
                    duration: {min: 0.2, max: 0.5},
                    ease: "power1.inOut"
                }
            }
        });
    }

    // Projects title animation
    const projectsTitle = document.querySelector('.project-title');
    if (projectsTitle) {
        gsap.from(projectsTitle, {
            scrollTrigger: {
                trigger: projectsTitle,
                start: "top 80%",
                toggleActions: "play none none reverse",
                // markers: true // Uncomment for debugging
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.classList.contains('photography-page')) return;
  
    gsap.registerPlugin(ScrollTrigger);
  
    // h1 entrance animation
    gsap.from('.photography-page .header-section h1', {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: 'power3.out'
    });
  
    // Skew scroll effect for images
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".photography-page .skewElem", "skewY", "deg"),
        clamp = gsap.utils.clamp(-20, 20);
  
    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });
    gsap.set(".photography-page .skewElem", { transformOrigin: "right center", force3D: true });
  });
  