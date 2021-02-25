const fs = require('fs-extra')

process.on("message", message => {
    const jsonResponse = getSubmission(message.submission);
    process.send(jsonResponse);
    process.exit();
})

// get submission by name
getSubmission = key => {
    const submission_list = fs.readJsonSync('./submissions.json')
    const submission_exist = submission_list.find(s => s.name === key)
    if(submission_exist){
        return String(submission_exist.count)
    } else return "0"
}
