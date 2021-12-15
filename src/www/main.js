async function createRecipe(){
    let response = await fetch('',(req, res),{
        method: 'POST',
        body: recipeState})
        console.log(response);
}

async function deleteRecipe(){
    let response = await fetch('');
    
}

async function getRecipes(){
    let response = await fetch('');
    let recipes = response.json();
    let html = document.querySelector('');
    html.innerHTML = '';
    recipes.map(recipe =>{
        html.innerHTML += `
            <div> 
                <img src = '${recipe.image}'> 
                <h2> ${recipe.title} </h2>
                <p> ${recipe.description} </p>
            </div>
            `
    })
}

async function updateRecipes(){

    let response = await fetch('',(req, res),{
        method: 'POST',
        body: recipeState})
        console.log(response);
}
