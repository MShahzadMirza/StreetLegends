/*
=====================================
Street Legends
Tree
=====================================
*/

class Tree {

    constructor(scene, x, z) {

        // Trunk
        const trunk = BABYLON.MeshBuilder.CreateCylinder(
            "trunk",
            {
                height: Config.TREE.TRUNK_HEIGHT,
                diameter: Config.TREE.TRUNK_DIAMETER
            },
            scene
        );

        trunk.position.set(
            x,
            Config.TREE.TRUNK_HEIGHT / 2,
            z
        );

        const trunkMaterial = new BABYLON.StandardMaterial("trunkMat", scene);
        trunkMaterial.diffuseColor = new BABYLON.Color3(0.45, 0.28, 0.12);
        trunk.material = trunkMaterial;

        // Leaves
        const leaves = BABYLON.MeshBuilder.CreateSphere(
            "leaves",
            {
                diameter: Config.TREE.LEAVES_DIAMETER
            },
            scene
        );

        leaves.position.set(
            x,
            Config.TREE.TRUNK_HEIGHT + 1,
            z
        );

        const leavesMaterial = new BABYLON.StandardMaterial("leafMat", scene);
        leavesMaterial.diffuseColor = new BABYLON.Color3(0.15, 0.6, 0.2);
        leaves.material = leavesMaterial;

    }

}