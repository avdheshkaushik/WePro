import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Active Projects', value: '12', icon: 'folder', color: '#6366f1' },
    { title: 'Pending Tasks', value: '8', icon: 'list', color: '#f59e0b' },
    { title: 'Completed Today', value: '5', icon: 'checkmark-circle', color: '#10b981' },
    { title: 'Team Members', value: '6', icon: 'people', color: '#8b5cf6' },
  ];

  const quickActions = [
    { title: 'New Project', icon: 'add-circle-outline', color: '#6366f1' },
    { title: 'Add Task', icon: 'add-outline', color: '#f59e0b' },
    { title: 'Invite Team', icon: 'person-add-outline', color: '#10b981' },
    { title: 'View Reports', icon: 'analytics-outline', color: '#8b5cf6' },
  ];

  const recentActivities = [
    { title: 'Project "Website Redesign" updated', time: '2 hours ago', type: 'project' },
    { title: 'Task "Homepage Layout" completed', time: '4 hours ago', type: 'task' },
    { title: 'New team member joined', time: '1 day ago', type: 'team' },
    { title: 'Project "Mobile App" created', time: '2 days ago', type: 'project' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{user?.firstName || 'User'}!</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#6366f1" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.activitiesContainer}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {recentActivities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons
                  name={
                    activity.type === 'project'
                      ? 'folder-outline'
                      : activity.type === 'task'
                      ? 'checkmark-circle-outline'
                      : 'people-outline'
                  }
                  size={20}
                  color="#6366f1"
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  greeting: {
    fontSize: 16,
    color: '#6b7280',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  profileButton: {
    padding: 4,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: (width - 52) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: (width - 52) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  activitiesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default DashboardScreen; 