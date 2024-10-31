import 'package:flutter/material.dart';
import 'package:frondend/common/end_point.dart';
import 'package:frondend/model/entities.dart/login.dart';
import 'package:frondend/model/entities.dart/user_data.dart';
import 'package:get/get.dart';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// To register userCredential...!

// Sign Up...!

class AuthService {
  Future<bool> registerUser(UserData user) async {
    try {
      final response = await http.post(
        Uri.parse(EndPoint.registeUrl),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(user.toJson()),
      );
      print(response.body);
      return response.statusCode == 200;
    } catch (e) {
      print('Error during registration: $e');
      return false;
    }
  }

  Future<bool> verifyOtp({
    required String email,
    required String otp,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('${EndPoint.otpUrl}'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'email': email,
          'otp': otp,
        }),
      );
// hellow
      if (response.statusCode == 200) {
        print(response.body);
        final Map<String, dynamic> data = jsonDecode(response.body);
        print("data status ${data['status']}");
        return data['status'] ?? false;
      }
      return false;
    } catch (e) {
      print('OTP verification error: $e');
      return false;
    }
  }

// Login...!
  Future<bool> loginUser(LoginRequest loginRequest) async {
    try {
      final response = await http.post(Uri.parse(EndPoint.loginUrl),
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonEncode(loginRequest.toJson()));

      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['status'] == true) {
        String token = data['token'];
        var box = await Hive.openBox('authBox');

        box.put('token', token);
        Get.snackbar('Success', 'Login Successful!',
            backgroundColor: Colors.green);
        return true;
      } else {
        Get.snackbar('Error', data['message'] ?? 'Login Failed,',
            backgroundColor: Colors.red);
        return false;
      }
    } catch (e) {
      print('Login Error $e');
      Get.snackbar('Error', 'An error occurred. Please try again.',
          backgroundColor: Colors.red);
      return false;
    }
  }

// forgot password...!

  Future<bool> changePassword(
      String currentPassword, String newPassword) async {
    var box = await Hive.openBox('authBox');
    var token = box.get('token');
    try {
      final response = await http.post(
        Uri.parse(EndPoint.passowordUrl),
        headers: {'Content-Type': 'application/json', 'Authorization': token},
        body: jsonEncode(
          {
            'password': currentPassword,
            'newPassword': newPassword,
          },
        ),
      );
      var data = jsonDecode(response.body);
      if (response.statusCode == 200) {
        if (data['status']) {
          print('Password change successfully');

          return true;
        } else {
          print('Failed to change password : ${data['message']}');
          return false;
        }
      } else {
        Get.snackbar('Error', 'Server error $data');
        print('Server Error ${data}');
        return false;
      }
    } catch (e) {
      print('Error during password change $e');
      return false;
    }
  }
}
