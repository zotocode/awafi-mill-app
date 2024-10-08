import 'package:frondend/common/end_point.dart';
import 'package:frondend/model/entities.dart/user_credential.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// To register userCredential...!

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
        Uri.parse('${EndPoint.otpUrl}/verify-otp'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'email': email,
          'otp': otp,
        }),
      );

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
}
