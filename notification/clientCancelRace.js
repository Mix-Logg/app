import * as Notifications from 'expo-notifications';
export default async function ClientCancelRace(){
    await Notifications.scheduleNotificationAsync({
        content: {
          title: "O cliente cancelou! 😭",
          body: 'O cliente cancelou sua corrida, não desanime.',
          data: { data: 'goes here', test: { test1: 'more data' } },
        },
        trigger: { seconds: 1 },
      });
}