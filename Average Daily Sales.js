// ... (วางไว้ที่ใดก็ได้ในส่วน JavaScript ของคุณ) ...

function calculateAverageDailySales(days = 7) { // ค่าเริ่มต้น 7 วัน
    let totalSalesInPeriod = 0;
    let numDaysWithSales = 0; // นับเฉพาะวันที่มียอดขาย

    const today = new Date(); // วันปัจจุบัน

    for (let i = 0; i < days; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i); // ย้อนหลังไป i วัน
        const dateString = d.toISOString().slice(0, 10); // รูปแบบ YYYY-MM-DD

        if (dailySales[dateString] !== undefined && dailySales[dateString] > 0) {
            totalSalesInPeriod += dailySales[dateString];
            numDaysWithSales++;
        }
    }

    return numDaysWithSales > 0 ? (totalSalesInPeriod / numDaysWithSales).toFixed(2) : 0;
}