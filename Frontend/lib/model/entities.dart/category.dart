class categoryModel {
  final String name;
  final String id;
  final bool? isListed;
  final bool? isDeleted;

  categoryModel({
    required this.name,
    required this.id,
    this.isListed,
    this.isDeleted,
  });
  factory categoryModel.fromJson(Map<String, dynamic> json) {
    return categoryModel(
      name: json['name'],
      id: json['_id'],
      isListed: json['isListed'],
      isDeleted: json['isDeleted'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      '_id': id,
      'isListed': isListed,
      'isDeleted': isDeleted
    };
  }
}
