/*
=====================================
Street Legends
Trail Renderer
=====================================
*/

class TrailRenderer {

    constructor(scene) {

        this.scene = scene;

        this.leftPoints = [];
        this.rightPoints = [];

        this.maxPoints = 180;

        this.material = new BABYLON.StandardMaterial(
            "SkidMaterial",
            this.scene
        );

        this.material.diffuseColor = BABYLON.Color3.Red();
        this.material.alpha = 1;
        this.material.backFaceCulling = false;


    }

    createRibbon() {

        this.mesh = BABYLON.MeshBuilder.CreateRibbon(

            "SkidRibbon",

            {
                pathArray: [
                    this.leftPoints,
                    this.rightPoints
                ],
                updatable: true
            },

            this.scene

        );

    }

    add(left, right) {

        this.leftPoints.push(left.clone().add(new BABYLON.Vector3(0, 0.1, 0)));
        this.rightPoints.push(right.clone().add(new BABYLON.Vector3(0, 0.1, 0)));

        console.log(
            this.leftPoints.length,
            this.rightPoints.length
        );

        if (this.leftPoints.length < 2)
            return;

        if (!this.mesh) {

            this.mesh = BABYLON.MeshBuilder.CreateRibbon(

                "SkidRibbon",

                {
                    pathArray: [
                        this.leftPoints,
                        this.rightPoints
                    ],
                    updatable: true
                },

                this.scene

            );

            const mat = new BABYLON.StandardMaterial(
                "SkidMaterial",
                this.scene
            );

            mat.diffuseColor = new BABYLON.Color3(0.08, 0.08, 0.08);
            mat.alpha = 0.7;

            this.mesh.material = mat;
            mat.diffuseColor = BABYLON.Color3.Red();

            mat.alpha = 1;

            mat.backFaceCulling = false;

        }
        else {

            this.mesh.dispose();

            this.mesh = BABYLON.MeshBuilder.CreateRibbon(

                "SkidRibbon",

                {
                    pathArray: [
                        this.leftPoints,
                        this.rightPoints
                    ]
                },

                this.scene

            );

            this.mesh.material = this.material;

        }

    }

}