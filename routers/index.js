const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('haloo')
})

module.exports = router