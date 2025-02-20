# salvage-n-sustain
by Clara Hong (clarashong). \
Submission for Green Pioneers

# Description
A big environmental problem is excessive waste generation that fills up landfills and pollutes the environment. Salvage 'N' Sustain acts as the first step for anyone looking to dispose something that could possibly e repurposed or given away. The site acts as a central location for programs, drives, events that promote reuse and sustainability. For those who don't find any matching posts, it also provides a disposal guide on how to properly dispose items according to city guidelines. Anyone, whether for personal/local programs or company/organization initiatives, can post to the posting board and contribute to waste reduction! 

# Purpose
The site works to reduce the waste caused by consumption culture as well as promote resource sharing and eco-friendly initiatives. 

# Build with  
- React (frontend) 
- Express.js (backend) 
- Supabase (database and authentication)
- Google Gemini (disposal guide generation) 

# Getting keys and variables
1. Get a free Google Gemini key at: https://aistudio.google.com/app/apikey
2. For judges, use the provided supabase project url and anon key (row level security is enabled for data protection)

# Set up 
Prerequisites: 
- Node (npm) 

1. Clone the repository 
2. Install the required npm packages in the project, client, server folders:   
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

For those interested in setting up a similar supabase database, here is the schema for the posts data: 
```
create table public.posts (
  id bigint generated by default as identity not null,
  title text not null default ''::text,
  user_id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  description text null default ''::text,
  start_date timestamp with time zone null,
  end_date timestamp with time zone null,
  location jsonb null,
  image_url text null default ''::text,
  user_name text not null default ''::text,
  items jsonb[] null default '{}'::jsonb[],
  constraint posts_pkey primary key (id),
  constraint posts_id_key unique (id)
) TABLESPACE pg_default;
```
