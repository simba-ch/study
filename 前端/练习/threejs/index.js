const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0,0,100);
// camera.lookAt(0,0,0)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  linewidth: 10,
  linecap: 'square', //ignored by WebGLRenderer
  linejoin: 'round' //ignored by WebGLRenderer
});

const imageTexture = new THREE.TextureLoader().load('./cat.jpg')
const imageMaterial = new THREE.MeshBasicMaterial({
  map: imageTexture
});
const videoFirefox = document.getElementById('firefox');
const videoTexture = new THREE.VideoTexture(videoFirefox);
const videoMaterial = new THREE.MeshBasicMaterial({map:videoTexture});
const cube = new THREE.Mesh(geometry, videoMaterial)

scene.add(cube);
camera.position.z = 5;
// const lineMaterial = new THREE.LineBasicMaterial({color:0x0000ff})
// const points = [];
// points.push(new THREE.Vector3(-10,0,0),new THREE.Vector3(0,10,0),new THREE.Vector3(10,0,0))
// const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
// const line = new THREE.Line(lineGeometry,lineMaterial)
// scene.add(line);
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera)
}
animate();