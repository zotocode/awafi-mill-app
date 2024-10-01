import 'package:flutter/material.dart';
import 'package:frondend/view/components/silvers/total_price.dart';
import 'package:frondend/view/components/widgets/auth_button.dart';
import 'package:frondend/view/components/widgets/custom_appbar.dart';
import 'package:google_fonts/google_fonts.dart';

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: customAppBarWidget(
          text: 'My Cart',
          icon: Icons.delete,
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              ListView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                itemCount: 2,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(
                      height: 150,
                      width: double.infinity,
                      decoration: BoxDecoration(
                          color: Colors.grey,
                          borderRadius: BorderRadius.circular(10)),
                      child: Row(
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(
                                left: 12, top: 8, bottom: 8, right: 8),
                            child: Container(
                              width: 140,
                              height: double.infinity,
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(4),
                                  image: DecorationImage(
                                      image: AssetImage(
                                          'assets/images/cart_one.png'),
                                      fit: BoxFit.cover)),
                            ),
                          ),
                          Expanded(
                            child: Container(
                              child: Padding(
                                padding: EdgeInsets.all(8.0),
                                child: Column(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Text(
                                              'Palo Santo Sticks',
                                              style: GoogleFonts.mulish(
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                            CircleAvatar(
                                              backgroundColor: Colors.white60,
                                              maxRadius: 16,
                                              child: Icon(Icons.close),
                                            )
                                          ],
                                        ),
                                        Text(
                                          '(Holly Wood)',
                                          textAlign: TextAlign.start,
                                        ),
                                        Text(
                                          '10 ml',
                                          textAlign: TextAlign.start,
                                        ),
                                      ],
                                    ),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          '₹7,446.00',
                                          style: GoogleFonts.mulish(
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                        Container(
                                          height: 25,
                                          width: 60,
                                          decoration: BoxDecoration(
                                            color: Colors.black,
                                            borderRadius:
                                                BorderRadius.circular(6),
                                          ),
                                          child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceEvenly,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: [
                                              Expanded(
                                                child: IconButton(
                                                  padding: EdgeInsets.zero,
                                                  onPressed: () {},
                                                  icon: Icon(
                                                    Icons.remove,
                                                    size: 9,
                                                    color: Colors.white,
                                                  ),
                                                ),
                                              ),
                                              Text(
                                                '2',
                                                style: GoogleFonts.mulish(
                                                  color: Colors.white,
                                                  fontSize: 12,
                                                ),
                                              ),
                                              Expanded(
                                                child: IconButton(
                                                  padding: EdgeInsets.zero,
                                                  onPressed: () {},
                                                  icon: Icon(
                                                    Icons.add,
                                                    size: 9,
                                                    color: Colors.white,
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        )
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          )
                        ],
                      ),
                    ),
                  );
                },
              ),
              Padding(
                padding: const EdgeInsets.all(14.0),
                child: Row(
                  children: [
                    Container(
                      width: 200,
                      height: 46,
                      decoration: BoxDecoration(
                          border: Border.all(),
                          borderRadius: BorderRadius.circular(10)),
                      child: Padding(
                        padding: const EdgeInsets.only(left: 8),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text(
                              'Coupon Code',
                              style: GoogleFonts.mulish(
                                fontSize: 10,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(width: 20),
                    Expanded(
                      child: Container(
                        height: 46,
                        decoration: BoxDecoration(
                            color: Colors.black,
                            border: Border.all(),
                            borderRadius: BorderRadius.circular(10)),
                        child: Center(
                          child: Text(
                            'APPLY COUPON',
                            style: GoogleFonts.mulish(
                              fontSize: 12,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              TotalPriceWidget(text: 'Subtotal', price: '₹9,810.00'),
              TotalPriceWidget(text: 'Shipping', price: '₹560.00'),
              TotalPriceWidget(text: 'Total', price: '₹10,370.00 INR'),
            ],
          ),
        ),
        bottomNavigationBar: Padding(
          padding: EdgeInsets.only(left: 26, right: 26),
          child: Container(
            height: 80,
            padding: EdgeInsets.only(bottom: 12),
            child: Center(
              child: AuthenticateSaveButton(
                buttonText: 'PROCEED TO CHECKOUT',
                onpressed: () {},
              ),
            ),
          ),
        ),
      ),
    );
  }
}
