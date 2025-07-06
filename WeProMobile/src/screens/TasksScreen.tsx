import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TasksScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tasks = [
    {
      id: '1',
      title: 'Design homepage layout',
      description: 'Create wireframes and mockups for the new homepage',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-02-10',
      project: 'Website Redesign',
    },
    {
      id: '2',
      title: 'Implement user authentication',
      description: 'Set up JWT authentication for the mobile app',
      priority: 'high',
      status: 'todo',
      dueDate: '2024-02-15',
      project: 'Mobile App Development',
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all API endpoints for developers',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-02-08',
      project: 'Website Redesign',
    },
    {
      id: '4',
      title: 'Review marketing materials',
      description: 'Review and approve Q1 marketing campaign materials',
      priority: 'low',
      status: 'todo',
      dueDate: '2024-02-20',
      project: 'Marketing Campaign',
    },
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'todo', label: 'To Do' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return '#6b7280';
      case 'in-progress':
        return '#6366f1';
      case 'completed':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderTask = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(item.priority)}20` }]}>
          <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.taskFooter}>
        <View style={styles.taskMeta}>
          <Ionicons name="folder-outline" size={16} color="#6b7280" />
          <Text style={styles.metaText}>{item.project}</Text>
        </View>
        <View style={styles.taskMeta}>
          <Ionicons name="calendar-outline" size={16} color="#6b7280" />
          <Text style={styles.metaText}>{item.dueDate}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status === 'in-progress' ? 'In Progress' : 
             item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#6366f1',
  },
  filterText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  listContainer: {
    padding: 20,
  },
  taskCard: {
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
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  taskInfo: {
    flex: 1,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
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
});

export default TasksScreen; 