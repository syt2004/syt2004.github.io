---
show: true
width: 12
date: 2016-01-01 00:01:00 +0800
group: Project and Competition Demos
---

<div class="project-demos p-3 mx-auto">
  <h3 class="mb-4 text-center">Project and Competition Demos</h3>
  <div class="project-demo-grid">
    <div class="project-demo-item">
      <h5 class="project-demo-title">Noetix Sim2Real Walking Training</h5>
      <div class="project-demo-video">
        <video playsinline preload="metadata">
          <source src="{{ 'assets/videos/project-competition-demo.mp4' | relative_url }}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <button type="button" class="project-demo-toggle" aria-label="Play video">
          <i class="fas fa-play" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="project-demo-item">
      <h5 class="project-demo-title">Vision-Detection-Based Autonomous Vehicle</h5>
      <div class="project-demo-video">
        <video playsinline preload="metadata">
          <source src="{{ 'assets/videos/project-competition-demo-2.mp4' | relative_url }}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <button type="button" class="project-demo-toggle" aria-label="Play video">
          <i class="fas fa-play" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="project-demo-item project-demo-item-last">
      <h5 class="project-demo-title">Visual SLAM and Spatial Mapping</h5>
      <div class="project-demo-video">
        <video playsinline preload="metadata">
          <source src="{{ 'assets/videos/project-competition-demo-3.mp4' | relative_url }}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <button type="button" class="project-demo-toggle" aria-label="Play video">
          <i class="fas fa-play" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="project-demo-item">
      <h5 class="project-demo-title project-demo-title-orange">Detach Media Demo</h5>
      <div class="project-demo-video">
        <video playsinline preload="metadata">
          <source src="{{ 'assets/videos/project-competition-demo-4.mp4' | relative_url }}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <button type="button" class="project-demo-toggle" aria-label="Play video">
          <i class="fas fa-play" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .project-demos {
    max-width: 1080px;
  }

  .project-demo-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }

  .project-demo-title {
    min-height: 1.5em;
    margin: 0 0 10px;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
  }

  .project-demo-title-orange {
    color: #f28c28;
  }

  .project-demo-video {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    border-radius: 0.75rem;
    background: #000;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .project-demo-item-last {
    grid-column: 1;
    width: 100%;
    justify-self: stretch;
  }

  .project-demo-video video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-demo-toggle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 58px;
    height: 58px;
    padding: 0;
    transform: translate(-50%, -50%);
    border: 0;
    border-radius: 50%;
    color: #fff;
    background: rgba(0, 0, 0, 0.58);
    font-size: 20px;
    line-height: 58px;
    text-align: center;
    cursor: pointer;
    transition: opacity 0.2s ease, background 0.2s ease, transform 0.2s ease;
  }

  .project-demo-toggle:hover,
  .project-demo-toggle:focus-visible {
    background: rgba(0, 0, 0, 0.78);
    transform: translate(-50%, -50%) scale(1.08);
    outline: none;
  }

  .project-demo-video.is-playing .project-demo-toggle {
    opacity: 0;
  }

  .project-demo-video.is-playing:hover .project-demo-toggle,
  .project-demo-video.is-playing .project-demo-toggle:focus-visible {
    opacity: 1;
  }

  @media (max-width: 767.98px) {
    .project-demo-grid {
      grid-template-columns: 1fr;
      gap: 18px;
    }

    .project-demo-item-last {
      grid-column: auto;
      width: 100%;
    }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.project-demo-video').forEach(function (container) {
      var video = container.querySelector('video');
      var button = container.querySelector('.project-demo-toggle');
      var icon = button.querySelector('i');

      function updateButton() {
        var isPaused = video.paused || video.ended;
        icon.className = isPaused ? 'fas fa-play' : 'fas fa-pause';
        button.setAttribute('aria-label', isPaused ? 'Play video' : 'Pause video');
        container.classList.toggle('is-playing', !isPaused);
      }

      button.addEventListener('click', function () {
        if (video.paused || video.ended) {
          video.play();
        } else {
          video.pause();
        }
      });

      video.addEventListener('click', function () {
        button.click();
      });
      video.addEventListener('play', updateButton);
      video.addEventListener('pause', updateButton);
      video.addEventListener('ended', updateButton);
    });
  });
</script>
