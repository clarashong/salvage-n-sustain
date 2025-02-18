const express = require('express');
const router = express.Router(); 
const supabase = require('../data/supabaseClient'); 

/**
 *  @swagger
 *  components:
 *  schemas:
 *      Post:
 *      type: object
*       required:
*           - title
*           - user_id
*           - description
*           - items
*           - start_date
*           - end_date 
 *      properties:
 *          title:
 *              type: text
 *              description: title of event/program
 *          user_id:
 *              type: uuid
 *              description: id of the user who posted 
 *          created_at: 
 *              type: timestampz
 *              description: time post was created
 *          description:
 *              type: text
 *              description: description of event
 *          items: 
 *              type: json 
 *              description: items accepted in event
 *          start_date
 *              type: timestampz  
 *              description: start date of the event/program 
 *          end_date
 *              type: timestampz
 *              description: end date of the event/program    
 *          location
 *              type: json
 *              description: event location  
 *          image_url
 *              type: text
 *              description: link to image in storage                     
 */

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
 * /search:
 *   get:
 *     summary: Get all posts with optional filtering
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering posts
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
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
router.get('/search', logger, errorMiddleware, async (req, res, next) => {
    const {
        search,
        page
    } = req.query; 
    console.log(search); 

    if (!search) {
        // select all posts 
        const {data:posts, error} = await supabase
            .from('posts')
            .select('id, title,description,items,start_date,end_date,location,image_url,user_name'); 
        if (error) {
            const newError = new Error(error.message); 
            newError.status = 400; 
            next(newError); 
            return;
        } 
        res.status(201).json(posts);
    } else {
        const {data:posts, error} = await supabase
            .rpc('get_items_search', {items_param: search}); 
        if (error) {
            const newError = new Error(error.message); 
            newError.status = 400; 
            next(newError); 
            return;
        }
        res.status(201).json(posts);
    }
}); 

module.exports = router; 
