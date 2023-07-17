import { browser } from "$app/environment";

export function clearSparkles() {
  if (browser) {
    const sparklesWrappers = Array.from(document.getElementsByClassName('sparkles-wrapper'));
    sparklesWrappers.forEach((sparklesWrapper) => {
      clearInterval((sparklesWrapper as any).sparklesInterval);
    });
  }
}

export function handleSparklesWrapper() {
  const sparklesWrappers = document.getElementsByClassName('sparkles-wrapper');

  // Helper function to generate a random number between min and max (inclusive)
  function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Helper function to generate a sparkle
  function generateSparkle() {
    return {
      id: String(random(10000, 99999)),
      createdAt: Date.now(),
      color: 'var(--color--yellow)',
      size: random(10, 20),
      style: {
        top: random(-10, 80) + '%',
        left: random(0, 100) + '%'
      }
    };
  }

  // Loop through each sparkles wrapper element
  for (let i = 0; i < sparklesWrappers.length; i++) {
    const sparklesWrapper = sparklesWrappers[i];

    // Handle sparkles at a set interval
    const sparklesInterval = setInterval(() => {
      const now = Date.now();
      // Create a new sparkle
      const sparkle = generateSparkle();

      // Get .sparkle elements inside the sparkles wrapper element
      let sparkles = Array.from(sparklesWrapper.getElementsByClassName('sparkle')) ?? [];

      // Clean up any "expired" sparkles
      sparkles.forEach((sparkle) => {
        const delta = now - parseInt(sparkle.getAttribute('data-created-at') ?? '0');
        if (delta >= 1500) {
          sparkle.remove();
        }
      });


      // Insert HTML code for the sparkle into the sparkles wrapper element
      const sparkleHTML = `
        <div class="sparkle" style="top: ${sparkle.style.top}; left: ${sparkle.style.left};" data-created-at=${sparkle.createdAt}">
          <svg width="${sparkle.size}" height="${sparkle.size}" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="${sparkle.color}" d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"/>
          </svg>
        </div>
      `;

      sparklesWrapper.insertAdjacentHTML('beforeend', sparkleHTML);
    }, 400);

    // Store the interval ID as a property of the sparkles wrapper element
    (sparklesWrapper as any).sparklesInterval = sparklesInterval;
  }
}