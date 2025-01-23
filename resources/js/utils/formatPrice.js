const formatPrice = (number) => {
    const price = parseFloat(number) || 0;

    if (isNaN(price) || price <= 0) return "0";

    return new Intl.NumberFormat("id-ID", {
        style: "decimal",
        maximumFractionDigits: 0,
    }).format(price);
};

export default formatPrice;
