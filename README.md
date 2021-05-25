# AutoScout24Challenge
This is to store and share the code written for the AutoScout24 Challenge

This application is written in Typescript, Nodejs and Express.
All of the above were new to me, so some added learning was needed. 
These technologies were picked as Typescript is quite similar to Javascript, which I have touched on in my college degree and I chose Express as it was recommended in the question. Nodejs is used to carry out the backend tasks like receive files over the server which would be helpful for the second milestone.


## How to start application:

- First clone the repository to your local machine.
- Then install Nodejs - I am using v14.17.0 (this includes npm which you will need to run).
- The application is structured as two typescript files, functions in ejs files (found in the /dist/views directory) which are imported to a "home" ejs file which displays and formats the data.
- While in the local git repository, run:

	node ./dist/server.js

- This will start the nodejs server and listen on port "3000" on localhost.
- Go to your browser and navigate to "localhost:3000/home". This will bring you to the web page where the information is displayed.
- The information was generated in the ejs files on the server side before passing them to the browser, first I had attempted to pass the typescript function outputs into a html file however the browser was unable to carry this out so I switch to using ejs and compute these processes on server-side.
- There is a second endpoint "localhost:3000/reuse" that displays the results of the files (milestone 3).


## How to test the application:

- Nodejs can be used to run the test file also.
- In order to run the tests, run:

	npm run test

- The test files are located in the __tests__ folder, which contains tests endpoints.
- For testing I was using Jest and Supertest.
- I was unable to handle if my endpoints returned some (res.render) so I was unable to handle that response appropriately, I would have to manually test that with the uri and check the right things are coming up.

- If listings.csv and contacts.csv files in both ~/AutoScout24Challenge and ~/AutoScout24Challenge/dist locations are replaced, this should test if it works with other files; however there is no check if they are valid, so the assumption is that they are valid files (milestone 2).


## Things to note

 Unfortunately the last functional requirement is not implemented correctly as you see in function4.ejs.
The Map will overwrite the value with key of that id which is not what I wanted (realised too late while commenting it)

What I should have done (and tried to do but I was getting an "undefined" error) was have a "hash" that would give me a unique key for the id at that month ( I was trying hash = id/month) and if that occured again, then I would add 1 to the counter. See below for implementation:

            var tryMonth = +date.getUTCMonth();
            var hash = (+Object.values(results2[i])[0]/ tryMonth);
            if(map2.has(hash) == false){
                    map2.set(hash, [+Object.values(results2[i])[0], +date.getUTCMonth(), 1]);
            }
            else if(map2.has(hash) == true){
                    map2.set(hash, [+Object.values(results2[i])[0] , +date.getUTCMonth(), map2.get(hash)[2]+1]);
            }
        }
        var array = [];
        for( let entry of map2.entries()){
            array.push({
                id: entry[1][0],
                make: "",
                month: entry[1][1],
                price: "",
                mileage: "",
                value: entry[1][2]
            });
        }


However the error I was getting was the id was undefined later on.
This led me to use my original code but it is not accurate.
