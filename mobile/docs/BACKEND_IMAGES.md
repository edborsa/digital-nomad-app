# Serving Images from Backend to Mobile App

This guide explains how to serve images from your Elixir/Phoenix backend to the React Native mobile app.

## Backend Setup (Already Configured)

Your Phoenix backend is already configured to serve static files from `priv/static/`. The images are accessible at:

```
http://localhost:4583/images/YOUR_IMAGE_FILE
```

### Adding Images to Backend

1. **Add images to the static directory:**
   ```bash
   # From the api directory
   mkdir -p priv/static/images
   cp your-image.png priv/static/images/
   ```

2. **Verify the image is accessible:**
   ```bash
   curl -I http://localhost:4583/images/your-image.png
   ```

## Mobile App Usage

### Method 1: Using the BackendImage Component (Recommended)

The `BackendImage` component handles loading states, errors, and **automatically detects and renders SVG files** using `SvgUri` from `react-native-svg`.

```tsx
import { BackendImage } from '@components/BackendImage';

// Simple usage - works with both regular images AND SVGs!
<BackendImage
  path="images/logo.svg"  // SVG automatically detected and rendered
  style={{ width: 200, height: 200 }}
  resizeMode="contain"
/>

// Regular images work too
<BackendImage
  path="images/profile-pic.jpg"
  style={{ width: 100, height: 100, borderRadius: 50 }}
  resizeMode="cover"
/>

// With custom loading/error components
<BackendImage
  path="images/banner.png"
  style={{ width: '100%', height: 200 }}
  LoadingComponent={<CustomLoader />}
  ErrorComponent={<CustomError />}
/>

// Disable loading/error indicators
<BackendImage
  path="images/icon.svg"
  showLoading={false}
  showError={false}
  style={{ width: 50, height: 50 }}
/>
```

**Props:**
- `path` (string, required): Relative path to image (e.g., `"images/logo.png"` or `"/images/logo.svg"`)
- `showLoading` (boolean, default: true): Show loading indicator
- `showError` (boolean, default: true): Show error message
- `LoadingComponent` (ReactNode): Custom loading component
- `ErrorComponent` (ReactNode): Custom error component
- All standard React Native `Image` props (style, resizeMode, etc.)

**Key Features:**
- ✅ Automatically detects `.svg` files and uses `SvgUri` renderer
- ✅ Regular images (PNG, JPG, GIF, WebP) use standard `Image` component
- ✅ Loading and error states handled automatically
- ✅ No need to specify image type manually

### Method 2: Using Standard Image Component

For more control or custom implementations:

```tsx
import { Image } from 'react-native';
import { apiConfig } from '@services/api';

const imageUrl = `${apiConfig.baseURL}/images/logo.png`;

<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  resizeMode="contain"
  onLoad={() => console.log('Image loaded')}
  onError={(e) => console.error('Image error:', e)}
/>
```

## Supported Image Formats

### Native Support (Recommended)
- **PNG** - Best for images with transparency
- **JPEG/JPG** - Best for photos
- **GIF** - Animated images supported
- **WebP** - Modern format with good compression

### SVG Files (Fully Supported!)

SVG files are **fully supported** through the `BackendImage` component, which automatically detects `.svg` files and uses `SvgUri` from `react-native-svg`.

#### Option 1: Use BackendImage Component (Recommended - No Extra Code!)
```tsx
import { BackendImage } from '@components/BackendImage';

// SVG automatically detected and rendered - that's it!
<BackendImage
  path="images/logo.svg"
  style={{ width: 200, height: 200 }}
/>
```

#### Option 2: Use SvgUri Directly
If you need more control:
```tsx
import { SvgUri } from 'react-native-svg';
import { apiConfig } from '@services/api';

<SvgUri
  uri={`${apiConfig.baseUrl}/images/logo.svg`}
  width={200}
  height={200}
/>
```

#### Option 3: Convert SVG to PNG/JPEG (Only if needed)
```bash
# Use a tool like ImageMagick or an online converter
convert logo.svg logo.png
```

## Image Optimization Best Practices

### Backend (Phoenix/Elixir)

1. **Enable compression** in your Phoenix endpoint:
   ```elixir
   # config/config.exs
   config :phoenix, :plug_init_mode, :runtime

   # In your endpoint.ex
   plug Plug.Static,
     at: "/",
     from: :your_app,
     gzip: true,
     only: ~w(images fonts)
   ```

