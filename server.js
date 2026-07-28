const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// إعدادات البث والحماية المباشرة
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// استدعاء ملف الأمان إن وجد بحماية Try/Catch
try {
    const security = require('./security');
    if (typeof security === 'function') {
        app.use(security);
    }
} catch (err) {
    console.log('⚠️ ملاحظة: تم تشغيل السيرفر بدون ملف security الخارجي.');
}

// استدعاء ملف الـ API إن وجد
try {
    const apiRoutes = require('./api');
    app.use('/api', apiRoutes);
} catch (err) {
    console.log('⚠️ ملاحظة: تم تشغيل السيرفر بدون ملف api الخارجي.');
}

// توفير ملفات الواجهة (index.html, styles.css, الخ)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`\n=================================`);
    console.log(`🚀 السيرفر يعمل بنجاح الآن!`);
    console.log(`🌐 افتح المتصفح وادخل على: http://localhost:${PORT}`);
    console.log(`=================================\n`);
});