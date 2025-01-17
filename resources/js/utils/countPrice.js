const countPrice = (basePrice, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end) || end <= start) return 0;

    const differenceTime = end - start;
    const differenceDays = differenceTime / (1000 * 60 * 60 * 24);

    const totalPrice = basePrice * differenceDays;

    return totalPrice || 0;
};

export default countPrice;
