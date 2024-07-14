import { Button, Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";

import * as Settings from "../../modules/ml-ben"

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