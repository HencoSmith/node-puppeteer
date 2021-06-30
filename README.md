# node-puppeteer
MySQL, REST and Puppeteer example

# Installation
```bash
docker compose up -d
```
NOTE:
The env file is only committed as part of the example; in production this file should never be committed.
In production the variables would be set in the environment e.g. '/etc/environment' and the env file can be omitted from the compose file.

# View
http://localhost:8080/

# Container Helpers
Enter the container 
```bash
docker compose exec web sh
```
Running logs
```bash
docker compose logs web -f
```
NPM
```bash
docker compose exec web npm -v
```

# Knex Helpers
```
docker compose exec web knex migrate:make create_users_table --migrations-directory ./db/migrations
```

# Improvements
Here is a list of improvements that can be made to the project:
- Adding CI (for example GitLab runners)
- Adding test cases (for example mocha unit tests)
- Binding DB to volumes for persistent data or using a managed DB
- API graceful startup shutdown
- Making use of ES Modules for the different components
- Input validation on API call
- Adding a config file
- Make use of queues and memory store (rabbitmq, redis)
- Graceful shutdown
- Error handling instead of just logging
- Front end view engine for a basic dashboard (for example ejs, plain html, .etc)