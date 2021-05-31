# Welcome to Accord!
## Live Link: https://accordapp.herokuapp.com/
A clone of discord.com where users are able to join servers and chat in channels.

![accordSplashPage](https://user-images.githubusercontent.com/76798385/120115081-1b083800-c150-11eb-83ec-4dc6ae13d465.png)
## MVP
  * New account creation, log in, log out, and guest/demo login.
  * Users can browse through a list or servers they belong to.
  * Users can explore servers to join by clicking the compass button.  
  * Users can browse through channels named for different purposes.
  * Logged in users can live chat in any channel.
  * Logged in users can post messages that update the channel automatically without reloading the page.
 
## BONUS / STRETCH GOALS
  * Logged in users can privately direct message with other users in a specific server.
  * Logged in users can be invited to private channels within a server. Users can post media in channels.
  
## TECHNOLOGIES USED
  * React-Redux
  * Javascript
  * Flask
  * SQL-Alchemy
  * PSQL Database
  * CSS
  * HTML
  
# **Database Schema**

## `users`

| Column Name     | Data Type  | Details               |
|-----------------|------------|-----------------------|
| id              | Integer    | Not Null, Primary Key |
| email           | String     | Not Null              |
| user_name       | String(15) | Not Null              |
| hashed_password | String(15) | Not Null, Unique      |
| created_at      | dateTime   | Not Null              |
| updated_at      | dateTime   | Not Null              |

## `usersservers`

| Column Name      | Data Type | Details                       |
|------------------|-----------|-------------------------------|
| user_id          | Integer   | Primary Key                   |
| server_id        | String(15)| Primary Key                   |
| created_at       | dateTime  | Not Null                      |
| updated_at       | dateTime  | Not Null                      |


* `user_id` references `users` table
* `server_id` references `servers` table

## `servers`

| Column Name     | Data Type  | Details               |
|-----------------|------------|-----------------------|
| id              | Integer    | Not Null, Primary Key |
| server_name     | String(15) | Not Null              |
| img_url         | String     | Not Null              |
| user_id         | Integer    | Not Null, Foreign Key |
| category_id     | Integer    | Not Null, Foreign Key |
| created_at      | dateTime   | Not Null              |
| updated_at      | dateTime   | Not Null              |

* `user_id` references `users` table
* `category_id` references `categories` table

## `categories`

| Column Name | Data Type | Details                 |
|-------------|-----------|-------------------------|
| id          | Integer   | Not Null, Primary Key   |
| title       | String(15)| Not Null                |
| created_at  | dateTime  | Not Null                |
| updated_at  | dateTime  | Not Null                |

## `channels`

| Column Name    | Data Type | Details                |
|----------------|-----------|------------------------|
| id             | Integer   | Not Null, Primary Key  |
| title          | String(15)| Not Null               |
| category_id    | Integer   | Not Null, Foreign Key  |
| server_id      | Integer   | Not Null, Foreign Key  |
| created_at     | dateTime  | Not Null               |
| updated_at     | dateTime  | Not Null               |

* `category_id ` references `categories` table
* `server_id ` references `servers` table

## `chats`

| Column Name      | Data Type | Details                |
|---------------|-----------|------------------------|
| id            | Integer   | Not Null, Primary Key  |
| content       | Text      | Not Null               |
| channel_id    | Integer   | Not Null, Foreign Key  |
| created_at    | dateTime  | Not Null               |
| updated_at    | dateTime  | Not Null               |

* `channel_id` references `categories` table



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
