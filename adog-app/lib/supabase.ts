import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const url = 'https://fmrdpykyzbwxluhjenbq.supabase.co' 
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcmRweWt5emJ3eGx1aGplbmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNjgyOTUsImV4cCI6MjA2MTg0NDI5NX0.-qhFl1r40K1Tw_2fve5ZX7wKe2YbDXa9ZGfrY9OVZRE'

export const supabase = createClient(url, key, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});