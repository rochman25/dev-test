const reportService = require('../services/reportService');

async function get(req, res, next) {
    try {
        const brands = await reportService.getBrandName();
        const areas = await reportService.getAreaName();
        const totalReport = await reportService.getTotalReport();
        var labelAreas = [];
        const percentage = [];
        var datasets = [];
        for (const brand of brands) {
            var result = [];
            for (const area of areas) {
                const compliance = await reportService.getTotalCompliance(brand.brand_id, area.area_id);
                const calculate = parseFloat(compliance[0].total / totalReport[0].total * 100).toFixed(2);
                result.push(calculate);
                labelAreas.push(area.area_name);
            }
            percentage.push({
                brand_id: brand.brand_id,
                brand_name: brand.brand_name,
                value: result
            });
            labelAreas = [...new Set(labelAreas)]
        }
        percentage.forEach(item => {
            datasets.push({
                label: 'Nilai ' + item.brand_name,
                data: item.value,
                backgroundColor: [
                    random_bg_color(),
                ],
                borderColor: [
                    random_bg_color(),
                ],
                borderWidth: 1
            })
        });
        res.render('index', {
            brands,
            areas,
            percentage,
            labelTable: labelAreas,
            labelAreas: JSON.stringify(labelAreas),
            datasets: JSON.stringify(datasets)
        });
    } catch (error) {
        console.error(`Error while render page`, error.message);
        next(error);
    }
}

async function filter(req, res, next) {
    try {
        const brands = await reportService.getBrandName();
        const area = req.query.area_id;
        const areas = await reportService.getAreaName();
        const start_date = req.query.start_date;
        const end_date = req.query.end_date;
        const totalReport = await reportService.getTotalReport();
        var labelAreas = [];
        const percentage = [];
        var datasets = [];
        areas.forEach((item)=>{
            if(item.area_id == area){
                labelAreas.push(item.area_name);
            }
        });
        for (const brand of brands) {
            var result = [];
            const compliance = await reportService.getTotalComplianceByDate(brand.brand_id, area, start_date, end_date);
            const calculate = parseFloat(compliance[0].total / totalReport[0].total * 100).toFixed(2);
            result.push(calculate);
            percentage.push({
                brand_id: brand.brand_id,
                brand_name: brand.brand_name,
                value: result
            });
            labelAreas = [...new Set(labelAreas)]
        }
        percentage.forEach(item => {
            datasets.push({
                label: 'Nilai ' + item.brand_name,
                data: item.value,
                backgroundColor: [
                    random_bg_color(),
                ],
                borderColor: [
                    random_bg_color(),
                ],
                borderWidth: 1
            })
        });
        res.render('index', {
            area,
            start_date,
            end_date,
            brands,
            areas,
            percentage,
            labelTable: labelAreas,
            labelAreas: JSON.stringify(labelAreas),
            datasets: JSON.stringify(datasets)
        });
    } catch (error) {
        console.error(`Error while render page`, error.message);
        next(error);
    }
}

function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = 1200 + Math.floor(Math.random() * 256);
    var z = 50 + Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
}

module.exports = {
    get,
    filter
}