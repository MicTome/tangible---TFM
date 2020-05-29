//a-frame component created to rescale all the import objects from blender
//to adjust the size and scale it to one more manageable
AFRAME.registerComponent('autoscale', {
  //what is going to be needed when the attribute is changed
  schema: { type: 'number', default: 1 },
  init: function () {
    this.scale();
    this.el.addEventListener('object3dset', () => this.scale());
  },
  scale: function () {
    const el = this.el;
    const span = this.data;
    const mesh = el.getObject3D('mesh');
    if (!mesh) return;
    // Compute bounds.
    const bbox = new THREE.Box3().setFromObject(mesh);
    // Normalize scale.
    const scale = span / bbox.getSize().length();
    mesh.scale.set(scale, scale, scale);
    // Recenter.
    //const offset = bbox.getCenter().multiplyScalar(scale);
    //mesh.position.sub(offset);
  }
});