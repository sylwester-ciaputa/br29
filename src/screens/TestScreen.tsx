import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLike } from '../store/useLikeStore';


export const TestScreenInner: React.FC = () => {
    const like = useLike((state) => state.like);
    const like2 = useLike((state) => state.like);
    const increaseLike = useLike((state) => state.increaseLike);
    const removeAllLikes = useLike((state) => state.removeAllLikes);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.content}>
                <Text style={styles.text}>Test Screen</Text>
                <Text style={styles.text}>
                    Likes: {like} / {like2}
                </Text>
                <View>
                    <Button title="Increase" onPress={increaseLike} />
                </View>
                <View>
                    <Button title="Reset" onPress={removeAllLikes} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export const TestScreen: React.FC = () => {
  const like = useLike((state) => state.like);
  const like2 = useLike((state) => state.like);
  const increaseLike = useLike((state) => state.increaseLike);
  const removeAllLikes = useLike((state) => state.removeAllLikes);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.text}>Test Screen</Text>
        <Text style={styles.text}>
          Likes: {like} / {like2}
        </Text>
        <View>
          <Button title="Increase" onPress={increaseLike} />
        </View>
        <View>
          <Button title="Reset" onPress={removeAllLikes} />
        </View>
      </View>
        <TestScreenInner />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtext: {
    fontSize: 18,
    marginBottom: 10,
  },
});
