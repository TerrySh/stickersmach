const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.ben109.stickersmash.dev';
  }

  if (IS_PREVIEW) {
    return 'com.ben109.stickersmash.preview';
  }

  return 'com.ben109.stickersmash';
}

const getAppName = () => {
  if (IS_DEV) {
    return 'StickerSmash (Dev)';
  }

  if (IS_PREVIEW) {
    return 'StickerSmash (Preview)';
  }

  return 'StickerSmash: Emoji Stickers';
}

export default {
  "expo": {
    "name": getAppName(),
    "slug": "StickerSmash",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#25292e"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": getUniqueIdentifier(),
      "buildNumber": "1",
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": getUniqueIdentifier(),
      "versionCode": "1",
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro",
    },
    "extra": {
      "eas": {
        "projectId": "768b23cb-7376-4e7d-a31b-d72c72eab23e"
      }
    },
    "owner": "ben109",
    "plugins": [
        "expo-router"
      ],
    "scheme": "your-app-scheme",
  }
}
