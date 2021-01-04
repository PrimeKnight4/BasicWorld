class MapWorld {
  constructor(params) {
    this.params = params
    this.mesh = []
    this.body = []
    this.texture = {
      map: {
        brick: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgaWZTKyNg_F4xvO85tTu1T6ouAFnqy5RBvw&usqp=CAU",
        water: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6fvDneamr2mSHyogsrukZwf7Yi4ygIjx4QQ&usqp=CAU"
      },
      bumpMap: {},
      load: function(texture) {
        const loader = new THREE.TextureLoader()
        return loader.load(texture)
      }
    }
    
    const brick = this.texture.load(this.texture.map.brick)
    brick.wrapS = THREE.RepeatWrapping
    brick.wrapT = THREE.RepeatWrapping
    brick.repeat.set(2,2)  
    this.ground = new Object3({
      geometry: new THREE.PlaneGeometry(20,20),
      material: new THREE.MeshPhongMaterial({
        shininess: 70, map: brick
      }),
      shape: new CANNON.Plane(),
      mass: 0
    })
    this.ground.body.position.x = 1000
    this.ground.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2)
    this.ground.mesh.quaternion.copy(this.ground.body.quaternion)
    this.mesh.push(this.ground.mesh)
    this.body.push(this.ground.body)
    
    const water = this.texture.load(this.texture.map.water)
    this.box = new Object3({
      geometry: new THREE.BoxGeometry(1,1,1),
      material: new THREE.MeshPhysicalMaterial({
        map: water, roughness: 0.5
      }),
      shape: new CANNON.Box(new CANNON.Vec3(1/2,1/2,1/2)),
      mass: 30
    })
    this.box.body.position.set(0,5,0)
    this.mesh.push(this.box.mesh)
    this.body.push(this.box.body)
    
    this.interactionMat = new CANNON.ContactMaterial(this.ground.physicalMaterial, this.box.physicalMaterial, {
      restitution: 0.3,
      friction: 10
    })
    this.params.world.addContactMaterial(this.interactionMat)
    
    this.Q = new THREE.Quaternion()
    this.R = this.box.mesh.quaternion.clone()
    
    this.light = new Light(this.params.scene)
    this._Map()
  }
  
  _Map() {
    for(let i = 0; i < this.mesh.length; i++) {
      this.mesh[i].castShadow = true
      this.mesh[i].receiveShadow = true
      this.params.scene.add(this.mesh[i])
    }
    for(let i = 0; i < this.body.length; i++) {
      this.params.world.addBody(this.body[i])
    }
  }
  
  update(delta) {
    this.light.point.position.copy(this.params.camera.position)
    this.light.point.rotation.copy(this.params.camera.rotation)
    this.Q.setFromAxisAngle(new THREE.Vector3(0,1,0), 3.0 * Math.PI * delta * 0.25)
    this.R.multiply(this.Q)
    this.box.body.quaternion.copy(this.R)
    this.box.update()
  }
}
