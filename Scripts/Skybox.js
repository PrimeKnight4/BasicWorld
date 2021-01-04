
class Skybox {
  constructor() {
    this.enabled = true;
    const loader = new THREE.CubeTextureLoader();
    const img = loader.load([
      "https://cdn.glitch.com/5df765c3-6e26-4b2f-9f1b-a0c46120e7b1%2Frt.JPG?v=1609685022429", // px -- Pos X
      "https://cdn.glitch.com/5df765c3-6e26-4b2f-9f1b-a0c46120e7b1%2Flf.JPG?v=1609685031081", // nx -- Neg X
      "https://cdn.glitch.com/5df765c3-6e26-4b2f-9f1b-a0c46120e7b1%2Fup.JPG?v=1609685037472", // py -- Pos Y
      "https://cdn.glitch.com/5df765c3-6e26-4b2f-9f1b-a0c46120e7b1%2Fdn.JPG?v=1609685043151", // ny -- Neg Y
      "https://cdn.glitch.com/5df765c3-6e26-4b2f-9f1b-a0c46120e7b1%2Fbk.JPG?v=1609685083457", // pz -- Pos Z
      "https://cdn.glitch.com/5df765c3-6e26-4b2f-9f1b-a0c46120e7b1%2Fft.JPG?v=1609685082654"  // nz -- Neg Z
    ]);
    if (this.enabled == true) {
      return img;
    } else {
      return new THREE.Color(0xf1f1f1);
    }
  }
}