2. **Add appropriate cache headers:**
   ```elixir
   # Add to your endpoint pipeline
   plug Plug.Static,
     at: "/",
     from: :your_app,
     gzip: true,
     cache_control_for_etags: "public, max-age=86400"
   ```

3. **Optimize images before adding to backend:**
   - Resize to appropriate dimensions
   - Use appropriate format (PNG for transparency, JPEG for photos)
   - Compress images (use tools like TinyPNG, ImageOptim)

### Mobile App (React Native)

1. **Use appropriate image dimensions:**
   ```tsx
   // Don't load a 4000x4000 image for a 100x100 display
   <BackendImage
     path="images/thumbnail.jpg"  // Use a thumbnail version
     style={{ width: 100, height: 100 }}
   />
   ```

2. **Use appropriate resizeMode:**
   - `contain` - Show entire image, may have empty space
   - `cover` - Fill entire space, may crop image
   - `stretch` - Distort image to fit
   - `center` - Center image without scaling

3. **Cache images** (React Native Image component handles this automatically):
   ```tsx
   <Image
     source={{ uri: imageUrl }}
     defaultSource={require('@assets/placeholder.png')}
   />
   ```

## Environment Configuration

Images are loaded from the API URL defined in your environment variables:

**.env (development):**
```bash
EXPO_PUBLIC_API_URL=http://localhost:4583
```

**.env.production:**
```bash
EXPO_PUBLIC_API_URL=https://your-api.com
```

The `BackendImage` component and `apiConfig` automatically use the correct URL based on your environment.

## Troubleshooting

### Image Not Loading

1. **Check backend is serving the file:**
   ```bash
   curl -I http://localhost:4583/images/your-image.png
   ```

2. **Check the path is correct:**
   ```tsx
   // Paths are relative to priv/static/
   // priv/static/images/logo.png -> path="images/logo.png"
   ```

3. **Check network permissions (iOS):**
   - Add to `Info.plist` for localhost development:
   ```xml
   <key>NSAppTransportSecurity</key>
   <dict>
     <key>NSAllowsLocalNetworking</key>
     <true/>
   </dict>
   ```

4. **Check CORS headers (if needed):**
   ```elixir
   # In your Phoenix endpoint or router
   plug CORSPlug, origin: ["http://localhost:8081"]
   ```

### SVG Not Rendering

If SVG files are not rendering:

1. **Use the BackendImage component** - It automatically handles SVG files:
   ```tsx
   <BackendImage path="images/logo.svg" style={{ width: 200, height: 200 }} />
   ```

2. **Use SvgUri directly** from react-native-svg:
   ```tsx
   import { SvgUri } from 'react-native-svg';
   <SvgUri uri={`${apiConfig.baseUrl}/images/logo.svg`} width={200} height={200} />
   ```

3. **Last resort**: Convert to PNG/JPEG format

⚠️ **Don't use the standard `Image` component for SVG files** - it will fail to decode them.

### Image Loading Slowly

1. Optimize image size and format
2. Enable backend compression (gzip)
3. Use CDN for production
4. Implement progressive image loading:
   ```tsx
   <BackendImage
     path="images/large-photo.jpg"
     defaultSource={require('@assets/placeholder.png')}
     style={styles.image}
   />
   ```

## Example: User Profile Pictures

```tsx
// components/UserAvatar.tsx
import { BackendImage } from '@components/BackendImage';

interface UserAvatarProps {
  userId: string;
  size?: number;
}

export function UserAvatar({ userId, size = 50 }: UserAvatarProps) {
  return (
    <BackendImage
      path={`images/avatars/${userId}.jpg`}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      resizeMode="cover"
      ErrorComponent={
        <View style={{ width: size, height: size, backgroundColor: '#ccc' }}>
          <Text>No Avatar</Text>
        </View>
      }
    />
  );
}
```

## Security Considerations

1. **Validate image uploads** on the backend
2. **Limit file sizes** to prevent abuse
3. **Sanitize filenames** to prevent path traversal
4. **Use authentication** for private images:
   ```tsx
   import { apiClient } from '@services/api';

   // Custom authenticated image loading
   const loadAuthenticatedImage = async (path: string) => {
     const response = await apiClient.get(path, {
       headers: { Authorization: `Bearer ${token}` }
     });
     // Handle image data
   };
   ```

## References

- [React Native Image Documentation](https://reactnative.dev/docs/image)
- [Phoenix Static Assets](https://hexdocs.pm/phoenix/static_assets.html)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
