import 'package:flutter/material.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/components/widgets/common_appbar.dart';
import 'package:frondend/view/components/widgets/prodoct.dart';
import 'package:iconly/iconly.dart';

class HomeSearchScreen extends StatelessWidget {
  const HomeSearchScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: CommonAppBarWidget(text: 'Search'),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(12.0),
          child: Column(
            children: [
              LayoutBuilder(
                builder: (context, constraints) {
                  // Responsive logic based on width
                  if (screenWidth > 600) {
                    return Column(
                      children: [
                        Container(
                          height: 60,
                          decoration: BoxDecoration(
                            color: Style.myColor,
                            border: Border.all(color: Style.themeColor),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: TextField(
                              decoration: InputDecoration(
                                prefixIcon: Icon(
                                  IconlyLight.search,
                                  size: 30,
                                ),
                                border: InputBorder.none,
                                hintText: 'Search',
                              ),
                            ),
                          ),
                        ),
                        SizedBox(height: 20),
                        Container(
                          height: 60,
                          width: double.infinity,
                          decoration: BoxDecoration(
                            color: Colors.black,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Icon(
                            Icons.filter_alt,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    );
                  } else {
                    return Row(
                      children: [
                        Expanded(
                          flex: 5,
                          child: Container(
                            height: 60,
                            decoration: BoxDecoration(
                              color: Style.myColor,
                              border: Border.all(color: Style.themeColor),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextField(
                                decoration: InputDecoration(
                                  prefixIcon: Icon(
                                    IconlyLight.search,
                                    size: 30,
                                  ),
                                  border: InputBorder.none,
                                  hintText: 'Search',
                                ),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(width: 20),
                        Expanded(
                          child: Container(
                            height: 60,
                            decoration: BoxDecoration(
                              color: Colors.black,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Icon(
                              Icons.filter_alt,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ],
                    );
                  }
                },
              ),
              SizedBox(height: 40),
              productListWidget()
            ],
          ),
        ),
      ),
    );
  }
}
