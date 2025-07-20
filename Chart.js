// ... (โค้ด JavaScript เดิมของคุณ ตั้งแต่ต้นจนถึง renderSalesChart) ...

// ฟังก์ชันสำหรับสร้างและอัปเดตกราฟยอดขาย
function renderSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');

    // เตรียมข้อมูลสำหรับกราฟ (30 วันล่าสุด)
    const labels = [];
    const data = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) { // เปลี่ยนจาก 6 เป็น 29 เพื่อย้อนหลังไป 30 วัน (รวมวันนี้)
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateString = d.toISOString().slice(0, 10); // YYYY-MM-DD
        const formattedDate = d.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' }); // เช่น "ก.ค. 20"

        labels.push(formattedDate);
        data.push(dailySales[dateString] || 0); // หากไม่มีข้อมูล ให้เป็น 0
    }

    // ทำลายกราฟเก่าถ้ามีอยู่แล้ว เพื่อวาดใหม่
    if (salesChartInstance) {
        salesChartInstance.destroy();
    }

    salesChartInstance = new Chart(ctx, {
        type: 'line', // กราฟเส้น
        data: {
            labels: labels,
            datasets: [{
                label: 'ยอดขายรวม (บาท)',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.4, // ทำให้เส้นกราฟโค้งมน
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // สำคัญเพื่อให้กราฟปรับขนาดตาม div
            plugins: {
                title: {
                    display: true,
                    text: 'ยอดขายรวมรายวัน (30 วัน)', // อัปเดตข้อความกราฟ
                    font: {
                        size: 18,
                        family: 'Kanit'
                    },
                    color: '#2c3e50'
                },
                legend: {
                    display: false // ไม่แสดง legend
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ยอดขาย (บาท)',
                        font: {
                            family: 'Kanit'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString(); // แสดงตัวเลขแบบมีคอมม่า
                        },
                        font: {
                            family: 'Kanit'
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'วันที่',
                        font: {
                            family: 'Kanit'
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Kanit'
                        }
                    }
                }
            }
        }
    });
}