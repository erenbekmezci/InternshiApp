const { sendPushNotification } = require("./utils/notifications");

const testPushNotification = async () => {
  const expoPushToken = "ExponentPushToken[_Q6HSEJYFKlM-gTptVfgM2]"; // Token'ı buraya yerleştirin
  const title = "Test Notification";
  const body = "This is a test notification";

  await sendPushNotification(expoPushToken, title, body);
};

testPushNotification();
