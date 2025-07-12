import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Search, Filter, ChevronDown, Star, Trash2, Heart } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';

interface FavoriteItem {
  id: number;
  title: string;
  type: string;
  category: string;
  description: string;
  rating: number;
  saved: string;
  emoji: string;
}

export default function FavoritesScreen() {
  const { theme, currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: 1,
      title: 'AI Assistant for Business',
      type: 'service',
      category: 'Business',
      description: 'Smart AI solutions for business automation',
      rating: 4.8,
      saved: '2 days ago',
      emoji: '🚀'
    },
    {
      id: 2,
      title: 'Creative Design Tools',
      type: 'tool',
      category: 'Design',
      description: 'Professional design software and templates',
      rating: 4.9,
      saved: '1 week ago',
      emoji: '🛠️'
    },
    {
      id: 3,
      title: 'Digital Marketing Course',
      type: 'course',
      category: 'Education',
      description: 'Complete guide to digital marketing strategies',
      rating: 4.7,
      saved: '3 days ago',
      emoji: '📚'
    },
    {
      id: 4,
      title: 'Project Management App',
      type: 'app',
      category: 'Productivity',
      description: 'Streamline your workflow and team collaboration',
      rating: 4.6,
      saved: '5 days ago',
      emoji: '📱'
    }
  ]);

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || item.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const removeFavorite = (id: number) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this item from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => setFavorites(favorites.filter(item => item.id !== id))
        }
      ]
    );
  };

  const renderFavoriteItem = ({ item }: { item: FavoriteItem }) => (
    <View style={[styles.favoriteItem, { backgroundColor: theme.colors.card }]}>
      {theme.blur && (
        <BlurView
          style={StyleSheet.absoluteFillObject}
          intensity={theme.blurIntensity / 2}
          tint={currentTheme === 'dark' ? 'dark' : 'light'}
        />
      )}
      <View style={styles.favoriteContent}>
        <Text style={styles.favoriteEmoji}>{item.emoji}</Text>
        <View style={styles.favoriteDetails}>
          <Text style={[
            styles.favoriteTitle, 
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
            styles.favoriteDescription, 
            { 
              color: theme.colors.textSecondary,
              textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: theme.blur ? 1 : 0,
            }
          ]}>
            {item.description}
          </Text>
          <View style={styles.favoriteMetadata}>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#fbbf24" />
              <Text style={[
                styles.rating, 
                { 
                  color: theme.colors.textSecondary,
                  textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: theme.blur ? 1 : 0,
                }
              ]}>
                {item.rating}
              </Text>
            </View>
            <Text style={[
              styles.category, 
              { 
                color: theme.colors.textSecondary,
                textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: theme.blur ? 1 : 0,
              }
            ]}>
              {item.category}
            </Text>
            <Text style={[
              styles.saved, 
              { 
                color: theme.colors.textSecondary,
                textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: theme.blur ? 1 : 0,
              }
            ]}>
              {item.saved}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeFavorite(item.id)}
        style={styles.removeButton}
      >
        <Trash2 size={16} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Heart size={64} color={theme.colors.textSecondary} />
      <Text style={[
        styles.emptyTitle, 
        { 
          color: theme.colors.text,
          textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: theme.blur ? 2 : 0,
        }
      ]}>
        No favorites found
      </Text>
      <Text style={[
        styles.emptySubtitle, 
        { 
          color: theme.colors.textSecondary,
          textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: theme.blur ? 1 : 0,
        }
      ]}>
        {searchTerm || filter !== 'all' 
          ? 'Try adjusting your search or filter'
          : 'Start adding items to your favorites to see them here'
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Favorites" showBackButton />

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={[styles.searchInputContainer, { backgroundColor: theme.colors.input }]}>
            {theme.blur && (
              <BlurView
                style={StyleSheet.absoluteFillObject}
                intensity={theme.blurIntensity / 3}
                tint={currentTheme === 'dark' ? 'dark' : 'light'}
              />
            )}
            <Search size={16} color={theme.colors.textSecondary} />
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search favorites..."
              placeholderTextColor={theme.colors.textSecondary}
              style={[styles.searchInput, { color: theme.colors.text }]}
            />
          </View>
          
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.card }]}>
            {theme.blur && (
              <BlurView
                style={StyleSheet.absoluteFillObject}
                intensity={theme.blurIntensity / 3}
                tint={currentTheme === 'dark' ? 'dark' : 'light'}
              />
            )}
            <Filter size={16} color={theme.colors.textSecondary} />
            <Text style={[
              styles.filterText, 
              { 
                color: theme.colors.text,
                textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: theme.blur ? 1 : 0,
              }
            ]}>
              {filter === 'all' ? 'All' : filter}
            </Text>
            <ChevronDown size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {filteredFavorites.length > 0 ? (
          <FlatList
            data={filteredFavorites}
            renderItem={renderFavoriteItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <EmptyState />
        )}
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
    overflow: 'hidden',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  favoriteContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  favoriteEmoji: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 4,
  },
  favoriteDetails: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  favoriteDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  favoriteMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
  },
  category: {
    fontSize: 12,
  },
  saved: {
    fontSize: 12,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
    marginLeft: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});