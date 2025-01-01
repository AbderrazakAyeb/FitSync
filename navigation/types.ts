import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
};

// Navigation props
export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
export type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

// Route props
export type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type ForgotPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ForgotPassword'>;
export type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;