import 'package:flutter/material.dart';
import 'package:frondend/view/components/widgets/custom_appbar.dart';

class WishlistScreen extends StatelessWidget {
  const WishlistScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    return SafeArea(
      child: Scaffold(
        appBar: customAppBarWidget(
          text: 'Wishlist',
          icon: Icons.search,
        ),
        body: ListView.builder(
          shrinkWrap: true,
          itemCount: 4,
          itemBuilder: (context, index) {
            return Padding(
              padding: const EdgeInsets.all(10.0),
              child: Container(
                height: screenHeight * 0.3,
                width: double.infinity,
                decoration: BoxDecoration(
                    border: Border.all(width: 2),
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
                              'assets/images/wishlist.png', fit: BoxFit.contain,
                              width: 100, // Adjust the size as needed
                              height: 100,
                            ),
                          ),
                        ],
                      ),
                    ),
                    // Second container for content
                    Expanded(
                      flex: 2,
                      child: Container(),
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
