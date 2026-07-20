/*
=====================================
Street Legends
Wheel Trail Renderer
=====================================
*/

class WheelTrailRenderer {

    constructor(scene, width = 0.22) {

        this.scene = scene;

        this.width = width;

        this.leftEdge = [];
        this.rightEdge = [];

        this.maxPoints = 180;

        this.mesh = null;

        this.createMaterial();

    }

    createMaterial() {

        this.material = new BABYLON.StandardMaterial(
            "TrailMaterial",
            this.scene
        );

        this.material.diffuseColor =
            new BABYLON.Color3(
                0.08,
                0.08,
                0.08
            );

        this.material.alpha = 0.7;

        this.material.backFaceCulling = false;

    }

    add(position, forward) {

        forward = forward.clone();

        forward.y = 0;

        forward.normalize();

        const side =
            BABYLON.Vector3.Cross(
                BABYLON.Axis.Y,
                forward
            ).normalize();

        this.leftEdge.push(

            position.subtract(
                side.scale(this.width * 0.5)
            )

        );

        this.rightEdge.push(

            position.add(
                side.scale(this.width * 0.5)
            )

        );

        if (this.leftEdge.length > this.maxPoints) {

            this.leftEdge.shift();
            this.rightEdge.shift();

        }

        this.updateMesh();

    }

    updateMesh() {

        console.log(this.leftEdge.length);

        if (this.leftEdge.length < 2)
            return;

        if (!this.mesh) {

            this.mesh =
                BABYLON.MeshBuilder.CreateRibbon(

                    "Trail",

                    {

                        pathArray: [

                            this.leftEdge,
                            this.rightEdge

                        ]

                    },

                    this.scene

                );

            this.mesh.material =
                this.material;

        }

        else {

            this.mesh.dispose();

            this.mesh = BABYLON.MeshBuilder.CreateRibbon(

                "Trail",

                {

                    pathArray: [

                        this.leftEdge,

                        this.rightEdge

                    ]

                },

                this.scene

            );

            this.mesh.material = this.material;

        }

    }

}