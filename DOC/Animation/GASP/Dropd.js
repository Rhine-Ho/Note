// DesignCourse Create an Awesome Text Reveal Animation with GSAP
// DesignCourse Color Fonts are SICK! Gradients, CSS Customization & More..

const title = document.querySelector("h1");
const text = new SplitType(".text");
let isClicked = false;
let animation;

const loadAnimation = () => {
  animation = gsap.to(".char", {
    y: 0,
    stagger: 0.05,
    delay: 0.2,
    duration: 0.5
  });
};

title.addEventListener("click", () => {
  if (isClicked) return;
  isClicked = true;

  text.chars.forEach((char) => {
    char.style.transform = "translateY(-115px)";
    char.style.transition = "none";
  });

  animation.restart();

  setTimeout(() => {
    isClicked = false;
  }, 800);
});

window.addEventListener("load", loadAnimation);
