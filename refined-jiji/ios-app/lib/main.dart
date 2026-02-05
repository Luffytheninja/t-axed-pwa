import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:refined_jiji/core/config/app_config.dart';
import 'package:refined_jiji/core/providers/auth_provider.dart';
import 'package:refined_jiji/features/auth/presentation/pages/onboarding_page.dart';
import 'package:refined_jiji/features/auth/presentation/pages/login_page.dart';
import 'package:refined_jiji/features/auth/presentation/pages/register_page.dart';
import 'package:refined_jiji/features/home/presentation/pages/home_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize app config
  await AppConfig.initialize();

  // Initialize shared preferences
  final sharedPreferences = await SharedPreferences.getInstance();

  runApp(
    ProviderScope(
      overrides: [
        sharedPreferencesProvider.overrideWithValue(sharedPreferences),
      ],
      child: const RefinedJijiApp(),
    ),
  );
}

class RefinedJijiApp extends ConsumerWidget {
  const RefinedJijiApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ScreenUtilInit(
      designSize: const Size(375, 812), // iPhone X design size
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return MaterialApp(
          title: 'Refined Jiji',
          debugShowCheckedModeBanner: false,
          theme: AppConfig.theme.lightTheme,
          darkTheme: AppConfig.theme.darkTheme,
          themeMode: ThemeMode.system,
          initialRoute: '/',
          routes: {
            '/': (context) => const OnboardingPage(),
            '/login': (context) => const LoginPage(),
            '/register': (context) => RegisterPage(),
            '/home': (context) => const HomePage(),
          },
        );
      },
    );
  }
}