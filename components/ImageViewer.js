import { StyleSheet, Image } from "react-native";

export default function ImageView ({placeholderImageSource}) {
    return (
        <Image source={placeholderImageSource} style={styles.image}></Image>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
})