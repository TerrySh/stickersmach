import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Text } from 'react-native';

export default function InkCanvas ({ onStrokeEnd }) {
  const [strokes, setStrokes] = useState([]);
  const currentStroke = useRef([]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { locationX, locationY } = evt.nativeEvent;
        // currentStroke.current.push({ x: locationX, y: locationY, t: Date.now() });
        currentStroke.current.push([locationX,locationY,Date.now()]);
      },
      onPanResponderRelease: () => {
        var newState = [...strokes, currentStroke.current];
        // console.log(newState);
        setStrokes(newState);
        onStrokeEnd(newState);
        currentStroke.current = [];
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
          {strokes.map((stroke, index) => (
            <View key={index} style={styles.strokeContainer}>
              {stroke.map((point, i) => (
                <View
                  key={i}
                  style={[
                    styles.point,
                    { left: point.x, top: point.y }
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  strokeContainer: {
    position: 'absolute',
  },
  point: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 2,
  },
});
