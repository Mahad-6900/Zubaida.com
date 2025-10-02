document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 100; // smaller = faster

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');

      const updateCount = () => {
        const current = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (current < target) {
          counter.innerText = current + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target; // stop exactly on target
        }
      };

      updateCount();
    });
  };

  // Trigger counters when section is visible
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  
})


function copyText() {
    const textElement = document.getElementById("masterPrompt");
    const text = textElement.innerText.trim(); // Pure text (no HTML)

    if (!text) {
      alert("⚠ Master Prompt is empty!");
      return;
    }

    // Clipboard API method
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert("✅ Master Prompt copied!");
      }).catch(err => {
        console.error("Clipboard error:", err);
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  // Fallback for older browsers
  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("✅ Master Prompt copied (fallback)!");
  }
