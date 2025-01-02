import { StyleSheet,Dimensions } from "react-native";

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
      height: height * 0.3, // Consistent height for all images
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    image: {
      width: '60%', // Consistent width for all images
      height: '100%',
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
      fontSize: 18,
      color: '#ccc',
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
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
      marginHorizontal: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      position: 'absolute',
      bottom: 50,
    },
    button: {
      flex: 1,
      marginHorizontal: 10,
      borderRadius: 25,
      overflow: 'hidden',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    buttonGradient: {
      paddingVertical: 15,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
    },
  });
export default styles;