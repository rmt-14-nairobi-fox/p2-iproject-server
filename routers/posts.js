const router = require('express').Router();
const Controller = require('../controllers/posts');
const authentication = require('../middlewares/authentication');
const editPostAuthorization = require('../middlewares/editPostAuthorization');
const postAuthorization = require('../middlewares/postAuthorization');

router.use(authentication);

router.get('/', Controller.getPosts);

router.get('/myposts', Controller.getMyPosts);

router.post('/', postAuthorization, Controller.createPost);

router.put(
  '/:postId',
  editPostAuthorization,
  postAuthorization,
  Controller.editPost
);

router.delete('/:postId', editPostAuthorization, Controller.deletePost);

module.exports = router;
