// Site-wide settings. Change the contact address here only.
const SITE = {
  email: "fedir@mriyaworks.com",
  linkedin: "https://www.linkedin.com/in/fedir-danylov-abb36a19a/",
};

document.querySelectorAll("[data-email]").forEach((el) => {
  el.textContent = SITE.email;
  if (el.tagName === "A") el.href = "mailto:" + SITE.email;
});
document.querySelectorAll("[data-mailto]").forEach((el) => {
  el.href = "mailto:" + SITE.email + (el.dataset.mailto ? "?subject=" + encodeURIComponent(el.dataset.mailto) : "");
});
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
}

// Reveal on scroll
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12 })
  : null;
document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

// Ambient "living paint" preview for the Interactive Effects card
const canvas = document.querySelector("#paint");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, t = 0;
  const pointer = { x: 0.5, y: 0.5 };
  const blobs = Array.from({ length: 7 }, (_, i) => ({
    hue: [45, 25, 210, 265, 190, 330, 15][i],
    sx: 0.2 + Math.random() * 0.6, sy: 0.2 + Math.random() * 0.6,
    fx: 0.3 + Math.random() * 0.5, fy: 0.3 + Math.random() * 0.5,
    r: 0.22 + Math.random() * 0.18,
  }));
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const draw = () => {
    t += 0.006;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(7, 9, 20, 0.28)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    blobs.forEach((b, i) => {
      const x = (b.sx + Math.sin(t * b.fx + i) * 0.25 + (pointer.x - 0.5) * 0.15 * (i % 2 ? 1 : -1)) * w;
      const y = (b.sy + Math.cos(t * b.fy + i * 1.7) * 0.25 + (pointer.y - 0.5) * 0.15) * h;
      const r = b.r * Math.max(w, h);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `hsla(${b.hue + Math.sin(t) * 20}, 90%, 55%, 0.16)`);
      g.addColorStop(1, "hsla(0, 0%, 0%, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });
    if (!reduce) requestAnimationFrame(draw);
  };
  canvas.parentElement.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = (e.clientX - r.left) / r.width;
    pointer.y = (e.clientY - r.top) / r.height;
  });
  window.addEventListener("resize", resize);
  resize();
  draw();
}
