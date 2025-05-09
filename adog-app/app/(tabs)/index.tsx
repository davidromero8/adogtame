import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Index() {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data, error } = await supabase.auth.getUser();

      // si no hay usuario o hay un error manda a login
      if (!data?.user || error) {
        router.replace("/(auth)/login"); 
        return;
      }

      //guarda user e email
      setUserEmail(data.user.email || "");
      setLoading(false);
    };

    getUserInfo();
  }, []);

  //cerrar sesion
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/(auth)/login");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a1a" }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#1a1a1a", paddingHorizontal: 20, paddingVertical: 32 }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 32, textAlign: "center" }}>
        Perfil
      </Text>

      
      <View
        style={{
          backgroundColor: "#2a2a2a",
          padding: 24,
          marginBottom: 24,
          borderRadius: 16,
          shadowColor: "rgba(0, 0, 0, 0.5)",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          borderWidth: 1,
          borderColor: "#707070",
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>Correo electrónico:</Text>
          <Text style={{ fontSize: 16, color: "#a0a0a0" }}>{userEmail}</Text>
        </View>

        {/* boton cerrar sesion */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: "#e63946",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 16,
            marginTop: 16,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontWeight: "600", fontSize: 16 }}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
