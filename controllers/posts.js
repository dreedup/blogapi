const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const post = await Post.create(req.body);
    req.user.posts = req.user.posts || [];
    req.user.posts.push(post._id);
    await req.user.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showPost = async function (req, res) {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showPosts = async function (req, res) {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePost = async function (req, res) {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async function (req, res) {
  try {
    await Post.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
