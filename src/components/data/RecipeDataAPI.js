import { recipes, categories, ingredients } from "./RecipeData";
import { colorScheme } from "./GetDynamicColorScheme";

export function getCategoryById(categoryId) {
  let category;
  categories.map((data) => {
    if (data.id == categoryId) {
      category = data;
    }
  });
  return category;
}

export function getCategoryName(categoryId, language) {
  let name;
  categories.map((data) => {
    if (data.id == categoryId) {
      name = data.name[language];
    }
  });
  return name;
}

export function getIngredientName(ingredientID) {
  let name;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      name = data.name;
    }
  });
  return name;
}

export function getIngredientUrl(ingredientID) {
  let url;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}

export function getRecipes(categoryId) {
  const recipesArray = [];
  recipes.map((data) => {
    if (data.categoryId == categoryId) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}

export function getRecipesByIngredient(ingredientId) {
  const recipesArray = [];
  recipes.map((data) => {
    data.ingredients.map((index) => {
      if (index[0] == ingredientId) {
        recipesArray.push(data);
      }
    });
  });
  return recipesArray;
}

export function getNumberOfRecipes(categoryId) {
  let count = 0;
  recipes.map((data) => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getAllIngredients(idArray) {
  const ingredientsArray = [];
  idArray.map((index) => {
    ingredients.map((data) => {
      if (data.ingredientId == index[0]) {
        ingredientsArray.push([data, index[1]]);
      }
    });
  });
  return ingredientsArray;
}

// functions for search
export function getRecipesByIngredientName(ingredientName) {
  const nameUpper = ingredientName.toUpperCase();
  const recipesArray = [];
  ingredients.map((data) => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const recipes = getRecipesByIngredient(data.ingredientId);
      const unique = [...new Set(recipes)];
      unique.map((item) => {
        recipesArray.push(item);
      });
    }
  });
  const uniqueArray = [...new Set(recipesArray)];
  return uniqueArray;
}

export function getRecipesByCategoryName(categoryName, language) {
  const nameUpper = categoryName.toUpperCase();
  const recipesArray = [];
  categories.map((data) => {
    const categoryDisplayName = data.name[language];

    if (categoryDisplayName.toUpperCase().includes(nameUpper)) {
      const recipes = getRecipes(data.id);
      recipes.map((item) => {
        const recipeWithCategory = {
          ...item,
          categoryName: categoryDisplayName,
        };
        recipesArray.push(recipeWithCategory);
      });
    }
  });
  return recipesArray;
}

export function getRecipesByRecipeName(recipeName, language) {
  const nameUpper = recipeName.toUpperCase();
  const recipesArray = [];
  recipes.map((data) => {
    const recipeDisplayName = data.title[language];

    if (recipeDisplayName.toUpperCase().includes(nameUpper)) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}

export function searchRecipesByCategoryNRecipeName(
  categoryName,
  textValue,
  language
) {
  const recipesCatArray = [];
  const recipesSelfArray = [];
  categoryName.map((nameUpper) => {
    categories.map((data) => {
      nameUpper = nameUpper.toUpperCase();
      textValue = textValue.toUpperCase();

      const foodName = data.name[language];

      if (foodName.toUpperCase().includes(nameUpper)) {
        if (foodName.toUpperCase().includes(textValue)) {
          const recipes = getRecipes(data.id);
          recipes.map((item) => {
            recipesCatArray.push(item);
          });
        }
      } else {
        recipes.map((data) => {
          if (data.title[language].toUpperCase().includes(textValue)) {
            recipesSelfArray.push(data);
          }
        });
      }
    });
  });

  var aux = recipesCatArray.concat(recipesSelfArray);
  var finalRecipeAfterSearch = [...new Set(aux)];
  return finalRecipeAfterSearch;
}

export function getIngredientById(ingredientID, language, measurement) {
  const ingrediantArray = [];
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      const ingredDesc = data.ingredientsDesc[language];
      ingrediantArray.push(ingredDesc[measurement]);
    }
  });
  return ingrediantArray;
}

export function getDirectionById(ingredientID, language) {
  const ingrediantArray = [];
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      ingrediantArray.push(data.directions[language]);
    }
  });
  return ingrediantArray;
}

export function getLightAppColorScheme(appColor) {
  const colorLightArray = [];
  colorScheme.map((data) => {
    if (data.name == appColor) {
      colorLightArray.push(data);
    }
  });
  return colorLightArray;
}

export function getRecipeById(recipeId) {
  return recipes[recipeId];
}