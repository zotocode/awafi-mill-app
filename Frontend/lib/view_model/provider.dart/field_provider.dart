import 'package:flutter/material.dart';

class FieldProvider extends ChangeNotifier {
  bool _isField = false;
  String _email = '';
  String _password = '';
  bool get isField => _isField;
  String get email => _email;
  String get password => _password;

  void toggleField() {
    _isField = !_isField;
    notifyListeners();
  }

  void setEmail(String email) {
    _email = email;
    notifyListeners();
  }

  void setPassword(String password) {
    _password = password;
    notifyListeners();
  }
}
