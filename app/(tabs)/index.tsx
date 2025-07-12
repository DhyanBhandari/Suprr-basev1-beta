import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Easing,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Headphones, Mic, Send, Menu, X, Gift } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export default function HomeScreen() {
  const { theme, currentTheme } = useTheme();
  
  const [isUserMode, setIsUserMode] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const transcriptAnim = useRef(new Animated.Value(0)).current;
  const waveAnims = useRef([...Array(7)].map(() => new Animated.Value(0.3))).current;

  const startWaveAnimation = useCallback(() => {
    const animations = waveAnims.map((anim, index) => 
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 400 + (index * 100),
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 400 + (index * 100),
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      )
    );
    
    Animated.stagger(50, animations).start();
  }, [waveAnims]);

  const stopWaveAnimation = useCallback(() => {
    waveAnims.forEach(anim => {
      anim.stopAnimation();
      anim.setValue(0.3);
    });
  }, [waveAnims]);

  const startPulseAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission required', 'Please grant microphone permission to use voice recording.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setIsListening(true);
      setHasInteracted(true);
      setTranscript('');
      
      startPulseAnimation();
      startWaveAnimation();
      
      Animated.timing(transcriptAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Simulate live transcript for demo
      const words = ['Hello', 'how', 'can', 'I', 'help', 'you', 'today?'];
      let currentText = '';
      
      words.forEach((word, index) => {
        setTimeout(() => {
          if (isRecording) {
            currentText += (index > 0 ? ' ' : '') + word;
            setTranscript(currentText);
          }
        }, (index + 1) * 500);
      });
      
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      setIsListening(false);
      await recording.stopAndUnloadAsync();
      
      pulseAnim.setValue(1);
      stopWaveAnimation();
      
      Animated.timing(transcriptAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      if (transcript.trim()) {
        const newMessage: Message = {
          id: Date.now(),
          text: transcript.trim(),
          sender: 'user',
        };
        setMessages(prev => [...prev, newMessage]);
        
        setTimeout(() => {
          const aiResponse: Message = {
            id: Date.now() + 1,
            text: `I heard: "${transcript.trim()}". How can I assist you with this?`,
            sender: 'ai',
          };
          setMessages(prev => [...prev, aiResponse]);
        }, 1000);
        
        setTranscript('');
      }
      
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const handlePersonClick = useCallback(() => {
    if (!isListening) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isListening, recording]);

  const handleChatSubmit = useCallback(() => {
    if (chatText.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: chatText.trim(),
        sender: 'user',
      };
      setMessages(prev => [...prev, newMessage]);
      setChatText('');
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: `I understand you're looking for help with: "${chatText.trim()}". How can I assist you further?`,
          sender: 'ai',
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  }, [chatText]);

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      {theme.blur ? (
        <BlurView
          style={[
            styles.messageBlur,
            item.sender === 'user' ? styles.userMessageBlur : styles.aiMessageBlur
          ]}
          intensity={theme.blurIntensity / 2}
          tint={currentTheme === 'dark' ? 'dark' : 'light'}
        >
          <Text style={[styles.messageText, { color: theme.colors.text }]}>
            {item.text}
          </Text>
        </BlurView>
      ) : (
        <View style={[
          styles.messageBubble,
          { backgroundColor: item.sender === 'user' ? theme.colors.primary : theme.colors.card }
        ]}>
          <Text style={[
            styles.messageText,
            { color: item.sender === 'user' ? '#ffffff' : theme.colors.text }
          ]}>
            {item.text}
          </Text>
        </View>
      )}
    </View>
  );

  const MainContent = () => {
    if (messages.length > 0) {
      return (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
        />
      );
    }

    if (isListening && hasInteracted) {
      return (
        <View style={styles.listeningContainer}>
          <View style={styles.waveContainer}>
            {waveAnims.map((anim, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.waveBars,
                  {
                    backgroundColor: theme.colors.primary,
                    transform: [{ scaleY: anim }],
                  },
                ]}
              />
            ))}
          </View>
          
          <Animated.View style={[
            styles.micButton,
            { 
              backgroundColor: theme.colors.primary,
              transform: [{ scale: pulseAnim }] 
            }
          ]}>
            <TouchableOpacity onPress={handlePersonClick} style={styles.micButtonInner}>
              <Mic size={40} color="#ffffff" />
            </TouchableOpacity>
          </Animated.View>
          
          <Text style={[
            styles.listeningText, 
            { 
              color: theme.colors.text,
              textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: theme.blur ? 2 : 0,
            }
          ]}>
            {isRecording ? 'Listening...' : 'Processing...'}
          </Text>
          
          <Animated.View 
            style={[
              styles.transcriptContainer,
              { 
                backgroundColor: theme.colors.card,
                opacity: transcriptAnim,
                transform: [
                  {
                    translateY: transcriptAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }
            ]}
          >
            {theme.blur && (
              <BlurView
                style={StyleSheet.absoluteFillObject}
                intensity={theme.blurIntensity / 2}
                tint={currentTheme === 'dark' ? 'dark' : 'light'}
              />
            )}
            <Text style={[
              styles.transcriptText, 
              { 
                color: theme.colors.text,
                textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: theme.blur ? 1 : 0,
              }
            ]}>
              {transcript || 'Start speaking...'}
            </Text>
          </Animated.View>
        </View>
      );
    }

    return (
      <View style={styles.defaultContainer}>
        <TouchableOpacity 
          onPress={handlePersonClick}
          style={[styles.mainButton, { backgroundColor: theme.colors.primary }]}
        >
          <Headphones size={48} color="#ffffff" />
        </TouchableOpacity>
        <Text style={[
          styles.mainTitle, 
          { 
            color: theme.colors.text,
            textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: theme.blur ? 2 : 0,
          }
        ]}>
          Find Your Need.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.header, theme.blur && styles.headerBlur]}>
          {theme.blur ? (
            <BlurView
              style={StyleSheet.absoluteFillObject}
              intensity={theme.blurIntensity}
              tint={currentTheme === 'dark' ? 'dark' : 'light'}
            />
          ) : (
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.colors.surface }]} />
          )}
          
          <TouchableOpacity onPress={() => router.push('/(tabs)')}>
            <Text style={[
              styles.logo, 
              { 
                color: theme.colors.text,
                textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: theme.blur ? 2 : 0,
              }
            ]}>
              PLINK
            </Text>
          </TouchableOpacity>
          
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
          
          <TouchableOpacity 
            onPress={() => setShowMenu(true)}
            style={[styles.settingsButton, { backgroundColor: theme.colors.button }]}
          >
            {theme.blur && (
              <BlurView
                style={StyleSheet.absoluteFillObject}
                intensity={theme.blurIntensity / 3}
                tint={currentTheme === 'dark' ? 'dark' : 'light'}
              />
            )}
            <Menu size={24} color={theme.colors.buttonText} />
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          <MainContent />
        </View>

        <View style={[styles.chatInputContainer, { backgroundColor: theme.colors.surface }]}>
          {theme.blur && (
            <BlurView
              style={StyleSheet.absoluteFillObject}
              intensity={theme.blurIntensity}
              tint={currentTheme === 'dark' ? 'dark' : 'light'}
            />
          )}
          <View style={styles.inputRow}>
            <TextInput
              value={chatText}
              onChangeText={setChatText}
              placeholder="Type your message..."
              placeholderTextColor={theme.colors.textSecondary}
              style={[
                styles.chatInput,
                { 
                  backgroundColor: theme.colors.input,
                  color: theme.colors.text,
                  borderColor: theme.colors.border 
                }
              ]}
              multiline
              returnKeyType="send"
              onSubmitEditing={handleChatSubmit}
            />
            {chatText.trim() && (
              <TouchableOpacity 
                onPress={handleChatSubmit}
                style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
              >
                <Send size={20} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {showMenu && (
          <View style={styles.menuOverlay}>
            <TouchableOpacity 
              style={styles.menuBackdrop} 
              onPress={() => setShowMenu(false)}
            />
            <View style={[styles.menuContainer, { backgroundColor: theme.colors.card }]}>
              {theme.blur && (
                <BlurView
                  style={StyleSheet.absoluteFillObject}
                  intensity={theme.blurIntensity}
                  tint={currentTheme === 'dark' ? 'dark' : 'light'}
                />
              )}
              <View style={styles.menuHeader}>
                <Text style={[styles.menuTitle, { color: theme.colors.text }]}>
                  Menu
                </Text>
                <TouchableOpacity 
                  onPress={() => setShowMenu(false)}
                  style={[styles.closeButton, { backgroundColor: theme.colors.button }]}
                >
                  <X size={20} color={theme.colors.buttonText} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.menuItems}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setShowMenu(false);
                    router.push('/invite');
                  }}
                >
                  <Gift size={20} color={theme.colors.textSecondary} />
                  <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                    Invite Friends
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setShowMenu(false);
                    router.push('/(tabs)/settings');
                  }}
                >
                  <Menu size={20} color={theme.colors.textSecondary} />
                  <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                    Settings
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerBlur: {
    backgroundColor: 'transparent',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modeToggle: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 4,
    overflow: 'hidden',
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  defaultContainer: {
    alignItems: 'center',
  },
  mainButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  listeningContainer: {
    alignItems: 'center',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 4,
    height: 40,
  },
  waveBars: {
    width: 4,
    height: 30,
    borderRadius: 2,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  micButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listeningText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
  transcriptContainer: {
    padding: 16,
    borderRadius: 12,
    maxWidth: '90%',
    marginTop: 16,
    minHeight: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  transcriptText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  messagesList: {
    flex: 1,
    width: '100%',
  },
  messagesContainer: {
    paddingVertical: 20,
    paddingBottom: 120,
  },
  messageContainer: {
    marginVertical: 4,
    paddingHorizontal: 20,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBlur: {
    padding: 12,
    borderRadius: 18,
    maxWidth: '80%',
    overflow: 'hidden',
  },
  userMessageBlur: {
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
  },
  aiMessageBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  chatInputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 120,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  menuBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 80,
    right: 20,
    width: 200,
    borderRadius: 12,
    overflow: 'hidden',
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItems: {
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  menuItemText: {
    fontSize: 14,
    marginLeft: 12,
    fontWeight: '500',
  },
});