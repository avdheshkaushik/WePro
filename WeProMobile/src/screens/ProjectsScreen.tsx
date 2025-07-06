import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProjectsScreen: React.FC = () => {
  const projects = [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website',
      progress: 75,
      status: 'active',
      dueDate: '2024-02-15',
      tasks: 12,
      completed: 9,
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'iOS and Android app for customer portal',
      progress: 45,
      status: 'active',
      dueDate: '2024-03-20',
      tasks: 18,
      completed: 8,
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      description: 'Q1 marketing campaign planning and execution',
      progress: 90,
      status: 'completed',
      dueDate: '2024-01-30',
      tasks: 8,
      completed: 8,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#6366f1';
      case 'completed':
        return '#10b981';
      case 'paused':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const renderProject = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{item.name}</Text>
          <Text style={styles.projectDescription}>{item.description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${item.progress}%`, backgroundColor: getStatusColor(item.status) },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{item.progress}%</Text>
      </View>

      <View style={styles.projectFooter}>
        <View style={styles.projectStats}>
          <Ionicons name="list-outline" size={16} color="#6b7280" />
          <Text style={styles.statText}>{item.completed}/{item.tasks} tasks</Text>
        </View>
        <View style={styles.projectStats}>
          <Ionicons name="calendar-outline" size={16} color="#6b7280" />
          <Text style={styles.statText}>{item.dueDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Projects</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#6366f1',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  projectInfo: {
    flex: 1,
    marginRight: 12,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    minWidth: 35,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
});

export default ProjectsScreen; 