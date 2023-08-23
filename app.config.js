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
      "supportsTablet": true
    },
    "android": {
      "package": "com.ronbutanflowtime",
      "adaptiveIcon": {
        "foregroundImage": "./assets/flowtime-icon-final.png",
        "backgroundColor": "#f7e2cb"
      },
      "primaryColor": "f7e2cb",
      "permissions": ["RECEIVE_BOOT_COMPLETE", "VIBRATE", "WAKE_LOCK"]
    },
    "web": {
      "favicon": "./assets/flowtime-icon-final.png"
    },
    "extra": {
      "eas": {
        "projectId": "757fe2a6-3879-4098-98bb-cb0e8445f755"
      }
    }
  }
}
