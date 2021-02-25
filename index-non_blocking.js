const express = require('express')
const { fork } = require("child_process")
const app = express()
const port = process.env.PORT || 9000

app.use(express.json())

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.json())

// api structure overview
app.get('/api', (req, res) => {
    api_overview = {
        "submission_list(get)": "/api/submissions",
        "get submission(get)": "/api/submission/:name",
        "add submission(post)": "/api/add-submission/"
    }
    res.send(api_overview)
})

// get all submissions
app.get('/api/submissions', (req, res) => {
    const childProcess = fork('./allSubmissions.js');
    childProcess.send({})
    childProcess.on("message", submission => {
        if (submission.length > 0) {
            res.send(submission)
        } else res.send("There is no any submission, first add one!")
    })
})

// get specific submission by name
app.get('/api/submission/:key', (req, res) => {
    const childProcess = fork('./getSubmission.js');
    childProcess.send({ "submission": req.params.key })
    childProcess.on("message", submission => {
        res.send(submission)
    })
})

// add submission
app.post("/api/add-submission/", (req, res) => {
    const childProcess = fork('./addSubmission.js');
    childProcess.send({ "submission": req.body.submission })
    childProcess.on("message", submission => {
        res.send(submission)
    })
})
