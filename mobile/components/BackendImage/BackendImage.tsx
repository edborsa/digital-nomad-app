/**
 * BackendImage Component
 *
 * A reusable component for loading images from the backend API.
 * Handles loading states, errors, and provides fallback options.
 * Automatically detects and handles SVG files.
 */

import React, { useState } from 'react';
import { Image, ActivityIndicator, Text, View, StyleSheet, ImageProps } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { apiConfig } from '@services/api';

interface BackendImageProps extends Omit<ImageProps, 'source'> {
  /** Path to the image relative to the backend (e.g., 'images/logo.svg' or '/images/logo.svg') */
  path: string;
  /** Show loading indicator while image loads */
  showLoading?: boolean;
  /** Show error message if image fails to load */
  showError?: boolean;
  /** Custom loading component */
  LoadingComponent?: React.ReactNode;
  /** Custom error component */
  ErrorComponent?: React.ReactNode;
}

/**
 * Component for displaying images from the backend API
 *
 * @example
 * ```tsx
 * <BackendImage
 *   path="images/logo.png"
 *   style={{ width: 200, height: 200 }}
 *   resizeMode="contain"
 * />
 * ```
 */
export function BackendImage({
  path,
  showLoading = true,
  showError = true,
  LoadingComponent,
  ErrorComponent,
  style,
  onLoad,
  onError,
  ...imageProps
}: BackendImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const imageUrl = `${apiConfig.baseUrl}${normalizedPath}`;

  // Check if the image is an SVG
  const isSvg = normalizedPath.toLowerCase().endsWith('.svg');

  const handleLoad = (e?: any) => {
    setLoading(false);
    setError(null);
    onLoad?.(e);
  };

  const handleError = (e?: any) => {
    setLoading(false);
    setError(e?.nativeEvent?.error || e?.message || 'Failed to load image');
    onError?.(e);
  };

  // Get dimensions from style for SVG
  const flatStyle = StyleSheet.flatten(style);
  const width = flatStyle?.width || 100;
  const height = flatStyle?.height || 100;

  return (
    <View style={styles.container}>
      {loading && showLoading && (
        <View style={[styles.loadingContainer, style]}>
          {LoadingComponent || <ActivityIndicator size="small" color="#0000ff" />}
        </View>
      )}

      {error && showError && (
        <View style={[styles.errorContainer, style]}>
          {ErrorComponent || <Text style={styles.errorText}>Failed to load image</Text>}
        </View>
      )}

      {isSvg ? (
        <SvgUri
          uri={imageUrl}
          width={typeof width === 'number' ? width : 100}
          height={typeof height === 'number' ? height : 100}
          onLoad={handleLoad}
          onError={handleError}
          style={error ? styles.hidden : undefined}
        />
      ) : (
        <Image
          {...imageProps}
          source={{ uri: imageUrl }}
          style={[style, error && styles.hidden]}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fee',
  },
  errorText: {
    color: '#c00',
    fontSize: 12,
  },
  hidden: {
    display: 'none',
  },
});
