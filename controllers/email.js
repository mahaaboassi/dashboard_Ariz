const nodemailer = require('nodemailer');

const User = require("../models/User")
const Pdf = require("../models/pdfDownloaded");

const sendEmail = async (req, res) => {
    const {  namePdf, name ,email} = req.body;

    const existUser = await  User.findOne({email})
    if(!existUser)  {
        return res.status(404).json({
          error : 1,
          data : [],
          message: "User not found."
      });
    }
   
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use a supported email service
        auth: {
            user: 'eng.mahaab96@gmail.com', // Your email
            pass: 'ucfl tvrd cgwc ltau',  // App-specific password or actual password
        },
    });

    
    // Email options
    const mailOptions = {
        from: "no-reply@arizglobal.com",
        to: "eng.mahaab96@gmail.com",
        subject: "Downloading",
        html: `<div style="padding:20px">
      Hello Admin there are somone download pdf from         our website <strong>Ariz Global</strong>
      <div style="display:flex;gap:10px">
      <div>
        <img style="width:250px" alt="logo" src="https://arizglobal.com/wp-content/uploads/2024/02/arizglobal-logo-circle-02.png" />
      </div>
      <div style="display:flex;align-items: center;">
        <ul>
          <li>Name User : <strong>${name}</strong></li>
          <li>Email User : <strong>${email}</strong></li>
           <li>Name PDF : <strong>${namePdf}</strong></li>
        </ul>
      </div>
      </div>
      <div>
        thanks
        
      </div>
    </div>`,
    };

    try {

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        const pdf = new Pdf({  email, name , pdfName :namePdf  });
        await pdf.save();
        res.status(200).json({
            error : 1,
            data : [],
            message: "Email sent successfully."
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            error : 1,
            data : [],
            message : "Server error." 
        });
    }
};

const savePdf = async (req , res) =>{
   const {email, name , pdfName  } = req.body

   try{

    const existUser = await  User.findOne({email})
    if(!existUser)  {
        return res.status(404).json({
          error : 1,
          data : [],
          message: "User not found."
      });
    }
    const pdf = new Pdf({  email, name , pdfName   });
    await pdf.save();
    res.status(200).json({
        error : 0,
        data : [],
        message : "Save PDF successfully!"
    });

   }catch(error) {
    console.error('Error Save PDF :', error);
    res.status(500).json({
        error : 1,
        data : [],
        message : "Server error." 
    });
   }
}

const sendMonthlySummaryEmail = async () => {
  try {
      // Get the first and last dates of the current month
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Fetch downloads within the current month
      const downloads = await Pdf.find({
          date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
      });
      console.log("here",downloads);
      
      if (downloads.length === 0) {
          console.log("No downloads for the current month.");
          return;
      }

      // Generate an HTML table of downloads
      const tableRows = downloads.map((download) => `
          <tr>
              <td>${download.name}</td>
              <td>${download.email}</td>
              <td>${download.pdfName}</td>
              <td>${new Date(download.date).toLocaleDateString()}</td>
          </tr>
      `).join("");

      const emailContent = `
          <div>
              <h3>Monthly PDF Download Summary</h3>
              <table border="1" cellspacing="0" cellpadding="5">
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>PDF Name</th>
                          <th>Date</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${tableRows}
                  </tbody>
              </table>
          </div>
      `;

      // Set up nodemailer
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'eng.mahaab96@gmail.com',
              pass: 'ucfl tvrd cgwc ltau', // Replace with an app-specific password
          },
      });

      const mailOptions = {
          from: 'eng.mahaab96@gmail.com',
          to: 'eng.mahaab96@gmail.com', // Admin email
          subject: 'Monthly PDF Download Summary',
          html: emailContent,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Monthly summary email sent: ' + info.response);
  } catch (error) {
      console.error('Error sending monthly summary email:', error);
  }
};
module.exports = { sendEmail ,savePdf ,sendMonthlySummaryEmail};