// src/features/users/api/userAPI.js

// افترض أن ملف Mappers موجود في المسار التالي
import { formatUser } from '../utils/userMappers';

// --- دوال مساعدة للتعامل مع قاعدة بيانات المستخدمين ---
const USERS_DB_KEY = 'usersDB';

const getUsers = () => {
  const users = localStorage.getItem(USERS_DB_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
};

const simulateDelay = (ms) => new Promise(res => setTimeout(res, ms));


// --- دوال API الخاصة بعمليات المستخدمين ---

/**
 * دالة لجلب بيانات مستخدم واحد باستخدام الـ uid.
 * @param {string} userId - الـ uid الخاص بالمستخدم.
 * @returns {Promise<Object|null>} - Promise يرجع كائن المستخدم المحول أو null.
 */
export const getUserById = async (userId) => {
  await simulateDelay(500);
  
  if (!userId) {
    console.warn("getUserById called without a userId.");
    return null;
  }

  const users = getUsers();
  const user = users.find(u => u.uid === userId);

  if (!user) {
    console.warn(`User with ID ${userId} not found.`);
    return null;
  }

  // إرجاع المستخدم بعد تحويله إلى تنسيق التطبيق
  return formatUser(user);
};

/**
 * دالة لتحديث بيانات مستخدم معين.
 * @param {string} userId - الـ uid الخاص بالمستخدم.
 * @param {object} updatedData - البيانات الجديدة (مثل { displayName: 'اسم جديد' }).
 * @returns {Promise<Object>} - Promise يرجع كائن المستخدم المحدث والمحول.
 */
export const updateUser = async (userId, updatedData) => {
  await simulateDelay(500);
  
  if (!userId) {
    throw new Error("userId is required to update a user.");
  }

  const users = getUsers();
  const userIndex = users.findIndex(u => u.uid === userId);

  if (userIndex === -1) {
    throw new Error("المستخدم غير موجود.");
  }

  // دمج البيانات القديمة مع الجديدة
  // ملاحظة: يجب التأكد من أن updatedData لا تحتوي على حقول غير مرغوب فيها
  users[userIndex] = { ...users[userIndex], ...updatedData };
  saveUsers(users);

  // إرجاع المستخدم المحدث بعد تحويله
  return formatUser(users[userIndex]);
};

/**
 * يمكنك إضافة دوال أخرى هنا في المستقبل
 * مثال: دالة للبحث عن مستخدمين
 */
// export const searchUsers = async (query) => { ... };

