import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Audio } from 'expo-av';
import { Chrome as Home, Heart, User, Rss, Menu, Settings, Gift, Users, Mic, Send } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserModeOpen, setIsUserModeOpen] = useState(false);
  const [userMode, setUserMode] = useState<'Personnel' | 'Business'>('Personnel');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcript, setTranscript] = useState('');
  const [chatText, setChatText] = useState('');
  const [isChatFocused, setIsChatFocused] = useState(false);
  const [chats, setChats] = useState<{Personnel: string[], Business: string[]}>({
    Personnel: ['Welcome to Personnel mode!'],
    Business: ['Welcome to Business mode!']
  });

  // Animation values
  const waveformAnimations = useRef(Array.from({ length: 7 }, () => new Animated.Value(0.3))).current;
  const chatInputAnimation = useRef(new Animated.Value(0)).current;
  const menuAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRecording) {
      startWaveformAnimation();
    } else {
      stopWaveformAnimation();
    }
  }, [isRecording]);

  useEffect(() => {
    Animated.timing(chatInputAnimation, {
      toValue: isChatFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isChatFocused]);

  useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: isMenuOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isMenuOpen]);

  const startWaveformAnimation = () => {
    const animations = waveformAnimations.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: Math.random() * 0.8 + 0.2,
            duration: 200 + index * 50,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 200 + index * 50,
            useNativeDriver: false,
          }),
        ])
      )
    );
    Animated.stagger(100, animations).start();
  };

  const stopWaveformAnimation = () => {
    waveformAnimations.forEach(anim => anim.stopAnimation());
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setTranscript('Listening...');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    
    // Simulate speech-to-text
    const simulatedTranscript = 'Hello, this is a voice message!';
    setTranscript(simulatedTranscript);
    
    // Add to chat
    const newChats = { ...chats };
    newChats[userMode] = [...newChats[userMode], `🎤 ${simulatedTranscript}`];
    setChats(newChats);
    
    setTimeout(() => setTranscript(''), 3000);
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleChatSubmit = () => {
    if (chatText.trim()) {
      const newChats = { ...chats };
      newChats[userMode] = [...newChats[userMode], chatText.trim()];
      setChats(newChats);
      setChatText('');
      setIsChatFocused(false);
    }
  };

  const toggleUserMode = (mode: 'Personnel' | 'Business') => {
    setUserMode(mode);
    setIsUserModeOpen(false);
  };

  const menuBackdropStyle = {
    opacity: menuAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const menuSlideStyle = {
    transform: [{
      translateX: menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [300, 0],
      }),
    }],
  };

  const chatInputSlideStyle = {
    transform: [{
      translateY: chatInputAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
      }),
    }],
    opacity: chatInputAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    }),
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[
        styles.header,
        { 
          backgroundColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.08)' : theme.colors.surface,
          borderBottomColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.2)' : theme.colors.border,
        }
      ]}>
        {theme.name === 'liquidGlass' && (
          <BlurView intensity={80} style={StyleSheet.absoluteFill} />
        )}
        <Text style={[
          styles.logo,
          { 
            color: theme.colors.text,
            textShadowColor: theme.name === 'liquidGlass' ? 'rgba(0,0,0,0.3)' : 'transparent',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }
        ]}>
          PLINK
        </Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Menu Backdrop */}
      {isMenuOpen && (
        <Animated.View style={[styles.menuBackdrop, menuBackdropStyle]}>
          <BlurView intensity={8} style={StyleSheet.absoluteFill} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.2)' }]} />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={() => setIsMenuOpen(false)}
          />
        </Animated.View>
      )}

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <Animated.View style={[styles.menu, menuSlideStyle]}>
          {theme.name === 'liquidGlass' && (
            <BlurView intensity={80} style={StyleSheet.absoluteFill} />
          )}
          <View style={[
            styles.menuContent,
            { backgroundColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.08)' : theme.colors.surface }
          ]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setIsUserModeOpen(!isUserModeOpen)}
            >
              <Users size={20} color="#8b5cf6" />
              <Text style={[styles.menuText, { color: theme.colors.text }]}>
                User Mode: {userMode}
              </Text>
            </TouchableOpacity>

            {isUserModeOpen && (
              <View style={styles.userModeDropdown}>
                <TouchableOpacity
                  style={[styles.userModeOption, userMode === 'Personnel' && styles.activeUserMode]}
                  onPress={() => toggleUserMode('Personnel')}
                >
                  <Text style={[styles.userModeText, { color: theme.colors.text }]}>Personnel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.userModeOption, userMode === 'Business' && styles.activeUserMode]}
                  onPress={() => toggleUserMode('Business')}
                >
                  <Text style={[styles.userModeText, { color: theme.colors.text }]}>Business</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.menuItem}>
              <Gift size={20} color="#10b981" />
              <Text style={[styles.menuText, { color: theme.colors.text }]}>Invite Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Settings size={20} color="#6b7280" />
              <Text style={[styles.menuText, { color: theme.colors.text }]}>Settings</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Main Content */}
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {/* Voice Recording Section */}
          <View style={[
            styles.voiceSection,
            { 
              backgroundColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.06)' : theme.colors.card,
              borderColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.2)' : theme.colors.border,
            }
          ]}>
            {theme.name === 'liquidGlass' && (
              <BlurView intensity={50} style={StyleSheet.absoluteFill} />
            )}
            
            <TouchableOpacity
              style={[
                styles.micButton,
                { 
                  backgroundColor: isRecording ? '#ef4444' : '#3b82f6',
                  shadowColor: isRecording ? '#ef4444' : '#3b82f6',
                }
              ]}
              onPress={handleVoiceRecording}
            >
              <Mic size={32} color="white" />
            </TouchableOpacity>

            {isRecording && (
              <View style={styles.waveform}>
                {waveformAnimations.map((anim, index) => (
                  <Animated.View
                    key={index}
                    style={[
                      styles.waveBar,
                      {
                        height: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [10, 40],
                        }),
                      },
                    ]}
                  />
                ))}
              </View>
            )}

            {transcript && (
              <Text style={[
                styles.transcript,
                { 
                  color: theme.colors.text,
                  textShadowColor: theme.name === 'liquidGlass' ? 'rgba(0,0,0,0.3)' : 'transparent',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                }
              ]}>
                {transcript}
              </Text>
            )}
          </View>

          {/* Chat Messages */}
          <View style={[
            styles.chatContainer,
            { 
              backgroundColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.06)' : theme.colors.card,
              borderColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.2)' : theme.colors.border,
            }
          ]}>
            {theme.name === 'liquidGlass' && (
              <BlurView intensity={50} style={StyleSheet.absoluteFill} />
            )}
            
            <Text style={[
              styles.chatTitle,
              { 
                color: theme.colors.text,
                textShadowColor: theme.name === 'liquidGlass' ? 'rgba(0,0,0,0.3)' : 'transparent',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }
            ]}>
              {userMode} Chat
            </Text>
            
            {chats[userMode].map((message, index) => (
              <View key={index} style={[
                styles.chatMessage,
                { 
                  backgroundColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.08)' : theme.colors.surface,
                  borderColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.2)' : theme.colors.border,
                }
              ]}>
                <Text style={[
                  styles.chatMessageText,
                  { 
                    color: theme.colors.text,
                    textShadowColor: theme.name === 'liquidGlass' ? 'rgba(0,0,0,0.3)' : 'transparent',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 1,
                  }
                ]}>
                  {message}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Chat Input */}
        <Animated.View style={[
          styles.chatInputContainer,
          chatInputSlideStyle,
          { 
            backgroundColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.08)' : theme.colors.surface,
            borderTopColor: theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.2)' : theme.colors.border,
          }
        ]}>
          {theme.name === 'liquidGlass' && (
            <BlurView intensity={80} style={StyleSheet.absoluteFill} />
          )}
          
          <View style={styles.chatInputWrapper}>
            <TextInput
              style={[
                styles.chatInput,
                {
                  backgroundColor: isChatFocused 
                    ? (theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.12)' : theme.colors.card)
                    : (theme.name === 'liquidGlass' ? 'rgba(255, 255, 255, 0.08)' : theme.colors.surface),
                  color: theme.colors.text,
                  borderColor: 'transparent',
                  shadowColor: isChatFocused ? theme.colors.primary : 'transparent',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }
              ]}
              placeholder="Type your message..."
              placeholderTextColor={theme.colors.textSecondary}
              value={chatText}
              onChangeText={setChatText}
              onFocus={() => setIsChatFocused(true)}
              onBlur={() => setIsChatFocused(false)}
              multiline
              returnKeyType="send"
              onSubmitEditing={handleChatSubmit}
            />
            {chatText.trim() && (
              <TouchableOpacity
                onPress={handleChatSubmit}
                style={[
                  styles.sendButton,
                  { backgroundColor: theme.colors.primary }
                ]}
              >
                <Send size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    zIndex: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
  },
  menuBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 15,
  },
  menu: {
    position: 'absolute',
    top: 90,
    right: 20,
    width: 250,
    zIndex: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuContent: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  userModeDropdown: {
    marginLeft: 32,
    marginBottom: 8,
  },
  userModeOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  activeUserMode: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  userModeText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  voiceSection: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 50,
  },
  waveBar: {
    width: 4,
    backgroundColor: '#3b82f6',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  transcript: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  chatContainer: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chatMessage: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  chatMessageText: {
    fontSize: 14,
  },
  chatInputContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  chatInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chatInput: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});