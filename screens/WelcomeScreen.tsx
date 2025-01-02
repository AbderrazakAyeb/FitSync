import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import styles from '../css';

const { width, height } = Dimensions.get('window');

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const cards = [
    {
      title:'Welcome to FitSync!',
      description:'Tracking exercise and workouts has never been easier. Start achieving your fitness goals today with FitSync.',
      image: require('../assets/Logo.png'),
    },
    {
      title: 'Reach Your Goals',
      description:'Track your progress in FitSync daily to see how you improve over time and achieve your fitness goals.',
      image: require('../assets/Goal.png'),
    },
    {
      title: 'FitSync Pro',
      description:'Take it to the next level. Upgrade to FitSync Pro to unlock additional features including data syncing, advanced graphs, unlimited routines, pre-built workouts, and more!',
      image: require('../assets/Pro.png'),
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient
            colors={['#FF6347', '#FF4500']} // Updated red gradient
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
            colors={['#4F4F4F', '#2C2C2C']} // Updated black gradient
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
export default WelcomeScreen;