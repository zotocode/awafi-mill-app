import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AuthenticateSaveButton extends StatelessWidget {
  final String buttonText;
  final VoidCallback onpressed;

  const AuthenticateSaveButton(
      {super.key, required this.buttonText, required this.onpressed});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 60,
      decoration: BoxDecoration(
        color: Color(0xFF414851),
        borderRadius: BorderRadius.circular(16),
      ),
      child: ElevatedButton(
        onPressed: onpressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
        ),
        child: Text(
          buttonText,
          style: GoogleFonts.mulish(
              color: Colors.white, fontSize: 24, fontWeight: FontWeight.w400),
        ),
      ),
    );
  }
}
