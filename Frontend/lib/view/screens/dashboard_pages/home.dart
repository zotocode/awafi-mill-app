import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/components/silvers/colleciton_banner.dart';
import 'package:frondend/view/components/silvers/offer_banner.dart';
import 'package:frondend/view/components/silvers/prodouct.dart';
import 'package:frondend/view/components/silvers/welcome_banner.dart';
import 'package:frondend/view/screens/internal_pages/categories.dart';
import 'package:frondend/view/screens/internal_pages/home_search.dart';
import 'package:frondend/view/screens/internal_pages/notifications.dart';
import 'package:frondend/view/screens/onboarding_pages/login.dart';
import 'package:frondend/view_model/provider.dart/category.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:iconly/iconly.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ScrollController scrollController = ScrollController();
  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<CategoryProvider>(context, listen: false).fetchCategories();
    });
  }

  @override
  Widget build(BuildContext context) {
    final screenHieght = MediaQuery.of(context).size.height;
    return SafeArea(
      child: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: Scaffold(
            body: Padding(
          padding: EdgeInsets.only(top: 18, left: 12, bottom: 12, right: 12),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                      onTap: () {
                        Get.to(() => LoginScreen());
                      },
                      child: CircleAvatar(
                        maxRadius: 24,
                        child: Icon(
                          Icons.person,
                          size: 30,
                          color: Colors.white,
                        ),
                        backgroundColor: Colors.black,
                      ),
                    ),
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
                            onPressed: () {
                              Get.to(() => NotificationScreen());
                            },
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
                  readOnly: true,
                  onTap: () {
                    Get.to(() => HomeSearchScreen());
                  },
                  decoration: InputDecoration(
                      labelText: 'Search',
                      prefixIcon: Icon(IconlyLight.search,
                          size: 30, color: Style.themeColor),
                      focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                          borderSide:
                              BorderSide(color: Style.themeColor, width: 2)),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                          borderSide: BorderSide(color: Style.themeColor))),
                ),
                SizedBox(height: 16),
                WelcomeBannerSilver(height: screenHieght),
                Text(
                  'Top Categories',
                  style: GoogleFonts.mulish(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      letterSpacing: 1),
                ),
                SizedBox(height: 20),
                Consumer<CategoryProvider>(
                  builder: (context, categoryProvider, child) {
                    if (categoryProvider.isLoading) {
                      return Center(
                        child: CircularProgressIndicator(),
                      );
                    }
                    if (categoryProvider.categories.isEmpty) {
                      return Center(
                        child: Text('No categories found.'),
                      );
                    }
                    return SizedBox(
                      height: 250,
                      child: GridView.builder(
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: categoryProvider.categories.length,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 3,
                          crossAxisSpacing: 8,
                          mainAxisSpacing: 8,
                        ),
                        itemBuilder: (context, index) {
                          var data = categoryProvider.categories[index];
                          return InkWell(
                            onTap: () {
                              Get.to(() =>
                                  TopCategoriesScreen(appBarText: data.name));
                            },
                            child: Container(
                              height: 40,
                              width: 40,
                              decoration: BoxDecoration(
                                border: Border.all(width: 2),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Padding(
                                padding: const EdgeInsets.all(4.0),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  children: [
                                    // Use CachedNetworkImage for network images
                                    data.photo.startsWith('http')
                                        ? Container(
                                            width: double.infinity,
                                            height:
                                                80, // Adjust height as needed
                                            decoration: BoxDecoration(
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                              // You can add a border or color if needed
                                            ),
                                            child: ClipRRect(
                                              borderRadius: BorderRadius.circular(
                                                  10), // Ensure image fits within rounded corners
                                              child: CachedNetworkImage(
                                                imageUrl: data.photo,
                                                fit: BoxFit
                                                    .cover, // This ensures the image covers the container properly
                                                placeholder: (context, url) =>
                                                    Center(
                                                  child: SizedBox(
                                                    width:
                                                        40, // Set a fixed size for the CircularProgressIndicator
                                                    height: 40,
                                                    child:
                                                        CircularProgressIndicator(),
                                                  ),
                                                ),
                                                errorWidget:
                                                    (context, url, error) =>
                                                        Icon(
                                                  Icons.error,
                                                  size:
                                                      40, // Fixed size for error icon
                                                ),
                                              ),
                                            ),
                                          )

                                        // Use Image.asset for local asset images
                                        : Image.asset(
                                            data.photo,
                                            fit: BoxFit.cover,
                                            errorBuilder:
                                                (context, error, stackTrace) {
                                              return Icon(Icons
                                                  .error); // Show error icon if asset fails
                                            },
                                          ),
                                    SizedBox(height: 10),
                                    Flexible(
                                      child: Text(
                                        data.name,
                                        overflow: TextOverflow.ellipsis,
                                        style: GoogleFonts.mulish(
                                          fontSize: 10,
                                          fontWeight: FontWeight.bold,
                                        ),
                                        textAlign: TextAlign.center,
                                      ),
                                    )
                                  ],
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    );
                  },
                ),
                SizedBox(height: 16),
                OfferCarousalWidget(height: screenHieght),
                WelcomeBannerSilver(height: screenHieght),
                Padding(
                  padding: const EdgeInsets.only(left: 8, right: 12),
                  child: Row(
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
                ),
                SizedBox(height: 20),
                CollecitonBannerSilver(),
                SizedBox(height: 25),
                Padding(
                  padding: const EdgeInsets.only(left: 8, right: 8),
                  child: Row(
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
                ),
                SizedBox(height: 14),
                ProductScreen(),
              ],
            ),
          ),
        )),
      ),
    );
  }
}
