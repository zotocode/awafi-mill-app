import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/model/entities.dart/banners_model.dart';
import 'package:frondend/view/shimmers/banners_shimmer.dart';
import 'package:frondend/view_model/services.dart/banners.dart';

class WelcomeBannerSilver extends StatefulWidget {
  final double height;

  const WelcomeBannerSilver({super.key, required this.height});

  @override
  State<WelcomeBannerSilver> createState() => _OfferCarousalWidgetState();
}

class _OfferCarousalWidgetState extends State<WelcomeBannerSilver> {
  int currentIndex = 0;
  late Future<List<BannerModel>> futureBanners;

  @override
  void initState() {
    super.initState();
    // Fetch the banners
    futureBanners = Banners.fetchWelcomeBanners();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 240,
      child: FutureBuilder<List<BannerModel>>(
        future: futureBanners,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return AllBannersShimmer(height: widget.height);
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('No banners available'));
          }

          // Extract the banner list from the snapshot
          final banners = snapshot.data!;

          return Column(
            children: [
              CarouselSlider.builder(
                itemCount: banners.length,
                itemBuilder: (context, index, realIndex) {
                  final banner = banners[index];
                  return Card(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10)),
                    elevation: 0,
                    child: Container(
                      width: double.infinity,
                      height: widget.height,
                      decoration: BoxDecoration(
                        color: Style.themeColor,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: CachedNetworkImage(
                          imageUrl: banner.imageUrl,
                          fit: BoxFit.cover,
                          placeholder: (context, url) =>
                              Center(child: CircularProgressIndicator()),
                          errorWidget: (context, url, error) =>
                              Icon(Icons.error),
                        ),
                      ),
                    ),
                  );
                },
                options: CarouselOptions(
                  autoPlay: true,
                  aspectRatio: 16 / 9,
                  onPageChanged: (index, reason) {
                    setState(() {
                      currentIndex = index;
                    });
                  },
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  banners.length,
                  (index) => Container(
                    height: 8,
                    width: 8,
                    margin: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: currentIndex == index
                          ? (Theme.of(context).brightness == Brightness.dark
                              ? Colors.white
                              : Colors.black)
                          : (Theme.of(context).brightness == Brightness.dark
                              ? Colors.white.withOpacity(0.4)
                              : Colors.black.withOpacity(0.4)),
                    ),
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
