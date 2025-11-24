import { Link } from 'expo-router';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { SvgUri } from 'react-native-svg';
import { useApi } from '@hooks/useApi';
import { api, apiConfig } from '@services/api';
import { BackendImage } from '@components/BackendImage';

export default function Index() {
  const { data, loading, error } = useApi(() => api.getDummyData());
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  // Construct the image URL from the backend
  const imageUrl = `${apiConfig.baseUrl}/images/logo.svg`;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true' ? (
          <Link href="/(storybook)">Open Storybook</Link>
        ) : (
          <>
            <Text style={styles.title}>Hello World (storybook disabled)</Text>

            <View style={styles.apiSection}>
              <Text style={styles.sectionTitle}>API Test:</Text>

              {loading && <ActivityIndicator size="large" color="#0000ff" />}

              {error && <Text style={styles.error}>Error: {error}</Text>}

              {data && (
                <View style={styles.dataContainer}>
                  <Text style={styles.success}>✓ API Connected!</Text>
                  <Text style={styles.data}>Dummy Value: {data.data.dummy_value}</Text>
                  <Text style={styles.apiUrl}>API URL: {process.env.EXPO_PUBLIC_API_URL}</Text>
                </View>
              )}
            </View>

            <View style={styles.imageSection}>
              <Text style={styles.sectionTitle}>SVG Image from Backend (Direct SvgUri):</Text>
              <Text style={styles.imageUrl}>URL: {imageUrl}</Text>

              {imageLoading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#0000ff" />
                  <Text style={styles.loadingText}>Loading SVG...</Text>
                </View>
              )}

              {imageError && <Text style={styles.error}>✗ SVG Error: {imageError}</Text>}

              <View style={styles.svgContainer}>
                <SvgUri
                  uri={imageUrl}
                  width="100%"
                  height={150}
                  onLoad={() => {
                    setImageLoading(false);
                    setImageError(null);
                  }}
                  onError={e => {
                    setImageLoading(false);
                    setImageError(e?.message || 'Failed to load SVG');
                  }}
                />
              </View>

              <Text style={styles.note}>
                Using SvgUri from react-native-svg to render SVG images directly from the backend.
              </Text>
            </View>

            <View style={styles.imageSection}>
              <Text style={styles.sectionTitle}>Using BackendImage Component:</Text>
              <Text style={[styles.note, { marginBottom: 10 }]}>
                This reusable component automatically detects and handles SVG files using SvgUri,
                while regular images use the standard Image component. It handles loading states and
                errors automatically.
              </Text>

              <Text style={styles.imageLabel}>SVG Logo:</Text>
              <BackendImage
                path="images/logo.svg"
                style={styles.backendImage}
                resizeMode="contain"
              />

              <Text style={[styles.imageLabel, { marginTop: 15 }]}>PNG Image:</Text>
              <BackendImage
                path="images/some_png_image.png"
                style={styles.backendImage}
                resizeMode="contain"
              />

              <Text style={[styles.note, { marginTop: 10 }]}>
                ✨ The BackendImage component automatically detects .svg files and uses SvgUri, no
                extra code needed! Regular images (PNG, JPG) use the standard Image component.
                Component location: components/BackendImage/BackendImage.tsx
              </Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  apiSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  dataContainer: {
    marginTop: 10,
  },
  success: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  data: {
    fontSize: 14,
    marginBottom: 8,
  },
  apiUrl: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
  imageSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
  },
  imageUrl: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  image: {
    width: '100%',
    height: 150,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  note: {
    fontSize: 11,
    color: '#999',
    marginTop: 10,
    fontStyle: 'italic',
  },
  backendImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  svgContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
});
