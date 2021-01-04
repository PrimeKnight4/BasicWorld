class World {
  constructor() {
    this._Initialize();
    this._Update();
  }
  
  _Initialize() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.01;
    const far = 500;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0,5,10) // XYZ
    this.camera.rotation.set(0,0,0) // XYZ
    
    this.scene = new THREE.Scene()
    this.scene.background = new Skybox()
    
    // CANNON INIT
    this.world = new CANNON.World()
    this.world.gravity.set(0,-10,0)
    this.world.broadphase = new CANNON.NaiveBroadphase()
    this.debugRenderer = new THREE.CannonDebugRenderer(this.scene, this.world)
    // END
    
    this.dom = this.renderer.domElement
    document.body.appendChild(this.dom)
    window.addEventListener("resize", this._OnWindowResize, false)
    
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
    
    this.clock = new THREE.Clock()
    this.controls = {
      orbit: new THREE.OrbitControls(this.camera, this.dom),
      pointerLock: new THREE.PointerLockControls(this.camera, this.dom)
    }
    this.controls.orbit.update()
    
    const params = {
      scene: this.scene,
      camera: this.camera,
      world: this.world
    }
    this.map = new MapGame(params)
    this.avatar = new Avatar(params)
  }
  
  _Update() {
    this.world.step(1.0 / 60.0)
    // this.debugRenderer.update()
    
    const delta = this.clock.getDelta()
    this.renderer.shadowMap.needsUpdate = true
    this.stats.update()
    this.map.update(delta)
    this.avatar.update(delta)
    requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera)
      this._Update()
    })
  }
  
  _OnWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }
}

let APP = null
window.addEventListener("DOMContentLoaded", () => {
  APP = new World()
})