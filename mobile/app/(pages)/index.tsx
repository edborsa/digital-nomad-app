import { Link } from 'expo-router';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useApi } from '@hooks/useApi';
import { api } from '@services/api';

export default function Index() {
  const { data, loading, error } = useApi(() => api.getDummyData());

  return (
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
