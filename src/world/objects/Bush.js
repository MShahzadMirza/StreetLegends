/*
=====================================
Street Legends
Bush
=====================================
*/

class Bush {

    constructor(scene, x, z) {

        const bush = BABYLON.MeshBuilder.CreateSphere(
            "bush",
            {
                diameter: Config.BUSH.SIZE
            },
            scene
        );

        bush.position.set(
            x,
            0.6,
            z
        );

        bush.scaling.y = 0.7;

        const material = new BABYLON.StandardMaterial("bushMat", scene);

        material.diffuseColor = new BABYLON.Color3(
            0.2,
            0.7,
            0.25
        );

        bush.material = material;

    }

}