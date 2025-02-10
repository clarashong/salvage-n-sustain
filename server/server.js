const express = require('express');
const app = express();
const port = 3001; 

// routes
const postsRoute =  require('./routes/posts')

app.use('/posts', postsRoute);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
