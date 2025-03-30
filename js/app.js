
var canvas = document.getElementById("renderCanvas");

var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

   
    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);


    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.8;


    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.6, 0.4); 
    ground.material = groundMaterial;

    console.log("Attempting to load model from assets/models/receiving_cpr.glb");
    BABYLON.SceneLoader.ImportMesh(
        "",
        "assets/models/",
        "receiving_cpr.glb",
        scene,
        function (meshes) {
            console.log("Model loaded successfully:", meshes);
            if (meshes.length > 0) {
                var importedModel = meshes[0];
                importedModel.position = new BABYLON.Vector3(0, 0, 2);
                importedModel.scaling = new BABYLON.Vector3(1, 1, 1);
            } else {
                console.error("No meshes returned from the model file.");
            }
        },
        null, 
        function (scene, message, exception) {
            console.error("Error loading model:", message, exception);
        }
    );

   
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var instructions = new BABYLON.GUI.TextBlock();
    instructions.text = "Step 1: Check responsiveness\nStep 2: Call for help\nStep 3: Begin chest compressions";
    instructions.color = "white";
    instructions.fontSize = 24;
    instructions.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    instructions.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    instructions.top = "20px";
    advancedTexture.addControl(instructions);

   
    if ((window.location.protocol === "https:" || window.location.hostname === "localhost") && navigator.xr) {
        navigator.xr.isSessionSupported("immersive-vr").then(function (supported) {
            var sessionMode = supported ? "immersive-vr" : "inline";
            scene.createDefaultXRExperienceAsync({
                uiOptions: { sessionMode: sessionMode }
            }).then(function (xrExperience) {
                console.log("WebXR session enabled with mode:", sessionMode);
            }).catch(function (err) {
                console.error("Error creating XR experience:", err);
            });
        });
    } else {
        console.warn("WebXR requires a secure origin (HTTPS or localhost). XR experience not enabled.");
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
