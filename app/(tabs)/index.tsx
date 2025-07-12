/**
 * @file index.tsx
 * @description Main home screen for the PLINK app. Displays welcome content, user mode toggle, and chat interface.
 * @features - User/Business mode switching, animated logo, chat input, hamburger menu navigation
 * @developer Dhyan Bhandari
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Modal,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { 
  Menu, 
  Settings, 
  Gift, 
  User, 
  Send,
  X 
} from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme, currentTheme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userModeDropdown, setUserModeDropdown] = useState(false);
  const [currentMode, setCurrentMode] = useState<'Personnel' | 'Business'>('Personnel');
  const [chatText, setChatText] = useState('');
  const [isChatFocused, setIsChatFocused] = useState(false);
  
  const chatInputHeight = useRef(new Animated.Value(40)).current;
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const backdropAnimation = useRef(new Animated.Value(0)).current;

  const handleMenuToggle = () => {
    if (menuVisible) {
      Animated.parallel([
        Animated.timing(menuAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.parallel([
        Animated.timing(menuAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleChatFocus = () => {
    setIsChatFocused(true);
    Animated.timing(chatInputHeight, {
      toValue: 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleChatBlur = () => {
    setIsChatFocused(false);
    Animated.timing(chatInputHeight, {
      toValue: 40,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleChatSubmit = () => {
    if (chatText.trim()) {
      console.log('Sending message:', chatText);
      setChatText('');
      handleChatBlur();
    }
  };

  const handleModeSwitch = (mode: 'Personnel' | 'Business') => {
    setCurrentMode(mode);
    setUserModeDropdown(false);
    setMenuVisible(false);
  };

  const MenuBackdrop = () => (
    <BlurView
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: 'rgba(0,0,0,0.2)',
        }
      ]}
      intensity={8}
      tint={currentTheme === 'dark' ? 'dark' : 'light'}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.logo, { color: theme.colors.primary }]}>PLINK</Text>
        <TouchableOpacity onPress={handleMenuToggle} style={styles.menuButton}>
          <Menu size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Mode Indicator */}
      <View style={styles.modeIndicator}>
        <Text style={styles.modeText}>{currentMode} Mode</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Logo Section - Made more prominent */}
        <View style={styles.logoSection}>
          <View style={styles.logoRings}>
            <View style={[styles.ring, styles.ring1, { borderColor: theme.colors.primary + '30' }]} />
            <View style={[styles.ring, styles.ring2, { borderColor: theme.colors.primary + '20' }]} />
            <View style={[styles.ring, styles.ring3, { borderColor: theme.colors.primary + '10' }]} />
          </View>
          <View style={[styles.logoContainer, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.logoText}>P</Text>
          </View>
        </View>

        {/* Floating Illustration Elements */}
        <View style={styles.floatingElements}>
          <View style={[styles.floatingElement, styles.element1, { backgroundColor: theme.colors.primary + '30' }]} />
          <View style={[styles.floatingElement, styles.element2, { backgroundColor: '#10b981' + '30' }]} />
          <View style={[styles.floatingElement, styles.element3, { backgroundColor: '#f59e0b' + '30' }]} />
        </View>

        <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
          Welcome to PLINK
        </Text>
        <Text style={[styles.subText, { color: theme.colors.textSecondary }]}>
          Your global communication hub
        </Text>
      </ScrollView>

      {/* Chat Input */}
      <View style={[styles.chatContainer, { backgroundColor: theme.colors.surface }]}>
        <Animated.View style={[styles.chatInputContainer, { height: chatInputHeight }]}>
          <TextInput
            style={[
              styles.chatInput,
              { 
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                borderColor: 'transparent',
              },
              isChatFocused && {
                shadowColor: theme.colors.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }
            ]}
            placeholder="Type your message..."
            placeholderTextColor={theme.colors.textSecondary}
            value={chatText}
            onChangeText={setChatText}
            onFocus={handleChatFocus}
            onBlur={handleChatBlur}
            multiline
            returnKeyType="send"
            onSubmitEditing={handleChatSubmit}
          />
          {chatText.trim() && (
            <TouchableOpacity
              onPress={handleChatSubmit}
              style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
            >
              <Send size={20} color="white" />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>

      {/* Hamburger Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="none"
        onRequestClose={handleMenuToggle}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleMenuToggle}
        >
          <Animated.View
            style={[
              styles.backdropBlur,
              {
                opacity: backdropAnimation,
              }
            ]}
          >
            <MenuBackdrop />
          </Animated.View>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.menuContainer,
            {
              backgroundColor: theme.colors.surface,
              transform: [
                {
                  translateY: menuAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-300, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.menuHeader}>
            <Text style={[styles.menuTitle, { color: theme.colors.text }]}>Menu</Text>
            <TouchableOpacity onPress={handleMenuToggle}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setUserModeDropdown(!userModeDropdown)}
            >
              <User size={20} color="#8b5cf6" />
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                User Mode
              </Text>
            </TouchableOpacity>

            {userModeDropdown && (
              <View style={styles.userModeDropdown}>
                <TouchableOpacity
                  style={[
                    styles.userModeOption,
                    currentMode === 'Personnel' && styles.activeMode
                  ]}
                  onPress={() => handleModeSwitch('Personnel')}
                >
                  <Text style={[styles.userModeText, { color: theme.colors.text }]}>
                    Personnel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.userModeOption,
                    currentMode === 'Business' && styles.activeMode
                  ]}
                  onPress={() => handleModeSwitch('Business')}
                >
                  <Text style={[styles.userModeText, { color: theme.colors.text }]}>
                    Business
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/invite');
              }}
            >
              <Gift size={20} color="#10b981" />
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                Invite Friends
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push('/settings');
              }}
            >
              <Settings size={20} color="#6b7280" />
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
  },
  modeIndicator: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'center',
    marginTop: 8,
  },
  modeText: {
    fontSize: 12,
    color: '#555',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 60,
    position: 'relative',
    height: 160,
    justifyContent: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoRings: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 999,
  },
  ring1: {
    width: 130,
    height: 130,
  },
  ring2: {
    width: 160,
    height: 160,
  },
  ring3: {
    width: 190,
    height: 190,
  },
  floatingElements: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 100,
    pointerEvents: 'none',
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 999,
  },
  element1: {
    width: 80,
    height: 80,
    top: 50,
    left: 30,
  },
  element2: {
    width: 60,
    height: 60,
    bottom: 80,
    right: 40,
  },
  element3: {
    width: 70,
    height: 70,
    top: 120,
    right: 60,
  },
  chatContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 100,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chatInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    borderWidth: 0,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
  },
  backdropBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 20,
    left: 20,
    marginTop: 100,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItems: {
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
  },
  userModeDropdown: {
    marginLeft: 35,
    marginBottom: 10,
  },
  userModeOption: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 2,
  },
  activeMode: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  userModeText: {
    fontSize: 14,
  },
});