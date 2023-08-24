AFRAME.registerComponent("models", {
  init: async function () {

    //Get the compund details of the model
    var models = await this.getModels();

    var barcodes = Object.keys(models);

    barcodes.map(barcode => {
      var model = models[barcode];

      //Call the function
      this.createModels(model);
    });

  },
  getModels: function () {
    return fetch("js/modelList.json")
      .then(res => res.json())
      .then(data => data);
  },
  getModelColors: function () {
    return fetch("js/modelColours.json")
      .then(res => res.json())
      .then(data => data);
  },
  createModels: async function (model) {

    //model data
    var modelName = model.model_name;
    var barcodeValue = model.barcode_value;
    var modelUrl = model.model_url;

    //Get the color of the model
    var colours = await this.getModelColours();

    //Scene
    var scene = document.querySelector("a-scene");

    //Add marker entity for BARCODE marker
    var marker = document.createModel("a-marker");

    marker.setAttribute("id", `marker-${barcodeValue}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("model_name", modelName);
    marker.setAttribute("value", barcodeValue);

    scene.appendChild(marker);


    if(barcodeValue === 0) {
      var modelEl = document.createElement("a-entity");
      modelEl.setAttribute("id", `${modelName}`);
      modelEl.setAttribute("geometry", {
        primitive: box,
        width: model.width,
        height: model.height
      });
      modelEl.setAttribute("position", model.position);
      modelEl.setAttribute("rotation", model.rotation);
      model.setAttribute("material",{
        color: model.colour
      });
      marker.appendChild(modelEl);
    } else {
      var modelEl = document.createElement("a-entity");
      modelEl.setAttribute("id", `${modelName}`);
      modelEl.setAttribute("gltf-model", `url(${modelUrl})`);
      modelEl.setAttribute("scale", model.scale);
      modelEl.setAttribute("position", model.position);
      modelEl.setAttribute("rotation", model.rotation);
      marker.appendChild(modelEl)
  }
  }
})



