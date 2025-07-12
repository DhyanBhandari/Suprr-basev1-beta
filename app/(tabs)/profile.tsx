import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { ChevronDown, Plus, X, Star } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';

interface BusinessSection {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea';
}

export default function ProfileScreen() {
  const { theme, currentTheme } = useTheme();
  const [isUserMode, setIsUserMode] = useState(true);
  const [hasUpgradedPlan, setHasUpgradedPlan] = useState(false);
  const [businessSections, setBusinessSections] = useState<BusinessSection[]>([
    { id: 'name', label: 'Business Name', value: '', type: 'text' },
    { id: 'description', label: 'Description', value: '', type: 'textarea' },
  ]);

  const handleBusinessSectionChange = (id: string, field: keyof BusinessSection, value: string) => {
    setBusinessSections(prevSections =>
      prevSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const addBusinessSection = () => {
    setBusinessSections(prevSections => [
      ...prevSections,
      { id: Date.now().toString(), label: 'New Field', value: '', type: 'text' }
    ]);
  };

  const removeBusinessSection = (id: string) => {
    setBusinessSections(prevSections => 
      prevSections.filter(section => section.id !== id)
    );
  };

  const saveBusinessDetails = () => {
    Alert.alert('Success', 'Business details saved successfully!');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Profile" showBackButton />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.userInfoSection}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarText}>
              {isUserMode ? 'U' : 'B'}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={[
              styles.userName, 
              { 
                color: theme.colors.text,
                textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: theme.blur ? 2 : 0,
              }
            ]}>
              {isUserMode ? 'User Name' : 'Business Name'}
            </Text>
            <Text style={[
              styles.userEmail, 
              { 
                color: theme.colors.textSecondary,
                textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: theme.blur ? 1 : 0,
              }
            ]}>
              {isUserMode ? 'user@example.com' : 'business@example.com'}
            </Text>
          </View>
        </View>

        <View style={[styles.modeToggle, { backgroundColor: theme.colors.card }]}>
          {theme.blur && (
            <BlurView
              style={StyleSheet.absoluteFillObject}
              intensity={theme.blurIntensity / 2}
              tint={currentTheme === 'dark' ? 'dark' : 'light'}
            />
          )}
          <TouchableOpacity
            onPress={() => setIsUserMode(true)}
            style={[
              styles.modeButton,
              isUserMode && { backgroundColor: theme.colors.primary }
            ]}
          >
            <Text style={[
              styles.modeButtonText,
              { color: isUserMode ? '#ffffff' : theme.colors.textSecondary }
            ]}>
              Personal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsUserMode(false)}
            style={[
              styles.modeButton,
              !isUserMode && { backgroundColor: theme.colors.primary }
            ]}
          >
            <Text style={[
              styles.modeButtonText,
              { color: !isUserMode ? '#ffffff' : theme.colors.textSecondary }
            ]}>
              Business
            </Text>
          </TouchableOpacity>
        </View>

        {!hasUpgradedPlan && (
          <View style={styles.upgradeSection}>
            <View style={styles.upgradeContent}>
              <Star size={24} color="#f59e0b" />
              <View style={styles.upgradeText}>
                <Text style={styles.upgradeTitle}>Upgrade Your Plan</Text>
                <Text style={styles.upgradeSubtitle}>
                  Unlock more features and benefits!
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setHasUpgradedPlan(true)}
              style={styles.upgradeButton}
            >
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.settingsSection, { backgroundColor: theme.colors.card }]}>
          {theme.blur && (
            <BlurView
              style={StyleSheet.absoluteFillObject}
              intensity={theme.blurIntensity / 2}
              tint={currentTheme === 'dark' ? 'dark' : 'light'}
            />
          )}
          <Text style={[
            styles.sectionTitle, 
            { 
              color: theme.colors.text,
              textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: theme.blur ? 1 : 0,
            }
          ]}>
            {isUserMode ? 'Personal Settings' : 'Business Details'}
          </Text>
          
          {isUserMode ? (
            <View style={styles.settingsContent}>
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel, 
                  { 
                    color: theme.colors.textSecondary,
                    textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: theme.blur ? 1 : 0,
                  }
                ]}>
                  Language
                </Text>
                <View style={[styles.pickerContainer, { backgroundColor: theme.colors.input }]}>
                  {theme.blur && (
                    <BlurView
                      style={StyleSheet.absoluteFillObject}
                      intensity={theme.blurIntensity / 3}
                      tint={currentTheme === 'dark' ? 'dark' : 'light'}
                    />
                  )}
                  <Text style={[
                    styles.pickerText, 
                    { 
                      color: theme.colors.text,
                      textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: theme.blur ? 1 : 0,
                    }
                  ]}>
                    English
                  </Text>
                  <ChevronDown size={20} color={theme.colors.textSecondary} />
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[
                  styles.inputLabel, 
                  { 
                    color: theme.colors.textSecondary,
                    textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: theme.blur ? 1 : 0,
                  }
                ]}>
                  Default Tone
                </Text>
                <View style={[styles.pickerContainer, { backgroundColor: theme.colors.input }]}>
                  {theme.blur && (
                    <BlurView
                      style={StyleSheet.absoluteFillObject}
                      intensity={theme.blurIntensity / 3}
                      tint={currentTheme === 'dark' ? 'dark' : 'light'}
                    />
                  )}
                  <Text style={[
                    styles.pickerText, 
                    { 
                      color: theme.colors.text,
                      textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: theme.blur ? 1 : 0,
                    }
                  ]}>
                    Friendly
                  </Text>
                  <ChevronDown size={20} color={theme.colors.textSecondary} />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.businessContent}>
              {businessSections.map((section) => (
                <View key={section.id} style={[styles.businessSection, { borderColor: theme.colors.border }]}>
                  <View style={styles.businessSectionHeader}>
                    <TextInput
                      value={section.label}
                      onChangeText={(value) => handleBusinessSectionChange(section.id, 'label', value)}
                      style={[styles.businessLabelInput, { 
                        backgroundColor: theme.colors.input,
                        color: theme.colors.text 
                      }]}
                      placeholder="Field Label"
                      placeholderTextColor={theme.colors.textSecondary}
                    />
                    <TouchableOpacity
                      onPress={() => removeBusinessSection(section.id)}
                      style={styles.removeButton}
                    >
                      <X size={16} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                  
                  <TextInput
                    value={section.value}
                    onChangeText={(value) => handleBusinessSectionChange(section.id, 'value', value)}
                    style={[styles.businessValueInput, { 
                      backgroundColor: theme.colors.input,
                      color: theme.colors.text 
                    }]}
                    placeholder={`Enter ${section.label.toLowerCase()}`}
                    placeholderTextColor={theme.colors.textSecondary}
                    multiline={section.type === 'textarea'}
                    numberOfLines={section.type === 'textarea' ? 3 : 1}
                  />
                </View>
              ))}
              
              <TouchableOpacity
                onPress={addBusinessSection}
                style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              >
                <Plus size={20} color="#ffffff" />
                <Text style={styles.addButtonText}>Add New Field</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={saveBusinessDetails}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Save Business Details</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  modeToggle: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  upgradeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  upgradeContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeText: {
    marginLeft: 12,
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 2,
  },
  upgradeSubtitle: {
    fontSize: 14,
    color: '#b45309',
  },
  upgradeButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  settingsSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingsContent: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerText: {
    fontSize: 16,
  },
  businessContent: {
    gap: 16,
  },
  businessSection: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  businessSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  businessLabelInput: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
    marginRight: 8,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessValueInput: {
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
    minHeight: 40,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});