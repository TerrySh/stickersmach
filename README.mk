openjdk 17.0.11

node -v
v18.17.1

https://docs.expo.dev/tutorial/create-your-first-app/

--after change module code:
npx expo prebuild --clean


create a development build:
eas build --platform android --profile development
eas build -p android --profile development

preview build:
eas build --platform android --profile preview

product build:
eas build --platform android

https://docs.expo.dev/tutorial/eas/android-production-build/

native module:
npx expo prebuild --clean
npx expo run:android
npx expo run:ios

