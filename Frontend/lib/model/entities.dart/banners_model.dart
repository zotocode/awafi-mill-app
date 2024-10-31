// BannerModel.dart

class BannerResponse {
  final bool success;
  final List<BannerModel> banners;

  BannerResponse({
    required this.success,
    required this.banners,
  });

  factory BannerResponse.fromJson(Map<String, dynamic> json) {
    return BannerResponse(
      success: json['success'] ?? false,
      banners: (json['banners'] as List<dynamic>)
          .map((banner) => BannerModel.fromJson(banner))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': success,
      'banners': banners.map((banner) => banner.toJson()).toList(),
    };
  }
}

class BannerModel {
  final String imageUrl;
  final String name;

  BannerModel({
    required this.imageUrl,
    required this.name,
  });

  factory BannerModel.fromJson(Map<String, dynamic> json) {
    return BannerModel(
      imageUrl: json['imageUrl'] ?? '',
      name: json['name'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'imageUrl': imageUrl,
      'name': name,
    };
  }
}
