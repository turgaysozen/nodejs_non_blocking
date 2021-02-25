const express = require('express')
const app = express()
const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.json())

let submission_list = []

app.get('/api', (req, res) => {
    api_overview = {
        "submission_list": "/api/submissions",
        "get submission": "/api/submission/:name",
        "add submission": "/api/add-submission/"
    }
    res.send(api_overview)
})

app.get('/api/submissions', (req, res) => {
    if (submission_list.length > 0) {
        res.send(submission_list)
    } else res.send("There is no any submission, first add one!")
})

app.get('/api/submission/:name', (req, res) => {
    if (submission_list.length > 0) {
        const submission = submission_list.find(s => s.name === req.params.name)
        if (submission) {
            res.send(String(submission.count))
        } else res.send("0")
    } else res.send("There is no any submission, first add one!")
})

app.post('/api/add-submission/', (req, res) => {
    const submission_check = submission_list.find(s => s.name === req.body.submission)
    if (!submission_check) {
        let submission = {
            name: req.body.submission,
            count: 1
        }
        submission_list.push(submission)
        res.send({ "name": req.body.submission, "count": submission.count })
    } else {
        submission_check.count += 1
        res.send({ "name": submission_check.name, "count": submission_check.count })
    }
})
