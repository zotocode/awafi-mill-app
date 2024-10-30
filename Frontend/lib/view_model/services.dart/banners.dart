import 'dart:convert';
import 'package:frondend/common/end_point.dart';
import 'package:frondend/model/entities.dart/banners_model.dart';
import 'package:http/http.dart' as http;

class Banners {
// Import your BannerResponse model

  static Future<List<BannerModel>> fetchWelcomeBanners() async {
    final response = await http.get(
      Uri.parse(EndPoint.welcomeBannerUrl),
    );

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      final bannerResponse = BannerResponse.fromJson(jsonResponse);

      // Return the list of banners from the response
      return bannerResponse.banners;
    } else {
      throw Exception('Failed to load banners');
    }
  }

  static Future<List<BannerModel>> fetchOfferBanners() async {
    final response = await http.get(Uri.parse(EndPoint.offerBannerUrl));

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      final bannerResponse = BannerResponse.fromJson(jsonResponse);

      // Return the list of banners from the response
      return bannerResponse.banners;
    } else {
      throw Exception('Failed to load banners');
    }
  }

  static Future<List<BannerModel>> fetchCollectionBanners() async {
    final response = await http.get(Uri.parse(EndPoint.collectionBannerUrl));

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      final bannerResponse = BannerResponse.fromJson(jsonResponse);
      print(bannerResponse);
      // Return the list of banners from the response
      return bannerResponse.banners;
    } else {
      throw Exception('Failed to load banners');
    }
  }
}
