import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/components/widgets/common_appbar.dart';
import 'package:google_fonts/google_fonts.dart';

class NotificationScreen extends StatelessWidget {
  const NotificationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenHieht = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: CommonAppBarWidget(text: Assigns.notification),
      body: ListView.builder(
          shrinkWrap: true,
          itemCount: 5,
          itemBuilder: (context, index) {
            return Padding(
              padding: EdgeInsets.all(12.0),
              child: Container(
                height: screenHieht * (110 / screenHieht),
                width: double.infinity,
                decoration: BoxDecoration(
                    color: Style.myColor,
                    borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(10),
                        topRight: Radius.circular(10),
                        bottomRight: Radius.circular(10))),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Container(
                    height: double.infinity,
                    width: double.infinity,
                    child: Row(
                      children: [
                        Container(
                          height: double.infinity,
                          width: 90,
                          decoration: BoxDecoration(
                              image: DecorationImage(
                                  image: AssetImage(
                                      'assets/images/notification_image.png'),
                                  fit: BoxFit.contain)),
                        ),
                        SizedBox(
                          width: 20,
                        ),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Flexible(
                                  child: Text(
                                'Order ID: #54565451234',
                                style: GoogleFonts.mulish(
                                    fontSize: 13, fontWeight: FontWeight.bold),
                              )),
                              SizedBox(height: 6),
                              Text(
                                'Lorem ipsum dolor sit amet consectetur.Quam leo mattis a ipsum quisque ante nisl purus fames.',
                                maxLines: 3,
                                style: GoogleFonts.mulish(fontSize: 13),
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              ),
            );
          }),
    );
  }
}
