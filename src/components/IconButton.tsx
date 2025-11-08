import { Pressable, PressableProps } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import { Box } from './Box';
import { Icon, IconName } from './Icon';

type IconButtonProps = {
  iconName: IconName;
  onPress: PressableProps['onPress'];
};
export function IconButton({ iconName, onPress }: IconButtonProps) {
  const { boxShadows } = useAppTheme();
  return (
    <Pressable onPress={onPress}>
      <Box
        alignItems="center"
        backgroundColor="primary"
        borderRadius="rounded"
        height={50}
        justifyContent="center"
        style={{ boxShadow: boxShadows.primary }}
        width={50}
      >
        <Icon
          color="pureWhite"
          name={iconName}
        />
      </Box>
    </Pressable>
  );
}
