# salvage-n-sustain
by Clara Hong (clarashong). \
In progress - Not currently accepting contributions

# Description
Salvage 'N' Sustain acts as a posting board for eco-friendly initiatives and events (ex. Toy drives, store collection for used-clothes). It also provides recycling/disposal guides to provide proper instruction on how to get rid of a certain item.

# Purpose
The goal of the website is to eliminate unecessary waste, ultimately encouraging reuse, recyling, and offering resources to those who need it, instead of immediately disposing used items. Its purpose is to be the first step before the user throws something out. 

# Build with  
- React (frontend) 
- Express.js (backend) 
- Supabase (database)

# Set up 
Prerequisites: 
- Node (npm) 

1. Clone the repository 
2. Install the required npm packages:   
```
    # in project folder 
    npm install 
    
    # install client dependencies
    cd client 
    npm install 

    # install server dependencies
    cd ../server
    npm install 
```
3. Fill in env variables for Supabase
- In client folder 
  - create a blank .env.local file 
  - fill it in based on .env.local.example
- In server folder 
  - create a blank .env file 
  - fill it in based on .env.example

# Running the application
1. In the project folder use command to start the client and server:  
  ``` 
  npm run dev 
  ``` 

## About the database
This project uses a live Supabase database, and it's connection details are contained in environment variables. Row Level Security is enabled as well, ensuring data protection. 