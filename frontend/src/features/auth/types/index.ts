// تعريف البيانات المرسلة عند تسجيل الدخول (تطابق LoginDto في الباك إند)
export interface LoginCredentials {
  email: string;
  password: string;
}

// تعريف البيانات المرسلة عند إنشاء حساب جديد (تطابق PersonDto في الباك إند)
export interface RegisterCredentials {
  name: string;      // هذا الحقل كان ناقصاً
  email: string;
  password: string;
}

// تعريف البيانات المستلمة من السيرفر عند النجاح (تطابق TokenDto في الباك إند)
export interface AuthResponse {
  token: string;
  roles: string[];
  // حقول اختيارية قد نحتاجها لو عدلنا الباك إند مستقبلاً
  email?: string;
  userId?: number;
}

// تعريف شكل المستخدم داخل الـ Store في الفرونت إند
export interface User {
  email: string;
  name?: string;
  roles: string[];
}