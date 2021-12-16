package com.company;

import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.*;
import java.util.List;
import com.fasterxml.jackson.core.JsonProcessingException;

import javax.swing.*;

public class Database {

    private Connection conn;

    public Database() {
        try {
            conn = DriverManager.getConnection("jdbc:sqlite:Ny_databas_Grupp5.db"); //insert name of database
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public List<Recipe> getRecipes() {
        List<Recipe> recipes = null;

        try {

            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipes");

            ResultSet rs = stmt.executeQuery();

            Recipe[] recipesFromRS = (Recipe[]) Utils.readResultSetToObject(rs, Recipe[].class);
            recipes = List.of(recipesFromRS);

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }

        return recipes;
    }


    public Recipe getRecipeById(int id) {
        Recipe recipe = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipes WHERE id = ?");
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();

            Recipe[] recipeFromRS = (Recipe[]) Utils.readResultSetToObject(rs, Recipe[].class);
            recipe = recipeFromRS[0];

        } catch (Exception e) {
            e.printStackTrace();
        }

        return recipe;
    }


    public void createRecipe(Recipe recipe) {

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO recipes (name, description, imageURL) VALUES(?, ?, ?)");
            stmt.setString(1, recipe.getName());
            stmt.setString(2, recipe.getDescription());
            stmt.setString(3, recipe.getimageURL());

            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            System.out.println("error creating recipe");
        }
    }

    public List<Recipe> getRecipeByName(String name){
        List<Recipe> recipes = null;
        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipes WHERE name LIKE ? ");
            String x = "%"  + name + "%";
            stmt.setString(1, x);
            ResultSet rs = stmt.executeQuery();
            Recipe[] recipesFromRS = (Recipe[]) Utils.readResultSetToObject(rs, Recipe[].class);
            recipes = List.of(recipesFromRS);

            System.out.println(recipes);

        } catch (Exception e) {
            System.out.println("Error when Searching by name");
            e.printStackTrace();
        }
        return recipes;
    }

        public void updateRecipe(Recipe recipe){

        try {

            PreparedStatement stmt = conn.prepareStatement("UPDATE recipes SET name = ?, description = ?, imageURL = ? WHERE id = ?");
            stmt.setString(1, recipe.getName());
            stmt.setString(2, recipe.getDescription());
            stmt.setString(3, recipe.getimageURL());
            stmt.setInt(4, recipe.getId());
            stmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void deleteRecipe(int id){

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM recipes WHERE id = ?;");
            stmt.setInt(1,id);
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            System.out.println("error creating recipe");
        }
    }

    public String uploadImage(FileItem image) {

        String imageUrl = "/uploads/img/" + image.getName();

        try (var os = new FileOutputStream(Paths.get("src/www" + imageUrl).toString())) {
            // get the required byte[] array to save to a file
            // with file.get()
            os.write(image.get());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("error uploading image");
            return null;
        }

        return imageUrl;
    }

    public void deleteFile(String fileURL) {
        try {
            File f = new File(fileURL);
            Path p = Paths.get("src/www", f.getPath());
            String absolutePath = System.getProperty("user.dir");
            f = new File(absolutePath + p);

            if(f.delete())
                System.out.println("file deleted");
            else System.out.println("error, file not deleted");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}