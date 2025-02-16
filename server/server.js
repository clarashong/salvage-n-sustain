const express = require('express');
const app = express();
const port = 3001; 

// routes
const postsRoute =  require('./routes/posts')
const userRoute =  require('./routes/user')

app.use('/user', userRoute); 
app.use('/posts', postsRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
