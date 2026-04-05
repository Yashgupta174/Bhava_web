import admin from "../config/firebase.js";

export const sendNotificationToAll = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({
      success: false,
      message: "Title and body are required for notifications",
    });
  }

  const message = {
    notification: {
      title: title,
      body: body,
    },
    topic: "all_users",
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent notification:", response);
    res.status(200).json({
      success: true,
      message: "Notification sent successfully",
      response,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send notification",
      error: error.message,
    });
  }
};
