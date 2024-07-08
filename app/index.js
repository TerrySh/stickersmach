import { Text, View } from "react-native";
import { Link } from "expo-router";

import StickerSmash from "./sticker-smash";

export default function Page(){
    return (
        <View>
          <Text>Home Page</Text>
          <Link href="/sticker-smash">Sticker Smash</Link>
          <Link href="/blog/test111">test route</Link>
          <Link push href={{pathname: "/blog/[slug]", params: {slug: 'test111'}}}>test route</Link>

          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </View>
    )
}