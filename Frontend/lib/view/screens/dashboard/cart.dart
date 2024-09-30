import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Padding(
          padding: EdgeInsets.all(8.0),
          child: Container(
            height: 40,
            width: 36,
            decoration: BoxDecoration(
                color: Colors.black, borderRadius: BorderRadius.circular(6)),
            child: Center(
                child: Icon(
              Icons.arrow_back,
              color: Colors.white,
            )),
          ),
        ),
        centerTitle: true,
        title: Text(
          'My Cart',
          style: GoogleFonts.mulish(fontWeight: FontWeight.bold),
        ),
        actions: [
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(6),
              color: Colors.black,
            ),
            height: 40,
            width: 36,
            child: Center(
              child: Icon(
                Icons.delete,
                color: Colors.white,
              ),
            ),
          ),
          SizedBox(width: 20)
        ],
      ),
      body: SizedBox(
        height: 600,
        child: ListView.builder(
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
                                image: AssetImage('assets/images/cart_one.png'),
                                fit: BoxFit.cover)),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
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
                                '(Holly Wood)',
                                textAlign: TextAlign.start,
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
      ),
    );
  }
}
