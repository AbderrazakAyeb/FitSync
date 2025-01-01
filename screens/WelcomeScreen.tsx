import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const cards = [
    {
      title: 'Welcome to FitSync!',
      description:
        'Tracking exercise and workouts has never been easier. Start achieving your fitness goals today with FitSync.',
      image: require('../assets/Logo.png'),
    },
    {
      title: 'Reach Your Goals',
      description:
        'Track your progress in FitSync daily to see how you improve over time and achieve your fitness goals.',
      image: require('../assets/Goal.png'),
    },
    {
      title: 'Track on Your Apple Watch',
      description:
        'Easily log sets, reps, weight, and record cardio right from your watch. Your workouts will never be the same.',
      image: require('../assets/Logo.png'),
    },
    {
      title: 'FitSync Pro',
      description:
        'Take it to the next level. Upgrade to FitSync Pro to unlock additional features including data syncing, advanced graphs, unlimited routines, pre-built workouts, and more!',
      image: require('../assets/Logo.png'),
    },
  ];

  return (
    <LinearGradient colors={['#1a1a1a', '#333333']} style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}
      >
        {cards.map((card, index) => (
          <View key={index} style={[styles.page, { width }]}>
            {/* Image in Card */}
            <View style={styles.imageContainer}>
              <Image source={card.image} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Dot Indicators */}
      <View style={styles.dotsContainer}>
        {cards.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, { transform: [{ scale }], opacity }]}
            />
          );
        })}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient
            colors={['#FF0000', '#8B0000']} // Red gradient for Log In
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <LinearGradient
            colors={['#333333', '#1a1a1a']} // Black gradient for Sign Up
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.4, // Adjusted height
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  card: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 18, // Larger font size
    color: '#ccc', // Lighter gray
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dot: {
    width: 12, // Larger dots
    height: 12, // Larger dots
    borderRadius: 6,
    backgroundColor: '#fff',
    marginHorizontal: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    position: 'absolute',
    bottom: 50,
  },
  button: {
    flex: 1,
    marginHorizontal: 10, // Adjusted spacing
    borderRadius: 30, // Slightly larger border radius
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 20, // Increased padding for taller buttons
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18, // Larger font size
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default WelcomeScreen;