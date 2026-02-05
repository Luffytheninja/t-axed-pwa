import ThemeData from './core/config/theme_config';

class AppConfig {
  static late BoxConstraints _constraints;

  static Future<void> initialize() async {
    // Initialize any app-wide configurations
    WidgetsFlutterBinding.ensureInitialized();
  }

  static void setConstraints(BoxConstraints constraints) {
    _constraints = constraints;
  }

  static BoxConstraints get constraints => _constraints;

  // App constants
  static const String appName = 'Refined Jiji';
  static const String appVersion = '1.0.0';

  // API endpoints
  static const String baseUrl = 'http://localhost:5000/api';
  static const String imageBaseUrl = 'https://images.refined-jiji.com';

  // Feature flags
  static const bool enableAIRecommendations = true;
  static const bool enableChat = true;
  static const bool enablePayments = true;
  static const bool enableLocationServices = true;

  // UI constants
  static const double borderRadius = 12.0;
  static const double paddingSmall = 8.0;
  static const double paddingMedium = 16.0;
  static const double paddingLarge = 24.0;

  // Colors
  static const Color primaryColor = Color(0xFF00B53F);
  static const Color secondaryColor = Color(0xFFFFA500);
  static const Color accentColor = Color(0xFF6C8EA0);

  // Theme
  static ThemeConfig get theme => ThemeConfig();
}