export const calculateTileMetrics = (
    size: string, // Размер плитки в формате 'WIDTHхHEIGHT'
    tilesPerBox: number, // Количество плиток в наборе
    pricePerSquareMeter: number, // Цена за квадратный метр
    qty: number // Общее количество плиток
) => {
    // Разделить размеры на ширину и высоту, используя 'х'
    const [width, height] = size.split('х').map(Number);
    // Перевести размеры из мм в метры
    const tileWidth = width / 1000;
    const tileHeight = height / 1000;
    // Рассчитать площадь одной плитки в квадратных метрах
    const tileArea = tileWidth * tileHeight;
    // Рассчитать общую площадь плиток
    const totalTileArea = tileArea * qty;
    // Рассчитать стоимость покрытия общего количества плиток
    const totalCost = totalTileArea * pricePerSquareMeter;

    return { totalTileArea, totalCost };
};
