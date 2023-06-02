// import React from "react";
// import { View, StyleSheet } from "react-native";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Text, BottomNavigation } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import HomeScreen from "../homescreen/Home";
// import DetailsScreen from "../detailscreen/Details";

// const Tab = createBottomTabNavigator();

// export default function MainComponent() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={({ navigation, state, descriptors, insets }) => (
//         <BottomNavigation.Bar
//           navigationState={state}
//           safeAreaInsets={insets}
//           onTabPress={({ route, preventDefault }) => {
//             const event = navigation.emit({
//               type: "tabPress",
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (event.defaultPrevented) {
//               preventDefault();
//             } else {
//               navigation.dispatch({
//                 ...CommonActions.navigate(route.name, route.params),
//                 target: state.key,
//               });
//             }
//           }}
//           renderIcon={({ route, focused, color }) => {
//             const { options } = descriptors[route.key];
//             if (options.tabBarIcon) {
//               return options.tabBarIcon({ focused, color, size: 24 });
//             }

//             return null;
//           }}
//           getLabelText={({ route }) => {
//             const { options } = descriptors[route.key];
//             const label =
//               options.tabBarLabel !== undefined
//                 ? options.tabBarLabel
//                 : options.title !== undefined
//                 ? options.title
//                 : route.title;

//             return label;
//           }}
//         />
//       )}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: "Home",
//           tabBarIcon: ({ color, size }) => {
//             return <Icon name="home" size={size} color={color} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={DetailsScreen}
//         options={{
//           tabBarLabel: "Settings",
//           tabBarIcon: ({ color, size }) => {
//             return <Icon name="cog" size={size} color={color} />;
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import HomeScreen from "../homescreen/Home";
import DetailsScreen from "../detailscreen/Details";

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const MainComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "music",
      title: "Favorites",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "albums", title: "Albums", focusedIcon: "album" },
    { key: "recents", title: "Recents", focusedIcon: "history" },
    {
      key: "notifications",
      title: "Notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: HomeScreen,
    albums: DetailsScreen,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MainComponent;
