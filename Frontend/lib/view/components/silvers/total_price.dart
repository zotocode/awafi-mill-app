import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class TotalPriceWidget extends StatelessWidget {
  final String text;
  final String price;

  const TotalPriceWidget({super.key, required this.text, required this.price});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 16, top: 16, right: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            text,
            style:
                GoogleFonts.mulish(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          Text(
            price,
            style:
                GoogleFonts.mulish(fontSize: 20, fontWeight: FontWeight.bold),
          )
        ],
      ),
    );
  }
}
