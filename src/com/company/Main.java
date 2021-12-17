package com.company;

import express.Express;
import express.middleware.Middleware;
import org.apache.commons.fileupload.FileItem;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        Express app = new Express();
        Database db = new Database();


        app.get("/recipes", (req, res) -> {
            List<Recipe> recipes = db.getRecipes();
            //System.out.println(recipes);
            res.json(recipes);
        });


        app.get("/recipes/:id", (req, res) -> {
            int id = Integer.parseInt(req.getParam("id"));
            Recipe recipe = db.getRecipeById(id);
            res.json(recipe);
        });

        app.get("/recipes/name/:name", (req, res) ->{
            String name = req.getParam("name");
            List<Recipe> recipe = db.getRecipeByName(name);
            res.json(recipe);
        });


        app.post("/recipes", (req, res) -> {
            Recipe recipe = (Recipe) req.getBody(Recipe.class);

            db.createRecipe(recipe);
            res.send("Create new recipe OK");
        });

        app.put("/recipes/:id", (req, res) -> {
            Recipe recipe = (Recipe) req.getBody(Recipe.class);
            //int id = Integer.parseInt(req.getParam("id"));
            db.updateRecipe(recipe);
            //System.out.println(recipe);

            res.send("Update recipe OK");
        });

        app.delete("/recipes/:id", (req, res) -> {
            Recipe recipe = (Recipe) req.getBody(Recipe.class);
            db.deleteRecipe(recipe.getId());
            res.send("Delete recipe OK");
        });


        app.post("/uploads", (req, res) -> {
            String imageUrl = null;

            try {
                List<FileItem> files = req.getFormData("files");
                imageUrl = db.uploadImage(files.get(0));
            } catch (Exception e) {
                e.printStackTrace();
            }
            res.send(imageUrl);
        });

  
        app.delete("/files", (request, response) -> {
            Recipe file = (Recipe) request.getBody(Recipe.class);
            db.deleteFile(file.getfileURL());
            response.send("din fil kanske togs bort, ingen vet");
        });

        app.get("/files/paths", (req, res) -> {

           List<Recipe> filePaths = db.getfilePaths();
           res.json(filePaths);

        });

        app.get("/files", (req, res) -> {

            Recipe file = (Recipe) req.getBody(Recipe.class);
            URL url = null;
            String localFile = file.getName();
            try {
                url = new URL("http://localhost:2021" + file.getfileURL());
            } catch (MalformedURLException e) {
                res.send("error getting URL");
                e.printStackTrace();
            }
            try {
                db.downloadFile(url,localFile );
            } catch (Exception e) {
                res.send("error downloading file");
                e.printStackTrace();
            }
            res.send("downloaded " + localFile + " from " + url);
        });


        try {
            app.use(Middleware.statics(Paths.get("src/www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(2021); // defaults to port 80
        System.out.println("Server started on port 2021");

    }
}
