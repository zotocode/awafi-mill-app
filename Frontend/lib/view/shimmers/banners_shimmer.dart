import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class AllBannersShimmer extends StatelessWidget {
  final double height;

  const AllBannersShimmer({super.key, required this.height});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: 5, // Placeholder count
      itemBuilder: (context, index) {
        return Shimmer.fromColors(
          baseColor: Colors.white24,
          highlightColor: Colors.white,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              width: 200.0, // Set a fixed width for each banner
              height: height,
              decoration: BoxDecoration(
                color: Colors.white, // Placeholder color
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ),
        );
      },
    );
  }
}
