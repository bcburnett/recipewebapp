/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */

module.exports = class db {
  /**
  */
  constructor() {
    this.User = require('../models/user');
    this.Chat = require('../models/chatstate');
    this.Post = require('../models/posts/postModel');
    this.Comment = require('../models/posts/commentModel');
    this.Like = require('../models/posts/likesModel');
    this.Profile = require('../models/profile.model');
    this.PantryItem = require('../models/pantryItem.model');
    this.Recipes = require('../models/recipeModel');
  }
  convertFraction (string) {
    const ary = string.split(' ')
    console.log(ary[0])
    if([...ary[0]].every(c => '0123456789.+/'.includes(c))) return eval(ary[0])
    return -1;
};
  async addPantryItem(item) {
    const myitem = this.PantryItem(item);
    const result = await myitem.save()
      .then((res) => res)
      .catch((e) => false);
    return result;
  }

  async getPantryItems(userid) {
    const response = await this.PantryItem.find({userid})
      .then((res) => res) // resolve the promise
      .catch((e) => false);
    return response;
  }


  async updatePantryItem(item) {
    const result = await this.PantryItem
      .findOneAndUpdate({ '_id': item._id }, item)
      .then((res) => res)// resolve the promise
      .catch((e) => false);
    return result;
  }

  async newRecipe() {
    const obj = {
      'ingredients': [
        {
          'text': 'new Ingredient',
        },
      ],
      'instructions': [
        {
          'text': 'new Instruction',
        },
      ],
      'quantity': [
        {
          'text': '0.0',
        },
      ],
      'title': 'Yogurt Parfaits',
      'unit': [
        {
          'text': 'Measure',
        },
      ],
      'url': 'URL',
      'description': 'description',
      'comments': [
        {
          'text': 'comment',
        },
      ],
    };

    const newRecipe = this.Recipes(obj);
    const result = await newRecipe.save()
      .then((res) => res)// resolve the promise
      .catch((e) => false);
    return result;
  }

  async deleteRecipe(id) {
    const result = await this.Recipes.findOneAndDelete({ '_id': id })
      .then((res) => res)
      .catch((e) => false);
    return result;
  }

  async updateRecipe(item) {
    console.log(item);
    item.quantity= item.quantity.map(i=>this.convertFraction(i))
    const result = await this.Recipes
      .findOneAndUpdate({ '_id': item._id }, item, { new: true })
      .then((res) => res)// resolve the promise
      .catch((e) => false);
    return result;
  }

  async searchRecipes(data, page) {
    if (data == '') return;
    const count = await this.Recipes
      .find({ $text: { $search: data } }, { _id: 1, title: 1, score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .countDocuments()
      .then((res) => res)
      .catch((e) => false);


    const result = await this.Recipes
      .find({ $text: { $search: data } }, { _id: 1, title: 1, score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .skip((page - 1) * 10)
      .limit(10)
      .then((res) => res)
      .catch((e) => false);
      result[result.length]=count;
    console.log(result);
    return result;
  }

  async fetchRecipe(id) {
    if (id == '') return;
    const result = await this.Recipes
      .findById(id)
      .then((res) => res)
      .catch((e) => false);
    return result;
  }

  // posts

  verifyPost(post) {
    if (!post.user_id || !post.post_id || !post.userid || !post.poster) {
      return false;
    }
    return true;
  }

  async savePost(post) {
    // eslint-disable-next-line new-cap
    const mypost = this.Post(post);
    const result = await mypost.save()
      .then((res) => res)// resolve the promise
      .catch((e) => false);
    return result;
  }

  async getPost(postid) {
    const result = await this.Post.findOne({ post_id: postid })
      .then((res) => res)// resolve the promise
      .catch((e) => false);
    return result;
  }

  async updatePost(post) {
    const thePost = await this.Post
      .findOneAndUpdate({ 'post_id': post.post_id }, post)
      .then((res) => res)// resolve the promise
      .catch((e) => false);
    return thePost;
  }

  async deletePost(id) {
    const result = await this.Post.findOneAndDelete({ 'post_id': id })
      .then((res) => res)
      .catch((e) => false);
    return result;
  }

  async getLastTenPosts() {
    const response = await this.Post.find()
      .sort({ _id: 1 })
      .then((res) => res) // resolve the promise
      .catch((e) => false);
    return response;
  }

  // users

  async getUserData(id) {
    const result = await this.User.findById(id)
      .then((res) => res)
      .catch((e) => false);
    return result;
  }

  async userExists(email) {
    let result = await this.User.findOne({ 'email': email })
      .then((res) => res)
      .catch((e) => {
        return { false: false };
      });
    if (result === null) {
      result = { false: false };
    }
    return result;
  }

  async userNameExists(name) {
    let result = await this.User.findOne({ 'name': name })
      .then((res) => res)
      .catch((e) => {
        return { false: false };
      });
    if (result === null) {
      result = { false: false };
    }
    return result;
  }

  async postComment(comment) {
    // eslint-disable-next-line new-cap
    const myComment = this.Comment(comment);
    const result = await myComment.save()
      .then((res) => res)// resolve the promise
      .catch((e) => {
        return { false: false };
      });
    return result;
  }

  async getComments(postid) {
    const result = await this.Comment.find({ 'post': postid })
      .then((res) => res)// resolve the promise
      .catch((e) => {
        return { false: false };
      });
    return result;
  }

  async deleteComment(id) {
    const result = await this.Comment.findOneAndDelete({ '_id': id })
      .then((res) => res)
      .catch((e) => false);
    return result;
  }

  async saveLike(e) {
    const test = await this.Like.find({ 'post': e.post, 'userid': e.userid }).then((res) => res || []);
    if (test.length !== 0) return;
    // eslint-disable-next-line new-cap
    const mylike = this.Like(e);
    const result = await mylike.save()
      .then((res) => res)// resolve the promise
      .catch((e) => {
        return { false: false };
      });
    return result;
  }

  async getLikes(e) {
    const result = await this.Like.find({ 'post': e })
      .then((res) => res || {})// resolve the promise
      .catch((e) => {
        return { false: false };
      });
    return result;
  }

  async deleteLikes(e) {
    const result = await this.Like.deleteMany({ 'post': e })
      .then((res) => res || {})// resolve the promise
      .catch((e) => {
        return { false: false };
      });
    return result;
  }

  async saveProfile(profile) {
    const test = await this.Profile.findOne({ 'userid': profile.userid })
      .then((res) => res.userid ? true : false)
      .catch((e) => false);
    if (test) {
      // update
      // eslint-disable-next-line max-len
      const result = await this.Profile.findOneAndUpdate({ 'userid': profile.userid }, profile)
        .then((res) => res)
        .catch((e) => false);
      return result;
    } else {
      // new
      const myprofile = this.Profile(profile);
      const result = await myprofile.save()
        .then((res) => res)
        .catch((e) => false);
      return result;
    }
  }

  async getProfile(e) {
    const result = this.Profile.findOne({ 'userid': e })
      .then((res) => res)
      .catch((e) => false);
    return result;
  }

  async getProfileImage(e) {
    const result = this.Profile.findOne({ 'userid': e })
      .then((res) => res.image)
      .catch((e) => false);
    return result;
  }
};
