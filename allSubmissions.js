const fs = require('fs-extra')

process.on("message", message => {
    const jsonResponse = allSubmissions();
    process.send(jsonResponse);
    process.exit();
})

// get all submissions (read from submissions.json)
allSubmissions = () => {
    const submission_list = fs.readJsonSync('./submissions.json')
    return submission_list
}