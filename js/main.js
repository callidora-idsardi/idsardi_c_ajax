(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const hotspotTemplate =document.querySelector("#hotspot-template");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const spinnerCon = document.querySelector("#spinnerCon");
  const spinner = `<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
  <path fill="white" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
  <animateTransform
  attributeName="transform"
  attributeType="XML"
  type="rotate"
  dur="1s"
  from="0 50 50"
  to="360 50 50"
  repeatCount="indefinite" />
  </path>
  </svg>`;


  //functions

  function showSpinner() {
    spinnerCon.innerHTML = spinner;
  }

  function hideSpinner() {
    spinnerCon.innerHTML = "";
  }

  
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }



  function loadInfoBoxes() {
    showSpinner()
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      
      .then(response => response.json())
      .then(infoBoxes => {
     
    infoBoxes.forEach((infoBox, index) => {
      
    let selected = document.querySelector(`#hotspot-${index+1}`);

      const clone = hotspotTemplate.content.cloneNode(true);

      const hotspotHeading = clone.querySelector(".hotspot-heading");
      hotspotHeading.textContent = infoBox.heading;

      const hotspotDescription = clone.querySelector(".hotspot-description");
      hotspotDescription.textContent = infoBox.description; 

      const hotspotImage = clone.querySelector(".hotspot-image");
      hotspotImage.src = `images/${infoBox.thumbnail}`; 

      hideSpinner()
      selected.appendChild(clone);
    });
 
  })

  .catch(error => console.error(error)); //catch and report any errors
  }

  
  loadInfoBoxes();


  function loadMaterialInfo() {
    showSpinner()
    fetch("https://swiftpixel.com/earbud/api/materials")

    .then(response => response.json())
    .then(materialListData => {
    
    materialListData.forEach(material => {
      //clone template

      const clone = materialTemplate.content.cloneNode(true);

      //populate the clone template 
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading; 

      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;

      //append the populated template to the list 
      hideSpinner()
      materialList.appendChild(clone); 
    });

  })
  
  .catch(error => console.error(error)); //catch and report any error
}

  loadMaterialInfo();




  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });



})();

