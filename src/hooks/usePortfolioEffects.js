import { useEffect, useRef, useState } from 'react';

const isTouchDevice =
  typeof window !== 'undefined' &&
  (('ontouchstart' in window) || navigator.maxTouchPoints > 0);

export function useCustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouchDevice) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      requestAnimationFrame(animate);
    };

    const onOver = (e) => {
      if (!e.target.closest('a, button, input, textarea, .bento-card, .skill-card')) return;
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1.5)';
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.5)';
        ringRef.current.style.borderColor = '#b026ff';
      }
    };

    const onOut = (e) => {
      if (!e.target.closest('a, button, input, textarea, .bento-card, .skill-card')) return;
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
        ringRef.current.style.borderColor = 'rgba(168,85,247,0.6)';
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    const frame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { dotRef, ringRef, isTouchDevice };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [sticky, setSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const prog =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setProgress(Number.isFinite(prog) ? prog : 0);
      setSticky(window.scrollY > 100);

      const sections = document.querySelectorAll('section');
      sections.forEach((sec) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height && id) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { progress, sticky, activeSection };
}

export function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('active');
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.reveal, .slide-left, .slide-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, deps);
}

export function useTypewriter(texts, speed = 100, deleteSpeed = 60, pause = 1800) {
  const [text, setText] = useState('');

  useEffect(() => {
    let tIdx = 0;
    let cIdx = 0;
    let deleting = false;
    let timer;

    const loop = () => {
      const cur = texts[tIdx];
      if (!deleting) {
        cIdx += 1;
        setText(cur.substring(0, cIdx));
        if (cIdx === cur.length) {
          deleting = true;
          timer = setTimeout(loop, pause);
          return;
        }
        timer = setTimeout(loop, speed);
      } else {
        cIdx -= 1;
        setText(cur.substring(0, cIdx));
        if (cIdx === 0) {
          deleting = false;
          tIdx = (tIdx + 1) % texts.length;
        }
        timer = setTimeout(loop, deleteSpeed);
      }
    };

    loop();
    return () => clearTimeout(timer);
  }, [texts, speed, deleteSpeed, pause]);

  return text;
}

export function usePageLoader(loading) {
  const [hidden, setHidden] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 3200;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.85 ? progress * (progress * 0.5 + 0.75) : progress;
      setPct(Math.min(Math.round(eased * 100), 100));
      if (progress < 1) requestAnimationFrame(tick);
    };

    tick();
  }, []);

  useEffect(() => {
    const hide = () => setHidden(true);
    const fallback = setTimeout(hide, 5500);
    if (!loading) {
      const timer = setTimeout(hide, 5500);
      return () => {
        clearTimeout(fallback);
        clearTimeout(timer);
      };
    }
    return () => clearTimeout(fallback);
  }, [loading]);

  return { hidden, pct };
}
