import type { Tariff } from "@/widgets/TariffsBlock/model/types"; 

export const mockTariffs: Tariff[] = [
  {
    id: 1,
    name: 'Free',
    description: 'Для старта',
    price: '0₽/мес',
    features: [{ id: 1, text: '1 канал' }],
    button: { label: 'Попробовать', variant: 'default' },
  },
  {
    id: 2,
    name: 'Pro',
    label: 'Популярно',
    description: 'Для роста',
    price: '1 990₽/мес',
    features: [{ id: 1, text: 'До 10 каналов' }],
    button: { label: 'Оформить Pro', variant: 'primary' },
    isHighlighted: true,
  },
  {
    id: 3,
    name: 'Agency',
    description: 'Для агентств',
    price: 'Запрос/мес',
    features: [{ id: 1, text: '50+ каналов' }],
    button: { label: 'Связаться с нами', variant: 'default' },
  },
];
