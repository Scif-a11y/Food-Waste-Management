const appId = 'f1e9b81e';
const appKey = '328831771eb5d86a5ab0c14fcb53a287';

document.querySelector('#searchbutton').addEventListener('click', function (event) {
    event.preventDefault();
    const query = document.querySelector('#searchBar').value;
    if (query) {
        fetchRecipes(query);
    }
});

function fetchRecipes(query) {
    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            displayRecipes(data.hits);
        })
        .catch(error => {
            console.error('Error fetching the recipes:', error);
        });
}

function displayRecipes(recipes) {
    const outputRecipe = document.getElementById('output-recipe');
    outputRecipe.innerHTML = '';

    if (!recipes || recipes.length === 0) {
        outputRecipe.innerHTML = '<p>No recipes found. Try another search term!</p>';
        return;
    }

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeBox = document.createElement('div');
        recipeBox.classList.add('recipe-box');
        recipeBox.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}" class="dishimg">
            <div class="recipe-info">
                <h3>${recipe.label}</h3>
                <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
                <p><strong>Ingredients:</strong></p>
                <ul class="ingredients">
                    ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <p><strong>Source:</strong> <a href="${recipe.url}" target="_blank">${recipe.source}</a></p>
            </div>
        `;
        outputRecipe.appendChild(recipeBox);
    });
}
