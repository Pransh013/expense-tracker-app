import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { styles } from "@/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants";
import { Image } from "expo-image";
import { useGoogleAuth, useWarmUpBrowser } from "@/hooks/useGoogleAuth";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { ClerkError, SignInForm } from "@/types";

export default function SignInScreen() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { handleGoogleAuth } = useGoogleAuth();
  const router = useRouter();
  useWarmUpBrowser();

  const [formData, setFormData] = useState<SignInForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (err: ClerkError) => {
    setError(
      err.errors?.[0]?.longMessage || "Something went wrong. Please try again."
    );
  };

  const updateFormData = (field: keyof SignInForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setError(null);
    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      handleError(err as ClerkError);
    } finally {
      setIsLoading(false);
    }
  };

  const onGooglePress = async () => {
    if (!isLoaded) return;
    setError(null);
    setIsLoading(true);
    try {
      await handleGoogleAuth();
    } catch (err) {
      handleError(err as ClerkError);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/signin.png")}
            style={styles.illustration}
            contentFit="contain"
          />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          {error && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={20} color={theme.expense} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={() => setError(null)}>
                <Ionicons name="close" size={20} color={theme.textLight} />
              </TouchableOpacity>
            </View>
          )}

          <TextInput
            style={[styles.input, error && styles.errorInput]}
            autoCapitalize="none"
            value={formData.email}
            placeholder="Enter your email"
            placeholderTextColor="#9A8478"
            onChangeText={(text) => updateFormData("email", text)}
            keyboardType="email-address"
            autoComplete="email"
            editable={!isLoading}
          />

          <TextInput
            style={[styles.input, error && styles.errorInput]}
            value={formData.password}
            placeholder="Enter your password"
            placeholderTextColor="#9A8478"
            secureTextEntry
            onChangeText={(text) => updateFormData("password", text)}
            autoComplete="password"
            editable={!isLoading}
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={onSignInPress}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <GoogleAuthButton onPress={onGooglePress} disabled={isLoading} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>
            <Link href="/sign-up" style={styles.link}>
              <Text style={styles.linkText}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
