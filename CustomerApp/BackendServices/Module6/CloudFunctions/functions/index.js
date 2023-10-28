const { onRequest } = require("firebase-functions/v2/https");
const axios = require("axios");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();
const db = admin.firestore();

// Function to get upcoming confirmed reservations
exports.getUpcomingConfirmedReservations = onRequest(async (req, res) => {
  const now = new Date();
  const in30Minutes = new Date(now.getTime() + 30 * 60000); // Calculate time 30 minutes from now
  try {
    // Query Firestore for upcoming confirmed reservations
    const querySnapshot = await db
      .collection("reservation")
      .where("reservation_status", "==", "confirm")
      .where("reservation_time", ">=", now)
      .where("reservation_time", "<", in30Minutes)
      .get();

    querySnapshot.forEach((doc) => {
      // Process each reservation
      const data = doc.data();
      // Construct an email message
      const emailData = {
        subject: "Reservation Confirmed",
        body: data.description +
          ` for a table of ${data.no_of_people}. \n Reservation id: ${
            data.reservation_id
          } \n Time : ${new Date(data.reservation_time._seconds * 1000)}`,
        user_id: data.user_id,
        user_email: "",
      };

      // Send an email notification
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

// Function to send email notifications
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

  if (emailData.user_email === "") {
    // Get the user email from Firestore
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
  } else {
    const email = emailData.user_email;

    // Compose and send the email
    const mailOptions = {
      from: "akoliyapiyush28@gmail.com",
      to: email,
      subject: emailData.subject,
      text: emailData.body,
    };

    await transporter.sendMail(mailOptions);
  }

  return res.status(200).json({ message: "Email sent to all" });
});

// Function to get all users
exports.getAllUsers = onRequest(async (req, res) => {
  const emailDetails = req.body;
  console.log(emailDetails);

  // Query Firestore to get all users
  const userQuerySnapshot = await db.collection("users").get();
  if (!userQuerySnapshot.empty) {
    userQuerySnapshot.forEach((doc) => {
      const data = doc.data();
      const emailData = {
        subject: emailDetails.subject,
        body: emailDetails.body,
        user_id: data.user_id,
        user_email: data.email_id,
      };

      // Send email notifications to all users
      axios
        .post(
          "https://us-central1-serverless-402501.cloudfunctions.net/sendEmailNotifications",
          emailData
        )
        .then((response) => {
          console.log("Users found successfully.");
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          return res.status(500).send("Error fetching users");
        });
    });
    return res.status(200).send("Email sent to all the users successfully!!");
  } else {
    console.error("No Users present yet");
    return res.status(200).send("No users found!!");
  }
});

// Function to handle reservation status change using Firestore trigger
exports.handleReservationStatusChange = functions.firestore
  .document("reservation/{reservation_id}")
  .onUpdate(async (change, context) => {
    // ... (This part seems to be a separate function)

    return null;
  });

// Helper function to find the differences between two arrays
function diffArrays(newArray, oldArray) {
  const added = newArray.filter(
    (item) => !oldArray.some((oldItem) => oldItem.item_id === item.item_id)
  );
  const removed = oldArray.filter(
    (item) => !newArray.some((newItem) => newItem.item_id === item.item_id)
  );

  return { added, removed };
}

// Function to get all completed reservations for a customer
exports.getAllCompletedReservationsForCustomer = onRequest(async (req, res) => {
  console.log(req.body);
  var userData = req.body;

  const completedReservations = [];
  console.log(userData.user_id);
  const querySnapshot = await db
    .collection("reservation")
    .where("user_id", "==", userData.user_id)
    .where("reservation_status", "==", "Completed")
    .get();
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      completedReservations.push(data);
    });

    console.log(completedReservations);

    res.status(200).send(completedReservations);
  } else {
    res.status(200).send("No reservations found.");
  }
});
