import i18n from 'i18next';
import { 
  initReactI18next,
} from "react-i18next";

const resources = {
  en: { translation: {
    'chat-room': 'Chat Room',
    'btn-send': 'Send',
    'login-title': 'Please enter your name to login.',
    'login-error': 'Login fail, please try again later.',
    'is-logging': 'Loading...',
    'is-connecting': 'Connecting...',
    'is-disconnect': 'Dissconnect ! ',
    'total-users': '{{count}} user in chatroom.',
    'total-users_plural': '{{count}} users in chatroom.',
    'is-online': '{{user}} is online.',
    'is-offline': '{{user}} is offline.',
    'is-left': '{{user}} left.',
    'is-join': '{{user}} joined.',
  }}
};

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
  });



export default i18n;