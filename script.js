document.addEventListener('DOMContentLoaded', () => {
    const roadmapSection = document.querySelector('.roadmap-section');
    const roadmapGroups = document.querySelector('.roadmap-groups');
    let isHorizontalScrollActive = false;
  
    // Variables for mouse scroll behavior
    let isMouseDown = false;
    let startX;
    let scrollLeft;
    let startY;
    let verticalMovement = false;
  
    // Intersection observer to disable vertical scroll when roadmap section is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isHorizontalScrollActive) {
          isHorizontalScrollActive = true;
        }
      });
    }, {
      threshold: 0.5  // Adjust threshold as needed
    });
  
    observer.observe(roadmapSection);
  
    // Listen for scroll on the horizontal container
    roadmapGroups.addEventListener('scroll', () => {
      // Check if the user has scrolled to the end of the horizontal container
      if (roadmapGroups.scrollLeft + roadmapGroups.clientWidth >= roadmapGroups.scrollWidth) {
        document.body.style.overflowY = 'scroll';
        isHorizontalScrollActive = false;
      }
    });
  
    // Handle vertical scroll resume when leaving the section
    const verticalScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && isHorizontalScrollActive) {
          document.body.style.overflowY = 'scroll';
          isHorizontalScrollActive = false;
        }
      });
    });
  
    verticalScrollObserver.observe(roadmapSection);
  
    // Mouse drag-to-scroll functionality
    roadmapGroups.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      roadmapGroups.classList.add('active');
      startX = e.pageX - roadmapGroups.offsetLeft;
      startY = e.pageY;  // Track the vertical start position
      scrollLeft = roadmapGroups.scrollLeft;
      verticalMovement = false;  // Reset vertical movement flag
    });
  
    roadmapGroups.addEventListener('mouseleave', () => {
      isMouseDown = false;
      roadmapGroups.classList.remove('active');
    });
  
    roadmapGroups.addEventListener('mouseup', () => {
      isMouseDown = false;
      roadmapGroups.classList.remove('active');
    });
  
    roadmapGroups.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      
      const x = e.pageX - roadmapGroups.offsetLeft;
      const y = e.pageY;
  
      // Calculate the distance moved both horizontally and vertically
      const walkX = (x - startX) * 2; // Horizontal scroll speed (adjust this value)
      const walkY = Math.abs(y - startY); // Vertical movement distance
  
      // Only allow horizontal scrolling if horizontal movement is greater than vertical
      if (walkY < Math.abs(walkX)) {
        e.preventDefault();
        roadmapGroups.scrollLeft = scrollLeft - walkX;
      } else {
        verticalMovement = true;  // Mark it as vertical movement to prevent horizontal scroll
      }
    });
  });
  