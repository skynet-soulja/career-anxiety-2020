# Career Anxiety 2020

Website for Career Anxiety 2020

## Getting started

The steps to get local development up and running

### Running Backend

```
# Using Yarn
cd backend
yarn install

# dev env
yarn develop-dev
# staging env 
yarn develop-stg
# production env
yarn develop-prd
depending on env
```
Must setup proper environment variables with .env file 

### Frontend

Leave the Strapi backend running in the background. Open another terminal tab, and make sure you're in the `frontend` directory:

```
cd frontend
yarn install

# dev env
yarn develop
# staging env
yarn develop-stg
# production env
yarn develop-prd
```

Environment variables are handled through file extensions, so .env.development/.env.staging/.env.production

These will need to be setup to point frontend to the correct backend api endpoints
