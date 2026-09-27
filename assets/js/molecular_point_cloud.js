(function () {
    var canvas = document.getElementById('molecular-point-cloud');
    if (!canvas) return;

    var context = canvas.getContext('2d');
    var particles = [];
    var cloudFields = [];
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
        createCloudFields();
    }

    function createParticles() {
        var area = window.innerWidth * window.innerHeight;
        var count = Math.max(55, Math.min(140, Math.floor(area / 11000)));
        if (window.innerWidth < 768) count = Math.min(count, 60);

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

    function createCloudFields() {
        var count = window.innerWidth < 768 ? 3 : 5;
        var pointsPerCloud = window.innerWidth < 768 ? 55 : 95;

        cloudFields = Array.from({ length: count }, function (_, index) {
            var radiusX = Math.random() * 85 + 175;
            var radiusY = Math.random() * 60 + 115;
            return {
                x: ((index + 0.45) / count) * window.innerWidth,
                y: ((index % 2) * 0.58 + 0.2) * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.08,
                vy: (Math.random() - 0.5) * 0.06,
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.00055,
                phase: Math.random() * Math.PI * 2,
                radiusX: radiusX,
                radiusY: radiusY,
                points: Array.from({ length: pointsPerCloud }, function () {
                    var theta = Math.random() * Math.PI * 2;
                    var radius = Math.pow(Math.random(), 1.55);
                    return {
                        x: Math.cos(theta) * radius * radiusX,
                        y: Math.sin(theta) * radius * radiusY,
                        radius: Math.random() * 1.25 + 0.45,
                        alpha: (1 - radius) * 0.3 + Math.random() * 0.16 + 0.08,
                        twinkle: Math.random() * Math.PI * 2
                    };
                })
            };
        });
    }

    function drawCloudField(cloud, time) {
        if (!reducedMotion) {
            cloud.x += cloud.vx;
            cloud.y += cloud.vy;
            cloud.angle += cloud.spin;
            if (cloud.x < -cloud.radiusX) cloud.x = window.innerWidth + cloud.radiusX;
            if (cloud.x > window.innerWidth + cloud.radiusX) cloud.x = -cloud.radiusX;
            if (cloud.y < -cloud.radiusY) cloud.y = window.innerHeight + cloud.radiusY;
            if (cloud.y > window.innerHeight + cloud.radiusY) cloud.y = -cloud.radiusY;
        }

        var pulse = 1 + Math.sin(time * 0.00035 + cloud.phase) * 0.07;
        context.save();
        context.translate(cloud.x, cloud.y);
        context.rotate(cloud.angle);
        context.scale(pulse, pulse);

        var fog = context.createRadialGradient(0, 0, 0, 0, 0, cloud.radiusX);
        fog.addColorStop(0, 'rgba(255, 255, 255, 0.045)');
        fog.addColorStop(0.45, 'rgba(255, 255, 255, 0.018)');
        fog.addColorStop(1, 'rgba(255, 255, 255, 0)');
        context.fillStyle = fog;
        context.beginPath();
        context.ellipse(0, 0, cloud.radiusX, cloud.radiusY, 0, 0, Math.PI * 2);
        context.fill();

        cloud.points.forEach(function (point) {
            var shimmer = reducedMotion ? 0 : Math.sin(time * 0.0012 + point.twinkle) * 0.06;
            context.beginPath();
            context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0.06, point.alpha + shimmer) + ')';
            context.fill();
        });
        context.restore();
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

                if (distance < 142) {
                    var lineAlpha = (1 - distance / 142) * 0.14;
                    context.beginPath();
                    context.moveTo(particle.x, particle.y);
                    context.lineTo(other.x, other.y);
                    context.strokeStyle = 'rgba(255, 255, 255, ' + lineAlpha + ')';
                    context.lineWidth = 0.65;
                    context.stroke();
                }
            }
        }

        var time = window.performance.now();
        cloudFields.forEach(function (cloud) {
            drawCloudField(cloud, time);
        });

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
