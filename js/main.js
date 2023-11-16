(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const hotspotTemplate =document.querySelector("#hotspot-template");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const errorMessage = document.querySelector("#error-message");
  const error = `<div class="error">
  <p><span>Oops!</span> There appears to be an error. Please try again later.</p></div>`
  const spinnerCon = document.querySelector("#spinnerCon");
  const spinner = `<svg viewBox="0 0 559 598.61" xmlns="http://www.w3.org/2000/svg">
  <defs>
  <style>.cls-1,.cls-2,.cls-3{stroke-width:0px;}.cls-2{fill:#caccc8;}.cls-3{fill:#e89b36;}</style>
  </defs>
  <path class="cls-3" d="m559,279.5C559,125.14,433.86,0,279.5,0S0,125.14,0,279.5s125.14,279.5,279.5,279.5,279.5-125.14,279.5-279.5Zm-496.5,0c0-119.85,97.15-217,217-217s217,97.15,217,217-97.15,217-217,217S62.5,399.35,62.5,279.5Z"/>
  <path class="cls-2" d="m221.77 450.48h83.12l41.56 69.95-41.56 69.95h-83.12l-41.56-69.95 41.56-69.95z"/>
  <path class="cls-3" d="m300.37 582.15 36.62-61.72-36.62-61.72h-73.66l-36.62 61.72 36.21 61.72h74.07m9.46 16.46h-92.58l-46.5-78.18 46.09-78.18h92.99l46.09 78.18-46.09 78.18z"/>
  <path class="cls-1" d="m155.39 45.32 8.8-4.04 10.59 23.06 15.38-7.06 3.4 7.4-24.18 11.1-13.99-30.46z"/>
  <path class="cls-1" d="m188.59,48.43l-.03-.09c-2.68-9.25,2.91-18.99,13.27-22,10.36-3,20.17,2.18,22.85,11.43l.03.09c2.68,9.25-2.91,18.99-13.27,22s-20.17-2.18-22.85-11.43Zm26.66-7.73l-.03-.09c-1.35-4.65-6.02-7.68-11.15-6.19-5.08,1.47-7.34,6.42-5.99,11.06l.03.09c1.35,4.65,6.02,7.68,11.1,6.21,5.13-1.49,7.39-6.43,6.04-11.07Z"/>
  <path class="cls-1" d="m239 18.91 9.27-1.08 18.66 31.82-10.31 1.2-3.22-5.65-13.39 1.55-1.79 6.23-10.12 1.17 10.89-35.25zm10.79 19.43-4.96-9.02-2.82 9.92 7.78-0.9z"/>
  <path class="cls-1" d="m270.74,16.43l13.46.69c12.46.64,19.33,7.9,18.84,17.56v.1c-.5,9.66-8.19,16.46-20.75,15.81l-13.26-.68,1.72-33.48Zm12.31,25.95c5.78.3,9.77-2.57,10.05-7.97v-.1c.28-5.36-3.4-8.66-9.18-8.96l-3.94-.2-.87,17.03,3.94.2Z"/>
  <path class="cls-1" d="m311.97 19.74 9.59 1.63-5.62 33.05-9.6-1.63 5.63-33.05z"/>
  <path class="cls-1" d="m330.92 22.84 8.66 2.57 8.73 21.08 5.05-16.98 9.18 2.73-9.55 32.13-8.13-2.42-9.07-21.88-5.24 17.62-9.18-2.73 9.55-32.13z"/>
  <path class="cls-1" d="m363.81,50.7l.04-.09c4.32-8.76,14.87-12.11,24.59-7.32,5.51,2.71,8.6,6.27,10.55,10.65l-8,3.37c-1.35-2.91-3.08-5.04-6.17-6.56-4.52-2.23-9.81-.3-12.08,4.3l-.04.08c-2.39,4.86-.57,10.08,4.4,12.53,2.1,1.04,3.93,1.4,5.63,1.22l1.8-3.65-6.18-3.04,3.01-6.1,14.42,7.1-6.67,13.53c-4.6.99-10.21.74-15.9-2.07-9.76-4.81-13.88-14.85-9.39-23.96Z"/>
  <path class="cls-1" d="m416.51 74.86 7.98 5.83-5.51 7.54-7.98-5.83 5.51-7.54z"/>
  <path class="cls-1" d="m438.54 92.34 7.22 6.75-6.38 6.82-7.22-6.75 6.38-6.82z"/>
  <path class="cls-1" d="m458.32 112.34 6.35 7.57-7.15 6-6.35-7.57 7.15-6z"/>
  </svg>
  `;


  //functions

  //spinner

  function showSpinner() {
    spinnerCon.innerHTML = spinner;
  }

  function hideSpinner() {
    spinnerCon.innerHTML = "";
  }


  //error

  function showError() {
    errorMessage.innerHTML =  error;
  }


  function hideError() {
    errorMessage.innerHTML ="";
  }


  
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }



  function loadInfoBoxes() {
    hideError()
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

  .catch(error => {
    console.error(error); //catch and report any errors
    showError()
  });
    
  }

  
  loadInfoBoxes();


  function loadMaterialInfo() {
    hideError()
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
  
  .catch(error => {
    console.error(error); //catch and report any errors
    showError()
  });
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

