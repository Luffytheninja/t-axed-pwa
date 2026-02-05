import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../providers/auth_provider.dart';

final authStateProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final authRepository = ref.watch(authRepositoryProvider);
  return AuthNotifier(authRepository);
});

class AuthNotifier extends StateNotifier<AuthState> {
  final AuthRepository _authRepository;

  AuthNotifier(this._authRepository) : super(AuthState.initial()) {
    _checkAuthStatus();
  }

  Future<void> _checkAuthStatus() async {
    final token = _authRepository.getToken();
    if (token != null) {
      state = state.copyWith(isAuthenticated: true, isLoading: false);
    } else {
      state = state.copyWith(isLoading: false);
    }
  }

  Future<void> login(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final result = await _authRepository.login(email, password);
      state = state.copyWith(
        isAuthenticated: true,
        isLoading: false,
        user: result['user'],
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  Future<void> register({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
    String? phone,
    String? location,
  }) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final result = await _authRepository.register(
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        location: location,
      );
      state = state.copyWith(
        isAuthenticated: true,
        isLoading: false,
        user: result['user'],
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  Future<void> logout() async {
    await _authRepository.logout();
    state = AuthState.initial();
  }
}

class AuthState {
  final bool isAuthenticated;
  final bool isLoading;
  final Map<String, dynamic>? user;
  final String? error;

  AuthState({
    required this.isAuthenticated,
    required this.isLoading,
    this.user,
    this.error,
  });

  factory AuthState.initial() {
    return AuthState(
      isAuthenticated: false,
      isLoading: true,
    );
  }

  AuthState copyWith({
    bool? isAuthenticated,
    bool? isLoading,
    Map<String, dynamic>? user,
    String? error,
  }) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      isLoading: isLoading ?? this.isLoading,
      user: user ?? this.user,
      error: error ?? this.error,
    );
  }
}