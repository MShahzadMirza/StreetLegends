/*
=====================================
Street Legends
Follow Camera
=====================================
*/

class CameraController {
    constructor(scene, target) {
        this.scene = scene;

        this.target = target;

        this.distance = 8;

        this.height = 4;

        this.camera = new BABYLON.FreeCamera(
            'camera',
            new BABYLON.Vector3(0, 5, -10),
            scene,
        );

        this.camera.minZ = 0.1;
    }

    update() {
        const rotation = this.target.root.rotation.y;

        const x =
            this.target.root.position.x - Math.sin(rotation) * this.distance;

        const z =
            this.target.root.position.z - Math.cos(rotation) * this.distance;

        const y = this.target.root.position.y + this.height;

        const desired = new BABYLON.Vector3(x, y, z);

        this.camera.position = BABYLON.Vector3.Lerp(
            this.camera.position,

            desired,

            0.1,
        );

        this.camera.setTarget(this.target.root.position);
    }
}
