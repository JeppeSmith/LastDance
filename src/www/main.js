let recipe = {}
let recipes = []

let file = {}
let files = []

async function postRecipe(){
    try {
        let response = await fetch('/recipes', (req, res), {
            method: 'POST',
            body: recipe
        })
        console.log("Posted Recipe");    
    } catch (error) {
        console.log(error)
    }
    
}

async function deleteRecipe(){
    try {
        let response = await fetch(`/recipes/${id}`(req, res), {
            method: 'DELETE'
        });
        console.log(response)    
    } catch (error) {
        console.log(error)
    }
    
}
async function postFile(){
    try {
        let response = await fetch('/uploads', (req, res), {
            method: 'POST',
            body: file
        })
        console.log(response)        
    } catch (error) {
        console.log(error)
    }

}
async function getFiles(){
    try {
        let response = await fetch('/files')
        files = response.json();
        let html = document.querySelector('')
        html.innerHTML = ""
        files.map(file => {
            html +=
                `
            <div>
            </div>
        `
        })   
    } catch (error) {
        console.log(error)
    }
}
async function deleteFile(id){
    try {
        let response = await fetch(`/files/${id}`)
        console.log(response)
    } catch (e) {
        console.log(e)
    }
    
}
async function getRecipeById(id){
    try {
        let response = await fetch(`/recipes/${id}`)
        recipe = await response.json();
        let html = document.querySelector('');
        html.innerHTML = `
        <div>
        
        </div>
    `    
    } catch (error) {
        console.log(error)
    }
    
}
async function getRecipeByName(name){
    try {
        let response = await fetch(`recipes/name/${name}`)
        recipe = await response.json();
        let html = document.querySelector('');
        html.innerHTML = `
        <div>
        </div> 
    `        
    } catch (error) {
        console.log(error)
    }

}


async function getRecipes(){
    try {
        let response = await fetch('/recipes');
        recipes = response.json();
        let html = document.querySelector('');
        html.innerHTML = '';
        recipes.map(recipe => {
            html.innerHTML += `
            <div> 
                <img src = '${recipe.image}'> 
                <h2> ${recipe.title} </h2>
                <p> ${recipe.description} </p>
            </div>
            `
        })
    } catch (error) {
        console.log(error)
    }
    
}

async function updateRecipe(id){
    try {
        let response = await fetch(`/recipes/${id}`, (req, res), {
            method: 'PUT',
            body: recipeState
        })
        console.log(response);        
    } catch (error) {
        console.log(error)
    }
}
