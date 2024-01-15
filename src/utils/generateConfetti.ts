import confetti from "canvas-confetti";

const end = Date.now() + 2 * 1000;

const colors = ["#ff1700", "#5800ff"];

export const generateConfetti = () => {
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 180,
      spread: 800,
      origin: { y: 0 },
      colors: colors,
      shapes: ["circle", "square"],
    });
  //confetti({
  //  particleCount: 2,
  //  angle: 120,
  //  spread: 100,
  //  origin: { x: 1 },
  //  colors: colors,
  //  shapes: ["circle", "square"],
  //});

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
