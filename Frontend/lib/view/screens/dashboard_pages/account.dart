import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/components/widgets/custom_appbar.dart';
import 'package:google_fonts/google_fonts.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
        appBar: customAppBarWidget(
          text: Assigns.accountHeadLine,
          icon: Icons.logout,
          logout: Assigns.logout,
          isWidget: false,
        ),
        body: ConstrainedBox(
          constraints: BoxConstraints(maxHeight: screenHeight),
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                SizedBox(
                  height: screenHeight * (30 / screenHeight),
                ),
                Expanded(
                  child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: Assigns.settings.length,
                      itemBuilder: (context, index) {
                        var data = Assigns.settings[index];
                        return Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: InkWell(
                            onTap: data['onTap'],
                            child: Container(
                              height: screenHeight * (60 / screenHeight),
                              width: double.infinity,
                              decoration: BoxDecoration(
                                  color: Style.myColor,
                                  borderRadius: BorderRadius.circular(12)),
                              child: ListTile(
                                leading: Icon(
                                  data['icon'] as IconData,
                                ),
                                title: Row(
                                  children: [
                                    SizedBox(
                                      width: 30,
                                    ),
                                    Text(
                                      data['text'],
                                      style: GoogleFonts.mulish(
                                          fontSize: 14,
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ],
                                ),
                                trailing: Icon(CupertinoIcons.forward),
                              ),
                            ),
                          ),
                        );
                      }),
                ),
              ],
            ),
          ),
        ));
  }
}
