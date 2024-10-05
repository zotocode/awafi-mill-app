import 'package:flutter/material.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/screens/internal_pages/sub_category_view_all.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';

class SubCategoryWidget extends StatelessWidget {
  final String text;

  const SubCategoryWidget({
    super.key,
    required this.text,
  });
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Column(
        children: [
          InkWell(
            onTap: () {
              Get.to(() => SubCategoryViewAllScreen(appBarText: text));
            },
            child: Container(
              height: 60,
              width: double.infinity,
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Padding(
                padding: const EdgeInsets.only(left: 18, right: 18),
                child: Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        text,
                        style: GoogleFonts.mulish(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.w500),
                      ),
                      Container(
                        child: Row(
                          children: [
                            Text(
                              'View all',
                              style: GoogleFonts.mulish(
                                color: Colors.white,
                                fontSize: 16,
                              ),
                            ),
                            SizedBox(width: 10),
                            CircleAvatar(
                              maxRadius: 8,
                              backgroundColor: Colors.white,
                              child: IconButton(
                                  padding: EdgeInsets.zero,
                                  onPressed: () {},
                                  icon: Icon(
                                    Icons.arrow_forward,
                                    size: 14,
                                  )),
                            )
                          ],
                        ),
                      )
                    ],
                  ),
                ),
              ),
            ),
          ),
          SizedBox(height: 20),
          SizedBox(
            height: 315,
            width: double.infinity,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              shrinkWrap: true,
              itemCount: 10,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: Card(
                    child: Container(
                      width: 200,
                      decoration: BoxDecoration(
                          color: Style.myColor,
                          border: Border.all(),
                          borderRadius: BorderRadius.circular(10)),
                      child: Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(
                                top: 4, left: 4, right: 4),
                            child: Container(
                              height: 187,
                              width: double.infinity,
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.only(
                                      topLeft: Radius.circular(10),
                                      topRight: Radius.circular(10)),
                                  image: DecorationImage(
                                      image: AssetImage(
                                          'assets/images/sample_collection.png'),
                                      fit: BoxFit.cover)),
                              child: Padding(
                                padding: EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 12),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    Container(
                                      height: 38,
                                      width: 38,
                                      decoration: BoxDecoration(
                                        color: Colors.black,
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Stack(
                                        alignment: Alignment.center,
                                        children: [
                                          IconButton(
                                            onPressed: () {},
                                            icon: Icon(
                                              Icons.favorite,
                                              size: 22,
                                            ),
                                            color: Colors.white,
                                          ),
                                        ],
                                      ),
                                    )
                                  ],
                                ),
                              ),
                            ),
                          ),
                          Expanded(
                              child: Container(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                Text(
                                  'Palo Santo Sticks',
                                  style: GoogleFonts.mulish(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 16,
                                      letterSpacing: 1),
                                ),
                                Text(
                                  '(Holy Wood)',
                                  style: GoogleFonts.mulish(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 15,
                                      letterSpacing: 1),
                                ),
                                Text(
                                  '₹932.00-₹4,635.00',
                                  style: GoogleFonts.mulish(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 15,
                                      letterSpacing: 1),
                                ),
                                SizedBox(height: 6),
                                Container(
                                  height: 30,
                                  width: 120,
                                  decoration: BoxDecoration(
                                      color: Colors.black,
                                      borderRadius: BorderRadius.circular(4)),
                                  child: Center(
                                    child: Text(
                                      'View Prodoct',
                                      style: GoogleFonts.mulish(
                                          color: Colors.white,
                                          fontWeight: FontWeight.w500,
                                          fontSize: 14,
                                          letterSpacing: 1),
                                    ),
                                  ),
                                ),
                                SizedBox(height: 10)
                              ],
                            ),
                          )),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
