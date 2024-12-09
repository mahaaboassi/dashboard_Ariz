require("dotenv").config();
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const {router} = require("./routers/auth");
const { routerPdf } = require("./routers/pdf");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:5000', 'https://dashboard-ariz-2.onrender.com/'], // Add your frontend's domain here
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Allowed headers
  credentials: true, // Include credentials (cookies, etc.) if needed
}));
// cron
const cron = require("node-cron");
const { sendMonthlySummaryEmail } = require("./controllers/email");

// Schedule the task to run on the last day of every month at midnight
cron.schedule("0 0 28-31 * *", async () => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    if (today.getDate() === lastDayOfMonth) {
        console.log("Running monthly summary email task...");
        await sendMonthlySummaryEmail();
    }
});
// cron.schedule("0 * * * *", async () => {
//   console.log("Running hourly summary email task...");
//   await sendMonthlySummaryEmail();
// });
// Database Connection
connectDB();

// Serve React app from the build folder
app.use(express.static(path.join(__dirname, 'build')));


// Routes
app.use("/api/auth", router);
app.use("/api/pdf", routerPdf)

// Catch-all route to send index.html for any route that doesn't match API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});