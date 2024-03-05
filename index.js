document.addEventListener("DOMContentLoaded", function() {
    const drinkImage = document.querySelector(".drink-image");
    const drinkName = document.querySelector(".drink-name");
    const recipeButton = document.querySelector(".recipe-button");
    const recipeDropdown = document.querySelector(".recipe-dropdown");

    const fetchDrinkData = async () => {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito");
      const data = await response.json();

      if (data.drinks) {
        const drink = data.drinks[0];
        drinkImage.src = drink.strDrinkThumb;
        drinkName.textContent = drink.strDrink;
        recipeDropdown.textContent = drink.strInstructions;
      }
    };

    fetchDrinkData();

    recipeButton.addEventListener("click", function() {
      recipeDropdown.style.display = "block";
    });

  });
