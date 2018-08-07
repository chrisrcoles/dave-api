# Bear Sightings Coding Challenge

# Solution Outline
Bear sightings are on the rise nationwide. Unfortunately, there's no centralized website to upload and access bear sightings. This is a big problem!

Using Node.js, create an API that allows users to submit bear sightings as they happen and query the database for recent sightings with certain filters.

Your API should conform to the following spec:

### POST /sighting ###
Example POST body:
```
    { bear_type: 'grizzly', notes: 'It was a big one!', zip_code: '90210', num_bears: 3 }
```

### GET /sighting/search ###
Return an array of sightings, include a unique ID with each.
Supported query params, all optional
```
    `start_date` (inclusive) (default: all time)
    `end_date` (inclusive) (default: all time)
    `bear_type` (default: all types)
    `zip_code` (default: all zip codes)
    `sort` (default: created timestamp, ascending. only supported value is `num_bears`)
```

### GET /sighting/:id ###
Return a single sighting object queried by its ID

## Submission ##
Submit the final project via this form: https://docs.google.com/forms/d/1OGUVmjmpRXSRFxH0SRoTPfZHwagi1lQEuCnaVSr261E
Please include a package.json or equivalent, but omit the node_modules directory. The form sometimes rejects zip files when node_modules is included.

# Run
`npm start`

# Application Architecture

- `api/__tests__` - Contains the `tests` scripts
- `api/resources/v1` - All `v1` resources
- `api/swagger` - `swagger.yaml` file for resource definitions
- `db/config` - Database configurations for [Sequelize ORM](http://docs.sequelizejs.com/)
- `db/migrations` - Database migrations
- `db/models` - ORM Models
- `lib/constants` - Constant definitions reused throughout application
- `lib/middleware` - Registered middleware
- `app/server.js` - Application entry point start script

Within Postgres, all of the relevant information is stored in the `bearsightings` table.

```
{
    "id": "2a9f5abb-509c-493b-9b84-54442b1b9bfb",
    "start_date": "2018-08-06T18:58:23.573Z",
    "end_date": "2018-08-06T18:58:23.573Z",
    "bear_type": "black",
    "notes": "Wow!",
    "zipcode": "20723",
    "num_bears": 7,
    "updatedAt": "2018-08-06T18:58:23.574Z",
    "createdAt": "2018-08-06T18:58:23.574Z"
}
```

# Setting Up the Application

 
 1. Platform dependencies must be installed. You will need Node and Postgres.
 - Install [Homebrew](https://docs.brew.sh/Installation)
 - `brew install node`
 - `brew install postgres`
 
 2. Create Postgres DB
 ```
    >$ psql template1
    >template1=# CREATE DATABASE dave_api;
    
 ```
 
 3. `.env` file
 - Ensure `.env` file is created and has proper parameters. DB credentials should go here 
 
 3. Software dependencies must be install. 
  - `yarn install` - installs `node_modules`
 
 4. DB Migrate
 - `npm run db:migrate` - sets up tables in database via migrations
 
 4. Start the app. 
 - `npm start`
 
 
 # Configuring the Application
 
 The file `.env` contains all of the server-side environment variables
 
 # Future Interation Plans
 
 1. Deploy. The application is only available for local development. This should be deployed to a hosted server.  

# Images

![Add](https://github.com/chrisrcoles/dave-api/blob/master/images/add.png)
![List](https://github.com/chrisrcoles/dave-api/blob/master/images/list.png)
![Search](https://github.com/chrisrcoles/dave-api/blob/master/images/search.png)
