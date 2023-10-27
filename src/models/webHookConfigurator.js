const { Router } = require('express');
const router = Router();
const webHooks = []; // assuming this is stored somewhere in a database for example

// use swagger to test your webhooks
// configure new webHook
router.post('/mpWebHooks', async(req, res) => {
    try {
        const newWebHook = req.body;
        webHooks.push(newWebHook)
        res.status(201).send(newWebHook);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// delete webHook
router.delete('/mpWebHooks/:id', async(req, res) => {
    try {
        const id = req.params.id;
        webHooks.pop(id); //logic to delete it 
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// get all webHooks
router.get('/mpWebHooks', async(req, res) => {
    try {
        
        res.status(200).send(webHooks)
    } catch (error) {
        res.status(500).send(error.message)
    }
})



router.delete('/:id', async(req, res) => {
    try {
        const apps = await Apps.findByIdAndDelete(req.params.id)
        res.send(apps)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router