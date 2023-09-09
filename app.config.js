import 'dotenv/config';

export default {
  "expo": {
    "name": "Flowtime",
    "slug": "App",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/flowtime-icon-final.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/flowtime-icon-final.png",
      "resizeMode": "contain",
      "backgroundColor": "#865946"
    },
    "assetBundlePatterns": [
      "assets/fonts/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.ronbutanflowtime"
    },
    "android": {
      "package": "com.ronbutanflowtime",
      "notification": {
        "icon": "./assets/flowtime-icon-final.png",
        "color": "#FFFFFF"
      },
      "adaptiveIcon": {
        "foregroundImage": "./assets/flowtime-icon-final.png",
        "backgroundColor": "#f7e2cb"
      },
      "permissions": ["RECEIVE_BOOT_COMPLETE", "VIBRATE", "WAKE_LOCK"]
    },
    "web": {
      "favicon": "./assets/flowtime-icon-final.png"
    },
    "extra": {
      "eas": {
        "projectId": "757fe2a6-3879-4098-98bb-cb0e8445f755"
      },
      "firebase": {
        "apiKey": process.env.FIREBASE_API_KEY,
        "authDomain": process.env.FIREBASE_AUTH_DOMAIN,
        "projectId": process.env.FIREBASE_PROJECT_ID,
        "storageBucket": process.env.FIREBASE_STORAGE_BUCKET,
        "messagingSenderId": process.env.FIREBASE_MESSAGING_SENDER_ID,
        "appId": process.env.FIREBASE_APP_ID,
      }
    },
    "updates": {
      "url": "https://u.expo.dev/757fe2a6-3879-4098-98bb-cb0e8445f755"
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    }
  }
}
