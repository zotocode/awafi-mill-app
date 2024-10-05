import 'package:flutter/material.dart';

class CustomizableTextFieldwidget extends StatelessWidget {
  final String labelText;
  final TextEditingController controller;

  const CustomizableTextFieldwidget(
      {super.key, required this.labelText, required this.controller});
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      style: TextStyle(color: Colors.white),
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
