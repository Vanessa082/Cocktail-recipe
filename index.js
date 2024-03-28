document.addEventListener("DOMContentLoaded", async () => {
  const drinkImage = document.querySelector(".drink-image");
  const drinkName = document.querySelector(".drink-name");
  const recipeButton = document.querySelector(".recipe-button");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const recipeDropdown = document.querySelector(".recipe-dropdown");

  let drinkData = [];

  const fetchDrinkData = async () => {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a");
    const data = await response.json();

    if (data.drinks) {
      drinkData = data.drinks.slice(0, 50);
      updateDrink(0);
    }
  }

  const updateDrink = (idx) => {
    const drink = drinkData[idx];
    console.log({ drink, drinkData, idx })
    drinkImage.src = drink.strDrinkThumb;
    drinkName.textContent = drink.strDrink;
    recipeDropdown.textContent = drink.strInstructions;
  };

  await fetchDrinkData();

  // recipe button

  recipeButton.addEventListener("click", () => {
    recipeDropdown.style.display = "block";
    const translateY = 0;
    recipeDropdown.style.transform = `translateY(${translateY}px)`
  });

  // automatic transition
  let idx = 0;

  setInterval(() => {
    if (idx > drinkData.length - 1) {
      idx = 0;
    } else if (idx < 0) {
      idx = drinkData.length - 1;
    };

    // selectedDrnk.style.transform = `translateX(${-idx * 500}px)`;

    idx += 1;

    updateDrink(idx);

    console.log('current indx', idx, drinkData);
  }, 5000);

  // buttons

  prevButton.addEventListener('click', () => {
    const currentDrink = drinkData.findIndex((drink) => drink.strDrink === drinkName.textContent);
    const prevDrink = (currentDrink - 1 + drinkData.length) % drinkData.length;
    updateDrink(prevDrink);
  });

  nextButton.addEventListener('click', () => {
    const currentDrink = drinkData.findIndex((drink) => drink.strDrink === drinkName.textContent);
    const nextDrink = (currentDrink + 1) % drinkData.length;
    updateDrink(nextDrink);
  });
});
