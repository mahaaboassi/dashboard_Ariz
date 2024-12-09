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
app.use(cors());
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// Routes
app.use("/api/auth", router);
app.use("/api/pdf", routerPdf)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});