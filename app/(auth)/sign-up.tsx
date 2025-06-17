import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { styles } from "@/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants";
import { Image } from "expo-image";
import { useGoogleAuth, useWarmUpBrowser } from "@/hooks/useGoogleAuth";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { ClerkError, SignUpForm } from "@/types";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { handleGoogleAuth } = useGoogleAuth();
  const router = useRouter();
  useWarmUpBrowser();

  const [formData, setFormData] = useState<SignUpForm>({
    email: "",
    password: "",
    code: "",
  });
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (err: ClerkError) => {
    setError(
      err.errors?.[0]?.longMessage || "Something went wrong. Please try again."
    );
  };

  const updateFormData = (field: keyof SignUpForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setError(null);
    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      handleError(err as ClerkError);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setError(null);
    setIsLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: formData.code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
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

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Verify your email</Text>
            <Text style={styles.subtitle}>
              We&apos;ve sent a verification code to {formData.email}
            </Text>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={20} color={theme.expense} />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => setError(null)}>
                  <Ionicons name="close" size={20} color={theme.textLight} />
                </TouchableOpacity>
              </View>
            ) : null}

            <TextInput
              style={[styles.verificationInput, error && styles.errorInput]}
              value={formData.code}
              placeholder="Enter verification code"
              onChangeText={(text) => updateFormData("code", text)}
              keyboardType="number-pad"
              autoComplete="one-time-code"
            />
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={onVerifyPress}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Verifying..." : "Verify Email"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/signup.png")}
            style={styles.illustration}
            contentFit="contain"
          />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={20} color={theme.expense} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={() => setError(null)}>
                <Ionicons name="close" size={20} color={theme.textLight} />
              </TouchableOpacity>
            </View>
          ) : null}

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
            onPress={onSignUpPress}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <GoogleAuthButton onPress={onGooglePress} disabled={isLoading} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Link href="/sign-in" style={styles.link}>
              <Text style={styles.linkText}>Sign In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
