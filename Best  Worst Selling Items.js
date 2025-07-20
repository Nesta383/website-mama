function updateMenuStats() {
    const statsDiv = document.getElementById('menuStatsList');

    if (menuItems.length === 0) {
        statsDiv.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 20px;">ยังไม่มีเมนู</p>';
        return;
    }

    // สร้างสำเนาของเมนูเพื่อจัดเรียงโดยไม่กระทบอาร์เรย์เดิม
    const sortedMenuItems = [...menuItems].sort((a, b) => b.soldCount - a.soldCount);

    let html = '';
    html += '<h4 style="margin-bottom: 10px; color: #2c3e50;">🥇 เมนูขายดีที่สุด:</h4>';
    // แสดงเมนูขายดี 3 อันดับแรก
    sortedMenuItems.slice(0, 3).forEach(item => {
        if (item.soldCount > 0) { // แสดงเฉพาะเมนูที่มีการขาย
            html += `
                <div class="menu-item-stat" style="border-left: 4px solid #27ae60;">
                    <div>
                        <div class="menu-name">${item.name}</div>
                        <div style="color: #7f8c8d; font-size: 0.9em;">ราคา: ${item.price} บาท</div>
                    </div>
                    <div class="menu-count">${item.soldCount} จาน</div>
                </div>
            `;
        }
    });
    if (sortedMenuItems.filter(item => item.soldCount > 0).length === 0) {
        html += '<p style="text-align: center; color: #7f8c8d; padding: 10px;">ยังไม่มีเมนูที่ขายได้</p>';
    }

    html += '<h4 style="margin-top: 20px; margin-bottom: 10px; color: #2c3e50;">📉 เมนูขายไม่ดีที่สุด (ที่ยังไม่เคยขาย):</h4>';
    // แสดงเมนูที่ยังไม่เคยขาย หรือขายได้น้อยที่สุด (หากมีการเพิ่ม `cost` ในอนาคต อาจจะเรียงตามกำไร)
    const worstSelling = [...menuItems].filter(item => item.soldCount === 0).sort((a, b) => a.price - b.price); // เรียงตามราคาจากน้อยไปมาก
    if (worstSelling.length > 0) {
        worstSelling.slice(0, 3).forEach(item => { // แสดง 3 เมนูที่ขายไม่ดีที่สุด
             html += `
                <div class="menu-item-stat" style="border-left: 4px solid #e74c3c;">
                    <div>
                        <div class="menu-name">${item.name}</div>
                        <div style="color: #7f8c8d; font-size: 0.9em;">ราคา: ${item.price} บาท</div>
                    </div>
                    <div class="menu-count">0 จาน</div>
                </div>
            `;
        });
    } else {
        html += '<p style="text-align: center; color: #7f8c8d; padding: 10px;">ทุกเมนูมีการขายแล้ว!</p>';
    }

    statsDiv.innerHTML = html;
}