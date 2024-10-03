import 'package:flutter/material.dart';
import 'package:frondend/view/components/silvers/settings_menu.dart';
import 'package:google_fonts/google_fonts.dart';

class customAppBarWidget extends StatelessWidget
    implements PreferredSizeWidget {
  final String text;
  final IconData icon;
  final String? logout;
  final bool isWidget;

  const customAppBarWidget(
      {super.key,
      required this.text,
      required this.icon,
      this.logout,
      required this.isWidget});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      // toolbarHeight: 80, // Increase the height of the AppBar
      leading: Padding(
        padding: EdgeInsets.all(8.0),
        child: Column(
          children: [
            Container(
              height: 39,
              width: 38,
              decoration: BoxDecoration(
                  color: Colors.black, borderRadius: BorderRadius.circular(6)),
              child: Center(
                  child: Icon(
                Icons.arrow_back,
                color: Colors.white,
              )),
            ),
          ],
        ),
      ),
      centerTitle: true,
      title: Text(
        text,
        style: GoogleFonts.mulish(fontWeight: FontWeight.bold, fontSize: 18),
      ),
      actions: [
        isWidget == true
            ? Padding(
                padding: EdgeInsets.all(8.0),
                child: Column(
                  children: [
                    Container(
                      height: 39,
                      width: 38,
                      decoration: BoxDecoration(
                          color: Colors.black,
                          borderRadius: BorderRadius.circular(6)),
                      child: Center(
                          child: Icon(
                        icon,
                        color: Colors.white,
                      )),
                    ),
                    // Text(
                    //   logout ?? '',
                    //   style: GoogleFonts.mulish(
                    //       fontSize: 10, fontWeight: FontWeight.bold),
                    // )
                  ],
                ),
              )
            : MenuButtonWidget(),
        SizedBox(width: 10)
      ],
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}
