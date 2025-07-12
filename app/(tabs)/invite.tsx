import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking,
  SafeAreaView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { ChevronLeft, Gift, Copy, MessageCircle, Mail, Link, Share2, Users, Check } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

export default function InviteScreen() {
  const { theme, currentTheme } = useTheme();
  const [inviteCode] = useState('PLINK2024X9');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Hey! I found this amazing AI assistant called PLINK. You should check it out!');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('Copied!', 'Invite code copied to clipboard');
  };

  const handleCopyLink = async () => {
    const inviteLink = `https://plink.app/invite/${inviteCode}`;
    await Clipboard.setStringAsync(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('Copied!', 'Invite link copied to clipboard');
  };

  const handleSendInvite = () => {
    if (email.trim()) {
      Alert.alert('Success', `Invite sent to ${email}!`);
      setEmail('');
    } else {
      Alert.alert('Error', 'Please enter a valid email address');
    }
  };

  const handleShareVia = (platform: string) => {
    const inviteLink = `https://plink.app/invite/${inviteCode}`;
    const text = `${message} ${inviteLink}`;
    
    switch(platform) {
      case 'whatsapp':
        Linking.openURL(`whatsapp://send?text=${encodeURIComponent(text)}`);
        break;
      case 'email':
        Linking.openURL(`mailto:?subject=Join me on PLINK&body=${encodeURIComponent(text)}`);
        break;
      default:
        handleCopyLink();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, theme.blur && styles.headerBlur]}>
        {theme.blur ? (
          <BlurView
            style={StyleSheet.absoluteFillObject}
            intensity={20}
            tint={currentTheme === 'dark' ? 'dark' : 'light'}
          />
        ) : (
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.colors.surface }]} />
        )}
        
        <TouchableOpacity 
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: theme.colors.button }]}
        >
          <ChevronLeft size={24} color={theme.colors.buttonText} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Invite Friends
        </Text>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.rewardBanner}>
          <View style={styles.rewardContent}>
            <Gift size={24} color="#ffffff" />
            <View style={styles.rewardText}>
              <Text style={styles.rewardTitle}>Earn Rewards!</Text>
              <Text style={styles.rewardSubtitle}>
                Get $10 credit for each friend who joins. They get $5 too!
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Your Invite Code
          </Text>
          <View style={[styles.inviteCodeContainer, { backgroundColor: theme.colors.input }]}>
            <Text style={[styles.inviteCode, { color: theme.colors.text }]}>
              {inviteCode}
            </Text>
            <TouchableOpacity 
              onPress={handleCopyCode}
              style={[styles.copyButton, { backgroundColor: theme.colors.button }]}
            >
              {copied ? (
                <Check size={16} color="#10b981" />
              ) : (
                <Copy size={16} color={theme.colors.buttonText} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
            Share this code with friends to earn rewards
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Share
          </Text>
          <View style={styles.shareGrid}>
            <TouchableOpacity
              onPress={() => handleShareVia('whatsapp')}
              style={[styles.shareButton, styles.whatsappButton]}
            >
              <MessageCircle size={20} color="#ffffff" />
              <Text style={styles.shareButtonText}>WhatsApp</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => handleShareVia('email')}
              style={[styles.shareButton, styles.emailButton]}
            >
              <Mail size={20} color="#ffffff" />
              <Text style={styles.shareButtonText}>Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleCopyLink}
              style={[styles.shareButton, styles.copyLinkButton]}
            >
              <Link size={20} color="#ffffff" />
              <Text style={styles.shareButtonText}>Copy Link</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => handleShareVia('more')}
              style={[styles.shareButton, styles.moreButton]}
            >
              <Share2 size={20} color="#ffffff" />
              <Text style={styles.shareButtonText}>More</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Send Direct Invite
          </Text>
          <View style={styles.inviteForm}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email address"
              placeholderTextColor={theme.colors.textSecondary}
              style={[styles.emailInput, { 
                backgroundColor: theme.colors.input,
                color: theme.colors.text,
                borderColor: theme.colors.border 
              }]}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Personal message (optional)"
              placeholderTextColor={theme.colors.textSecondary}
              style={[styles.messageInput, { 
                backgroundColor: theme.colors.input,
                color: theme.colors.text,
                borderColor: theme.colors.border 
              }]}
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity
              onPress={handleSendInvite}
              style={[
                styles.sendButton, 
                { 
                  backgroundColor: email.trim() ? theme.colors.primary : theme.colors.button,
                  opacity: email.trim() ? 1 : 0.5
                }
              ]}
              disabled={!email.trim()}
            >
              <Text style={[
                styles.sendButtonText,
                { color: email.trim() ? '#ffffff' : theme.colors.textSecondary }
              ]}>
                Send Invite
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <View style={styles.statsHeader}>
            <Users size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Your Referrals
            </Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>5</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Friends Invited
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#10b981' }]}>$50</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Earned
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerBlur: {
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  rewardBanner: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  rewardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    marginLeft: 12,
    flex: 1,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  rewardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 8,
  },
  inviteCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  inviteCode: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: 8,
    borderRadius: 6,
  },
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: '45%',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  shareButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  whatsappButton: {
    backgroundColor: '#25d366',
  },
  emailButton: {
    backgroundColor: '#ea4335',
  },
  copyLinkButton: {
    backgroundColor: '#6b7280',
  },
  moreButton: {
    backgroundColor: '#8b5cf6',
  },
  inviteForm: {
    gap: 12,
  },
  emailInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  messageInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  sendButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});