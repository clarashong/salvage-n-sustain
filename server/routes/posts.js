require('dotenv').config(); 
const { createClient } = require('@supabase/supabase-js'); 
const express = require('express');
const router = express.Router();
const protectedRouter = express.Router(); 
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

const authMiddleware = async (req, res, next) => {
    // check if user is logged in and whether session is correct - return 401 otherwise
    console.log(req.body); 
    const token = req.body.data.session.access_token; 
    const { data: { user }, error } = await supabase.auth.getUser(token);
    // no error found, the session matches a current session in supabase 
    if (!error && req.body.data.session.user.email == user.email) {
        next(); // move on
    } 

    res.status(401)
    .json({
        error: {
            message: "no access"
        }
    }); 
    return; 
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

protectedRouter.use(express.json()); 
protectedRouter.use(errorMiddleware); 

/**
 * @swagger
 * /create:
 *      post:
 *      summary: Create a new post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *              schema:
 *                  data: 
 *                      type: application/json 
 *                      description: data from get user session for authentication before posting 
 *                  post: 
 *                      type: $ref:'#/components/schemas/Post' 
 *                      description: post user wants to post
 *      responseBody: 
 *          content: 
 *              application/json    
 *              schema: 
 *                  post: 
 *                      type: $ref:'#/components/schemas/Post' 
 *                      description: content of created post                  
 *      responses:
 *          201:
 *              description: Post created successfully
 *              content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post' 
 *          400:
 *              description: Bad request - improper data 
 *          401: 
 *              description: Unauthorized - not authenticated/logged in 
 */
protectedRouter.post('/create', logger, authMiddleware, errorMiddleware, async (req, res, next) => {

    const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY; 
    let supabaseUser = await createClient(supabaseURL, supabaseAnonKey, {
        auth: {
            token: req.body.data.session.access_token
        }
    }); 

    let image_url = '';  
    if (req.body.image_url != null) image_url = req.body.image_url; 

    // inserts post into table
    const { data , error } = await supabaseUser
        .from('posts')
        .insert([
            {
                title: req.body.post.title,
                description: req.body.post.description, 
                user_id: req.body.post.user_id, 
                items: req.body.post.items, 
                start_date: req.body.post.start_date, 
                end_date: req.body.post.end_date, 
                location: req.body.post.location,
                image_url: image_url
            }])
        .select(); 

    // error from supabase 
    if (error != null) {
        const newError = new Error(error.message); 
        newError.status = 400; 
        next(newError); 
        return;
    } 

    // no error
    res.json(data); // return posted data
})

module.exports = protectedRouter; 
