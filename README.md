# Assignment

This project is for the 3813ICT Assignmenmt.

## Organisation

This is a public git repository. Everytime a change is made in the component and the change works, I commit it to the git repository. 

## Data Structure

A list of user objects are kept in the JSON file on the server. The user object contains a list of groups and a list of groups that the user is an admin of. Groups are stored as in object with two properties: `name` and `channels`. The property `channels` is a list of channels that the user is in. User object has a boolean property of `super` and `group`. If `group` is true, it means that the user is a group admin. Local storage is used to store data on the client side. The user object and list of users and a boolean variable called `valid` are stored in the local sotrage. The user object is retrieved from the local storage when it is need on the client side.

## REST API

There is an 'api/login' which is sent after the user logs in. The details of the user is taken from the login form and then checked against the list of users in the JSON file. it then returns the details of the user, a `valid` boolean and a list of all the users if the details are correct. If the details does not match any of the details in the user.json file, it will return an error. There is also an 'api/user'. This route is used to write to the user JSON file. It is called each time there is a need to change any details of any user.

## State Change

The files will be changed when the model of the JSON file is called in the server file. Each angular component page will be updated when it is navigated to the url of the component.
