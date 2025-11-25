import { createTheme } from '@mui/material/styles';
import { arEG } from '@mui/material/locale'; // لدعم اللغة العربية في مكونات MUI

// تعريف لوحة الألوان الأساسية
const palette = {
  primary: {
    main: '#2E7D32', // لون أخضر أساسي (مثال)
    _light: '#60AD5E',
    get light() {
      return this._light;
    },
    set light(value) {
      this._light = value;
    },
    dark: '#005005',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#FFC107', // لون ثانوي (مثال)
    contrastText: '#000000',
  },
  background: {
    default: '#F4F6F8', // لون خلفية التطبيق
    paper: '#FFFFFF',   // لون خلفية الكروت والأسطح
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
  },
  // يمكنك إضافة ألوان أخرى مثل error, warning, info, success
};

// تعريف الخطوط (Typography)
const typography = {
  fontFamily: '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif', // استخدام خط Cairo كخط أساسي
  h6: {
    fontWeight: 600,
    fontSize: '1.25rem',
  },
  body1: {
    lineHeight: 1.7,
  },
  // يمكنك تخصيص كل أنواع الخطوط هنا
};

// تعريف التخصيصات العامة للمكونات
const components = {
  // مثال: تخصيص كل الكروت في التطبيق
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12, // تغيير نصف قطر الحواف لكل الكروت
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // ظل افتراضي خفيف
      },
    },
  },
  // مثال: تخصيص كل الأزرار الأساسية
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none', // لإلغاء الحروف الكبيرة التلقائية
      },
    },
  },
};

// تجميع كل الأجزاء لإنشاء الثيم
const theme = createTheme({
  direction: 'rtl', // تحديد الاتجاه الافتراضي للتطبيق
  palette: palette,
  typography: typography,
  components: components,
}, arEG); // دمج دعم اللغة العربية

export default theme;
