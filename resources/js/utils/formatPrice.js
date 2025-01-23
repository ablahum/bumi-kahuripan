// const formatPrice = (payload, updatePayload = null) => {
const formatPrice = (type, number, updateNumber = null) => {
    // const totalPrice =
    //     parseFloat(this.payload.total_price) ||
    //     parseFloat(this.updatePayload.total_price) ||
    //     0;

    let price = 0;

    if (type === "form") {
        // const price = payload.total_price || updatePayload.total_price || 0;
        price = parseFloat(number) || parseFloat(updateNumber) || 0;
    } else if (type === "table") {
        price = parseFloat(number);
    }

    if (isNaN(price) || price <= 0) return "0";

    return new Intl.NumberFormat("id-ID", {
        style: "decimal",
        maximumFractionDigits: 0,
    }).format(price);
};

export default formatPrice;
