openjdk 17.0.11

node -v
v18.17.1

https://docs.expo.dev/tutorial/create-your-first-app/


create a development build:
eas build --platform android --profile development
eas build -p android --profile development

preview build:
eas build --platform android --profile preview

product build:
eas build --platform android

https://docs.expo.dev/tutorial/eas/android-production-build/


native module:
--Create a local expo module:
npx create-expo-module@latest --local

--prebuild -generate andorid/ios directories
npx expo prebuild --clean

--run on emulator
npx expo run:android
npx expo run:ios

