import 'package:flutter/material.dart';
import 'package:frondend/view/components/widgets/custom_appbar.dart';
import 'package:frondend/view/components/widgets/sub_category.dart';

import 'package:iconly/iconly.dart';

class TopCategoriesScreen extends StatelessWidget {
  final String appBarText;
  final String mainCategoryId;

  const TopCategoriesScreen(
      {super.key, required this.appBarText, required this.mainCategoryId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: customAppBarWidget(
          text: appBarText.split(' ').map((char) {
            return char.isNotEmpty
                ? char[0].toUpperCase() + char.substring(1).toLowerCase()
                : '';
          }).join(' '),
          icon: IconlyLight.search,
          isWidget: true),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SubCategoryWidget(
              mainCategoryId: mainCategoryId,
              text: 'Incence wood',
            ),
            SubCategoryWidget(
              mainCategoryId: mainCategoryId,
              text: 'Smudge Stick',
            ),
            SubCategoryWidget(
              mainCategoryId: mainCategoryId,
              text: 'Benzoin',
            ),
          ],
        ),
      ),
    );
  }
}
