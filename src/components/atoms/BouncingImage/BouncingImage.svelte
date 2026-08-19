<script lang="ts">
  import { onMount } from 'svelte';
  import type { BaseProps } from '@utils/types';

  export type BouncingImageProps = BaseProps & {
    src: string;
    alt: string;
    container?: string;
    momentumLoss?: number;
    maxVelocity?: number;
    friction?: number;
    trailSize?: number;
  };

  let {
    src,
    alt,
    container = 'main',
    momentumLoss = 0.2,
    maxVelocity = 60,
    friction = 0.99,
    trailSize = 2,
    class: className,
    ...props
  }: BouncingImageProps = $props();

  let img: HTMLImageElement;
  let currentX = 0;
  let currentY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let lastX = 0;
  let lastY = 0;
  let lastTime = 0;
  let rafId: number | null = null;

  function getBounds() {
    const containerEl = document.querySelector(container);
    if (!img || !containerEl) return null;

    const containerRect = containerEl.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const baseLeft = imgRect.left - currentX;
    const baseTop = imgRect.top - currentY;

    return {
      minX: containerRect.left - baseLeft,
      maxX: containerRect.right - (baseLeft + imgRect.width),
      minY: containerRect.top - baseTop,
      maxY: containerRect.bottom - (baseTop + imgRect.height),
    };
  }

  function clamp(bounce = false) {
    updateTransform();
    const bounds = getBounds();
    if (!bounds) return false;

    const minX = Math.min(bounds.minX, bounds.maxX);
    const maxX = Math.max(bounds.minX, bounds.maxX);
    const minY = Math.min(bounds.minY, bounds.maxY);
    const maxY = Math.max(bounds.minY, bounds.maxY);

    const bounceFactor = 1 - momentumLoss;
    let hit = false;

    if (currentX < minX) {
      currentX = minX;
      if (bounce) velocityX = -velocityX * bounceFactor;
      hit = true;
    } else if (currentX > maxX) {
      currentX = maxX;
      if (bounce) velocityX = -velocityX * bounceFactor;
      hit = true;
    }

    if (currentY < minY) {
      currentY = minY;
      if (bounce) velocityY = -velocityY * bounceFactor;
      hit = true;
    } else if (currentY > maxY) {
      currentY = maxY;
      if (bounce) velocityY = -velocityY * bounceFactor;
      hit = true;
    }

    return hit;
  }

  function updateTransform() {
    if (img) {
      img.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }
  }

  function updateFilter() {
    if (!img) return;

    const speed = Math.hypot(velocityX, velocityY);
    if (speed < 0.5) {
      img.style.filter = '';
      return;
    }

    const scale = 0.6;
    const maxOffset = 30;
    const shadowX = Math.max(-maxOffset, Math.min(maxOffset, -velocityX * scale)) * trailSize;
    const shadowY = Math.max(-maxOffset, Math.min(maxOffset, -velocityY * scale)) * trailSize;

    img.style.filter = `drop-shadow(${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 10px rgba(var(--glow-color, var(--t--accent--rgb)), 0.5))`;
  }

  function stopMomentum() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function animateMomentum() {
    const stopThreshold = 0.3;
    let prevTime = performance.now();

    function step() {
      const now = performance.now();
      const dt = (now - prevTime) / 16.67;
      prevTime = now;

      velocityX *= friction;
      velocityY *= friction;

      if (Math.abs(velocityX) < stopThreshold) velocityX = 0;
      if (Math.abs(velocityY) < stopThreshold) velocityY = 0;

      if (velocityX === 0 && velocityY === 0) {
        if (img) {
          img.style.transition = '';
          img.style.filter = '';
        }
        rafId = null;
        return;
      }

      currentX += velocityX * dt;
      currentY += velocityY * dt;
      clamp(true);

      updateTransform();
      updateFilter();
      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
  }

  function handlePointerDown(e: PointerEvent) {
    e.preventDefault();
    stopMomentum();
    img?.setPointerCapture(e.pointerId);

    isDragging = true;
    if (img) {
      img.style.cursor = 'grabbing';
      img.style.transition = 'none';
      img.style.animation = 'none';
    }

    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = performance.now();
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging || !img) return;
    e.preventDefault();

    const now = performance.now();
    const dt = now - lastTime;

    currentX = e.clientX - startX;
    currentY = e.clientY - startY;

    if (dt > 0) {
      velocityX = ((e.clientX - lastX) / dt) * 16.67;
      velocityY = ((e.clientY - lastY) / dt) * 16.67;
    }

    clamp(false);

    startX = e.clientX - currentX;
    startY = e.clientY - currentY;

    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = now;

    updateTransform();
    updateFilter();
  }

  function handlePointerUp(e: PointerEvent) {
    if (!isDragging || !img) return;
    isDragging = false;
    img.releasePointerCapture(e.pointerId);
    img.style.cursor = 'grab';

    const speed = Math.hypot(velocityX, velocityY);
    if (speed > maxVelocity) {
      const scale = maxVelocity / speed;
      velocityX *= scale;
      velocityY *= scale;
    }

    if (speed > 0.5) {
      animateMomentum();
    } else if (img) {
      img.style.transition = '';
      img.style.filter = '';
    }
  }

  function handlePointerCancel(e: PointerEvent) {
    isDragging = false;
    img?.releasePointerCapture(e.pointerId);
    if (img) {
      img.style.cursor = 'grab';
      img.style.transition = '';
      img.style.filter = '';
    }
  }

  onMount(() => {
    if (!img) return;

    img.style.touchAction = 'none';
    img.draggable = false;

    img.addEventListener('pointerdown', handlePointerDown);
    img.addEventListener('pointermove', handlePointerMove);
    img.addEventListener('pointerup', handlePointerUp);
    img.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      img.removeEventListener('pointerdown', handlePointerDown);
      img.removeEventListener('pointermove', handlePointerMove);
      img.removeEventListener('pointerup', handlePointerUp);
      img.removeEventListener('pointercancel', handlePointerCancel);
      stopMomentum();
    };
  });
</script>

<img bind:this={img} {src} {alt} draggable="false" loading="eager" class={['a-bouncing-image', className]} {...props} />

<style lang="scss">
  .a-bouncing-image {
    touch-action: none;
    user-select: none;
    -webkit-user-drag: none;
    cursor: grab;

    transition: all 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955);

    &:hover {
      filter: drop-shadow(0 0 6px rgba(var(--glow-color, var(--t--accent--rgb)), 0.5));
      scale: 1.01;
    }
  }
</style>
