![cf](http://i.imgur.com/7v5ASc8.png) http-simple-persistence
====

## Description

For this assignment, write an http server that will act as 
a simple data store. It should respond to GET, POST, PUT and DELETE
requests for a named resource of your choosing.

* `GET` - A get request sent to `/notes` should respond with a list of all
of the json files that have been saved thus far. A get request sent to 
`/notes/name_of_resource` should respond with that resource.

* `POST` - The data coming in from a post request should be saved 
to a json file in a data folder in your repository, 
*do not commit your data folder to git*. For example if a request 
is sent to `/notes` with a body of `{ noteBody: 'hello world' }` the json 
data in the body should be stored in it's own json file. Y
You will need to pick a naming scheme for the POSTed files.

* `PUT` - The data coming in should be saved to the named resource either
creating or updating in entirety. So a request to `/notes/name_of_resources`
is idempotent in that the contents in the body of the request always become
the new data for that resource.

* `DELETE` - The corresponding resource should be removed. `notes/name_of_resource`
would remove resource `name_of_resource`

Verbs that are missing expected arguments should respond with `400` status code.

The http server should have no knowledge of `fs` module. All calls should be
against a `require`d module.

The data storage module (that actually handles data persistence) should be 
directly tested. It's okay to do "real" `fs` inspection in your tests. You may find 
these modules helpful for test setup and teardown (before/after):
* [rimraf (`rm -rf`)](https://www.npmjs.com/package/rimraf)
* [mkdirp - (mkdir -p)](https://www.npmjs.com/package/mkdirp)

The api exposed by the server should be E2E tested with `chai-http`


## To Submit this Assignment

* Use our normal process
* Remember, you _can_ do this exercise as a team

#### Rubric:
* Quality: 2pts
* Data Storage: 2pts
* Data Storage Testing: 2pts
* "Routing": 2pts
* "Routing" Testing: 2pts

## Bonus Points For More Fun:

* Promises: *5pts* 
	* Include a Promise based API for your data storage and use that in your server 