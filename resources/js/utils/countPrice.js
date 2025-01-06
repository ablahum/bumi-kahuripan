const countPrice = (basePrice, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceTime = end - start;
    const differenceDays = differenceTime / (1000 * 60 * 60 * 24);

    const totalHarga = basePrice * differenceDays;

    return totalHarga;
};

export default countPrice;
