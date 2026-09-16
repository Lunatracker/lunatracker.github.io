// lunatracker.app: menu, scroll reveal, Question Box search, and the two
// interactive Learn lessons. Every page works without this file.
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {
    setupHeader();
    setupReveal();
    setupQuestionSearch();
    openHashedQuestion();
    document.querySelectorAll("[data-body-diagram]").forEach(setupBodyDiagram);
    document.querySelectorAll("[data-cycle]").forEach(setupCycle);
  });

  /* ---------- Header ---------- */

  function setupHeader() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!toggle || !nav) return;
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Entrance: fade + rise, once ---------- */

  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- Question Box ---------- */

  function setupQuestionSearch() {
    var input = document.querySelector("[data-q-search]");
    if (!input) return;
    var sections = document.querySelectorAll("[data-q-section]");
    var empty = document.querySelector("[data-q-empty]");

    input.addEventListener("input", function () {
      var terms = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      var total = 0;
      sections.forEach(function (section) {
        var shown = 0;
        section.querySelectorAll(".qa").forEach(function (qa) {
          var text = qa.textContent.toLowerCase();
          var match = terms.every(function (t) {
            return text.indexOf(t) !== -1;
          });
          qa.hidden = !match;
          if (terms.length) qa.open = match;
          else qa.open = false;
          if (match) shown++;
        });
        section.hidden = shown === 0;
        total += shown;
      });
      if (empty) empty.hidden = total !== 0;
    });
  }

  function openHashedQuestion() {
    var open = function () {
      var id = decodeURIComponent(location.hash.slice(1));
      var el = id && document.getElementById(id);
      if (el && el.tagName === "DETAILS") el.open = true;
    };
    open();
    window.addEventListener("hashchange", open);
  }

  /* ---------- Reproductive system diagram ---------- */

  function setupBodyDiagram(root) {
    var stage = root.querySelector(".body-stage");
    var layers = Array.prototype.slice.call(root.querySelectorAll(".body-layer"));
    var buttons = root.querySelectorAll("button[data-part]");
    var text = root.querySelector(".body-text");
    // Small parts win over the big ones they sit on.
    var priority = ["cervix", "vagina", "ovaries", "ft", "uterus"];
    var canvases = {};

    var select = function (id) {
      layers.forEach(function (l) {
        l.classList.toggle("is-active", l.dataset.part === id);
      });
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.part === id));
      });
      var tpl = root.querySelector('template[data-part="' + id + '"]');
      if (tpl) text.innerHTML = tpl.innerHTML;
    };

    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        select(b.dataset.part);
      });
    });

    // Is the point (in stage pixels) on an opaque pixel of this layer?
    var hits = function (layer, x, y) {
      var r = layer.getBoundingClientRect();
      var s = stage.getBoundingClientRect();
      var lx = x - (r.left - s.left);
      var ly = y - (r.top - s.top);
      if (lx < 0 || ly < 0 || lx > r.width || ly > r.height) return false;
      var w = layer.naturalWidth;
      var h = layer.naturalHeight;
      if (!w || !h) return true;
      // object-fit: contain
      var scale = Math.min(r.width / w, r.height / h);
      var ox = (r.width - w * scale) / 2;
      var oy = (r.height - h * scale) / 2;
      var px = Math.floor((lx - ox) / scale);
      var py = Math.floor((ly - oy) / scale);
      if (px < 0 || py < 0 || px >= w || py >= h) return false;
      try {
        var id = layer.dataset.part;
        var ctx = canvases[id];
        if (!ctx) {
          var c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          ctx = c.getContext("2d", { willReadFrequently: true });
          ctx.drawImage(layer, 0, 0);
          canvases[id] = ctx;
        }
        return ctx.getImageData(px, py, 1, 1).data[3] > 40;
      } catch (err) {
        // Canvas is tainted (e.g. opened from file://): fall back to the box.
        return true;
      }
    };

    var partAt = function (e) {
      var s = stage.getBoundingClientRect();
      var x = e.clientX - s.left;
      var y = e.clientY - s.top;
      for (var i = 0; i < priority.length; i++) {
        var layer = stage.querySelector('.body-layer[data-part="' + priority[i] + '"]');
        if (layer && hits(layer, x, y)) return priority[i];
      }
      // The uterus drawing is hollow in the middle; that space is still the uterus.
      var u = stage.querySelector('.body-layer[data-part="uterus"]').getBoundingClientRect();
      if (e.clientX >= u.left && e.clientX <= u.right && e.clientY >= u.top && e.clientY <= u.top + u.height * 0.75) {
        return "uterus";
      }
      return null;
    };

    stage.addEventListener("click", function (e) {
      var id = partAt(e);
      if (id) select(id);
    });
    stage.addEventListener("mousemove", function (e) {
      var id = partAt(e);
      stage.style.cursor = id ? "pointer" : "default";
      layers.forEach(function (l) {
        l.classList.toggle("is-hover", l.dataset.part === id);
      });
    });
    stage.addEventListener("mouseleave", function () {
      layers.forEach(function (l) {
        l.classList.remove("is-hover");
      });
    });
  }

  /* ---------- Menstrual cycle stepper ---------- */

  function setupCycle(root) {
    var steps = root.querySelectorAll(".cycle-step");
    var arcs = root.querySelectorAll(".cycle-arc");
    var img = root.querySelector(".cycle-img");
    var label = root.querySelector(".cycle-label");
    var prev = root.querySelector("[data-cycle-prev]");
    var next = root.querySelector("[data-cycle-next]");
    var names = { period: "Period", lining1: "Lining builds", ovulation: "Ovulation", lining2: "Lining builds" };
    var current = 0;

    var show = function (i) {
      current = i;
      var step = steps[i];
      steps.forEach(function (s, j) {
        s.hidden = j !== i;
      });
      var phase = step.dataset.phase;
      arcs.forEach(function (a) {
        a.classList.toggle("is-active", a.dataset.phase === phase);
      });
      label.textContent = names[phase];
      if (img.getAttribute("src") !== step.dataset.img) {
        img.classList.add("is-fading");
        setTimeout(function () {
          img.src = step.dataset.img;
          img.classList.remove("is-fading");
        }, 200);
      }
      prev.disabled = i === 0;
      next.innerHTML = i === steps.length - 1 ? "Start over" : next.dataset.label;
    };

    next.dataset.label = next.innerHTML;
    next.addEventListener("click", function () {
      show(current === steps.length - 1 ? 0 : current + 1);
    });
    prev.addEventListener("click", function () {
      if (current > 0) show(current - 1);
    });
    arcs.forEach(function (arc) {
      arc.addEventListener("click", function () {
        for (var j = 0; j < steps.length; j++) {
          if (steps[j].dataset.phase === arc.dataset.phase) return show(j);
        }
      });
    });
    show(0);
  }
})();
