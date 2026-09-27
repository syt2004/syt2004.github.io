(function () {
    var canvas = document.getElementById('molecular-point-cloud');
    if (!canvas) return;

    var context = canvas.getContext('2d');
    var particles = [];
    var animationFrame = null;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
        canvas.width = Math.floor(window.innerWidth * pixelRatio);
        canvas.height = Math.floor(window.innerHeight * pixelRatio);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        createParticles();
    }

    function createParticles() {
        var area = window.innerWidth * window.innerHeight;
        var count = Math.max(34, Math.min(92, Math.floor(area / 17000)));
        if (window.innerWidth < 768) count = Math.min(count, 42);

        particles = Array.from({ length: count }, function () {
            return {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 1.25 + 0.55,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                alpha: Math.random() * 0.32 + 0.25
            };
        });
    }

    function draw() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (var i = 0; i < particles.length; i += 1) {
            var particle = particles[i];

            if (!reducedMotion) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                if (particle.x < -10) particle.x = window.innerWidth + 10;
                if (particle.x > window.innerWidth + 10) particle.x = -10;
                if (particle.y < -10) particle.y = window.innerHeight + 10;
                if (particle.y > window.innerHeight + 10) particle.y = -10;
            }

            context.beginPath();
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 255, 255, ' + particle.alpha + ')';
            context.fill();

            for (var j = i + 1; j < particles.length; j += 1) {
                var other = particles[j];
                var dx = particle.x - other.x;
                var dy = particle.y - other.y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 128) {
                    var lineAlpha = (1 - distance / 128) * 0.12;
                    context.beginPath();
                    context.moveTo(particle.x, particle.y);
                    context.lineTo(other.x, other.y);
                    context.strokeStyle = 'rgba(255, 255, 255, ' + lineAlpha + ')';
                    context.lineWidth = 0.65;
                    context.stroke();
                }
            }
        }

        if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function () {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            resize();
            draw();
        }, 120);
    });

    resize();
    draw();
}());
