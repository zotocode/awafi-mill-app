import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/components/widgets/custom_appbar.dart';
import 'package:google_fonts/google_fonts.dart';

class WishlistScreen extends StatelessWidget {
  const WishlistScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    return SafeArea(
      child: Scaffold(
        appBar: customAppBarWidget(
          text: Assigns.wishlist,
          icon: CupertinoIcons.search,
          isWidget: true,
        ),
        body: ListView.builder(
          shrinkWrap: true,
          itemCount: 4,
          itemBuilder: (context, index) {
            return Padding(
              padding: const EdgeInsets.all(10.0),
              child: Container(
                height: screenHeight * (220 / screenHeight),
                width: double.infinity,
                decoration: BoxDecoration(
                    border: Border.all(width: 1.5),
                    borderRadius: BorderRadius.circular(10)),
                child: Column(
                  children: [
                    // Stack for the icon and the image
                    Expanded(
                      child: Stack(
                        children: [
                          Padding(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 12, vertical: 12),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                CircleAvatar(
                                  backgroundColor: Colors.black,
                                  maxRadius: 16,
                                  child: Icon(
                                    Icons.close,
                                    color: Colors.white,
                                    size: 20,
                                  ),
                                )
                              ],
                            ),
                          ),
                          Positioned(
                            top: 20,
                            right: 0,
                            left: 0,
                            child: Image.asset(
                              'assets/images/wishlist.png',
                              width: 100, // Adjust the size as needed
                              height: 72,
                            ),
                          ),
                        ],
                      ),
                    ),
                    // Second container for content
                    Expanded(
                      flex: 2,
                      child: Container(
                        child: Column(
                          children: [
                            Text(
                              'Available',
                              style: GoogleFonts.mulish(
                                  fontSize: 13, color: Colors.green),
                            ),
                            SizedBox(height: 8),
                            Text(
                              'kaka fruit Slice',
                              style: GoogleFonts.mulish(
                                  fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            SizedBox(height: 8),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.star,
                                    size: 12, color: Colors.yellow),
                                Icon(Icons.star,
                                    size: 12, color: Colors.yellow),
                                Icon(Icons.star,
                                    size: 12, color: Colors.yellow),
                                Icon(Icons.star,
                                    size: 12, color: Colors.yellow),
                                Icon(Icons.star, size: 12, color: Colors.grey),
                              ],
                            ),
                            SizedBox(height: 8),
                            Text(
                              '₹1,023.00 – ₹2,977.00',
                              style: GoogleFonts.mulish(
                                  fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            SizedBox(height: 8),
                            Container(
                              height: 24,
                              width: 85,
                              decoration: BoxDecoration(
                                  color: Style.themeColor,
                                  borderRadius: BorderRadius.circular(5)),
                              child: Center(
                                  child: Text(
                                'Add to Cart',
                                style: GoogleFonts.mulish(
                                    color: Colors.white, fontSize: 12),
                              )),
                            )
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
