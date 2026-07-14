if (typeof THREE === "undefined") {
    initFallbackAnimation();
} else {
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bgCanvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Bigger Medical Cross Geometry
const crossShape = new THREE.Shape();
crossShape.moveTo(-4, 2);
crossShape.lineTo(-2, 2);
crossShape.lineTo(-2, 4);
crossShape.lineTo(2, 4);
crossShape.lineTo(2, 2);
crossShape.lineTo(4, 2);
crossShape.lineTo(4, -2);
crossShape.lineTo(2, -2);
crossShape.lineTo(2, -4);
crossShape.lineTo(-2, -4);
crossShape.lineTo(-2, -2);
crossShape.lineTo(-4, -2);
crossShape.lineTo(-4, 2);

const extrudeSettings = { depth: 2, bevelEnabled: false };
const crossGeometry = new THREE.ExtrudeGeometry(crossShape, extrudeSettings);

// Blue Theme Material
const crossMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x007bff, // Main Blue Color
    emissive: 0x0044aa, // Light Blue Glow
    metalness: 0.7, 
    roughness: 0.3 
});

const crossMesh = new THREE.Mesh(crossGeometry, crossMaterial);
crossMesh.position.set(0, 0, 0);
scene.add(crossMesh);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

// Floating Particles
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 400;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 150;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.4 });
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    crossMesh.rotation.y += 0.008;
    crossMesh.rotation.x += 0.004;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
}

// Keep the animated background working when the external Three.js script is unavailable.
function initFallbackAnimation() {
    const canvas = document.getElementById("bgCanvas");
    const context = canvas.getContext("2d");
    const stars = Array.from({ length: 220 }, () => ({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.00035 + 0.0001,
        phase: Math.random() * Math.PI * 2,
    }));
    let angle = 0;

    function resizeCanvas() {
        const ratio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const time = Date.now();
        context.clearRect(0, 0, width, height);

        stars.forEach((star) => {
            star.y = (star.y + star.speed) % 1;
            const opacity = 0.45 + Math.sin(time * 0.002 + star.phase) * 0.35;
            context.fillStyle = `rgba(0, 255, 255, ${opacity})`;
            context.fillRect(star.x * width, star.y * height, star.size, star.size);
        });

        context.save();
        context.translate(width / 2, height / 2);
        context.rotate(angle);
        context.shadowColor = "rgba(0, 123, 255, 0.85)";
        context.shadowBlur = 18;
        context.fillStyle = "#087bff";
        context.beginPath();
        context.moveTo(-24, -96);
        context.lineTo(24, -96);
        context.lineTo(24, -24);
        context.lineTo(96, -24);
        context.lineTo(96, 24);
        context.lineTo(24, 24);
        context.lineTo(24, 96);
        context.lineTo(-24, 96);
        context.lineTo(-24, 24);
        context.lineTo(-96, 24);
        context.lineTo(-96, -24);
        context.lineTo(-24, -24);
        context.closePath();
        context.fill();
        context.restore();

        angle += 0.006;
        requestAnimationFrame(draw);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    draw();
}
