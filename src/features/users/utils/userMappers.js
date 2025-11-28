// دالة مساعدة لتحويل بيانات المستخدم من تنسيق API إلى تنسيق موحد للتطبيق
export const formatUser = (apiUser) => {
  if (!apiUser) return null;
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    avatar: apiUser.avatar,
    // يمكنك إضافة قيم افتراضية هنا أيضاً
    // avatar: apiUser.avatar || 'default-avatar.png',
  };
};


/**
 @param {object} appUserData - البيانات من نموذج التطبيق (e.g., { name, avatar, email })
 * @returns {object} - البيانات بتنسيق الـ API (e.g., { name, avatar, email })
 */
export const formatUserForApi = (appUserData) => {
  // إذا كانت البيانات المدخلة فارغة، أرجع كائناً فارغاً لتجنب الأخطاء
  if (!appUserData) return {}; 
  
  const apiData = {};

  // التحقق من وجود كل خاصية قبل إضافتها
  // هذا يمنع إرسال قيم `undefined` إلى الـ API
  if (appUserData.name !== undefined) {
    apiData.name = appUserData.name;
  }
  if (appUserData.avatar !== undefined) {
    apiData.avatar = appUserData.avatar;
  }
  if (appUserData.email !== undefined) {
    apiData.email = appUserData.email;
  }
  if (appUserData.password !== undefined) {
    // هذا الحقل يستخدم فقط عند التسجيل أو تغيير كلمة المرور
    apiData.password = appUserData.password;
  }
  return apiData;;
}