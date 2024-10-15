import 'package:flutter/material.dart';
import 'package:frondend/view/components/widgets/custom_appbar.dart';
import 'package:frondend/view/components/widgets/prodoct.dart';
import 'package:iconly/iconly.dart';

class CollectionsScreen extends StatelessWidget {
  final String appBarText;

  const CollectionsScreen({super.key, required this.appBarText});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: customAppBarWidget(
          text: appBarText, icon: IconlyLight.search, isWidget: true),
      body: Padding(
        padding: EdgeInsets.all(12.0),
        child: productListWidget(),
      ),
    );
  }
}
