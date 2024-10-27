import 'package:flutter/material.dart';
import 'package:frondend/model/entities.dart/banners_model.dart';
import 'package:frondend/view/screens/internal_pages/collections.dart';
import 'package:frondend/view/shimmers/collection_banner_shimmer.dart';
import 'package:frondend/view_model/services.dart/banners.dart';
import 'package:get/get.dart';
import 'package:cached_network_image/cached_network_image.dart';

class CollecitonBannerSilver extends StatefulWidget {
  const CollecitonBannerSilver({super.key});

  @override
  State<CollecitonBannerSilver> createState() => _CollecitonBannerSilverState();
}

class _CollecitonBannerSilverState extends State<CollecitonBannerSilver> {
  late Future<List<BannerModel>> futureBanners;
  int currentIndex = 0;

  @override
  void initState() {
    super.initState();
    // Fetch the banners
    futureBanners = Banners.fetchCollectionBanners();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: futureBanners,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return BannerShimmer();
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return Center(child: Text('No banners available'));
        }

        // Extract the banner list from the snapshot
        final banners = snapshot.data!;
        return Padding(
          padding: const EdgeInsets.only(left: 8, right: 8),
          child: ConstrainedBox(
            constraints: BoxConstraints(
              maxHeight: 750, // Set maximum height
            ),
            child: SingleChildScrollView(
              child: ListView.builder(
                physics:
                    NeverScrollableScrollPhysics(), // Disable ListView scrolling
                shrinkWrap: true, // Shrink the ListView to fit its contents
                itemCount: banners.length,
                itemBuilder: (context, index) {
                  final banner = banners[index];
                  return Padding(
                    padding: const EdgeInsets.only(top: 16),
                    child: InkWell(
                      onTap: () {
                        Get.to(() => CollectionsScreen(
                              appBarText: banner.name,
                            ));
                      },
                      child: Container(
                        height: 160,
                        width: double.infinity,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(16),
                          child: Stack(
                            fit: StackFit.expand,
                            children: [
                              CachedNetworkImage(
                                imageUrl: banner
                                    .imageUrl, // Use imageUrl from BannerModel
                                fit: BoxFit.cover,
                                placeholder: (context, url) => Container(
                                  color: Colors.grey[200], // Placeholder color
                                  child: Center(
                                      child: CircularProgressIndicator()),
                                ),
                                errorWidget: (context, url, error) => Container(
                                  color: Colors
                                      .grey[200], // Error placeholder color
                                  child: Icon(Icons.error, color: Colors.red),
                                ),
                              ),
                              Container(
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                    begin: Alignment.bottomCenter,
                                    end: Alignment.topCenter,
                                    colors: [
                                      Colors.black.withOpacity(0.7),
                                      Colors.transparent,
                                    ],
                                  ),
                                  borderRadius: BorderRadius.circular(16),
                                ),
                                // Align the text to center-right
                                child: Align(
                                  alignment: Alignment.centerRight,
                                  child: Padding(
                                    padding: const EdgeInsets.all(
                                        16.0), // Add some padding
                                    child: Text(
                                      banner.name,
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        );
      },
    );
  }
}
