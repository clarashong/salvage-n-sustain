const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; 

// routes
const postsRoute =  require('./routes/posts')
const userRoute =  require('./routes/user')

app.use(cors({
  origin: 'https://salvage-n-sustain-frontend.vercel.app',
}));

app.use('/api/user', userRoute); 
app.use('/api/posts', postsRoute);

app.get("/", (req, res) => { 
  res.send("Hello from express"); 
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
