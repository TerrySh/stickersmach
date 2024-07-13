import { Button, Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";

import StickerSmash from "./sticker-smash";
import * as Settings from "../modules/ml-ben";

export default function Page(){
    const [theme, setTheme] = React.useState(Settings.getTheme());

    React.useEffect(() => {
      const subscription = Settings.addThemeListener(({theme: newTheme}) => {
        setTheme(newTheme);
      });

      return () => subscription.remove();
    }, [setTheme]);

    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Theme: {Settings.getTheme()}</Text>
          <Button title={`Set theme to ${nextTheme}`} onPress={() => Settings.setTheme(nextTheme)} />
        </View>
    )
}

/* 
<Text>Home Page, {hello()}, {strokeRecognition()}</Text>
          <Link href="/sticker-smash">Sticker Smash</Link>
          <Link href="/blog/test111">test route</Link>
          <Link push href={{pathname: "/blog/[slug]", params: {slug: 'test111'}}}>test route</Link>

          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
*/