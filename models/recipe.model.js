const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title:{
       type: String,
       required: true,
       unique:true, // It should be required and unique.
  },

  level:{
       type: String,
       required: true, // Only can be one of the following values: EASY, MODERATE, DIFFICULT (remember the ENUM wink)
  },

  ingredients:[
      {
          name:{
              type:String,
              required:true,
          },
          ammount:{
              type: Number,
              required:true,
              default:0,
          },
          measure:{
              type: String,
              required:true,
          },
      }
  ],

  cuisine:{
      type: String,
      required: true, // Should be required.
  },

  comments:[String],

  dishtype:{
      type: String,
      required: true, //Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
  },

  image:{
      type: String, //. Default value: https://images.media-allrecipes.com/images/75131.jpg.
  },

  url:{
    type: String, //. Default value: https://images.media-allrecipes.com/images/75131.jpg.
},

  duration:{
      type: Number,// Min value should be 0.
      required: true,
  },

  creator:{
      type: String,
      required: true,
  },

  created:{
      type: Date,
      default: new Date(),
      required: true, //By default today.
  },
});

const Recipes = mongoose.model('Profile', RecipeSchema);

module.exports = Recipes;

/*
      facebook: String,
      twitter: String,
      hobbies: String,
      image: String,
*/