import React, { useEffect, useState } from 'react';
// import { useForm, usePage } from '@inertiajs/react'; // отключаем Inertia
import { mapServerErrors } from '../libr/mapServerErrors';
import { validateProfile } from './validateProfile';
import type { User } from './types';

// ⬇️ Импорт моковых данных
import { mockUser, mockServerErrors } from '@/pages/UserProfilePage/mock/mockUserProfile';

// ⬇️ Моковый аналог useForm
const useMockForm = <T extends object>(initialData: T) => {
  const [data, setData] = useState<T>(initialData);

  return {
    data,
    setData,
    post: (_url: string, _opts?: unknown) => {
      console.log("📌 MOCK POST:", data);
      alert("Форма отправлена (MOCK). Данные смотри в консоли.");
    },
    processing: false,
  };
};

export const useUserProfileForm = () => {
  // const { user, errors: serverErrors = {} } = usePage<UserProfileProps>().props;
  // отключено в тестовом режиме

  const user = mockUser;
  const serverErrors = mockServerErrors;

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data, setData, post, processing } = useMockForm<User>({
    first_name: user.first_name || '',
    email: user.email || '',
    company: user.company || '',
  });

  useEffect(() => {
    setErrors(mapServerErrors(serverErrors));
  }, [serverErrors]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateProfile(data);
    if (Object.keys(newErrors).length) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      return;
    }

    post('/auth/profile', {});
  };

  return { data, setData, errors, setErrors, handleSubmit, processing };
};
