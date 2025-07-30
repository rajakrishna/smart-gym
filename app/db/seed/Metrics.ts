import { db } from '../db';
import { metrics } from '../schema';

export async function seedMetrics() {
  const records = [
    {
      metricId: 'daily-summary',
      metricsDate: new Date(),
      totalOrders: 142,
      totalRevenue: '4120.75', // if `numeric()`, string is safer
      peakHours: '4PM–6PM',
      popularClasses: 'Spin, CrossFit',
      popularNutritionOrders: 'Smoothie, Pre-Workout',
      popularOrderItems: 'Protein Bar, Recovery Shake',
      createdAt: new Date(),
    },
  ];

  await db.insert(metrics).values(records);
}




