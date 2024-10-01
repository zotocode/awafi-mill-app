import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/common/style.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:iconly/iconly.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: Scaffold(
            body: Padding(
          padding:
              const EdgeInsets.only(top: 18, left: 12, bottom: 12, right: 12),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Image.asset(
                      Assigns.appNameSmall,
                    ),
                    Container(
                      height: 40,
                      width: 40,
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
                              CupertinoIcons.bell,
                              size: 25,
                            ),
                            color: Colors.white,
                          ),
                          Positioned(
                            top: 5,
                            right: 5,
                            child: Badge.count(
                              count: 10,
                              smallSize: 12, // Adjust the badge size if needed
                            ),
                          ),
                        ],
                      ),
                    )
                  ],
                ),
                SizedBox(height: 20),
                TextFormField(
                  decoration: InputDecoration(
                      labelText: 'Search',
                      prefixIcon: Icon(IconlyLight.search,
                          size: 30, color: Style.themeColor),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                          borderSide: BorderSide(color: Style.themeColor))),
                ),
                SizedBox(height: 16),
                Card(
                  elevation: 0,
                  child: Container(
                    width: double.infinity,
                    height: 180,
                    decoration: BoxDecoration(
                        color: Style.themeColor,
                        borderRadius: BorderRadius.circular(30),
                        border: Border.all(color: Style.themeColor),
                        image: DecorationImage(
                            image: AssetImage('assets/images/Rectangle 34.png'),
                            fit: BoxFit.cover)),
                  ),
                ),
                SizedBox(height: 20),
                Text(
                  'Top Categories',
                  style: GoogleFonts.mulish(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      letterSpacing: 1),
                ),
                SizedBox(height: 20),
                SizedBox(
                  height: 250,
                  child: GridView.builder(
                      physics: NeverScrollableScrollPhysics(),
                      itemCount: Assigns.categories.length,
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 3,
                          crossAxisSpacing: 8,
                          mainAxisSpacing: 8),
                      itemBuilder: (context, index) {
                        var data = Assigns.categories[index];
                        return Container(
                          height: 40,
                          width: 40,
                          decoration: BoxDecoration(
                              border: Border.all(width: 2),
                              borderRadius: BorderRadius.circular(20)),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                Image.asset(
                                  data['image'],
                                ),
                                SizedBox(height: 10),
                                Flexible(
                                  child: Text(
                                    data['text'],
                                    style: GoogleFonts.mulish(
                                        fontSize: 10,
                                        fontWeight: FontWeight.bold),
                                    textAlign: TextAlign.center,
                                  ),
                                )
                              ],
                            ),
                          ),
                        );
                      }),
                ),
                SizedBox(height: 20),
                Card(
                  elevation: 0,
                  child: Container(
                    width: double.infinity,
                    height: 140,
                    decoration: BoxDecoration(
                        color: Style.themeColor,
                        borderRadius: BorderRadius.circular(25),
                        image: DecorationImage(
                            image: AssetImage('assets/images/offer.png'),
                            fit: BoxFit.cover)),
                  ),
                ),
                SizedBox(height: 20),
                Card(
                  elevation: 0,
                  child: Container(
                    width: double.infinity,
                    height: 180,
                    decoration: BoxDecoration(
                        color: Style.themeColor,
                        borderRadius: BorderRadius.circular(30),
                        border: Border.all(color: Style.themeColor),
                        image: DecorationImage(
                            image: AssetImage(
                                'assets/images/Rectangle 34 (1).png'),
                            fit: BoxFit.fill)),
                  ),
                ),
                SizedBox(height: 25),
                Row(
                  children: [
                    Text(
                      'Collections',
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1),
                    ),
                    SizedBox(width: 10),
                    Expanded(
                      child: Divider(
                        color: Colors.black,
                        thickness: 1,
                        height: 20,
                      ),
                    ),
                  ],
                ),
                SizedBox(
                  height: 800,
                  child: ListView.builder(
                      physics: NeverScrollableScrollPhysics(),
                      itemCount: Assigns.collections.length,
                      itemBuilder: (context, index) {
                        var collection = Assigns.collections[index];
                        return Padding(
                          padding: const EdgeInsets.only(top: 24),
                          child: Card(
                            elevation: 0,
                            child: Container(
                              height: 160,
                              width: double.infinity,
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(16),
                                  image: DecorationImage(
                                      image: AssetImage(collection['image']),
                                      fit: BoxFit.cover)),
                              child: Container(
                                width: double.infinity,
                                height: double.infinity,
                                decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                        begin: Alignment.centerLeft,
                                        end: Alignment.centerRight,
                                        colors: [
                                      Colors.black.withOpacity(0.1),
                                      Colors.black.withOpacity(0.8),
                                    ])),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Text(
                                      collection['text'],
                                      style: GoogleFonts.mulish(
                                          color: Colors.white,
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold),
                                    ),
                                    SizedBox(width: 30),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        );
                      }),
                ),
                Row(
                  children: [
                    Text(
                      'Incense Collections',
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1),
                    ),
                    SizedBox(width: 10),
                    Expanded(
                      child: Divider(
                        color: Colors.black,
                        thickness: 1,
                        height: 20,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 20),
                SingleChildScrollView(
                  child: ListView.builder(
                    physics: NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: 10,
                    itemBuilder: (context, index) {
                      return Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Card(
                          child: Container(
                            height: 400,
                            width: double.infinity,
                            decoration: BoxDecoration(
                                border: Border.all(),
                                borderRadius: BorderRadius.circular(10)),
                            child: Column(
                              children: [
                                Expanded(
                                  flex: 2,
                                  child: Container(
                                    width: double.infinity,
                                    decoration: BoxDecoration(
                                        image: DecorationImage(
                                            image: AssetImage(
                                                'assets/images/sample_collection.png'),
                                            fit: BoxFit.cover)),
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 8, vertical: 12),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.end,
                                        children: [
                                          Container(
                                            height: 40,
                                            width: 40,
                                            decoration: BoxDecoration(
                                              color: Colors.black,
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                            ),
                                            child: Stack(
                                              alignment: Alignment.center,
                                              children: [
                                                IconButton(
                                                  onPressed: () {},
                                                  icon: Icon(
                                                    Icons.favorite,
                                                    size: 25,
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
                                    flex: 1,
                                    child: Container(
                                      child: Column(
                                        children: [
                                          Text(
                                            'Palo Santo Sticks',
                                            style: GoogleFonts.mulish(
                                                fontWeight: FontWeight.bold,
                                                fontSize: 18,
                                                letterSpacing: 1),
                                          ),
                                          Text(
                                            '(Holy Wood)',
                                            style: GoogleFonts.mulish(
                                                fontWeight: FontWeight.w500,
                                                fontSize: 18,
                                                letterSpacing: 1),
                                          ),
                                          Text(
                                            '₹932.00-₹4,635.00',
                                            style: GoogleFonts.mulish(
                                                fontWeight: FontWeight.w500,
                                                fontSize: 18,
                                                letterSpacing: 1),
                                          ),
                                          Container(
                                            height: 40,
                                            width: 150,
                                            decoration: BoxDecoration(
                                                color: Colors.black,
                                                borderRadius:
                                                    BorderRadius.circular(8)),
                                            child: Center(
                                              child: Text(
                                                'View Prodoct',
                                                style: GoogleFonts.mulish(
                                                    color: Colors.white,
                                                    fontWeight: FontWeight.w500,
                                                    fontSize: 18,
                                                    letterSpacing: 1),
                                              ),
                                            ),
                                          )
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
                )
              ],
            ),
          ),
        )),
      ),
    );
  }
}
