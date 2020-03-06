A 1-week project by [Thijs Spijker](https://github.com/isirthijs/) & [Wessel Smit](https://github.com/wesselSmit/)

# Table of Contents
* [Demo](https://isirthijs.github.io/project-1-1920)
* [Goal](#goal)
* [Install-Notes](#install-notes)
* [Features](#features)
* [API](#api)
* [Data](#data)
* [Credits](#credits)
* [License](#license)

![](https://user-images.githubusercontent.com/45405413/76068435-6d7c9800-5f91-11ea-8618-5118f191c9da.png)

# Goal  

Show users recommended books based on OBAs collected personal data. Allow the user to choose what data OBA should save/use & show what impact the saved data can have on the user experience.

# Install Notes
## Requirements 
* `Node.JS`
* `NPM`

## Install 
1. Clone this repo

```bash
git clone https://github.com/iSirThijs/project-1-1920.git
```
2. Install dependencies with 

```bash
npm install
```

## Usage
### Development 
To run the dev environment
```bash
npm run dev
```

This wil run rollup watcher and serve with, allowing you to view on localhost:*. Terminal will show the port/address

### Build
Run to rollup and bundle the JS to `docs/scripts/app.js`
```bash
npm run build
```

# Features

## Tutorial

When the user lands on our website for the first time we present them with a zero state. This is basically a quick setup where the user is informed about OBAs user-data usage. The user can enable/disable OBA from using/saving their personal data.

## Profile

If the user wants to change their settings/permissions at any point, they can always go to their profile page and adjust some permissions. These changes are saved and are immediately effective.

## Recommendations

Depending op user permissions the recommendations page can go one of two routes:
* general => the recommendations feed doesn't use any personal data and instead fetches the trending/most popular books
* personal => the recommendations feed uses the users personal data and analyses what the user likes to read. It'll determine a few keywords which are used to fetch personalised data.

## Filtering 

If there are multiple genres/sections a filter menu appears. The user can toggle the filter options to show/hide content of certain genres.

## Foldable Content

The page has multiple separators, if the user clicks on one the content of said separator will be hidden. 


# API

We've used the OBA `API` which contains a lot of information about their media collection.

>This `API` is open and free to use!

## Data 

The data that we receive form the `API` is about the media that you can borrow from OBA. We use the following properties:
* genre
* title
* author 
* description 

The fetched data from the `API` is cleaned before using it;
* year => parsed to an integer
* empty values rely on a fallback system => with ternaries the data is always garanteed either a data-value or fallback-value
* unnecessary properties are deleted 

# Best Practices

* Code should be easily readable
* Only use shorthands if you really understand how they work
* Stick to a code style you understand and can apply consistently
* Add comments
* Use descriptive `variable`-/`function` names
* Only abbreviate words when instantly understandable
* Commit early and often
* Save JS selectors as variables (`const button = document.querySelector('button')`)
* Group code/logic based on functionality in `modules` 
* Try to avoid using `global` `variables` 

# Stuff We Want To Do

- [ ] Use more variables to customize/improve the recommendations [currently only genre works] (if users allows this)
- [ ] Allow user to give weight to certain variables in profile settings to manipulate the recommendations
- [ ] Give users the option to delete their data from the OBA database
- [ ] Allow user to sort recommendations

# Credits

### [OBA](https://www.oba.nl/)

We used the OBA `API`.

# [License](https://github.com/iSirThijs/project-1-1920/blob/master/LICENSE)
