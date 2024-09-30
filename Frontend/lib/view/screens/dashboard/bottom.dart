import 'package:flutter/material.dart';
import 'package:frondend/view/components/widgets/custom_bottom.dart';
import 'package:frondend/view/screens/dashboard/account.dart';
import 'package:frondend/view/screens/dashboard/cart.dart';
import 'package:frondend/view/screens/dashboard/home.dart';
import 'package:frondend/view/screens/dashboard/wishlist.dart';
import 'package:frondend/view_model/bottom_bar.dart';
import 'package:provider/provider.dart';

class BottomScreen extends StatelessWidget {
  const BottomScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<BottomNavProvider>(
        builder: (context, bottomNavProvider, child) {
          return IndexedStack(
            index: bottomNavProvider.currentIndex,
            children: [
              HomeScreen(),
              CartScreen(),
              WishlistScreen(),
              AccountScreen(),
            ],
          );
        },
      ),
      bottomNavigationBar: Consumer<BottomNavProvider>(
        builder: (context, bottomNavbarProvider, child) {
          return Container(
            height: 70,
            width: double.infinity,
            child: Row(
              children: [
                CustomBottomWidget(
                  index: 0,
                  text: 'Home',
                  image: 'assets/images/home.png',
                  currentIndex: bottomNavbarProvider.currentIndex,
                  onTap: () {
                    bottomNavbarProvider.changeIndex(0);
                  },
                ),
                CustomBottomWidget(
                  index: 1,
                  text: 'Cart',
                  image: 'assets/images/cart.png',
                  currentIndex: bottomNavbarProvider.currentIndex,
                  onTap: () {
                    bottomNavbarProvider.changeIndex(1);
                  },
                ),
                CustomBottomWidget(
                  index: 2,
                  text: 'Whish list',
                  image: 'assets/images/which_list.png',
                  currentIndex: bottomNavbarProvider.currentIndex,
                  onTap: () {
                    bottomNavbarProvider.changeIndex(2);
                  },
                ),
                CustomBottomWidget(
                  index: 3,
                  text: 'Account',
                  image: 'assets/images/person.png',
                  currentIndex: bottomNavbarProvider.currentIndex,
                  onTap: () {
                    bottomNavbarProvider.changeIndex(3);
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
