const express = require('express');
const router = express.Router();
const supabase = require('../data/supabaseClient'); 

// logs the method being called and the url
const logger = (req, res, next) => {
    console.log(req.method + " " + req.url); 
    next(); 
};

// error middleware
const errorMiddleware = (err, req, res, next) => {
    res.status(err.status || 400) // Set the status code (default to 500)
    .json({ 
      error: { 
        message: err.message || 'unsuccessful post into database'
      } 
    });
}; 

router.use(express.json()); 
router.use(errorMiddleware);

/**
 * @swagger
 * /myPosts:
 *   get:
 *     summary: Get all posts with optional filtering
 *     tags: [Posts]
 *     headers:
 *       - in: header
 *         name: user_id
 *         schema:
 *           type: string
 *         description: id of the user 
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
router.get('/myPosts', logger, errorMiddleware, async (req, res, next) => {
    if (!req.headers.user_id) {
        const newError = new Error("Missing user id"); 
        newError.status = 400; 
        next(newError); 
        return;
    }
    try {
        const {data:posts, error} = await supabase
            .from('posts')
            .select('id, title,description,items,start_date,end_date,location,image_url,user_name')
            .eq('user_id', req.headers.user_id); 
        if (error) {
            throw error; 
        }
        res.status(200).json(posts); 

    } catch (error) {
        const newError = new Error(error.message); 
        newError.status = 400; 
        next(newError); 
        return;
    }
}); 

module.exports = router; 
