import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/components/widgets/auth_button.dart';
import 'package:frondend/view/screens/dashboard_pages/cart.dart';
import 'package:frondend/view_model/provider.dart/quantity.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class ProductDetailsScreen extends StatefulWidget {
  const ProductDetailsScreen({super.key});

  @override
  State<ProductDetailsScreen> createState() => _ProductDetailsScreenState();
}

class _ProductDetailsScreenState extends State<ProductDetailsScreen> {
  int currentIndex = 0;
  bool isExpand = false;
  bool isChange = false;
  void toglleChange() {
    setState(() {
      isChange = !isChange;
    });
    if (!isChange) {
      Get.to(() => CartScreen());
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.white,
        body: SingleChildScrollView(
          child: Column(
            children: [
              CarouselSlider.builder(
                itemCount: 3,
                itemBuilder: (context, index, realIndex) {
                  return Container(
                    width: double.infinity, // Ensure it takes the full width
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage(
                            'assets/images/product_detail_image.png'),
                        fit: BoxFit.cover,
                      ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Padding(
                          padding: EdgeInsets.symmetric(
                              horizontal: 12, vertical: 12),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                height: 39,
                                width: 38,
                                decoration: BoxDecoration(
                                  color: Colors.black,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Center(
                                  child: IconButton(
                                      onPressed: () {
                                        Get.back();
                                      },
                                      padding: EdgeInsets.zero,
                                      icon: Icon(
                                        Icons.arrow_back,
                                        color: Colors.white,
                                      )),
                                ),
                              ),
                              Container(
                                height: 39,
                                width: 38,
                                decoration: BoxDecoration(
                                  color: Colors.black,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Center(
                                  child: Icon(
                                    CupertinoIcons.delete,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.symmetric(
                              horizontal: 12, vertical: 18),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(),
                              Row(
                                children: List.generate(
                                  3,
                                  (index) => Container(
                                    margin: EdgeInsets.symmetric(
                                        vertical: 4, horizontal: 4),
                                    decoration: BoxDecoration(
                                        border: currentIndex == index
                                            ? Border.all(
                                                color: Colors.white, width: 1.5)
                                            : null,
                                        shape: BoxShape.circle),
                                    child: Container(
                                      margin: EdgeInsets.symmetric(
                                          vertical: 8, horizontal: 4),
                                      height: 6,
                                      width: 6,
                                      decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          color: Colors.white),
                                    ),
                                  ),
                                ),
                              ),
                              Container(
                                height: 39,
                                width: 38,
                                decoration: BoxDecoration(
                                  color: Colors.black,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Center(
                                  child: IconButton(
                                    padding: EdgeInsets.zero,
                                    onPressed: () {},
                                    icon: const Icon(
                                      Icons.favorite_outline,
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
                options: CarouselOptions(
                  onPageChanged: (index, reason) {
                    setState(() {
                      currentIndex = index;
                    });
                  },
                  height: 459, // Adjust height if needed
                  aspectRatio: 16 / 9,
                  viewportFraction:
                      1.0, // Ensure each slide takes the full width
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'India Sandalwood Chips',
                          style: GoogleFonts.mulish(
                              fontWeight: FontWeight.bold, fontSize: 22),
                        ),
                        Container(
                          height: 30,
                          width: 70,
                          decoration: BoxDecoration(
                            color: Colors.black,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Expanded(
                                child: IconButton(
                                  padding: EdgeInsets.zero,
                                  onPressed: () {
                                    context.read<ProductQuantity>().decrement();
                                  },
                                  icon: Icon(
                                    Icons.remove,
                                    size: 10,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                              Text(
                                context
                                    .watch<ProductQuantity>()
                                    .quantity
                                    .toString(),
                                style: GoogleFonts.mulish(
                                  color: Colors.white,
                                  fontSize: 14,
                                ),
                              ),
                              Expanded(
                                child: IconButton(
                                  padding: EdgeInsets.zero,
                                  onPressed: () {
                                    context.read<ProductQuantity>().increment();
                                  },
                                  icon: Icon(
                                    Icons.add,
                                    size: 10,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    Text(
                      '(Santalum album)',
                      style: GoogleFonts.mulish(fontSize: 20),
                    ),
                    SizedBox(height: 10),
                    Container(
                      height: 25,
                      width: 60,
                      decoration: BoxDecoration(
                        color: Colors.black,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Center(
                          child: Text(
                        '5 in stock',
                        style: GoogleFonts.mulish(
                            color: Colors.white, fontSize: 10),
                      )),
                    ),
                    SizedBox(height: 8),
                    Row(
                      children: [
                        Text(
                          'rating:',
                          style:
                              GoogleFonts.mulish(fontWeight: FontWeight.w500),
                        ),
                        ...List.generate(
                          5,
                          (index) => Icon(Icons.star,
                              color: index == 3 || index == 4
                                  ? Colors.grey
                                  : Colors.yellow),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    Row(
                      children: [
                        Text(
                          'Weight:',
                          style:
                              GoogleFonts.mulish(fontWeight: FontWeight.w500),
                        ),
                        SizedBox(
                          height: 24,
                          width: 320,
                          child: ListView.builder(
                              scrollDirection: Axis.horizontal,
                              shrinkWrap: true,
                              itemCount: 5,
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: const EdgeInsets.only(left: 6),
                                  child: Container(
                                    width: 57,
                                    decoration: BoxDecoration(
                                        border: Border.all(),
                                        borderRadius: BorderRadius.circular(4)),
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 2, vertical: 2),
                                      child: Center(
                                          child: Text(
                                        '50 grams',
                                        style: GoogleFonts.mulish(
                                            fontSize: 10,
                                            fontWeight: FontWeight.bold),
                                      )),
                                    ),
                                  ),
                                );
                              }),
                        )
                      ],
                    ),
                    SizedBox(height: 8),
                    Text(
                      '₹2,930.00',
                      style: GoogleFonts.mulish(
                          fontSize: 20, fontWeight: FontWeight.w900),
                    ),
                    SizedBox(height: 10),
                    isExpand == false
                        ? Stack(
                            children: [
                              // This is the description text.
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Awafi Mill brings you the finest Palo Santo Smudging Sticks from the mystical lands of Peru. '
                                    'Sustainably harvested and hand-picked, our Palo Santo sticks are a testament to our commitment to quality '
                                    'and ethical practices. Immerse yourself in the pure and sweet aroma of Palo Santo, known for its calming '
                                    'and grounding properties. Each stick is carefully selected to ensure a premium smudging experience, making '
                                    'it perfect for spiritual rituals, meditation, or simply creating a serene atmosphere in your space. Elevate '
                                    'your spiritual journey with Awafi Mill Palo Santo Smudging Sticks – where tradition meets quality for a truly '
                                    'enriching experience.',
                                    overflow: TextOverflow.ellipsis,
                                    maxLines: 7,
                                  ),
                                ],
                              ),

                              Positioned(
                                bottom: 0,
                                left: 0,
                                right: 0,
                                top: 45,
                                child: Container(
                                  color: Colors.white70,
                                  child: Column(
                                    children: [
                                      GestureDetector(
                                        onTap: () {
                                          setState(() {
                                            isExpand = !isExpand;
                                          });
                                        },
                                        child: Container(
                                          height: 24,
                                          width: 73,
                                          decoration: BoxDecoration(
                                            color: Style.themeColor,
                                            border: Border.all(),
                                            borderRadius:
                                                BorderRadius.circular(4),
                                          ),
                                          child: Center(
                                            child: Padding(
                                              padding:
                                                  const EdgeInsets.symmetric(
                                                horizontal: 2,
                                                vertical: 2,
                                              ),
                                              child: Text(
                                                'Read More',
                                                style: GoogleFonts.mulish(
                                                  color: Colors.white,
                                                  fontSize: 10,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.only(
                                            left: 12, right: 12, top: 8),
                                        child: AuthenticateSaveButton(
                                          isIcon: true,
                                          buttonText: isChange
                                              ? 'View Cart'
                                              : 'Add Cart',
                                          onpressed: () {
                                            toglleChange();
                                          },
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          )
                        : Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Description',
                                style: GoogleFonts.mulish(
                                    fontWeight: FontWeight.w700, fontSize: 14),
                              ),
                              SizedBox(height: 10),
                              Text(
                                  'Awafi Mill brings you the finest Palo Santo Smudging Sticks from the mystical lands of Peru. Sustainably harvested and hand-picked, our Palo Santo sticks are a testament to our commitment to quality and ethical practices.Immerse yourself in the pure and sweet aroma of Palo Santo, known for its calming and grounding properties. Each stick is carefully selected to ensure a premium smudging experience, making it perfect for spiritual rituals, meditation, or simply creating a serene atmosphere in your space.Elevate your spiritual journey with Awafi Mill Palo Santo Smudging Sticks – where tradition meets quality for a truly enriching experience.'),
                              SizedBox(height: 10),
                              Text(
                                'Pure Indian Sandalwood',
                                style: GoogleFonts.mulish(
                                    fontWeight: FontWeight.w700, fontSize: 12),
                              ),
                              SizedBox(height: 10),
                              Text(
                                  'Awafi Mill brings you the finest Indian Sandalwood Chips, revered for their pure and traditional aroma. Immerse yourself in the authentic fragrance of Indian Sandalwood, perfect for various applications, including incense and Bakhoor making.'),
                              SizedBox(height: 10),
                              Text(
                                'Aromatic Essence:',
                                style: GoogleFonts.mulish(
                                    fontWeight: FontWeight.w700, fontSize: 12),
                              ),
                              SizedBox(height: 10),
                              Text(
                                  'Awafi Mill brings you the finest Indian Sandalwood Chips, revered for their pure and traditional aroma. Immerse yourself in the authentic fragrance of Indian Sandalwood, perfect for various applications, including incense and Bakhoor making.'),
                              SizedBox(height: 10),
                              Text(
                                'Versatile Applications:',
                                style: GoogleFonts.mulish(
                                    fontWeight: FontWeight.w700, fontSize: 12),
                              ),
                              SizedBox(height: 10),
                              Text(
                                  'Awafi Mill brings you the finest Indian Sandalwood Chips, revered for their pure and traditional aroma. Immerse yourself in the authentic fragrance of Indian Sandalwood, perfect for various applications, including incense and Bakhoor making.'),
                              SizedBox(height: 10),
                              Text(
                                'Spiritual Significance:',
                                style: GoogleFonts.mulish(
                                    fontWeight: FontWeight.w700, fontSize: 12),
                              ),
                              SizedBox(height: 10),
                              Text(
                                  'Awafi Mill brings you the finest Indian Sandalwood Chips, revered for their pure and traditional aroma. Immerse yourself in the authentic fragrance of Indian Sandalwood, perfect for various applications, including incense and Bakhoor making.'),
                              SizedBox(height: 10),
                              Container(
                                height: 24,
                                width: 73,
                                decoration: BoxDecoration(
                                    border: Border.all(),
                                    borderRadius: BorderRadius.circular(4)),
                                child: Center(
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 2, vertical: 2),
                                    child: Center(
                                        child: Text(
                                      'Rare Product',
                                      style: GoogleFonts.mulish(
                                          fontSize: 10,
                                          fontWeight: FontWeight.bold),
                                    )),
                                  ),
                                ),
                              ),
                              SizedBox(height: 10),
                              Row(
                                  children: List.generate(
                                5,
                                (index) => Icon(Icons.star,
                                    color: index == 3 || index == 4
                                        ? Colors.grey
                                        : Colors.yellow),
                              )),
                              SizedBox(height: 10),
                              Text(
                                '65 rating and 15 reviews',
                                style: GoogleFonts.mulish(fontSize: 10),
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  GestureDetector(
                                    onTap: () {
                                      setState(() {
                                        isExpand = !isExpand;
                                      });
                                    },
                                    child: Container(
                                      height: 24,
                                      width: 73,
                                      decoration: BoxDecoration(
                                          color: Style.themeColor,
                                          border: Border.all(),
                                          borderRadius:
                                              BorderRadius.circular(4)),
                                      child: Center(
                                        child: Padding(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 2, vertical: 2),
                                          child: Center(
                                              child: Text(
                                            'Show Less',
                                            style: GoogleFonts.mulish(
                                                color: Colors.white,
                                                fontSize: 10,
                                                fontWeight: FontWeight.bold),
                                          )),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              Padding(
                                padding: EdgeInsets.only(
                                    left: 12, right: 12, top: 8),
                                child: AuthenticateSaveButton(
                                    isIcon: true,
                                    buttonText:
                                        isChange ? 'View Cart' : 'Add Cart',
                                    onpressed: () {
                                      toglleChange();
                                    }),
                              )
                            ],
                          ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
