const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0,0,100);
// camera.lookAt(0,0,0)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

// scene.add(new THREE.AmbientLight(0x0000ff));

const light = new THREE.DirectionalLight();
light.position.set(0.5, 0.5, 1);
light.castShadow = false;
light.shadow.camera.zoom = 4; // tighter shadow map
scene.add(light);

const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);




renderer.render(scene, camera);
