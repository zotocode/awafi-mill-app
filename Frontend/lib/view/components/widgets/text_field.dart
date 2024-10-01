import 'package:flutter/material.dart';

class CustomizableTextFieldwidget extends StatelessWidget {
  final String labelText;

  const CustomizableTextFieldwidget({super.key, required this.labelText});
  @override
  Widget build(BuildContext context) {
    return TextFormField(
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
