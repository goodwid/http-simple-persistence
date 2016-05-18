
books
:author
:title
:genre
:pub_year
:read
:resource

no HTML interface, just API server
JS Object in > stringify > to DB | from DB > parse  > JS Object

--

Method (verb)
GET
POST
PUT
DELETE

Body (text)
POST and PUT will have a meaningful JS object as body

--

Create (w/ JSON) -> returns JSON
Read (all, item) -> returns JSON
Update (w/ JSON) -> returns JSON
Delete (all, item) -> returns list of resources deleted

private:
Generate key_id (filename) with timestamp
writeToFile
readFromFile
confirm folder exists, folder?
