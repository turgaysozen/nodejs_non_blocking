# Soostone

Javascript Engineering
Interview Assignment
Write a long-lived service in JavaScript/NodeJS, that:
1. Listens on port 9000 for incoming HTTP connections (use any library you'd like) in
non-blocking fashion. It must accept and handle concurrent connections with
acceptable connections/second.
2. The service must implement a handler that expects a string-bodied submission to the
'POST /input' route. It will remember every single string submitted this way. See below.
3. The service must implement a handler at the 'GET /query' route with query parameter
'key'. It will check to see if it has ever seen this exact key from previous input
submissions. If it hasn’t seen the key before, it will return 0 (i.e. “0”). If it has seen the key
before, it will return the number of times it has seen the key (e.g. “3”) in the response
body.
General Guidelines
● Don’t feel you have to over-engineer the assignment. Do what feels right and sufficient
for you to showcase your practical skills in both Javascript/Node.js and programming.
This assignment was designed to be brief and to the point.
● Don’t feel you have to write tests for testing’s sake. Write them if you feel they’re needed
to ensure correct operation.
● If you have any questions or need clarification on anything, just reach out to us.
● It’s best to create a stand-alone repo on Github/Gitlab/Bitbucket and share it privately
with us, or alternatively send code as a packaged folder. We must be able to build it
relatively easily on our end.

##################################################################

You can run "index-non_blocking.js" to start server.

It uses "child_process" module to accept requests as concurrently and launch child process by "fork" method.

To add submission you can make post request on http://localhost:9000/api/add-submission and post parameter should be like this:
{
    "submission": "submission1"
}

It returns submission and the number of times it has seen the key.

All submissions store in submissions.json file and at the beginning it should have only empty list: []

To get submission by key you can make get request on http://localhost:9000/api/submission/{key}. exp: http://localhost:9000/api/submission/submission1, 
and it returns the number of times it has seen the key.

Also you can see all submissions on http://localhost:9000/api/submissions 

And to see api structure you can visit http://localhost:9000/api
{
"submission_list(get)": "/api/submissions",
"get submission(get)": "/api/submission/:name",
"add submission(post)": "/api/add-submission/"
}
