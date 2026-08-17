---
show: true
width: 12
date: 2016-01-01 00:01:00 +0800
group: Project and Competition Demos
---

<div class="p-3 mx-auto" style="max-width: 700px;">
  <h3 class="mb-3">Project and Competition Demos</h3>
  <div id="project-demo-slider" class="d-flex" style="overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; scrollbar-width: thin;" onscroll="document.getElementById('project-demo-page').textContent = (Math.round(this.scrollLeft / this.clientWidth) + 1) + ' / 3';">
    <div style="min-width: 100%; scroll-snap-align: start;">
      <video class="w-100 rounded-xl d-block" controls playsinline preload="metadata">
        <source src="{{ 'assets/videos/project-competition-demo.mp4' | relative_url }}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div style="min-width: 100%; scroll-snap-align: start;">
      <video class="w-100 rounded-xl d-block" controls playsinline preload="metadata">
        <source src="{{ 'assets/videos/project-competition-demo-2.mp4' | relative_url }}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div style="min-width: 100%; scroll-snap-align: start;">
      <video class="w-100 rounded-xl d-block" controls playsinline preload="metadata">
        <source src="{{ 'assets/videos/project-competition-demo-3.mp4' | relative_url }}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
  <div class="d-flex justify-content-center align-items-center mt-3">
    <button type="button" class="btn btn-sm btn-light mr-2" aria-label="Previous demo" onclick="document.getElementById('project-demo-slider').scrollBy({ left: -document.getElementById('project-demo-slider').clientWidth, behavior: 'smooth' });">
      <i class="fas fa-chevron-left"></i>
    </button>
    <span id="project-demo-page" class="small text-muted mx-3" aria-live="polite">1 / 3</span>
    <button type="button" class="btn btn-sm btn-light ml-2" aria-label="Next demo" onclick="document.getElementById('project-demo-slider').scrollBy({ left: document.getElementById('project-demo-slider').clientWidth, behavior: 'smooth' });">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</div>
