# Course Project 2: Learned content practicing

This is a project for implementing a web application that is used for repeated practice of learned content, where users can answer multiple-choice questions from different topics provided by the application. Also, the application provides an API for retrieving and answering random questions.

The application uses a three-tier architecture (client, server, database) and a layered architecture with four layers (views, controllers, services, database). The technologies used in the project is: Deno, Oka, flyway database, docker, playwright, etc.

There is an online deployed application in Render, which can be found at:

https://course-project-2.onrender.com/


## 1. Run the application locally:

- Make sure the base image of drill-and-practice/Dockerfile is:

    + For Windows machine: denoland/deno:alpine-1.37.0
    + For Mac machine: lukechannings/deno:v1.29.2
</br></br>
- Install docker desktop for your machine (https://www.docker.com/products/docker-desktop/) and run:

    ```
    docker compose up
    ```
    to setup docker running, where run-locally.js is the starting point of the application

- Then the project is deployed and can be accessed at:
    ```
    http://localhost:7777/
    ```

## 2. Run the application tests locally:

- To run e2e tests (located in e2e-playwright/tests):

    + Make sure the base image of e2e-playwright/Dockerfile is:

        + For Windows machine: mcr.microsoft.com/playwright:v1.38.0-focal
        + For Mac machine: mcr.microsoft.com/playwright:v1.38.0-focal-arm64

    + Run this command:

    ```
    docker compose up
    ```
    + Make sure you wait for this command to finish, usually there will be a log:

    ```
    Successfully applied 1 migration to schema "public", now at version v1 (execution time 00:00.192s)
    ```
    + Then open a new terminal, then run:
    ```
    docker-compose run --entrypoint=npx e2e-playwright playwright test & docker-compose rm -sf    
    ```

- To run other tests (located in drill-and-practice/tests), these steps can be followed:

    + Have a live application running in docker by:
    </br>
    </br>
    
    ```
    docker compose up
    ```
    + Make sure you wait for this command to finish, usually there will be a log:
    </br>
    </br>
    ```
    Successfully applied 1 migration to schema "public", now at version v1 (execution time 00:00.192s)
    ```

    + Get the container id of the application, id can be fetched from this command:
    </br>
    </br>
    ```
    docker container ls 
    ```
    + Run the deno tests with the container id:
    </br>
    </br>
    ```
    docker exec -it <CONTAINER_ID> deno test --allow-all
    ```
