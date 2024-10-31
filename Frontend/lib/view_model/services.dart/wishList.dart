import 'dart:convert';
import 'package:frondend/common/end_point.dart';
import 'package:frondend/model/entities.dart/prodouct.dart';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;

class WishlistServices {
  // Function to add a product to the wishlist with authentication
  static Future<ProductResponse?> addWishListes(String productId) async {
    try {
      // Retrieve the stored token from Hive
      var box = await Hive.openBox('authBox');
      String? token = box.get('token');
      print("token $token");
      // If the token is not available, handle the error
      if (token == null) {
        print('Error: Authentication token not found.');
        return null;
      }

      // Make the HTTP request with the token in the headers
      final response = await http.post(
        Uri.parse(EndPoint.addwishList), // Replace with your actual endpoint
        headers: {
          'Content-Type': 'application/json',
          'Authorization':
              'Bearer $token', // Add token to the Authorization header
        },
        body: jsonEncode({
          "productId": productId, // Include the productId in the request body
        }),
      );

      // Check if the request was successful (status code 200)
      if (response.statusCode == 200) {
        // Parse the response body into a ProductResponse object
        final jsonResponse = jsonDecode(response.body);
        return ProductResponse.fromJson(jsonResponse);
      } else {
        // If the request failed, you might want to handle the error
        print('Failed to add to wishlist. Status code: ${response.statusCode}');
        print('Response: ${response.body}');
        return null;
      }
    } catch (e) {
      // Handle any exceptions or network errors
      print('Error adding to wishlist: $e');
      return null;
    }
  }
}
