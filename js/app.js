var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.8, 8, new BABYLON.Vector3(0, 1, 2), scene);
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.8;

    var pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 3, 0), scene);
    pointLight.intensity = 0.6;
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    
    var createScene = function () {
        var scene = new BABYLON.Scene(engine);
    
        var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.8, 8, new BABYLON.Vector3(0, 1, 2), scene);
        camera.attachControl(canvas, true);
    
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.8;
    
        var pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 3, 0), scene);
        pointLight.intensity = 0.6;
    
        var wallMaterial = new BABYLON.StandardMaterial("wallMat", scene);
        wallMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.95, 1);
    
        var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
        ground.material = groundMaterial;
    
        var wallThickness = 0.2;
    
        var leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", { width: wallThickness, height: 3, depth: 10 }, scene);
        leftWall.position = new BABYLON.Vector3(-5, 1.5, 0);
        leftWall.material = wallMaterial;
    
        var rightWall = BABYLON.MeshBuilder.CreateBox("rightWall", { width: wallThickness, height: 3, depth: 10 }, scene);
        rightWall.position = new BABYLON.Vector3(5, 1.5, 0);
        rightWall.material = wallMaterial;
    
        var backWall = BABYLON.MeshBuilder.CreateBox("backWall", { width: 10, height: 3, depth: wallThickness }, scene);
        backWall.position = new BABYLON.Vector3(0, 1.5, -5);
        backWall.material = wallMaterial;
    
        var ceiling = BABYLON.MeshBuilder.CreateBox("ceiling", { width: 10, height: wallThickness, depth: 10 }, scene);
        ceiling.position = new BABYLON.Vector3(0, 3, 0);
        ceiling.material = wallMaterial;
    
        var cabinetMat = new BABYLON.StandardMaterial("cabinetMat", scene);
        cabinetMat.diffuseColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    
        var cabinet = BABYLON.MeshBuilder.CreateBox("cabinet", { width: 1, height: 1.2, depth: 0.5 }, scene);
        cabinet.position = new BABYLON.Vector3(-4, 0.6, -4);
        cabinet.material = cabinetMat;
    
        BABYLON.SceneLoader.ImportMesh(
            "",
            "assets/models/",
            "receiving_cpr.glb",
            scene,
            function (meshes) {
                if (meshes.length > 0) {
                    var importedModel = meshes[0];
                    importedModel.position = new BABYLON.Vector3(0, 0, 2);
                    importedModel.scaling = new BABYLON.Vector3(1, 1, 1);
                }
            },
            null,
            function (scene, message, exception) {
                console.error("Error loading model:", message, exception);
            }
        );
    
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI, true, scene");
        var instructions = new BABYLON.GUI.TextBlock();
        instructions.text = "Step 1: Check responsiveness\nStep 2: Call for help\nStep 3: Begin chest compressions";
        instructions.color = "white";
        instructions.fontSize = 24;
        instructions.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        instructions.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        instructions.top = "20px";
        instructions.background = "rgba(0, 0, 0, 0.5)";
        advancedTexture.addControl(instructions);
    
        if ((window.location.protocol === "https:" || window.location.hostname === "localhost") && navigator.xr) {
            navigator.xr.isSessionSupported("immersive-vr").then(function (supported) {
                var sessionMode = supported ? "immersive-vr" : "inline";
                scene.createDefaultXRExperienceAsync({
                    uiOptions: { sessionMode: sessionMode }
                }).then(function (xrExperience) {
                    scene.activeCamera = xrExperience.basedExperience.camera;
                    advancedTexture.layer.layerMask = 0x10000000;
                    xrExperience.basedExperience.camera.layerMask = 0x10000000;
                }).catch(function (err) {
                    console.error("Error creating XR experience:", err);
                });
            });
        }
    
        return scene;
    };
    
    var scene = createScene();
    
    engine.runRenderLoop(function () {
        scene.render();
    });
    
    window.addEventListener("resize", function () {
        engine.resize();
    });
    
    var wallMaterial = new BABYLON.StandardMaterial("wallMat", scene);
    wallMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.95, 1);

    var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    ground.material = groundMaterial;

    var wallThickness = 0.2;

    var leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", { width: wallThickness, height: 3, depth: 10 }, scene);
    leftWall.position = new BABYLON.Vector3(-5, 1.5, 0);
    leftWall.material = wallMaterial;

    var rightWall = BABYLON.MeshBuilder.CreateBox("rightWall", { width: wallThickness, height: 3, depth: 10 }, scene);
    rightWall.position = new BABYLON.Vector3(5, 1.5, 0);
    rightWall.material = wallMaterial;

    var backWall = BABYLON.MeshBuilder.CreateBox("backWall", { width: 10, height: 3, depth: wallThickness }, scene);
    backWall.position = new BABYLON.Vector3(0, 1.5, -5);
    backWall.material = wallMaterial;

    var ceiling = BABYLON.MeshBuilder.CreateBox("ceiling", { width: 10, height: wallThickness, depth: 10 }, scene);
    ceiling.position = new BABYLON.Vector3(0, 3, 0);
    ceiling.material = wallMaterial;

    var cabinetMat = new BABYLON.StandardMaterial("cabinetMat", scene);
    cabinetMat.diffuseColor = new BABYLON.Color3(0.85, 0.85, 0.85);

    var cabinet = BABYLON.MeshBuilder.CreateBox("cabinet", { width: 1, height: 1.2, depth: 0.5 }, scene);
    cabinet.position = new BABYLON.Vector3(-4, 0.6, -4);
    cabinet.material = cabinetMat;

    BABYLON.SceneLoader.ImportMesh(
        "",
        "assets/models/",
        "receiving_cpr.glb",
        scene,
        function (meshes) {
            if (meshes.length > 0) {
                var importedModel = meshes[0];
                importedModel.position = new BABYLON.Vector3(0, 0, 2);
                importedModel.scaling = new BABYLON.Vector3(1, 1, 1);
            }
        },
        null,
        function (scene, message, exception) {
            console.error("Error loading model:", message, exception);
        }
    );

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI, true, scene");
    var instructions = new BABYLON.GUI.TextBlock();
    instructions.text = "Step 1: Check responsiveness\nStep 2: Call for help\nStep 3: Begin chest compressions";
    instructions.color = "white";
    instructions.fontSize = 24;
    instructions.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    instructions.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    instructions.top = "20px";
    instructions.background = "rgba(0, 0, 0, 0.5)";
    advancedTexture.addControl(instructions);

    if ((window.location.protocol === "https:" || window.location.hostname === "localhost") && navigator.xr) {
        navigator.xr.isSessionSupported("immersive-vr").then(function (supported) {
            var sessionMode = supported ? "immersive-vr" : "inline";
            scene.createDefaultXRExperienceAsync({
                uiOptions: { sessionMode: sessionMode }
            }).then(function (xrExperience) {
                scene.activeCamera = xrExperience.basedExperience.camera;
                advancedTexture.layer.layerMask = 0x10000000;
                xrExperience.basedExperience.camera.layerMask = 0x10000000;
            }).catch(function (err) {
                console.error("Error creating XR experience:", err);
            });
        });
    }

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
