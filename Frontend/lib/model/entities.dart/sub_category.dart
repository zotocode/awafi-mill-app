class ResponseModel {
  final List<SubCategoryModel> data;
  final int totalPages;

  ResponseModel({
    required this.data,
    required this.totalPages,
  });

  factory ResponseModel.fromJson(Map<String, dynamic> json) {
    return ResponseModel(
      data: List<SubCategoryModel>.from(
          json['data'].map((item) => SubCategoryModel.fromJson(item))),
      totalPages: json['totalPages'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'data': data.map((item) => item.toJson()).toList(),
      'totalPages': totalPages,
    };
  }
}

class SubCategoryModel {
  final String id;
  final String name;
  final String description;
  final String mainCategory;
  final bool isListed;
  final bool isDeleted;
  final DateTime createdAt;
  final DateTime updatedAt;

  SubCategoryModel({
    required this.id,
    required this.name,
    required this.description,
    required this.mainCategory,
    required this.isListed,
    required this.isDeleted,
    required this.createdAt,
    required this.updatedAt,
  });

  factory SubCategoryModel.fromJson(Map<String, dynamic> json) {
    return SubCategoryModel(
      id: json['_id'],
      name: json['name'],
      description: json['description'],
      mainCategory: json['mainCategory'],
      isListed: json['isListed'],
      isDeleted: json['isDeleted'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'description': description,
      'mainCategory': mainCategory,
      'isListed': isListed,
      'isDeleted': isDeleted,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
