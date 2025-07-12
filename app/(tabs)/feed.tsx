import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';

interface FeedItem {
  id: number;
  type: 'post' | 'trending' | 'recommendation';
  title: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

export default function FeedScreen() {
  const { theme, currentTheme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: 1,
      type: 'trending',
      title: 'AI Revolution in Business Automation',
      content: 'Discover how artificial intelligence is transforming the way businesses operate, from customer service to data analysis.',
      author: 'TechInsights',
      timestamp: '2 hours ago',
      likes: 124,
      comments: 23,
      category: 'Technology',
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: 2,
      type: 'post',
      title: 'Top 10 Productivity Tips for Remote Work',
      content: 'Working from home can be challenging. Here are proven strategies to boost your productivity and maintain work-life balance.',
      author: 'ProductivityPro',
      timestamp: '4 hours ago',
      likes: 89,
      comments: 15,
      category: 'Productivity',
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'Voice Assistant Best Practices',
      content: 'Learn how to get the most out of your AI voice assistant with these expert tips and tricks.',
      author: 'AI Weekly',
      timestamp: '6 hours ago',
      likes: 156,
      comments: 31,
      category: 'AI',
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 4,
      type: 'post',
      title: 'Digital Wellness in the Modern Age',
      content: 'Maintaining mental health while staying connected. Tips for healthy technology usage.',
      author: 'WellnessTech',
      timestamp: '8 hours ago',
      likes: 203,
      comments: 45,
      category: 'Wellness',
      isLiked: true,
      isBookmarked: true,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleLike = (id: number) => {
    setFeedItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  const toggleBookmark = (id: number) => {
    setFeedItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trending':
        return <TrendingUp size={16} color={theme.colors.primary} />;
      default:
        return null;
    }
  };

  const renderFeedItem = ({ item }: { item: FeedItem }) => (
    <View style={[styles.feedItem, { backgroundColor: theme.colors.card }]}>
      {theme.blur && (
        <BlurView
          style={StyleSheet.absoluteFillObject}
          intensity={theme.blurIntensity / 2}
          tint={currentTheme === 'dark' ? 'dark' : 'light'}
        />
      )}
      <View style={styles.feedHeader}>
        <View style={styles.feedMeta}>
          {getTypeIcon(item.type)}
          <Text style={[
            styles.feedAuthor, 
            { 
              color: theme.colors.text,
              textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: theme.blur ? 1 : 0,
            }
          ]}>
            {item.author}
          </Text>
          <Text style={[
            styles.feedTimestamp, 
            { 
              color: theme.colors.textSecondary,
              textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: theme.blur ? 1 : 0,
            }
          ]}>
            • {item.timestamp}
          </Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: theme.colors.primary + '20' }]}>
          <Text style={[styles.categoryText, { color: theme.colors.primary }]}>
            {item.category}
          </Text>
        </View>
      </View>

      <Text style={[
        styles.feedTitle, 
        { 
          color: theme.colors.text,
          textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: theme.blur ? 1 : 0,
        }
      ]}>
        {item.title}
      </Text>
      <Text style={[
        styles.feedContent, 
        { 
          color: theme.colors.textSecondary,
          textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: theme.blur ? 1 : 0,
        }
      ]}>
        {item.content}
      </Text>

      <View style={styles.feedActions}>
        <TouchableOpacity
          onPress={() => toggleLike(item.id)}
          style={styles.actionButton}
        >
          <Heart
            size={20}
            color={item.isLiked ? '#ef4444' : theme.colors.textSecondary}
            fill={item.isLiked ? '#ef4444' : 'none'}
          />
          <Text style={[
            styles.actionText, 
            { 
              color: theme.colors.textSecondary,
              textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: theme.blur ? 1 : 0,
            }
          ]}>
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color={theme.colors.textSecondary} />
          <Text style={[
            styles.actionText, 
            { 
              color: theme.colors.textSecondary,
              textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: theme.blur ? 1 : 0,
            }
          ]}>
            {item.comments}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleBookmark(item.id)}
          style={styles.actionButton}
        >
          <Bookmark
            size={20}
            color={item.isBookmarked ? theme.colors.primary : theme.colors.textSecondary}
            fill={item.isBookmarked ? theme.colors.primary : 'none'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Feed" showBackButton />

      <FlatList
        data={feedItems}
        renderItem={renderFeedItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedList: {
    padding: 20,
    paddingBottom: 120,
  },
  feedItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  feedAuthor: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  feedTimestamp: {
    fontSize: 12,
    marginLeft: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  feedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  feedContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  feedActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
});