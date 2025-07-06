import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (isAuthenticated) {
      // Navigate to main app if already authenticated
      // This will be handled by the navigation logic
    }
  }, [isAuthenticated]);

  const features = [
    {
      icon: 'rocket-outline',
      title: 'Boost Productivity',
      description: 'Organize tasks, track progress, and achieve your goals faster',
    },
    {
      icon: 'people-outline',
      title: 'Team Collaboration',
      description: 'Work together seamlessly with your team members',
    },
    {
      icon: 'analytics-outline',
      title: 'Smart Analytics',
      description: 'Get insights into your productivity and project progress',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="flash" size={60} color="#6366f1" />
          </View>
          <Text style={styles.title}>WePro</Text>
          <Text style={styles.subtitle}>Your Productivity Companion</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon as any} size={40} color="#6366f1" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              navigation.navigate('Login' as never);
            }}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              navigation.navigate('Register' as never);
            }}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 60,
  },
  featureItem: {
    alignItems: 'center',
    marginBottom: 40,
  },
  featureIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  actionContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  secondaryButtonText: {
    color: '#6366f1',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen; 