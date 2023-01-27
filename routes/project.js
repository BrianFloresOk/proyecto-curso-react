const express = require('express');
const router = express.Router();
const { 
    list,
    store,
    detail,
    update,
    remove,
    addColaborator,
    removeColaborator
} = require("../controllers/projectController")

/* GET users listing. */
router
    .route('/')
        .get(list)
        .post(store)
router
    .route('/:id')
        .get(detail)
        .put(update)
        .delete(remove)
router
    .get('/colaborator/add', addColaborator)
    .delete('/colaborator/remove', removeColaborator)

module.exports = router;