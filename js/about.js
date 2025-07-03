const sections = document.querySelectorAll('.timeline-section');

sections.forEach(section => {
  const details = section.querySelectorAll('.detail');

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
      details.forEach((detail, index) => {
        setTimeout(() => {
          detail.classList.add('visible');
        }, index * 400);
      });
    } else {
      details.forEach(detail => detail.classList.remove('visible'));
    }
  });
});