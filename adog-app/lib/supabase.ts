import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://fmrdpykyzbwxluhjenbq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcmRweWt5emJ3eGx1aGplbmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNjgyOTUsImV4cCI6MjA2MTg0NDI5NX0.-qhFl1r40K1Tw_2fve5ZX7wKe2YbDXa9ZGfrY9OVZRE';

const getStorage = () => {
  if (Platform.OS === 'web') return undefined;
  return require('@react-native-async-storage/async-storage').default;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: getStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
  },
});
