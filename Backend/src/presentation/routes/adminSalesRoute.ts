// src/presentation/routes/adminSalesRoute.ts
import express from 'express';
import { AdminSalesController } from '../controllers/adminSalesController';
import { AdminSalesInteractor } from '../../application/interactor/adminSalesInteractor';
import { AdminSalesRepository } from '../../infrastructure/repositories/adminSalesRepo';
// import { authMiddleware } from '../../middleware/authMiddleware'; // Assuming you have this

export function setupAdminSalesRoutes(): express.Router {
  const router = express.Router();
  
  // Create instances
  const salesRepository = new AdminSalesRepository();
  const salesInteractor = new AdminSalesInteractor(salesRepository);
  const salesController = new AdminSalesController(salesInteractor);

  // Routes
  router.get('/report', 
    // authMiddleware,  // Add your authentication middleware
    (req, res) => salesController.getSalesReport(req, res)
  );

  router.get('/report/download', 
    // authMiddleware,  // Add your authentication middleware
    (req, res) => salesController.downloadSalesReport(req, res)
  );

  return router;
}