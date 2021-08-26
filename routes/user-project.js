const Controller = require('../controllers/user-project');
const { authorize } = require('../middleware/authorize');
const router = require('express').Router();

router.post('/:projectId/apply', authorize, Controller.applyProject);
router.get('/:userId', authorize, Controller.getUserProject);
router.get('/recruiter/apply', authorize, Controller.getApplyProject)
router.get('/apply/accepted', authorize, Controller.getEmployeeAccepted);
router.get('/apply/accepted/:name', authorize, Controller.groupAccepted);
router.patch('/:id/status', authorize, Controller.statusJob);
// router.post('/:id', authorize)

module.exports = router