import { View, Platform, Pressable } from "react-native";
import { Switch, useTheme, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import styles from "./styles";
import { connect } from "react-redux";
import { setLanguage } from "../redux/actions";
import { async } from "@firebase/util";

const LocalNotification = ({ language, setLanguage }) => {
  const [reminder, setReminder] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const handleReminderPress = async (value) => {
    if (value) {
      const newSchedule = await scheduleReminder(language);
      if (newSchedule) {
        setReminder(true);
      }
    } else {
      setReminder(false);
      const cancelled = await cancelReminder();
    }
  };

  useEffect(() => {
    const fetchPreviousSchedule = async () => {
      const previouslySchedule = await getSchedule();
      setSchedule(previouslySchedule);
      if (previouslySchedule.find((item) => item.type === "reminder")) {
        setReminder(true);
      }
    };
    fetchPreviousSchedule();
  }, []);

  useEffect(() => {
    getSchedule();
  }, []);

  useEffect(() => {
    // Update notification when language changes
    updateNotificationContent();
  }, [language, reminder]); // Add 'reminder' to the dependency array

  useEffect(() => {
    // Set the notification handler for foreground notifications
    const notificationHandler = async (notification) => {
      const { request } = notification;
      // Here you can handle the notification while the app is in the foreground
      console.log("Received notification while app is in foreground:", request);
    };

    // Set the notification handler
    const subscription =
      Notifications.addNotificationReceivedListener(notificationHandler);

    // Cleanup the subscription when the component unmounts
    return () => subscription.remove();
  }, []);

  const updateNotificationContent = async () => {
    if (reminder) {
      await cancelReminder();
      await scheduleReminder(language);
    }
  };

  const handleForegroundNotification = async (notification) => {
    const { request } = notification;
    // Display the notification using Notifications
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  };

  useEffect(() => {
    // Set the notification handler for foreground notifications
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener(
        handleForegroundNotification
      );

    // Cleanup the subscriptions when the component unmounts
    return () => {
      foregroundSubscription.remove();
    };
  }, []);

  const localNotificationLabel = {
    en: {
      notification: "Notification:",
      notificationBody: "Get daily recipe notification",
      allowNotification: "Allow Notification",
    },
    fr: {
      notification: "Notification:",
      notificationBody: "Obtenez une notification de recette quotidienne",
      allowNotification: "Autoriser la notification",
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {localNotificationLabel[language].notification}
      </Text>
      <Text style={styles.description}>
        {localNotificationLabel[language].notificationBody}
      </Text>

      {/* Options */}
      <View style={styles.switch}>
        {/* <Pressable> */}
        <Text style={styles.options.label}>
          {localNotificationLabel[language].allowNotification}
        </Text>
        {/* </Pressable> */}
        <Switch
          value={reminder}
          onValueChange={(value) => handleReminderPress(value)}
        />
      </View>
    </View>
  );
};

async function scheduleReminder(language) {
  try {
    const permissions = await Notifications.getPermissionsAsync();

    if (!permissions.granted) {
      const request = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
        },
      });

      if (!request.granted) {
        return false;
      }
    }

    const notificationContent = {
      en: {
        notiTitle: "Time to Cook",
        notiBody: "Check out today's recipe",
      },
      fr: {
        notiTitle: "Il est temps de cuisiner",
        notiBody: "Découvrez la recette du jour",
      },
    };

    const existingNotifications =
      await Notifications.getAllScheduledNotificationsAsync();
    const existingReminder = existingNotifications.find(
      (notification) => notification.content.data.type === "reminder"
    );

    if (existingReminder) {
      await Notifications.cancelScheduledNotificationAsync(
        existingReminder.identifier
      );
    }

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: notificationContent[language].notiTitle,
        body: notificationContent[language].notiBody,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        badge: 0,
        data: {
          type: "reminder",
        },
      },
      trigger: {
        seconds: 3,
        repeats: false,
      },
    });

    if (!id) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

async function cancelReminder() {
  const schedule = await getSchedule();
  let cancelled = false;
  for (const item of schedule) {
    if (item.type === "reminder") {
      try {
        await Notifications.cancelScheduledNotificationAsync(item.id);
      } catch {}

      cancelled = true;
    }
  }
  return cancelled;
}

async function getSchedule() {
  const scheduleNotifications =
    await Notifications.getAllScheduledNotificationsAsync();
  const schedule = [];
  scheduleNotifications.forEach((scheduleNotification) => {
    schedule.push({
      id: scheduleNotification.identifier,
      type: scheduleNotification.content.data.type,
    });
  });
  return schedule;
}

const mapStateToProps = (state) => ({
  language: state.language,
});

const mapDispatchToProps = {
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalNotification);
