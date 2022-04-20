# MentiLeaders
## MentiLeaders Overview
MentiLeaders is a web-based application built using the MERN Stack. The purpose is to allow both professors and students to visualize data
from Mentimeter quizzes and polls that they took throughout the semester. Unlike Mentimeter's base service, MentiLeaders allows visualization of
information from multiple quizzes and polls, and stores that data indefinitely. It is meant to track student progress and engagement over the entire
semester and provide useful statistics and information for professors and students.

## Running MentiLeaders
Running MentiLeaders is very simple since we used the Node Package Manager to manage all our library dependencies. To run, first, ensure that Node.js
and npm are installed on your computer (Latest version should work fine, just make sure it's Version 14 or better).

Next, clone the repository to your local computer (or unzip the code)

### Running Backend

```
Make sure that the .env file has been placed inside of the backend folder before trying to start the backend. This file is needed to connect to the database and have a properly functioning backend.
```

Now we will start MentiLeaders by running the backend. You should be inside the MentiLeaders folder here, with your path looking something like this:
> C:/Users/<username>/<path-to-mentileaders>/MentiLeaders>

Change directory to the backend directory of MentiLeaders by first going into src, then backend. Like this:
> cd src/backend

Now, we just need to install the necessary dependencies. You can do this by running:
> npm install

Lastly, to start the backend, just run:
> npm start

If it was successful, you should see the following message:
> listening on port 4000

If not, some things to trouble shoot might be making sure that the .env file is inside the backend directory, and that you have installed the dependencies in the correct place (there should be a node_modules folder inside the backend after running npm install)

### Running Frontend
Now that the backend is running, we will do a very similar process to start the frontend.
Start up a separate terminal (make sure the backend is still running in its own terminal) and go back to the MentiLeaders main folder, with the path:
> C:/Users/<username>/<path-to-mentileaders>/MentiLeaders>

Change directory to the frontend directory of MentiLeaders like this:
> cd src/frontend

and install the dependencies with npm again:
> npm install

Lastly, run:
> npm start

and the frontend should start up on localhost:3000 and it should automatically take you to that screen.

That's it! Now that you have one terminal running the frontend, and the backend running in a separate terminal, they should be able to communicate with eachother and the site should have full functionality!