const db = require('./dbService');

async function getTotalCompliance(brand_id, area_id){
    const data = await db.query(
        `SELECT SUM(compliance) as total FROM report_product 
        LEFT JOIN product ON product.product_id = report_product.product_id
        LEFT JOIN product_brand ON product_brand.brand_id = product.brand_id
        LEFT JOIN store ON store.store_id = report_product.store_id
        LEFT JOIN store_area ON store.area_id = store_area.area_id
        WHERE product_brand.brand_id = ? AND store_area.area_id = ?`,
        [brand_id, area_id]
    );
    return data;
}

async function getTotalReport(){
    const data = await db.query(
        `SELECT SUM(compliance) as total FROM report_product`
    );
    return data;
}

module.exports = {
    getBrandName,
    getAreaName,
    getTotalCompliance,
    getTotalReport
}