import { View, Text, Platform, Pressable } from "react-native";
import { Switch } from "react-native-paper";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { async } from "@firebase/util";
import styles from "./styles";
import { connect } from "react-redux";
import { setLanguage } from "../redux/actions";

const LocalNotification = ({ language, setLanguage }) => {
  const localNotificationLabel = {
    en: {
      notification: "Notification:",
      notificationBody: "Get daily receipe notification",
      allowNotification: "Allow Notification",
    },
    fr: {
      notification: "Notification:",
      notificationBody: "Obtenez une notification de recette quotidienne",
      allowNotification: "Autoriser la notification",
    },
  };

  const [reminder, setReminder] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const handleReminderPress = async () => {
    if (!reminder) {
      const schedule = await scheduleReminder();
      if (schedule) {
        setReminder(true);
        setSchedule(await getSchedule());
      }
    } else {
      const cancelled = await cancelReminder();
      if (cancelled) {
        setReminder(false);
        setSchedule(await getSchedule());
      }
    }
  };

  useEffect(() => {
    async () => {
      const previouslySchedule = await getSchedule();
      setSchedule(previouslySchedule);
      if (previouslySchedule.find((item) => item.type === "reminder")) {
        setReminder(true);
      }
    };
  }, []);

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {localNotificationLabel[language].notification}
      </Text>
      <Text style={styles.description}>
        {localNotificationLabel[language].notificationBody}
      </Text>

      {/* Options */}
      <View style={styles.options.container}>
        <Pressable>
          <Text style={styles.options.label}>
            {localNotificationLabel[language].allowNotification}
          </Text>
        </Pressable>
        <Switch value={reminder} onValueChange={handleReminderPress} />
      </View>
    </View>
  );
};

async function scheduleReminder() {
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

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time to Cook",
        body: "Check out today's receipe",
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        badge: 0,
        data: {
          // userId: 1121550,
          // userName: "HarshBhatt",
          type: "reminder",
        },
      },
      trigger: {
        hour: 0, // 9 am
        minute: 40,
        repeats: true, // repeat every day
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
    if (item.type == "reminder") {
      try {
        await Notifications.cancelAllScheduledNotificationsAsync(item.id);
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
  scheduleNotifications.forEach((scheduleNotifications) => {
    schedule.push({
      id: scheduleNotifications.identifier,
      type: scheduleNotifications.content.data.type,
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
