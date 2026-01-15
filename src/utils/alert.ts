import { Alert as NativeAlert, Platform } from 'react-native';

interface AlertButton {
  text?: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export const Alert = {
  alert: (title: string, message?: string, buttons?: AlertButton[]) => {
    if (Platform.OS === 'web') {
      const confirmMessage = message ? `${title}\n\n${message}` : title;
      if (window.confirm(confirmMessage)) {
        // Find the confirm button (usually destructive or default, explicitly not cancel)
        // In our case 'Logout' is destructive.
        const confirmButton = buttons?.find((b) => b.style !== 'cancel');
        confirmButton?.onPress?.();
      } else {
        // Find cancel button
        const cancelButton = buttons?.find((b) => b.style === 'cancel');
        cancelButton?.onPress?.();
      }
    } else {
      NativeAlert.alert(title, message, buttons);
    }
  },
};
