let recipe = {}
let recipes = []

//TODO:
/*
    delete file
    update recipe
*/



async function postRecipe() {
    let x = "/uploads/" + document.querySelector('#element_2').files[0].name
    let doc = {
        name: document.querySelector('#element_1').value,
        description: document.querySelector('#element_3').value,
        imageURL: x
    }
    
    postFile()
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
        let id = recipe.id
        console.log(recipe)
        let response = await fetch(`/recipes/${id}`, {
            method: 'DELETE',
            body: JSON.stringify(recipe) 
        });
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}
async function downloadFile(){
    try {
        let response = await fetch(`/files/${20}`) //Hårdkodat laddar ner id 15 
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}
async function postFile() {
    try {
        let files = document.querySelector('#element_2').files
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
        let recipe = await response.json();
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
function manageRecipe(index){
    let html = document.querySelector('.cont');
    recipe = recipes[index]
    html.innerHTML = `
       <div id="form_container">	
		<h1><a></a></h1>
		<form id="form_35256" class="appintro" enctype="multipart/form-data" method="post" action="">
									
		<ul >
			
		<li id="li_1" >
		<label class="description" for="element_1">Title </label>
		<div>
			<input id="element_1" name="element_1" class="element text medium" type="text" maxlength="255" value=""/> 
		</div> 
		</li>
		<!-- <li id="li_4" >
		<label class="description" for="element_4">Category </label>
		<div>
		<select class="element select medium" id="element_4" name="element_4"> 
			<option value="" selected="selected"></option>
				<option value="1" >Note</option>

		</select>
		</div> 
		</li>  // uncomment if category is needed. In this form only "File" category is connected  -->
		<li id="li_2" >
		<label class="description" for="element_2">Update attachment </label>
		<div>
			<input id="element_2" name="element_2" class="element file" type="file"/>
            <div class = "imageXD">
            <img id="element_img" src="${recipes[index].imageURL}"> 
		</div>
        </div>   
		</li>		<li id="li_3" >
		<label class="description" for="element_3">Content </label>
		<div>
			<textarea id="element_3" name="element_3" class="element textarea medium"></textarea> 
		</div> 
		</li>
		<div style="display: flex">	
		<li class="buttons">
            <input type="hidden" name="form_id" value="35256" />
            <button onClick="updateRecipe()">Update</button>
            <button onClick="downloadFile('${recipes[index].imageURL}')">Download File?</button>
		</li>
			
		<li class="buttons">
			    <input type="hidden" name="form_id" value="35256" />		    
				<button onClick="deleteRecipe()">Delete</button>
		</li>
		</div>* All fields are required
		</ul>
		</form>	
		<div id="form_footer">			
		</div>
	</div>
    `
    console.log(recipes[index])
    
    document.querySelector('#element_1').value = recipes[index].name
    document.querySelector('#element_3').value = recipes[index].description

    //img under id="element_2"
    //Sätt dens src="" till nuvarande bilden
    //Om personen laddar upp en bild -->
        //Byt bild som visas
        //När receptet sparas skicka med nya bilden samt ta bort gamla
    //Om personen inte laddar upp en bild 
        //Felhantering för att den är tom/välja nya ifall det finns
        //Ladda upp nya
        document.getElementById('element_2').onchange = function() {
            postFile()
            setTimeout(1000)
            console.log(document.getElementById('element_2').files[0].name)
            let x =  document.querySelector(".imageXD")
            x.innerHTML = ""
            x.innerHTML += `
            <img id="element_img" src="/uploads/${document.getElementById('element_2').files[0].name}">
            `
        };
        


}




async function getRecipeByName(name) {
    try {
        let response = await fetch(`recipes/name/${name}`)
        recipe = await response.json();
        console.log(recipe)
        let html = document.querySelector('.Returns');
        recipe.map(recipe =>{
        html.innerHTML = `
        <div class="card">
            <img src='${recipe.imageURL}' alt="Recipe Image"> 
            <div class="container">
                <h2> ${recipe.name}</h2>
                <p> ${recipe.description} </p>
            </div>
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
        resp = await response.json();
        console.log(resp)
        let html = document.querySelector('.all-cards');
        html.innerHTML = '';
        let index = 0;
        resp.map(recipe => {
            recipes.push(recipe)
            
            html.innerHTML += `
            <div class="card"> 
                <img src='${recipe.imageURL}' alt="Recipe Image"> 
                <div class="container">
                    <h2> ${recipe.name} ${recipe.id}</h2>
                    <p> ${recipe.description} </p>
                    <button onClick="manageRecipe(${index})">Manage Recipe</button>
                </div>
            </div>
            `
            index++;
        })
    } catch (error) {
        console.log(error)
    }

}
//TODO
async function updateRecipe() {
    
    let doc = {
        id: recipe.id,
        name: document.querySelector('#element_1').value,
        description: document.querySelector('#element_3').value,
        imageURL: "/uploads/" + document.querySelector('#element_2').files[0].name
    }
    try {
        console.log(doc)
        let response = await fetch(`/recipes/${doc.id}`, {
            method: 'PUT',
            body: JSON.stringify(doc)
        })
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}