const sendPushNotification = async (expoPushToken, title, body) => {
  console.log("Sending notification...");
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: { someData: "goes here" },
  };

  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();
    console.log("Notification response:", data);
    if (data.errors) {
      console.error("Notification errors:", data.errors);
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

module.exports = { sendPushNotification };
