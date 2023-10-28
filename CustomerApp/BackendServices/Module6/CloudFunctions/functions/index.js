const { onRequest } = require("firebase-functions/v2/https");
const axios = require("axios");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

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
        user_email: "",
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

  return res.status(200).json({ message: "email sent to all" });
});

exports.getAllUsers = onRequest(async (req, res) => {
  const emailDetails = req.body;
  console.log(emailDetails);
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

exports.handleReservationStatusChange = functions.firestore
  .document("reservation/{reservation_id}")
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    // Compare the new and previous "food_reservation" arrays to identify the changes
    const newFoodReservation = newValue.food_reservation;
    const previousFoodReservation = previousValue.food_reservation;
    // Find the differences between the two arrays
    const changes = diffArrays(newFoodReservation, previousFoodReservation);
    const user_id = newValue.user_id;

    const description = newValue.description;
    // Check if the "reservation_status" field has changed
    if (newValue.reservation_status !== previousValue.reservation_status) {
      const status = newValue.reservation_status;
      console.log("Reached here!!!=>1");
      // Retrieve the user's email from the Users collection
      const userQuerySnapshot = await db
        .collection("users")
        .where("user_id", "==", user_id)
        .get();

      if (!userQuerySnapshot.empty) {
        const userDoc = userQuerySnapshot.docs[0];
        const userData = userDoc.data();
        const userEmail = userData.email_id;

        // Create an email body
        const emailBody = `Hello,

      Your reservation with ID ${context.params.reservation_id} has been updated.
      New Status: ${status}
      Description: ${description}

      Thank you for using our service!

      Regards,
      Your Restaurant Team`;

        const emailData = {
          subject: `Reservation ${status}`,
          body: emailBody,
          user_email: userEmail,
          user_id: user_id,
        };

        getUserEmailCaller(emailData);
      } else {
        console.log("Could not find the user");
      }
    } else if (changes.added.length > 0 || changes.removed.length > 0) {
      // Handle changes to the "food_reservation" array
      const reservationId = context.params.reservation_id;

      // const user_id = newValue.user_id;
      // const description = newValue.description;
      const status = newValue.reservation_status;
      // There are changes in the "food_reservation" array

      // Retrieve the user's email from the Users collection
      const userSnapshot = await db
        .collection("users")
        .where("user_id", "==", user_id)
        .get();

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const userEmail = userData.email_id;
        // You can handle these changes here similarly to how you handle status changes
        console.log(
          `Changes detected in food_reservation for reservation ${reservationId}:`
        );
        console.log(changes);

        // Create an email or perform any other actions based on the changes
        let emailBody = `Hello,

        Your reservation with ID ${context.params.reservation_id} has been updated.
        New Status: ${status}
        Description: ${description}
        
        Menu Item Changes:
        `;

        // Append details about added items
        if (changes.added.length > 0) {
          emailBody += "\nAdded Items:\n";
          changes.added.forEach((item) => {
            emailBody += `- Item ID: ${item.item_id}, Quantity: ${item.quantity}\n`;
          });
        }

        // Append details about removed items
        if (changes.removed.length > 0) {
          emailBody += "\nRemoved Items:\n";
          changes.removed.forEach((item) => {
            emailBody += `- Item ID: ${item.item_id}, Quantity: ${item.quantity}\n`;
          });
        }

        emailBody += `
        Thank you for using our service!

        Regards,
        Your Restaurant Team`;

        const emailData = {
          subject: `Reservation ${status}`,
          body: emailBody,
          user_email: userEmail,
          user_id: user_id,
        };

        getUserEmailCaller(emailData);
      } else {
        console.log(`No user found with the ID ${user_id}`);
      }
    }

    return null;
  });

function diffArrays(newArray, oldArray) {
  const added = newArray.filter(
    (item) => !oldArray.some((oldItem) => oldItem.item_id === item.item_id)
  );
  const removed = oldArray.filter(
    (item) => !newArray.some((newItem) => newItem.item_id === item.item_id)
  );

  return { added, removed };
}

async function getUserEmailCaller(emailData) {
  await axios
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
}

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
