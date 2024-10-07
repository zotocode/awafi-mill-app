import 'package:frondend/common/end_point.dart';
import 'package:frondend/model/entities.dart/user_credential.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// To register userCredential...!

class AuthService {
  final String apiUrl =
      'https://xg1xw7n6-3000.inc1.devtunnels.ms/api/user/register';

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
}
