import 'package:flutter/material.dart';
import 'package:frondend/common/style.dart';
import 'package:google_fonts/google_fonts.dart';

class UserProfileFieldWidget extends StatelessWidget {
  const UserProfileFieldWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      width: double.infinity,
      decoration: BoxDecoration(
          color: Style.myColor,
          border: Border.all(),
          borderRadius: BorderRadius.circular(5)),
      child: Padding(
        padding: EdgeInsets.all(8.0),
        child: TextField(
          decoration: InputDecoration(
              border: InputBorder.none,
              labelText: 'Type here',
              labelStyle: GoogleFonts.mulish(fontSize: 12)),
        ),
      ),
    );
  }
}
