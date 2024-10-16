import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:iconly/iconly.dart';

class AuthenticateSaveButton extends StatelessWidget {
  final String buttonText;
  final VoidCallback onpressed;
  final bool? isIcon;

  const AuthenticateSaveButton(
      {super.key,
      required this.buttonText,
      required this.onpressed,
      this.isIcon});
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
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            isIcon == true
                ? Icon(
                    IconlyLight.delete,
                    size: 20,
                    color: Colors.white,
                  )
                : SizedBox(),
            SizedBox(width: 10),
            Text(
              buttonText,
              style: GoogleFonts.mulish(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }
}
