import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Page () {
    const {slug} = useLocalSearchParams();

    return (
        <View>
          <Text>{slug}</Text>
          <Link href="/">
            <Pressable>
                <Text>Home</Text>
            </Pressable>
          </Link>
        </View>
    )
}