import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';

class CommonAppBarWidget extends StatelessWidget
    implements PreferredSizeWidget {
  final String text;

  const CommonAppBarWidget({super.key, required this.text});
  @override
  Widget build(BuildContext context) {
    return AppBar(
      centerTitle: true,
      leading: GestureDetector(
        onTap: () {
          Get.back();
        },
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            height: 40,
            width: 38,
            decoration: BoxDecoration(
                color: Colors.black, borderRadius: BorderRadius.circular(10)),
            child: Center(
                child: Icon(
              Icons.arrow_back,
              color: Colors.white,
            )),
          ),
        ),
      ),
      title: Text(
        text,
        style: GoogleFonts.mulish(fontWeight: FontWeight.bold, fontSize: 18),
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}
