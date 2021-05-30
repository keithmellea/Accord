Welcome to Harmony!
Live Link: Harmony
Harmony is a real-time messaging application heavily inspired by Discord. The site allows users to create an account, join and create servers, and talk to others via channels in their joined servers.

Check out the wiki for more information!

Technologies
Front-End
React
Redux
CSS
Back-End
Python
PostgreSQL
Flask
SQLAlchemy
SocketIO
Features
Sign up a new account and log in
Create / Edit / Join / Delete servers
Create / Edit / Delete channels
Edit User Username, Email, and Profile picture
Search for servers to join
Enter public text channels to communicate with other users in real-time
Privately message individual users to communicate with one another in real-time
Receive notifications when a user messages you in real-time
See a list of online and offline users updated in real-time
Instructions
To run this application:

Clone this repository (only this branch)

git clone https://github.com/danielshoun/harmony.git
Install dependencies

pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
Create a .env file based on the .env.example file

Setup a PostgreSQL user, password and database that matches the .env file

Enter the python virtual environment, migrate the database, seed the database, and run the flask app

pipenv shell
flask db upgrade
flask seed all
flask run
Install front end dependencies from the react-app directory and then run the front end server

npm install && npm run
Code Snippets
// Insert here
# Insert here
Future To Do Items
 Creating a role system
 Adding a friends system
 Implementing voice chat



# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run

   ```bash
   heroku login
   ```

5. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

8. Release your docker container to heroku

   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```

9. set up your database:

   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   heroku run -a {NAME_OF_HEROKU_APP} flask seed all
   ```

10. Under Settings find "Config Vars" and add any additional/secret .env variables.

11. profit
