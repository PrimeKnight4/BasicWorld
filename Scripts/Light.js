class Light {
  constructor(scene) {
    this.directional = new THREE.DirectionalLight(0xffffff)
    this.directional.position.set(-70, 100, 0)
    this.directional.castShadow = true
    this.directional.shadow.mapSize.width = 1024
    this.directional.shadow.mapSize.height = 1024
    scene.add(this.directional)
    
    this.point = new THREE.PointLight(0xffffff, 1.3, 30)
    this.point.position.set(5,2,0)
    scene.add(this.point)
  }
}