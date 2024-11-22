import express from 'express'
import DashboardController from '../controllers/dashboardController'
import DashboardInteractor from '../../application/interactor/dashboardInteractor'
import CheckoutRepository from '../../infrastructure/repositories/dashboardRepository'
import { CheckoutModel } from '../../infrastructure/model/checkoutModel'

const dashboardRoute=express.Router()
const checkoutRepo=new CheckoutRepository(CheckoutModel)
const dashboardInteractor=new DashboardInteractor(checkoutRepo)
const dashboardController=new DashboardController(dashboardInteractor)




dashboardRoute.get('/orders',dashboardController.dashTotalOrders.bind(dashboardController))
dashboardRoute.get('/revenue',dashboardController.dashTotalRevenue.bind(dashboardController))
dashboardRoute.get('/sales-report',dashboardController.salesReport.bind(dashboardController))
dashboardRoute.get('/top-Selling',dashboardController.topSellings.bind(dashboardController))

export default dashboardRoute