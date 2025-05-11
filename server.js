const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the create wallet page
app.get('/create-wallet', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/createWallet/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 