
// --- البيانات الأولية (Seed Data) ---
const initialReflections = [
  { 
    id: 'reflection-1', 
    content: 'هذا هو التأمل الأول. يا له من يوم جميل! آمل أن يكون الجميع بخير.', 
    author: { id: 'user1', name: 'أيمن أحمد', avatar: 'https://i.pravatar.cc/150?u=user1' },
    createdAt: new Date(Date.now( ) - 1000 * 60 * 60 * 2).toISOString(), // قبل ساعتين
    likes: ['user2', 'user3'],
    comments: [{id: 'c1', text: 'أتفق معك!', author: {id: 'user2', name: 'فاطمة علي'}}],
    repostsCount: 1,
  },
  { 
    id: 'reflection-2', 
    content: 'البرمجة هي فن تحويل القهوة إلى كود. #React #JavaScript', 
    author: { id: 'user2', name: 'فاطمة علي', avatar: 'https://i.pravatar.cc/150?u=user2' },
    createdAt: new Date(Date.now( ) - 1000 * 60 * 60 * 24).toISOString(), // قبل يوم
    likes: ['user1'],
    comments: [],
    repostsCount: 0,
  },
  {
    id: 'repost-1',
    type: 'repost',
    author: { id: 'user3', name: 'خالد سعيد', avatar: 'https://i.pravatar.cc/150?u=user3' },
    createdAt: new Date(Date.now( ) - 1000 * 60 * 30).toISOString(), // قبل 30 دقيقة
    original: { // التأمل الأصلي الذي تمت إعادة نشره
      id: 'reflection-2', 
      content: 'البرمجة هي فن تحويل القهوة إلى كود. #React #JavaScript', 
      author: { id: 'user2', name: 'فاطمة علي', avatar: 'https://i.pravatar.cc/150?u=user2' },
      createdAt: new Date(Date.now( ) - 1000 * 60 * 60 * 24).toISOString(),
      likes: ['user1'],
      comments: [],
      repostsCount: 0,
    }
  }
];

// --- دوال مساعدة للتعامل مع localStorage ---
const DB_KEY = 'reflectionsDB';

const getDb = () => {
  const dbString = localStorage.getItem(DB_KEY);
  if (!dbString) {
    // ✅ إذا كانت قاعدة البيانات فارغة، قم بملئها بالبيانات الأولية
    saveDb(initialReflections);
    return initialReflections;
  }
  return JSON.parse(dbString);
};

const saveDb = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// --- دوال الـ API المحاكية (تبقى كما هي، فهي جيدة) ---

// دالة لمحاكاة تأخير الشبكة
const simulateDelay = (ms = 500) => new Promise(res => setTimeout(res, ms));

export const fetchReflections = async () => {
  await simulateDelay();
  const db = getDb();
  return [...db].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// ... (بقية الدوال: deleteReflection, likeReflection, etc. تبقى كما هي)
// ... (لقد قمت بإخفائها هنا للاختصار، لكن لا تحذفها من ملفك)

export const deleteReflection = async (reflectionId) => {
  await simulateDelay();
  let db = getDb();
  db = db.filter(item => {
    if (item.type === 'repost' && item.original.id === reflectionId) return false;
    return item.id !== reflectionId;
  });
  saveDb(db);
};

export const createReflection = async (reflectionData, currentUser) => {
  if (!currentUser) {
    throw new Error("User must be logged in to create a reflection");
  }
    await simulateDelay();
    const db = getDb();
    const newReflection = {
      id: `reflection-${Date.now()}`,
      ...reflectionData,
      author: { id: currentUser.id, name: currentUser.name, avatar: currentUser.avatar },
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      repostsCount: 0,
    };
    db.unshift(newReflection);
    saveDb(db);
    return newReflection;
}






export const likeReflection = async (reflectionId, userId) => {
  await simulateDelay(200); // تأخير أقل للإعجاب
  // console.log(`API MOCK: Liking reflection ${reflectionId} by user ${userId}...`);
  const db = getDb();
  const itemIndex = db.findIndex(item => item.id === reflectionId);

  if (itemIndex === -1) throw new Error("Reflection not found");

  const reflection = db[itemIndex];
  const likes = reflection.likes || [];
  
  if (likes.includes(userId)) {
    // إلغاء الإعجاب
    reflection.likes = likes.filter(id => id !== userId);
  } else {
    // إضافة إعجاب
    reflection.likes.push(userId);
  }
  
  saveDb(db);
  return reflection; // إرجاع التأمل المحدث
};

export const repostReflection = async (originalReflection, currentUser) => {
  await simulateDelay();
  console.log(`API MOCK: Reposting reflection ${originalReflection.id} by user ${currentUser.name}...`);
  const db = getDb();

  // إنشاء كائن إعادة نشر جديد
  const newRepost = {
    id: `repost-${Date.now()}`, // معرّف فريد
    type: 'repost',
    user: currentUser, // المستخدم الذي قام بإعادة النشر
    createdAt: new Date().toISOString(),
    original: originalReflection, // التأمل الأصلي
  };

  db.unshift(newRepost); // إضافة إعادة النشر في بداية القائمة
  saveDb(db);
  
  // تحديث عدد إعادات النشر في التأمل الأصلي
  const originalIndex = db.findIndex(item => item.id === originalReflection.id);
  if (originalIndex !== -1) {
    db[originalIndex].repostsCount = (db[originalIndex].repostsCount || 0) + 1;
    saveDb(db);
  }

  return newRepost;
};

// --- الدالة المطلوبة: جلب منشورات المستخدم بواسطة ID ---

/**
 * تستقبل ID المستخدم وتبحث في قاعدة البيانات عن كل منشوراته.
 * @param {string} userId - الـ ID الخاص بالمستخدم الذي نريد جلب منشوراته.
 * @returns {Promise<Array>} - Promise يرجع مصفوفة تحتوي على كل منشورات المستخدم.
 */
export const fetchUserReflections = async (userId) => {
  // 1. محاكاة تأخير الشبكة
  await simulateDelay();

  // 2. التحقق من وجود userId (حماية ضد الأخطاء)
  if (!userId) {
    console.warn("fetchUserReflections was called without a userId.");
    return []; // أرجع مصفوفة فارغة إذا لم يتم توفير ID
  }

  // 3. قراءة قاعدة بيانات المنشورات الكاملة
  const allReflections = getDb();

  // 4. فلترة المنشورات للعثور على تلك التي تخص المستخدم المطلوب
  const userReflections = allReflections.filter(reflection => {
    // تحقق من أن المنشور يحتوي على كائن `user` وأن الـ `id` الخاص به يطابق الـ `userId` المطلوب
    return (reflection.user && reflection.user.id === userId) || (reflection.author && reflection.author.id === userId);
  });


  // 5. إرجاع مصفوفة المنشورات التي تم العثور عليها (ستكون فارغة إذا لم يجد شيئاً)
  return userReflections;
};
export const fetchReflectionById = async (reflectionId) => {
  await simulateDelay();
  const db = getDb();
  const reflection = db.find(item => item.id === reflectionId);
  return reflection || null;
}
