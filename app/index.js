import { Button, Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";
// import InckRec from "./ink-recog";

export default function Page(){

    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Page</Text>
            <Link href="/ink-recog">ink recog</Link>
            <Link href="/sticker-smash">Sticker Smash</Link>
            <Link href="/expo-settings">expo settings</Link>
            <Link href="/blog/test111">test route</Link>
            <Link push href={{pathname: "/blog/[slug]", params: {slug: 'test111'}}}>test route</Link>
  
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
        </View>
    )
}

/* 
*/