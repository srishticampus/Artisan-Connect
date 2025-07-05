const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./dbConnection");
const route = require("./routes");
const { exec } = require('child_process');
const { spawn } = require('child_process');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/upload`));
// Routes
app.use("/atrisan_connect", route);
app.post('/predict', (req, res) => {
    const inputData = req.body;

    // Validate input
    const requiredFields = ["Name", "Category"];
    const missingFields = requiredFields.filter(field => !(field in inputData));
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
    }

    console.log('Sending input to Python:', inputData);

    const pythonProcess = spawn(
        'C:\\Users\\mepra\\AppData\\Local\\Programs\\Python\\Python313\\python.exe',
        ['predict.py'],
        { cwd: __dirname }
    );

    let output = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error('Python error:', error);
            return res.status(500).json({ error: 'Python script failed', stderr: error });
        }

        try {
            const lines = output.trim().split('\n');
            const jsonLine = lines.find(line => line.startsWith('{') && line.endsWith('}'));
            if (!jsonLine) throw new Error('No valid JSON output found');

            const result = JSON.parse(jsonLine);
            res.json({ data: result });
        } catch (err) {
            console.error('Failed to parse output:', output);
            res.status(500).json({ error: 'Invalid JSON output', rawOutput: output });
        }
    });

    // Send the input JSON via stdin
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();
});
// Start Server
const PORT = 4004;
app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
