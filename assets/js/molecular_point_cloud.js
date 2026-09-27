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
        var count = window.innerWidth < 768 ? 4 : 9;
        molecules = Array.from({ length: count }, function (_, index) {
            return {
                x: ((index + 0.7) / count) * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.11,
                vy: (Math.random() - 0.5) * 0.09,
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.0018,
                size: Math.random() * 15 + 24,
                atoms: Math.floor(Math.random() * 3) + 4,
                alpha: Math.random() * 0.07 + 0.08
            };
        });
    }

    function drawMolecule(molecule) {
        if (!reducedMotion) {
            molecule.x += molecule.vx;
            molecule.y += molecule.vy;
            molecule.angle += molecule.spin;
            if (molecule.x < -80) molecule.x = window.innerWidth + 80;
            if (molecule.x > window.innerWidth + 80) molecule.x = -80;
            if (molecule.y < -80) molecule.y = window.innerHeight + 80;
            if (molecule.y > window.innerHeight + 80) molecule.y = -80;
        }

        var atoms = [];
        for (var i = 0; i < molecule.atoms; i += 1) {
            var angle = molecule.angle + (Math.PI * 2 * i / molecule.atoms);
            atoms.push({
                x: molecule.x + Math.cos(angle) * molecule.size,
                y: molecule.y + Math.sin(angle) * molecule.size
            });
        }

        context.strokeStyle = 'rgba(255, 255, 255, ' + molecule.alpha + ')';
        context.lineWidth = 0.8;
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
            context.arc(atom.x, atom.y, index === atoms.length ? 2.4 : 1.8, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 255, 255, ' + (molecule.alpha + 0.1) + ')';
            context.fill();
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

        molecules.forEach(drawMolecule);

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
