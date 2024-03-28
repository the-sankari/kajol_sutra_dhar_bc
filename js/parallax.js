window.addEventListener('scroll', function() {
    const parallax = document.querySelectorAll('.parallax');
    parallax.forEach(function(section) {
      let scrolled = window.pageYOffset;
      let coords = section.offsetTop - scrolled;
      section.style.backgroundPositionY = coords * 0.7 + 'px'; // Adjust the parallax effect speed
    });
  });  