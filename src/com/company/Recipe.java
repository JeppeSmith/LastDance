package com.doit;


public class Recipe {

    private int id;
    private String name;
    private String description;
    private String imageURL;


    public Recipe() {
    }


    public Recipe(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Recipe(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Recipe(int id, String name, String description, String imageURL) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getimageURL() {
        return imageURL;
    }

    public void setimageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
