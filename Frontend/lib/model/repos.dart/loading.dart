import 'package:flutter/material.dart';
import 'package:frondend/view_model/provider.dart/loading.dart';
import 'package:provider/provider.dart';

void handleLoading(BuildContext context) async {
  final loadingProvider = Provider.of<LoadingProvider>(context, listen: false);
  loadingProvider.setLoading(true);
  await Future.delayed(
    Duration(seconds: 2),
  );
  loadingProvider.setLoading(false);
}
