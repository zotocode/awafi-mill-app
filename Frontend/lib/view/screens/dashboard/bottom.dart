import 'package:flutter/material.dart';
import 'package:frondend/view/screens/dashboard/account.dart';
import 'package:frondend/view/screens/dashboard/cart.dart';
import 'package:frondend/view/screens/dashboard/home.dart';
import 'package:frondend/view/screens/dashboard/wishlist.dart';
import 'package:frondend/view_model/bottom_bar.dart'; // Your BottomNavProvider
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
        builder: (context, bottomNavProvider, child) {
          return NavigationBar(
            selectedIndex: bottomNavProvider.currentIndex,
            onDestinationSelected: (index) {
              bottomNavProvider.changeIndex(index);
            },
            backgroundColor: Colors.white,
            destinations: const [
              NavigationDestination(
                icon: Icon(Icons.home),
                label: 'Home',
              ),
              NavigationDestination(
                icon: Icon(Icons.shopping_cart),
                label: 'Cart',
              ),
              NavigationDestination(
                icon: Icon(Icons.favorite),
                label: 'Wish list',
              ),
              NavigationDestination(
                icon: Icon(Icons.person),
                label: 'Account',
              ),
            ],
          );
        },
      ),
    );
  }
}
