// --- Three.js Background Scene (Reused for consistency) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

const container = document.getElementById('canvas-container');
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Objects (More aggressive/futuristic look for landing page)
const geometry = new THREE.IcosahedronGeometry(1.5, 0); // Less detailed, more sharp
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000; // More particles
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Materials
const material = new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x9945FF, // Emissive purple
    emissiveIntensity: 0.5,
    wireframe: true,
    transparent: true,
    opacity: 0.5
});

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x14F195, // Solana Green
    transparent: true,
    opacity: 0.8
});

// Mesh
const sphere = new THREE.Mesh(geometry, material);
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);

scene.add(sphere);
scene.add(particlesMesh);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

camera.position.z = 5;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Clock for smooth animation
const clock = new THREE.Clock();

function animate() {
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime();

    sphere.rotation.y += 0.005;
    sphere.rotation.x += 0.002;

    // Interactive Rotation
    sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
    sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);

    particlesMesh.rotation.y = -0.05 * elapsedTime;
    particlesMesh.rotation.x = -mouseY * 0.00002;
    particlesMesh.rotation.y = -mouseX * 0.00002;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// --- GSAP Animations (Marketing Entrance) ---
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.fromTo("h1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
    .fromTo(".subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
    .fromTo(".feature-card", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, "-=0.6")
    .fromTo(".btn-primary", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.4");
