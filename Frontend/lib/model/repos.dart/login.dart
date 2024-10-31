import 'package:flutter/material.dart';
import 'package:frondend/model/entities.dart/login.dart';
import 'package:frondend/view/screens/dashboard_pages/bottom.dart';
import 'package:frondend/view_model/services.dart/user_credential.dart';
import 'package:get/get.dart';

void LoginStatus(
  TextEditingController email,
  TextEditingController password,
) async {
  String emaiField = email.text;
  String passwordField = password.text;
  AuthService authService = AuthService();
  LoginRequest loginRequest =
      LoginRequest(email: emaiField, password: passwordField);
  bool isSuccess = await authService.loginUser(loginRequest);
  if (isSuccess) {
    Get.to(() => BottomScreen());
  }
}
