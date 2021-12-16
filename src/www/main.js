let recipe = {}
let recipes = []

let file = {}
let files = []
//TODO:
/*
    delete file
    update recipe
*/

async function postRecipe() {
    let doc = {
        name: 'Creative Genius',
        description: "Just a penguin going to work",
        imageURL: "/uploads/test.png"
    }
    try {
        let response = await fetch('/recipes', {
            method: 'POST',
            body: JSON.stringify(doc)
        })
        console.log("Posted Recipe" + response);
    } catch (error) { 
        console.log(error)
    }

}

async function deleteRecipe() {
    try {
        id = 1
        let doc = {
            id: 1,
            name: 'Creative Genius',
            description: "Just a penguin going to work",
            imageURL: "/uploads/test.png"
        }
        let response = await fetch(`/recipes/${id}`, {
            method: 'DELETE',
            body: JSON.stringify(doc) 
        });
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

async function postFile() {
    try {
        let files = document.querySelector("#file").files
        let formData = new FormData();
        for(let file of files){
            formData.append('files', file, file.name)
        }
        console.log(formData)
        let response = await fetch('/uploads', {
            method: 'POST',
            body: formData
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }

}
//TODO
async function getFiles() {
    try {
        let response = await fetch('/files')
        files = await response.json();
        let html = document.querySelector('').files
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
//TODO
async function deleteFile(id) {
    try {
        let response = await fetch(`/files/${id}`)
        console.log(response)
    } catch (e) {
        console.log(e)
    }
}

async function getRecipeById(id) {
    try {
        let response = await fetch(`/recipes/${id}`)
        recipe = await response.json();
        let html = document.querySelector('.Returns');
        html.innerHTML = `
        <div>
             <img src='${recipe.imageURL}' alt="Recipe Image"> 
                <h2> ${recipe.name} ${recipe.id}</h2>
                <p> ${recipe.description} </p>
        </div>
    `
    } catch (error) {
        console.log(error)
    }

}

async function getRecipeByName(name) {
    try {
        let response = await fetch(`recipes/name/${name}`)
        recipe = await response.json();
        console.log(recipe)
        let html = document.querySelector('.Returns');
        recipe.map(recipe =>{
        html.innerHTML = `
        <div>
            <img src='${recipe.imageURL}' alt="Recipe Image"> 
            <h2> ${recipe.name} ${recipe.id}</h2>
            <p> ${recipe.description} </p>
        </div> 
    `
    })
    } catch (error) {
        console.log(error)
    }

}


async function getRecipes() {
    try {
        let response = await fetch('/recipes');
        recipes = await response.json();
        console.log(recipes)
        let html = document.querySelector('.Returns');
        html.innerHTML = '';
        recipes.map(recipe => {
            html.innerHTML += `
            <div> 
                <img src='${recipe.imageURL}' alt="Recipe Image"> 
                <h2> ${recipe.name} ${recipe.id}</h2>
                <p> ${recipe.description} </p>
            </div>
            `
        })
    } catch (error) {
        console.log(error)
    }

}
//TODO
async function updateRecipe(id) {
    let doc = {
        id: 1,
        name: 'Creative Genius',
        description: "Just a penguin going to work",
        imageURL: "/uploads/test.png"
    }
    try {
        let response = await fetch(`/recipes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(doc)
        })
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}