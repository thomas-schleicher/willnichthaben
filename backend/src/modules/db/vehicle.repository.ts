import { query } from "express";
import pool from "../config/postgres.config";

class VehicleRepository {
  async getVehicles(filters: any): Promise<number[]> {
    const {
      category_id,
      price_min,
      price_max,
      model_ids,
      brand_ids,
      type_ids,
      date_first_registration_start,
      date_first_registration_end,
      mileage_min,
      mileage_max,
      fuel_types,
      colors,
      conditions,
    } = filters;

    let query = `
        SELECT 
            l.id AS listing_id,
            l.type,
            l.title,
            l.price,
            v.date_first_registration,
            v.mileage,
            v.condition
        FROM vehicles v
        JOIN listings l ON l.id = v.listing_id
        JOIN vehicle_models vm ON v.model_id = vm.id
        JOIN vehicle_marks vb ON vm.mark_id = vb.id
        WHERE vb.category_id = $1
    `;

    const queryParams: any[] = [category_id];

    if (model_ids && model_ids.length > 0) {
      query += ` AND v.model_id = ANY($${queryParams.length + 1})`;
      queryParams.push(model_ids);
    }

    if (price_min !== undefined) {
      query += ` AND l.price >= $${queryParams.length + 1}`;
      queryParams.push(price_min);
    }

    if (price_max !== undefined) {
      query += ` AND l.price <= $${queryParams.length + 1}`;
      queryParams.push(price_max);
    }

    if (brand_ids && brand_ids.length > 0) {
      query += ` AND vb.id = ANY($${queryParams.length + 1})`;
      queryParams.push(brand_ids);
    }

    if (type_ids && type_ids.length > 0) {
      query += ` AND v.type_id = ANY($${queryParams.length + 1})`;
      queryParams.push(type_ids);
    }

    if (date_first_registration_start) {
      query += ` AND v.date_first_registration >= $${queryParams.length + 1}`;
      queryParams.push(date_first_registration_start);
    }

    if (date_first_registration_end) {
      query += ` AND v.date_first_registration <= $${queryParams.length + 1}`;
      queryParams.push(date_first_registration_end);
    }

    if (mileage_min !== undefined) {
      query += ` AND v.mileage >= $${queryParams.length + 1}`;
      queryParams.push(mileage_min);
    }

    if (mileage_max !== undefined) {
      query += ` AND v.mileage <= $${queryParams.length + 1}`;
      queryParams.push(mileage_max);
    }

    if (fuel_types && fuel_types.length > 0) {
      query += ` AND v.fuel_type = ANY($${queryParams.length + 1})`;
      queryParams.push(fuel_types);
    }

    if (colors && colors.length > 0) {
      query += ` AND v.color = ANY($${queryParams.length + 1})`;
      queryParams.push(colors);
    }

    if (conditions && conditions.length > 0) {
      query += ` AND v.condition = ANY($${queryParams.length + 1})`;
      queryParams.push(conditions);
    }

    const result = await pool.query(query, queryParams);
    return result.rows;
  }

  async getModels(filters: any): Promise<any[]> {
    const { category_id, brand_ids } = filters;

    let query = `
      SELECT
        models.id,
        models.name
      FROM
        vehicle_models AS models
      LEFT JOIN
        vehicle_marks AS marks
      ON
        models.mark_id = marks.id
      WHERE
        marks.category_id = $1  
    `;

    const queryParams: any[] = [category_id];

    if (brand_ids && brand_ids.length > 0) {
      query += ` AND marks.id = ANY($${queryParams.length + 1})`;
      queryParams.push(brand_ids);
    }

    const result = await pool.query(query, queryParams);
    return result.rows;
  }
}

export default new VehicleRepository();
