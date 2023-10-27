const { Router } = require('express');
const router = Router();

// use swagger to document and test api
// swagger configuration 
// just simulating the existing robust api
router.get('/marketplace', async(req, res) => {
    try {
     //ionfo for UI logic 
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/products', async(req, res) => {
    try {
       
        // return info of products
       
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/products:id', async(req, res) => {
    try {
      // return product info
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router