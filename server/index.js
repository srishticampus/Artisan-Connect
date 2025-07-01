const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./dbConnection");
const route = require("./routes");
const { exec } = require('child_process');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/upload`));

app.post('/recommend', (req, res) => {
    const inputData = req.body;

    // Validate input data
    if (!inputData || !inputData.type || !inputData.query) {
        return res.status(400).json({ error: 'Missing type or query field' });
    }
    if (inputData.type !== 'title' && inputData.type !== 'author') {
        return res.status(400).json({ error: `Invalid type: ${inputData.type}. Must be 'title' or 'author'` });
    }

    // Log input data for debugging
    console.log('Received input:', inputData);
    const jsonInput = JSON.stringify(inputData);
    console.log('Sending to Python:', jsonInput);

    // Run Python script using child_process
    const pythonPath = 'C:\\Users\\shiha\\AppData\\Local\\Programs\\Python\\Python311\\python.exe';
    const escapedJsonInput = jsonInput.replace(/"/g, '\\"');
    const command = `"${pythonPath}" recommend.py "${escapedJsonInput}"`;
    console.log('Executing command:', command);
    exec(command, { timeout: 60000, cwd: __dirname }, (err, stdout, stderr) => {
        if (err) {
            console.error('Exec error:', err);
            console.error('Python stderr:', stderr);
            console.error('Python stdout:', stdout);
            return res.status(500).json({ error: 'Recommendation failed', details: err.message, stderr, stdout });
        }
        try {
            console.log('Python stdout:', stdout);
            const lines = stdout.trim().split('\n');
            const jsonLine = lines.find(line => line.startsWith('{') && line.endsWith('}'));
            if (!jsonLine) {
                throw new Error('No valid JSON output found');
            }
            const result = JSON.parse(jsonLine);
            console.log('Parsed result:', result);
            res.json({ data: result });
        } catch (parseErr) {
            console.error('Parse error:', parseErr);
            console.error('Raw output:', stdout);
            res.status(500).json({ error: 'Failed to parse recommendation result', details: parseErr.message, rawOutput: stdout });
        }
    });
});

// Routes
app.use("/atrisan_connect", route);

// Start Server
const PORT = 4004;
app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
