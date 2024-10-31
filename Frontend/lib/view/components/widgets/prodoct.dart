import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class productListWidget extends StatelessWidget {
  final String? image;
  final String? title;
  final String? subTitle;
  final String? price;
  final VoidCallback? onpressed;

  const productListWidget(
      {super.key,
      this.image,
      this.title,
      this.subTitle,
      this.price,
      this.onpressed});
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: GridView.builder(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2, // Number of columns in grid
          crossAxisSpacing: 8, // Horizontal space between items
          mainAxisSpacing: 8, // Vertical space between items
          childAspectRatio: 0.6, // Aspect ratio for each item (height / width)
        ),
        physics:
            NeverScrollableScrollPhysics(), // Prevent scrolling inside GridView
        shrinkWrap: true, // Shrink to the height of its children
        itemCount: 10,
        itemBuilder: (context, index) {
          return Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            child: Stack(
              children: [
                // Product image and details
                Column(
                  children: [
                    // Product image container
                    ClipRRect(
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(10),
                        topRight: Radius.circular(10),
                      ),
                      child: AspectRatio(
                        aspectRatio: 1.1, // Controls the height of the image
                        child: CachedNetworkImage(
                          imageUrl: image ?? '',
                          placeholder: (context, url) =>
                              CircularProgressIndicator(),
                          errorWidget: (context, url, error) =>
                              Icon(Icons.error),
                        ),
                      ),
                    ),

                    // Product details
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Column(
                        // crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Product title
                          Text(
                            title ?? '',
                            style: GoogleFonts.mulish(
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                              letterSpacing: 0.5,
                            ),
                          ),

                          // Product subtitle
                          Text(
                            subTitle ?? '',
                            style: GoogleFonts.mulish(
                              fontWeight: FontWeight.w500,
                              fontSize: 14,
                              color: Colors.grey.shade700,
                            ),
                          ),

                          // Price
                          Text(
                            price ?? '',
                            style: GoogleFonts.mulish(
                              fontWeight: FontWeight.w500,
                              fontSize: 14,
                              color: Colors.black87,
                            ),
                          ),

                          SizedBox(height: 8),

                          // View product button
                          GestureDetector(
                            onTap: onpressed,
                            child: Container(
                              height: 30,
                              width: double.infinity,
                              decoration: BoxDecoration(
                                color: Colors.black,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Center(
                                child: Text(
                                  'View Product',
                                  style: GoogleFonts.mulish(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w500,
                                    fontSize: 14,
                                    letterSpacing: 0.5,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),

                // Favorite Icon in the top-right corner
                Positioned(
                  top: 10,
                  right: 10,
                  child: Container(
                    height: 40,
                    width: 40,
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.6),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: IconButton(
                      icon: Icon(Icons.favorite_border),
                      color: Colors.white,
                      onPressed: () {
                        // Add your favorite button functionality here
                      },
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
