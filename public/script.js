
function displayRecettes(recettes) {
    const recettesDiv = document.getElementById('recettes');
  
   
    const recetteElements = document.querySelectorAll('.recette');
  
    
    recetteElements.forEach(recetteElement => {
      recetteElement.addEventListener('click', function() {
        
        const content = recetteElement.querySelector('.content');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
      });
    });
  }

  
  window.addEventListener("load", function() {
   
    const splashScreen = document.querySelector(".splash-screen");
    splashScreen.style.display = "block";

    
    const nav = document.querySelector("nav");
    const footer = document.querySelector("footer");
    nav.style.display = "none";
    footer.style.display = "none";

    
    setTimeout(function() {
      splashScreen.style.display = "none";


      const mainContent = document.querySelector("main");
      mainContent.style.display = "block";
      nav.style.display = "block";
      footer.style.display = "block";
    }, 3000); 
  });
  
  window.onload = function() {


    fetch('/recipe') 
      .then(response => response.json())
      .then(data => {
        displayRecettes(data);
      })
      .catch(error => console.error('Erreur lors du chargement des données JSON :', error));
  };

 
