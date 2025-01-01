import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Animated, Keyboard, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { auth } from '../firebaseConfig'; // Import Firebase auth from your config file
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import Firebase auth functions

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [keyboardHeight] = useState<Animated.Value>(new Animated.Value(0));
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        Animated.timing(keyboardHeight, {
          duration: 250,
          toValue: event.endCoordinates.height,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(keyboardHeight, {
          duration: 250,
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { fullName?: string; email?: string; password?: string } = {};

    if (!fullName) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSignUp = async (): Promise<void> => {
    if (validateForm()) {
      setIsLoading(true); // Start loading
      try {
        // Create user with Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user profile with full name
        await updateProfile(user, {
          displayName: fullName,
        });

        console.log('User registered:', user);
        Alert.alert('Success', 'Your account has been created!');
        navigation.navigate('Login'); // Navigate to Login screen
      } catch (error: any) {
        console.error('Sign-up error:', error);
        Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign-up logic here
    console.log('Signing up with Google');
  };

  const handleFacebookSignUp = () => {
    // Handle Facebook sign-up logic here
    console.log('Signing up with Facebook');
  };

  const handleAppleSignUp = () => {
    // Handle Apple sign-up logic here
    console.log('Signing up with Apple');
  };

  const getPasswordStrength = (password: string): string => {
    if (password.length === 0) return 'Empty';
    if (password.length < 6) return 'Weak';
    if (password.length < 10) return 'Medium';
    return 'Strong';
  };

  const passwordStrength = getPasswordStrength(password);

  const getPasswordStrengthColor = (strength: string): string => {
    switch (strength) {
      case 'Weak':
        return '#ff4757'; // Red for weak
      case 'Medium':
        return '#ffa500'; // Orange for medium
      case 'Strong':
        return '#4caf50'; // Green for strong
      default:
        return '#aaa'; // Gray for empty
    }
  };

  return (
    <LinearGradient colors={['#1a1a1a', '#333333']} style={styles.container}>
      <Animated.View
        style={[
          styles.keyboardAvoidingView,
          { paddingBottom: keyboardHeight },
        ]}
      >
        <View style={styles.signupContainer}>
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>Join FitSync to start your fitness journey</Text>

          {/* Scrollable Inputs */}
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} color="#fff" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#aaa"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={20} color="#fff" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} color="#fff" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Password Strength Indicator */}
            <View style={styles.passwordStrengthContainer}>
              <Text style={styles.passwordStrengthText}>
                Password Strength: <Text style={{ color: getPasswordStrengthColor(passwordStrength) }}>{passwordStrength}</Text>
              </Text>
              <View style={styles.passwordStrengthBarContainer}>
                <View
                  style={[
                    styles.passwordStrengthBar,
                    {
                      width: `${(passwordStrength === 'Weak' ? 33 : passwordStrength === 'Medium' ? 66 : 100)}%`,
                      backgroundColor: getPasswordStrengthColor(passwordStrength),
                    },
                  ]}
                />
              </View>
            </View>
          </ScrollView>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignUp}
            disabled={isLoading} // Disable the button during loading
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" /> // Show a loading spinner
            ) : (
              <Text style={styles.signupButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Media Sign Up Options */}
          <View style={styles.socialSignupContainer}>
            <TouchableOpacity onPress={handleGoogleSignUp} style={styles.socialIconButton}>
              <FontAwesome name="google" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFacebookSignUp} style={styles.socialIconButton}>
              <FontAwesome name="facebook" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAppleSignUp} style={styles.socialIconButton}>
              <FontAwesome name="apple" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

// Styles (unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    width: '100%',
    alignItems: 'center',
  },
  signupContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
  errorText: {
    color: '#ff4757',
    fontSize: 12,
    marginBottom: 10,
  },
  passwordStrengthContainer: {
    width: '100%',
    marginTop: 10,
  },
  passwordStrengthText: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 5,
  },
  passwordStrengthBarContainer: {
    width: '100%',
    height: 5,
    backgroundColor: '#555',
    borderRadius: 5,
    overflow: 'hidden',
  },
  passwordStrengthBar: {
    height: '100%',
    borderRadius: 5,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#ff4757',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#555',
  },
  dividerText: {
    color: '#aaa',
    marginHorizontal: 10,
  },
  socialSignupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  },
  socialIconButton: {
    padding: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#aaa',
    marginRight: 5,
  },
  loginLink: {
    color: '#ff4757',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;