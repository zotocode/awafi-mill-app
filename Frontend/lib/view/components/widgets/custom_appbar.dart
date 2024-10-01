import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class customAppBarWidget extends StatelessWidget
    implements PreferredSizeWidget {
  final String text;
  final IconData icon;

  const customAppBarWidget({super.key, required this.text, required this.icon});
  @override
  Widget build(BuildContext context) {
    return AppBar(
      leading: Padding(
        padding: EdgeInsets.all(8.0),
        child: Container(
          height: 40,
          width: 36,
          decoration: BoxDecoration(
              color: Colors.black, borderRadius: BorderRadius.circular(6)),
          child: Center(
              child: Icon(
            Icons.arrow_back,
            color: Colors.white,
          )),
        ),
      ),
      centerTitle: true,
      title: Text(
        text,
        style: GoogleFonts.mulish(fontWeight: FontWeight.bold, fontSize: 18),
      ),
      actions: [
        Padding(
          padding: EdgeInsets.all(8.0),
          child: Container(
            height: 39,
            width: 38,
            decoration: BoxDecoration(
                color: Colors.black, borderRadius: BorderRadius.circular(6)),
            child: Center(
                child: Icon(
              icon,
              color: Colors.white,
            )),
          ),
        ),
        SizedBox(width: 10)
      ],
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}
