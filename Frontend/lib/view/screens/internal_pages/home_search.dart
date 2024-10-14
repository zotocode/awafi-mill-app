import 'package:flutter/material.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/components/widgets/common_appbar.dart';
import 'package:frondend/view/components/widgets/prodoct.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:iconly/iconly.dart';

class HomeSearchScreen extends StatefulWidget {
  const HomeSearchScreen({super.key});

  @override
  State<HomeSearchScreen> createState() => _HomeSearchScreenState();
}

class _HomeSearchScreenState extends State<HomeSearchScreen> {
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
                        InkWell(
                          onTap: () => buildBottomSheet(context),
                          child: Container(
                            height: 60,
                            width: double.infinity,
                            decoration: BoxDecoration(
                              color: Colors.black,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Icon(
                              Icons.filter_alt,
                              size: 35,
                              color: Colors.white,
                            ),
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
                          child: GestureDetector(
                            onTap: () => buildBottomSheet(context),
                            child: Container(
                              height: 60,
                              decoration: BoxDecoration(
                                color: Colors.black,
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Icon(
                                Icons.filter_alt,
                                size: 35,
                                color: Colors.white,
                              ),
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

  void buildBottomSheet(BuildContext context) {
    // State variables to manage checkbox states
    bool _isChecked1 = false;
    bool _isChecked2 = false;
    bool _isChecked3 = false;
    bool _isChecked4 = false;
    RangeValues currentRangeValues = RangeValues(20, 200);
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setState) {
            return Container(
              width: double.infinity,
              height: MediaQuery.of(context).size.height * 0.6,
              padding: EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Filters',
                        style: GoogleFonts.mulish(fontWeight: FontWeight.bold),
                      ),
                      Icon(Icons.filter_alt_outlined),
                    ],
                  ),
                  SizedBox(height: 20),
                  Divider(color: Colors.black, thickness: 1.5),
                  SizedBox(height: 20),
                  Row(
                    children: [Text('Price')],
                  ),
                  SizedBox(height: 10),
                  Text(
                    '${currentRangeValues.start.toInt()}AED - ${currentRangeValues.end.toInt()} AED',
                    style: GoogleFonts.mulish(
                        fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  RangeSlider(
                    values: currentRangeValues,
                    min: 20,
                    max: 200,
                    divisions: 18, // Optional: to control increments
                    onChanged: (RangeValues values) {
                      setState(() {
                        currentRangeValues = values;
                      });
                    },
                  ),
                  Row(
                    children: [
                      Checkbox(
                        value: _isChecked1,
                        onChanged: (bool? value) {
                          setState(() {
                            _isChecked1 = value ?? false;
                          });
                        },
                      ),
                      Text("Option 1"),
                    ],
                  ),
                  Row(
                    children: [
                      Checkbox(
                        value: _isChecked2,
                        onChanged: (bool? value) {
                          setState(() {
                            _isChecked2 = value ?? false;
                          });
                        },
                      ),
                      Text("Option 2"),
                    ],
                  ),
                  Row(
                    children: [
                      Checkbox(
                        value: _isChecked3,
                        onChanged: (bool? value) {
                          setState(() {
                            _isChecked3 = value ?? false;
                          });
                        },
                      ),
                      Text("Option 3"),
                    ],
                  ),
                  Row(
                    children: [
                      Checkbox(
                        value: _isChecked4,
                        onChanged: (bool? value) {
                          setState(() {
                            _isChecked4 = value ?? false;
                          });
                        },
                      ),
                      Text("Option 4"),
                    ],
                  ),
                  SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                          height: 45,
                          width: 160,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(width: 1.5),
                          ),
                          child: Center(
                            child: Text(
                              'Cancel',
                              style: GoogleFonts.mulish(
                                  fontWeight: FontWeight.bold),
                            ),
                          )),
                      SizedBox(width: 20),
                      Container(
                        height: 45,
                        width: 160,
                        decoration: BoxDecoration(
                            color: Colors.black,
                            borderRadius: BorderRadius.circular(10)),
                        child: Center(
                          child: Text(
                            'Apply',
                            style: GoogleFonts.mulish(
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ],
                  )
                ],
              ),
            );
          },
        );
      },
    );
  }
}
