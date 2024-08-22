export const calculateTileMetrics = (
    size: string,
    tilesPerBox: number,
    pricePerSquareMeter: number,
    qty: number
) => {
    // Разделить размеры на ширину и высоту, используя 'х'
    const [width, height] = size.split('х').map(Number);
    // Перевести размеры из мм в метры
    const tileWidth = width / 1000;
    const tileHeight = height / 1000;
    // Рассчитать площадь одной плитки в квадратных метрах
    const tileArea = tileWidth * tileHeight;

    if (tilesPerBox > 1) {
        // Рассчитать общую площадь плиток
        const totalTileArea = tileArea * tilesPerBox * qty;
        // Рассчитать стоимость покрытия общего количества плиток
        const totalCost = tileArea * pricePerSquareMeter * tilesPerBox * qty;
        return { totalTileArea, totalCost };
    } else {
        const totalCost = pricePerSquareMeter * qty;
        return { totalCost, totalTileArea: qty * tileArea };
    }
};
