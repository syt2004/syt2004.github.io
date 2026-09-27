(function () {
    var canvas = document.getElementById('molecular-point-cloud');
    if (!canvas) return;

    var context = canvas.getContext('2d');
    var particles = [];
    var molecules = [];
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
        createMolecules();
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

    function createMolecules() {
        var count = window.innerWidth < 768 ? 5 : 10;
        molecules = Array.from({ length: count }, function (_, index) {
            return {
                x: ((index + 0.5) / count) * window.innerWidth,
                y: ((index % 3) * 0.32 + 0.18) * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.08,
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.0015,
                phase: Math.random() * Math.PI * 2,
                size: Math.random() * 28 + 48,
                atoms: Math.floor(Math.random() * 3) + 5,
                alpha: Math.random() * 0.1 + 0.26
            };
        });
    }

    function drawMolecule(molecule, time) {
        if (!reducedMotion) {
            molecule.x += molecule.vx;
            molecule.y += molecule.vy;
            molecule.angle += molecule.spin;
            if (molecule.x < -100) molecule.x = window.innerWidth + 100;
            if (molecule.x > window.innerWidth + 100) molecule.x = -100;
            if (molecule.y < -100) molecule.y = window.innerHeight + 100;
            if (molecule.y > window.innerHeight + 100) molecule.y = -100;
        }

        var pulse = 1 + Math.sin(time * 0.0005 + molecule.phase) * 0.045;
        var atoms = [];
        for (var i = 0; i < molecule.atoms; i += 1) {
            var angle = molecule.angle + (Math.PI * 2 * i / molecule.atoms);
            atoms.push({
                x: molecule.x + Math.cos(angle) * molecule.size * pulse,
                y: molecule.y + Math.sin(angle) * molecule.size * pulse
            });
        }

        context.save();
        context.globalCompositeOperation = 'screen';
        context.shadowColor = 'rgba(255, 255, 255, 0.36)';
        context.shadowBlur = 11;
        context.strokeStyle = 'rgba(255, 255, 255, ' + molecule.alpha + ')';
        context.lineWidth = 1.45;

        atoms.forEach(function (atom, index) {
            var next = atoms[(index + 1) % atoms.length];
            context.beginPath();
            context.moveTo(molecule.x, molecule.y);
            context.lineTo(atom.x, atom.y);
            context.moveTo(atom.x, atom.y);
            context.lineTo(next.x, next.y);
            context.stroke();
        });

        atoms.concat([{ x: molecule.x, y: molecule.y }]).forEach(function (atom, index) {
            context.beginPath();
            context.arc(atom.x, atom.y, index === atoms.length ? 4.5 : 3.2, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 255, 255, ' + Math.min(molecule.alpha + 0.26, 0.68) + ')';
            context.fill();
        });
        context.restore();
    }

    function draw() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        var time = window.performance.now();

        molecules.forEach(function (molecule) {
            drawMolecule(molecule, time);
        });

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
