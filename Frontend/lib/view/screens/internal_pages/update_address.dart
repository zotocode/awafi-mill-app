import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/view/components/silvers/user_field.dart';
import 'package:frondend/view/components/widgets/common_appbar.dart';
import 'package:google_fonts/google_fonts.dart';

class UpdateAddressScreen extends StatelessWidget {
  const UpdateAddressScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBarWidget(
        text: Assigns.newAddress,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('House Name:'),
                SizedBox(height: 6),
                UserProfileFieldWidget(),
                SizedBox(height: 6),
                Text('House Number:'),
                SizedBox(height: 6),
                UserProfileFieldWidget(),
                SizedBox(height: 6),
                Text('Street:'),
                SizedBox(height: 6),
                UserProfileFieldWidget(),
                SizedBox(height: 6),
                Text('City:'),
                SizedBox(height: 6),
                UserProfileFieldWidget(),
                SizedBox(height: 6),
                Text('Pastal Code:'),
                SizedBox(height: 6),
                UserProfileFieldWidget(),
                SizedBox(height: 6),
                Text('Country:'),
                SizedBox(height: 6),
                UserProfileFieldWidget(),
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
                            style:
                                GoogleFonts.mulish(fontWeight: FontWeight.bold),
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
                          'Save Address',
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
          ),
        ),
      ),
    );
  }
}
