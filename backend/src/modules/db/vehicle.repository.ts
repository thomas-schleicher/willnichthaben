import { listingSchema } from "../../interfaces/listing.interface";
import { vehicleSchema } from "../../interfaces/vehicle/vehicle.interface";
import pool from "../config/postgres.config";

class VehicleRepository {
  async getVehicles(filters: any): Promise<number[]> {
    let {
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

    if (brand_ids && !Array.isArray(brand_ids)) {
      brand_ids = [brand_ids];
    }

    if (model_ids && !Array.isArray(model_ids)) {
      model_ids = [model_ids];
    }

    if (type_ids && !Array.isArray(type_ids)) {
      type_ids = [type_ids];
    }

    if (fuel_types && !Array.isArray(fuel_types)) {
      fuel_types = [fuel_types];
    }

    if (colors && !Array.isArray(colors)) {
      colors = [colors];
    }

    if (conditions && !Array.isArray(conditions)) {
      conditions = [conditions];
    }

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

  async getBrands(filters: any): Promise<any[]> {
    const { category_id } = filters;

    let query = `
      SELECT
        marks.id AS id,
        marks.name AS name
      FROM
        vehicle_marks AS marks
      WHERE
        marks.category_id = $1
    `;

    const result = await pool.query(query, [category_id]);
    return result.rows;
  }

  async getModels(filters: any): Promise<any[]> {
    let { category_id, brand_ids } = filters;

    if (brand_ids && !Array.isArray(brand_ids)) {
      brand_ids = [brand_ids];
    }

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

  async createVehicle(body: any, userID: string): Promise<void> {
    const {
      type,
      title,
      description,
      price,
      name,
      model_id,
      type_id,
      date_first_registration,
      mileage,
      fuel_type,
      color,
      condition,
    } = body;

    const listingValidation = listingSchema.validate({
      seller_id: userID,
      type,
      title,
      description,
      price,
    });

    const vehicleValidation = vehicleSchema.validate({
      name,
      model_id,
      type_id,
      date_first_registration,
      mileage,
      fuel_type,
      color,
      condition,
    });

    if (listingValidation.error) {
      throw new Error("Validation error:" + listingValidation.error.message);
    }
    if (vehicleValidation.error) {
      throw new Error("Validation error: " + vehicleValidation.error.message);
    }

    try {
      await pool.query("BEGIN");

      const listingQuery = `
        INSERT INTO listings 
          (seller_id, type, title, description, price)
        VALUES 
          ($1, $2, $3, $4, $5)
        RETURNING id;
      `;

      const vehicleQuery = `
        INSERT INTO vehicles
          (listing_id, name, model_id, type_id, date_first_registration, mileage, fuel_type, color, condition)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9);
      `;

      const listingQueryResult = await pool.query(listingQuery, [
        userID,
        type,
        title,
        description,
        price,
      ]);

      const vehicleQueryResult = await pool.query(vehicleQuery, [
        listingQueryResult.rows[0].id,
        name,
        model_id,
        type_id,
        date_first_registration,
        mileage,
        fuel_type,
        color,
        condition,
      ]);

      await pool.query("COMMIT");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error during vehicle creation: ", error);
    }
  }

  async updateVehicle(body: any, listing_id: number, user_id: string): Promise<void> {

    const {
      type,
      title,
      description,
      price,
      name,
      model_id,
      type_id,
      date_first_registration,
      mileage,
      fuel_type,
      color,
      condition,
    } = body;

    const listingValidation = listingSchema.validate({
      id: listing_id,
      seller_id: user_id,
      type,
      title,
      description,
      price
    });

    const vehicleValidation = vehicleSchema.validate({
      name,
      model_id,
      type_id,
      date_first_registration,
      mileage,
      fuel_type,
      color,
      condition
    });

    if (listingValidation.error) {
      throw new Error("Validation error: " + listingValidation.error.message);
    }
    if (vehicleValidation.error) {
      throw new Error("Validation error: " + vehicleValidation.error.message);
    }

    try {
      await pool.query("BEGIN");

      const listingQuery = `
        UPDATE listings
        SET
          type = $1,
          title = $2,
          description = $3,
          price = $4
        WHERE
          id = $5;
      `;

      const vehicleQuery = `
        UPDATE vehicles
        SET
          name = $1,
          model_id = $2,
          type_id = $3,
          date_first_registration = $4,
          mileage = $5,
          fuel_type = $6,
          color = $7,
          condition = $8
        WHERE
          listing_id = $9;
      `;

      await pool.query(listingQuery, [
        type,
        title,
        description,
        price,
        listing_id,
      ]);

      await pool.query(vehicleQuery, [
        name,
        model_id,
        type_id,
        date_first_registration,
        mileage,
        fuel_type,
        color,
        condition,
        listing_id,
      ]);

      await pool.query("COMMIT");
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Error during vehicle update: ", error);
    }
  }
}

export default new VehicleRepository();
