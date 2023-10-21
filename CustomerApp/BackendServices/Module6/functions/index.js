const { onRequest } = require("firebase-functions/v2/https");
const axios = require("axios");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.getUpcomingConfirmedReservations = onRequest(async (req, res) => {
  const now = new Date();
  const in30Minutes = new Date(now.getTime() + 30 * 60000); // Calculate time 30 minutes from now
  try {
    const querySnapshot = await db
      .collection("reservation")
      .where("reservation_status", "==", "confirm")
      .where("reservation_time", ">=", now)
      .where("reservation_time", "<", in30Minutes)
      .get();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const emailData = {
        subject: "Reservation Confirmed",
        body:
          data.description +
          ` for a table of ${data.no_of_people}. \n Reservation id: ${
            data.reservation_id
          } \n Time : ${new Date(data.reservation_time._seconds * 1000)}`,
        user_id: data.user_id,
      };

      axios
        .post(
          "https://us-central1-serverless-402501.cloudfunctions.net/sendEmailNotifications",
          emailData
        )
        .then((response) => {
          console.log("Emails sent successfully");
        })
        .catch((error) => {
          console.error("Error sending emails:", error);
          return res.status(500).send("Error sending emails");
        });
    });
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    return res.status(500).send("Error retrieving reservations");
  }

  return res.status(200).send("Emails sent successfully");
});

const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub();
const nodemailer = require("nodemailer");

exports.sendEmailNotifications = onRequest(async (req, res) => {
  console.log(req.body);
  const emailData = req.body;

  // Create a transporter with your email provider's credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "akoliyapiyush28@gmail.com",
      pass: "okod jeof epnp ffgz",
    },
  });

  //get the user email
  const userQuerySnapshot = await db
    .collection("users")
    .where("user_id", "==", emailData.user_id)
    .get();

  if (!userQuerySnapshot.empty) {
    const userDoc = userQuerySnapshot.docs[0];
    const userData = userDoc.data();
    const email = userData.email_id;

    // Compose and send the email
    const mailOptions = {
      from: "akoliyapiyush28@gmail.com",
      to: email,
      subject: emailData.subject,
      text: emailData.body,
    };

    await transporter.sendMail(mailOptions);
  } else {
    console.error("User not found.");
  }

  return res.status(200).json({ message: "email sent to all" });
});
