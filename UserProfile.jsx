import React from "react";
import { useForm, usePage } from "@inertiajs/react";

interface UserData {
  name: string;
  email: string;
  company: string;
}

const UserProfile: React.FC = () => {
  const { user } = usePage().props as any;

  const { data, setData, patch, processing, errors } = useForm<UserData>({
    name: user.name || '',
    email: user.email || '',
    company: user.company || '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //уточнить эндпоинт/роут по которому сохраняется форма!! может /user?
    patch('/profile', {
      onSuccess: () => {
        console.log('Profile updated successfully');
      },
      onError: () => {
        console.log('Error updating the profile', errors);
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Заголовки */}
      <h1 className="text-3xl font-bold mb-1">Личный кабинет</h1>
      <h2 className="text-lg text-gray-600 mb-6">Управление аккаунтом и подпиской</h2>

      {/* Форма */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white border border-gray-300 shadow-sm rounded p-6 space-y-4" 
      >
        {/* Название формы */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Информация о профиле</h3>

        {/* Имя и Email */}
        <div className="flex gap-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Имя</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Компания */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Компания</label>
          <input
            type="text"
            value={data.company}
            onChange={(e) => setData('company', e.target.value)}
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
        </div>

        {/* Кнопка */}
        <button
          type="submit"
          disabled={processing}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg px-6 py-2 shadow-md disabled:opacity-50 transition-colors duration-200"
        >
          {processing ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
