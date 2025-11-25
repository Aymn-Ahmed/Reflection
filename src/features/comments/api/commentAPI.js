// src/features/comments/api/commentAPI.js

const COMMENTS_DB_KEY = "commentsDB";

// --- دوال مساعدة للتعامل مع localStorage ---

const getDb = () => {
  const dbString = localStorage.getItem(COMMENTS_DB_KEY);
  return dbString ? JSON.parse(dbString) : [];
};

const saveDb = (db) => {
  localStorage.setItem(COMMENTS_DB_KEY, JSON.stringify(db));
};

const simulateDelay = (ms = 300) => new Promise(res => setTimeout(res, ms));


// --- دوال الـ API المصدرة ---

/**
 * دالة لجلب كل التعليقات المرتبطة بمنشور معين.
 * هذا هو الاسم الذي يتوقعه ReflectionDetails.jsx.
 */
export const fetchComments = async (reflectionId) => {
  await simulateDelay();
  const allComments = getDb();
  const filteredComments = allComments.filter(c => c.reflectionId === reflectionId);
  // ترتيب التعليقات من الأقدم إلى الأحدث
  return filteredComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

/**
 * دالة لإنشاء تعليق جديد.
 */
export const createComment = async (reflectionId, content, currentUser) => {
  await simulateDelay();
  if (!currentUser) throw new Error("User must be logged in to comment.");

  const newComment = {
    id: `comment-${Date.now()}`,
    reflectionId: reflectionId,
    content: content,
    user: { // تخزين نسخة مصغرة من المستخدم
      id: currentUser.id,
      name: currentUser.name,
      avatar: currentUser.avatar
    },
    createdAt: new Date().toISOString(),
  };

  const allComments = getDb();
  allComments.push(newComment);
  saveDb(allComments);

  return newComment; // إرجاع التعليق الجديد
};

/**
 * دالة لحذف تعليق.
 */
export const deleteComment = async (commentId) => {
  await simulateDelay();
  let allComments = getDb();
  const updatedComments = allComments.filter(c => c.id !== commentId);
  saveDb(updatedComments);
  return; // لا نرجع شيئاً عند الحذف
};