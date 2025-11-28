// src/features/auth/api/authAPI.js

// افترض أن ملف Mappers موجود في المسار التالي
import { formatUser } from '../../users/utils/userMappers';

const USERS_DB_KEY = 'usersDB';

// --- دوال مساعدة للتعامل مع قاعدة بيانات المستخدمين (تحتاجها دوال المصادقة) ---
const getUsers = () => {
  const users = localStorage.getItem(USERS_DB_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
};

const simulateDelay = (ms) => new Promise(res => setTimeout(res, ms));


// --- دوال API الخاصة بالمصادقة فقط ---

/**
 * دالة لإنشاء حساب جديد وحفظه في localStorage.
 * @returns {Promise<{user: Object}>}
 */
export const registerUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    simulateDelay(1000).then(() => {
      const users = getUsers();
      
      if (users.some(user => user.email === email)) {
        return reject(new Error("هذا البريد الإلكتروني مسجل بالفعل."));
      }
      
      const newUser = {
        id: `user-${Date.now()}`,
        email: email,
        password: password, // ملاحظة: لا تفعل هذا في تطبيق حقيقي
        name: name,
        avatar: `https://i.pravatar.cc/150?u=${email}`
      };
      
      users.push(newUser );
      saveUsers(users);
      
      // إرجاع المستخدم المحول ليتوافق مع تنسيق التطبيق
      resolve({ user: formatUser(newUser) });
    });
  });
};

/**
 * دالة لتسجيل دخول مستخدم والتحقق من بياناته.
 * @returns {Promise<{user: Object|null, message?: string}>}
 */
export const loginUser = (email, password) => {
  return new Promise((resolve) => {
    simulateDelay(1000).then(() => {
      const users = getUsers();
      const user = users.find(u => u.email === email);

      if (!user) {
        return resolve({ user: null, message: "البريد الإلكتروني غير مسجل." });
      }
      if (user.password !== password) {
        return resolve({ user: null, message: "كلمة المرور غير صحيحة." });
      }
  
      // إرجاع المستخدم المحول ليتوافق مع تنسيق التطبيق
      resolve({ user: formatUser(user) });
    });
  });
};

/**
 * دالة لتسجيل الخروج.
 * @returns {Promise<void>}
 */
export const logoutUser = () => {
  // في المحاكاة، لا نحتاج لفعل شيء هنا
  return Promise.resolve();
};

