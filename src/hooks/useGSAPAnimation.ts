import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimation = () => {
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const heroTextStagger = (containerRef) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }, containerRef);
    return () => ctx.revert();
  };

  const scrollFadeInStagger = (containerRef, selector = '> *') => {
    if (prefersReducedMotion || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }, containerRef);
    return () => ctx.revert();
  };

  const counterAnimation = (elementRef, endValue) => {
    if (prefersReducedMotion || !elementRef.current) {
      if (elementRef.current) elementRef.current.innerText = endValue;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 90%',
        },
        innerText: endValue,
        duration: 1,
        snap: { innerText: 1 },
        ease: 'power1.out'
      });
    }, elementRef);
    return () => ctx.revert();
  };

  const formFieldStagger = (containerRef) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('form > div, form > button', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }, containerRef);
    return () => ctx.revert();
  };

  const shakeError = (elementRef) => {
    if (prefersReducedMotion || !elementRef.current) return;
    gsap.fromTo(elementRef.current, 
      { x: -10 },
      { x: 10, duration: 0.1, yoyo: true, repeat: 3, ease: 'linear', clearProps: 'x' }
    );
  };

  return {
    heroTextStagger,
    scrollFadeInStagger,
    counterAnimation,
    formFieldStagger,
    shakeError,
    prefersReducedMotion
  };
};