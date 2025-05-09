import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }

    Alert.alert("Registro exitoso", "Revisa tu correo para confirmar tu cuenta");
    router.replace("/(auth)/login");
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a1a", paddingHorizontal: 24 }}>
      <View style={{ width: "100%", maxWidth: 400, backgroundColor: "#2a2a2a", borderRadius: 16, padding: 24, shadowColor: "black", shadowOpacity: 0.5, shadowRadius: 8, borderColor: "#4b5563", borderWidth: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", color: "white", marginBottom: 24 }}>
          Registrarse
        </Text>

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#4b5563",
            padding: 12,
            marginBottom: 16,
            borderRadius: 12,
            backgroundColor: "#3a3a3a",
            color: "white",
          }}
          placeholder="Correo electrónico"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#4b5563",
            padding: 12,
            marginBottom: 16,
            borderRadius: 12,
            backgroundColor: "#3a3a3a",
            color: "white",
          }}
          placeholder="Contraseña"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#f43f5e",
            padding: 12,
            borderRadius: 12,
            marginBottom: 12,
            alignItems: "center",
          }}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {loading ? "Cargando..." : "Registrarse"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 8,
            padding: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#f43f5e",
            alignItems: "center",
          }}
          onPress={() => router.replace("/(auth)/login")}
        >
          <Text style={{ color: "#f43f5e", fontWeight: "600" }}>
            Volver
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
