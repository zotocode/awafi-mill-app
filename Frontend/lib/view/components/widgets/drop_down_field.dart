import 'package:flutter/material.dart';
import 'package:intl_phone_field/intl_phone_field.dart';

class CountryCodeTextField extends StatelessWidget {
  final String labelText;

  const CountryCodeTextField({super.key, required this.labelText});
  @override
  Widget build(BuildContext context) {
    return IntlPhoneField(
      style: TextStyle(color: Colors.white),
      dropdownTextStyle: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        labelText: labelText,
        labelStyle: TextStyle(color: Colors.white60),
        border: OutlineInputBorder(
          borderSide: BorderSide(width: 12, style: BorderStyle.solid),
          borderRadius: BorderRadius.circular(16),
        ),
      ),
    );
  }
}
