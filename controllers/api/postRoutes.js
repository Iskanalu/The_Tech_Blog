const router = require('express').Router();
const { Post } = require('../../models');
const { Comment } = require('../../models')
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth,async (req, res) => {
  // find a single post by its `id`
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    return res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.put('/:id', withAuth, async (req, res) => {
  // update a single post by its `id`
  try {
    console.log('update body >', req.body);
    console.log('update id >', req.params.id);

    const postData = await Post.update(
      { ...req.body },
      { where: { id: req.params.id } }
      );
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    return res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.post('/:id/comment', withAuth, async (req, res) => {
  // post a comment by the post id
  try {
    const newComment = await Comment.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
