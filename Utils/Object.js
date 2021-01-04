class Object3 {
  constructor({ geometry, shape, material, mass })
  {
    this.mass = mass;

    // CANNON JS
    this.physicalMaterial = new CANNON.Material();
    this.shape = shape
    this.body = new CANNON.Body({
      shape: this.shape,
      mass: this.mass,
      material: this.physicalMaterial
    });

    // THREE JS
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
  
  update(str = "mesh")
  {
    if(str == "mesh") {
      this.mesh.position.copy(this.body.position)
      this.mesh.quaternion.copy(this.body.quaternion)
    }
    else if(str == "body") {
      this.body.position.copy(this.mesh.position)
      this.body.quaternion.copy(this.mesh.quaternion)
    }
  }
}
