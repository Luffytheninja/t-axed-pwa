import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

final dioProvider = Provider<Dio>((ref) {
  final dio = Dio();
  dio.options.baseUrl = 'http://localhost:5000/api';
  dio.options.connectTimeout = const Duration(seconds: 5);
  dio.options.receiveTimeout = const Duration(seconds: 3);

  dio.interceptors.add(LogInterceptor(
    request: true,
    requestHeader: true,
    requestBody: true,
    responseHeader: true,
    responseBody: true,
    error: true,
  ));

  return dio;
});

final sharedPreferencesProvider = Provider<SharedPreferences>((ref) {
  throw UnimplementedError();
});

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  final dio = ref.watch(dioProvider);
  final prefs = ref.watch(sharedPreferencesProvider);
  return AuthRepository(dio, prefs);
});

class AuthRepository {
  final Dio _dio;
  final SharedPreferences _prefs;

  AuthRepository(this._dio, this._prefs);

  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await _dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });

    if (response.statusCode == 200) {
      final token = response.data['token'];
      await _prefs.setString('auth_token', token);
      return response.data;
    } else {
      throw Exception('Login failed');
    }
  }

  Future<Map<String, dynamic>> register({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
    String? phone,
    String? location,
  }) async {
    final response = await _dio.post('/auth/register', data: {
      'email': email,
      'password': password,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone,
      'location': location,
    });

    if (response.statusCode == 201) {
      final token = response.data['token'];
      await _prefs.setString('auth_token', token);
      return response.data;
    } else {
      throw Exception('Registration failed');
    }
  }

  Future<void> logout() async {
    await _prefs.remove('auth_token');
  }

  String? getToken() {
    return _prefs.getString('auth_token');
  }
}