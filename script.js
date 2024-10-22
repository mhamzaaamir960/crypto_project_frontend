document.addEventListener('DOMContentLoaded', () => {
    const roadmapSection = document.querySelector('.roadmap-section');
    const roadmapGroups = document.querySelector('.roadmap-groups');
    
    const scrollSpeed = 10; 
    
    roadmapSection.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault(); 
        roadmapGroups.scrollLeft += e.deltaY * scrollSpeed; 
      }
    });
  });
  