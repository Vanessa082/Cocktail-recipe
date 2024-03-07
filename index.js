document.addEventListener("DOMContentLoaded", function () {
  const selectedDrnk = document.querySelector('.selected-drink')
  const drinkImage = document.querySelector(".drink-image")
  const drinkName = document.querySelector(".drink-name")
  const recipeButton = document.querySelector(".recipe-button");
  const prevButton = document.querySelector(".prev")
  const nextButton = document.querySelector(".next")
  const recipeDropdown = document.querySelector(".recipe-dropdown")

  let drinkData = []
  let idx = 0

  let interval = setInterval(run, 2000)

  const fetchDrinkData = async () => {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const data = await response.json()

    if (data.drinks) {
      drinkData = data.drinks
      updateDrink(0)
    }
  }

  const updateDrink = (idx) => {
    const drink = drinkData[idx]
    drinkImage.src = drink.strDrinkThumb;
    drinkName.textContent = drink.strDrink;
    recipeDropdown.textContent = drink.strInstructions;
  }

  fetchDrinkData()

  recipeButton.addEventListener("click", function () {
    recipeDropdown.style.display = "block";
  });

const run = () =>{
  idx++
  changeDrinkData()
}

const changeDrinkData = () =>{
  if(idx > drinkData.length -1){
    idx = 0
  } else if (idx < 0){
    idx = drinkData,length
  }

  selectedDrnk.style.transform = `translateX(${-idx * 500}px)`
}

  prevButton.addEventListener('click', () => {
    const currentDrink = drinkData.findIndex((drink) => drink.strDrink === drinkName.textContent);
    const prevDrink = (currentDrink - 1 + drinkData.length) % drinkData.length
    updateDrink(prevDrink)
    console.log(fetchDrinkData())
  })

  nextButton.addEventListener('click', () => {
    const currentDrink = drinkData.findIndex((drink) => drink.strDrink === drinkName.textContent);
    const nextDrink = (currentDrink + 1) % drinkData.length
    updateDrink(nextDrink)
    console.log(fetchDrinkData())
  })
});
