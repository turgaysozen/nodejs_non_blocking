const fs = require('fs-extra')

process.on("message", async message => {
    const jsonResponse = await addSubmission(message.submission);
    process.send(jsonResponse);
    process.exit();
})

// add submission
addSubmission = async (submission) => {
    const submission_list = await fs.readJson('./submissions.json') // get all submissions (read from submissions.json)
    const submission_check = submission_list.find(s => s.name === submission)
    if (!submission_check) {
        let submission_obj = {
            name: submission,
            count: 1
        }
        submission_list.push(submission_obj)
        await fs.writeJson('./submissions.json', submission_list)
        return { "name": submission, "count": submission_obj.count }
    } else {
        submission_check.count += 1 // increase existence submission value
        await fs.writeJson('./submissions.json', submission_list)
        return { "name": submission_check.name, "count": submission_check.count }
    }
}