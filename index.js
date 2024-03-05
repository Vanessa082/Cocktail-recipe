const carousel = document.querySelector('.carousel');

fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=list')
  .then(response => response.json())
  .then(data => {
    data.drinks.forEach(drink => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');

      // Add drink image and name to the carousel item
const img = document.createElement('img');
      img.src = drink.image_url;
      carouselItem.appendChild(img);

      const name = document.createElement('h2');
      name.innerText = drink.name;
      carouselItem.appendChild(name);

      carouselItem.addEventListener('click', () => {
        // When the carousel item is clicked, populate the selected drink container and recipe dropdown
populateSelectedDrink(drink);
      });

      carousel.appendChild(carouselItem);
    });
  });

  function populateSelectedDrink(drink) {
    const drinkImage = document.querySelector('.drink-image');
    const drinkName = document.querySelector('.drink-name');
    const recipeButton = document.querySelector('.recipe-button');
    const recipeDropdown = document.querySelector('.recipe-dropdown');
  
    drinkImage.src = drink.image_url;
    drinkName.innerText = drink.name;
  
    recipeButton.addEventListener('click', () => {
      // When the recipe button is clicked, display the recipe dropdown
  recipeDropdown.style.display = 'block';
      recipeDropdown.innerHTML = drink.recipe;
    });
  }
  