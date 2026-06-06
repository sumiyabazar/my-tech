import type { Product } from '@/types';

export interface ReadyPC {
  id: string;
  model: string;
  cpu: string;
  cooler: string;
  motherboard: string;
  ram: string;
  case: string;
  coolant: string;
  psu: string;
  gpu: string;
  storage: string;
  originalPrice: number;
  salePrice: number;
  category: string;
  image: string;
  hasDiscount: boolean;
}

// Helper to create PC entry
const pc = (
  model: string,
  cpu: string,
  cooler: string,
  motherboard: string,
  ram: string,
  caseName: string,
  coolant: string,
  psu: string,
  gpu: string,
  storage: string,
  originalPrice: number,
  salePrice: number,
): ReadyPC => ({
  id: model.toLowerCase().replace(' ', '-'),
  model,
  cpu,
  cooler,
  motherboard,
  ram,
  case: caseName,
  coolant,
  psu,
  gpu,
  storage,
  originalPrice,
  salePrice,
  category: 'Бэлэн PC',
  image: `https://placehold.co/500x350/0A0E27/00E5FF?text=${encodeURIComponent(model)}`,
  hasDiscount: salePrice < originalPrice,
});

// ===== PC-01 ~ PC-12 (from first image) =====
const pcs1to12: ReadyPC[] = [
  {
    id: 'pc-01',
    model: 'PC-01',
    cpu: 'i5 12400F',
    cooler: 'T400',
    motherboard: 'H610H2',
    ram: 'DDR4 16GB',
    case: 'TTAKE F4',
    coolant: 'LED FAN 3X',
    psu: '650W',
    gpu: 'RTX 4060',
    storage: '512GB nvme',
    originalPrice: 2845000,
    salePrice: 2845000,
    category: 'Бэлэн PC',
    image: '/images/pc-01.png',
    hasDiscount: false,
  },
  pc('PC-02', 'i5 13400F', 'T400', 'H610H2', 'DDR4 16GB', 'TTAKE F4', 'LED FAN 3X', '650W', 'RTX 4060', '512GB nvme', 2885000, 2885000),
  pc('PC-03', 'i5 14400F', 'T500S', 'H610H2', 'DDR4 16GB', 'TTAKE F4', 'LED FAN 3X', '650W', 'RTX 5060', '512GB nvme', 3285000, 3185000),
  pc('PC-04', 'i5 14400F', 'T500S', 'H610H2', 'DDR4 16GB', 'TTAKE F4', 'LED FAN 3X', '650W', 'RTX 4060Ti', '512GB nvme', 3295000, 3295000),
  pc('PC-05', 'i5 14400F', 'T400S', 'H610H2', 'DDR4 16GB', 'TTAKE F4', 'LED FAN 3X', '650W', 'RTX 4060Ti', '1TB nvme', 3510000, 3510000),
  pc('PC-06', 'i5 14400F', 'T400S', 'H610H2', 'DDR4 16GB', 'TTAKE F4', 'LED FAN 3X', '650W', 'RTX 5060', '1TB nvme', 3510000, 3410000),
  pc('PC-07', 'i5 14400F', '360MM Liquid', 'B760', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4X', '750W', 'RTX 5060Ti', '1TB nvme', 4570000, 4480000),
  pc('PC-08', 'i5 14400F', '360MM Liquid', 'B760 H2', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4X', '750W', 'RTX 4070', '1TB nvme', 4770000, 4630000),
  pc('PC-09', 'i5 14400F', '360MM Liquid', 'B760 Pro', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4X', '750W', 'RTX 4060Ti', '1TB nvme', 4440000, 4440000),
  pc('PC-10', 'i5 13600KF', 'PA 120SE', 'B760 Pro', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3X', '650W', 'RTX 5060', '512GB nvme', 4295000, 4145000),
  pc('PC-11', 'i5 13400F', 'T400', 'H610H2', 'DDR4 16GB', 'TTAKE F4', 'LED FAN 3X', '650W', 'RTX 5060', '512GB nvme', 3225000, 3125000),
  pc('PC-12', 'i7 14700F', 'LIQUID 360', 'B760 M-K', 'DDR5 16GB', 'MID TOWER', 'LED FAN 3X', '750W', 'RTX 5060', '512GB nvme', 4535000, 4535000),
];

// ===== PC-13 ~ PC-60 (from Excel file) =====
const pcs13to60: ReadyPC[] = [
  // Ryzen 5 series (7500F, 9600X, 9700X)
  pc('PC-13', 'Ryzen 5 7500F', '500P', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '650W', 'RTX 4060', '512GB NVMe', 3465000, 3305000),
  pc('PC-14', 'Ryzen 5 7500F', '500P', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '650W', 'RTX 5060', '512GB NVMe', 3755000, 3505000),
  pc('PC-15', 'Ryzen 5 7500F', '500P', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '650W', 'RTX 4060Ti', '512GB NVMe', 3755000, 3605000),
  pc('PC-16', 'Ryzen 5 9600X', 'A600', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '650W', 'RTX 5060', '512GB NVMe', 4010000, 3810000),
  pc('PC-17', 'Ryzen 5 9600X', 'A600', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '650W', 'RTX 4060Ti', '512GB NVMe', 4050000, 3910000),
  pc('PC-18', 'Ryzen 7 9700X', 'PA 120SE', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '750W', 'RTX 5060', '512GB NVMe', 4265000, 4115000),
  pc('PC-19', 'Ryzen 5 7500F', '500P', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '750W', 'RTX 5060', '512GB NVMe', 3755000, 3505000),
  pc('PC-20', 'Ryzen 5 9600X', 'A600', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '750W', 'RTX 5060 Ti', '512GB NVMe', 4350000, 4100000),
  pc('PC-21', 'Ryzen 7 9700X', 'PA 120SE', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '750W', 'RTX 5060Ti', '512GB NVMe', 4550000, 4365000),

  // Mid-tier Ryzen (DDR5, Liquid Cooler)
  pc('PC-22', 'Ryzen 5 9600X', '360MM Liquid', 'B850M PRO', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4', '750W', 'RTX 5060', '1TB NVMe', 4545000, 4385000),
  pc('PC-23', 'Ryzen 7 9700X', 'PA 120SE', 'B850', 'DDR5 16GB', 'MID TOWER', 'LED FAN 3', '750W', 'RTX 5060Ti', '512GB NVMe', 4685000, 4465000),
  pc('PC-24', 'Ryzen 7 9700X', '360MM Liquid', 'B850', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4', '850W', 'RTX 5070', '1TB NVMe', 6080000, 5870000),

  // Intel i7 series (12700, 14700F)
  pc('PC-25', 'i7 12700', 'PA 120SE', 'B760M-K', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '750W', 'RTX 4060Ti', '512GB NVMe', 4220000, 4075000),
  pc('PC-26', 'i7 12700', 'PA 120SE', 'B760M-K', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '750W', 'RTX 5060', '512GB NVMe', 4105000, 3975000),
  pc('PC-27', 'i7 14700F', '360MM', 'B760 PRO', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4', '750W', 'RTX 5060', '1TB NVMe', 5020000, 4870000),
  pc('PC-28', 'i7 14700F', '360MM LIQUID', 'B760 PRO', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4', '750W', 'RTX 5060Ti', '1TB NVMe', 5270000, 5120000),
  pc('PC-29', 'Ultra 7 265K', '360MM LIQUID', 'B860', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4', '750W', 'RTX 5060Ti', '1TB NVMe', 5310000, 5170000),
  pc('PC-30', 'i7 14700F', '360MM LIQUID', 'B760 PRO', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4', '750W', 'RTX 5060', '1TB NVMe', 5020000, 4870000),

  // High-end Intel (Z790, Z890)
  pc('PC-31', 'i7 14700F', '360MM LIQUID', 'Z790', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4', '750W', 'RTX 5060Ti', '1TB NVMe', 5570000, 5420000),
  pc('PC-32', 'i7 14700F', '360MM LIQUID', 'Z790', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4', '850W', 'RTX 5070', '1TB NVMe', 6490000, 6270000),
  pc('PC-33', 'Ultra 7 265K', '360MM LIQUID', 'Z890', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '850W', 'RTX 5070', '1TB NVMe', 7440000, 7290000),
  pc('PC-34', 'Ultra 7 265K', '360MM LIQUID', 'Z890', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '1200W', 'RTX 5070Ti', '1TB NVMe', 8960000, 8810000),
  pc('PC-35', 'Ultra 9 285K', '360MM LIQUID', 'Z890', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '1050W', 'RTX 5070', '1TB NVMe', 8750000, 8260000),
  pc('PC-36', 'Ultra 9 285K', '360MM LIQUID', 'Z890', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '1050W', 'RTX 5070Ti', '1TB NVMe', 9930000, 9710000),

  // Ryzen 7 7800X3D (Gaming king)
  pc('PC-37', 'Ryzen 7 7800X3D', 'PA 120SE', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '750W', 'RTX 5060', '512GB NVMe', 4615000, 4315000),
  pc('PC-38', 'Ryzen 7 7800X3D', 'PA 120SE', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '750W', 'RTX 4060Ti', '512GB NVMe', 4615000, 4415000),
  pc('PC-39', 'Ryzen 7 7800X3D', 'PA 120SE', 'B650M-F', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 3', '750W', 'RTX 5060', '512GB NVMe', 4860000, 4640000),
  pc('PC-40', 'Ryzen 7 7800X3D', '360MM LIQUID', 'B650M-F', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4', '750W', 'RTX 5060Ti', '512GB NVMe', 5095000, 4775000),
  pc('PC-41', 'Ryzen 7 7800X3D', 'PA 120SE', 'B650M-F', 'DDR5 32GB', 'TTAKE F4', 'LED FAN 3', '850W', 'RTX 5070', '512GB NVMe', 6685000, 6215000),

  // Ryzen 9 + High-end (9950X, 9800X3D, 9950X3D)
  pc('PC-42', 'Ryzen 9 9950X', '360MM LIQUID', 'B850', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '850W', 'RTX 5060Ti', '1TB NVMe', 6840000, 6500000),
  pc('PC-43', 'Ryzen 7 9800X3D', '360MM LIQUID', 'B850', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '850W', 'RTX 4070', '1TB NVMe', 6400000, 6400000),
  pc('PC-44', 'Ryzen 9 9950X', '360MM LIQUID', 'B850', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '850W', 'RTX 4070', '1TB NVMe', 6990000, 6650000),
  pc('PC-45', 'Ryzen 7 9800X3D', '360MM LIQUID', 'B850', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '850W', 'RTX 5070', '1TB NVMe', 7690000, 7100000),
  pc('PC-46', 'Ryzen 9 9950X', '360MM LIQUID', 'B850', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '850W', 'RTX 5070', '1TB NVMe', 7740000, 7350000),
  pc('PC-47', 'Ryzen 9 9950X3D', '360MM LIQUID', 'X870', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '850W', 'RTX 5070', '1TB NVMe', 9120000, 8880000),
  pc('PC-48', 'Ryzen 9 9950X3D', '360MM LIQUID', 'X870', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4', '1050W', 'RTX 5070Ti', '1TB NVMe', 10560000, 10400000),

  // Intel Budget (14400F DDR5)
  pc('PC-49', 'i5 14400F', 'T400K', 'H610H2 D5', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 1X', '650W', 'RTX 4060', '512GB nvme', 3565000, 3415000),
  pc('PC-50', 'i5 14400F', 'T400K', 'H610H2 D5', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 1X', '650W', 'RTX 4060Ti', '512GB nvme', 3865000, 3715000),
  pc('PC-51', 'i5 14400F', 'T400K', 'H610H2 D5', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 1X', '650W', 'RTX 5060', '512GB nvme', 3715000, 3615000),
  pc('PC-52', 'i5 14400F', 'T400K', 'H610H2 D5', 'DDR5 16GB', 'TTAKE F4', 'LED FAN 1X', '650W', 'RTX 5060Ti', '512GB nvme', 4015000, 3865000),
  pc('PC-53', 'i5 14400F', 'T400', 'H610H2 D5', 'DDR5 16GB', 'ATX CASE', 'ARGB FAN 1x', '650W', 'RTX 5060', '1TB nvme', 3955000, 3840000),

  // Intel Mid-high (13700F, 14700F, Ultra)
  pc('PC-54', 'i7 13700F', '360MM Liquid', 'B760 D5', 'DDR5 16GB', 'ATX CASE', 'ARGB FAN 3x', '750W', 'RTX 5060Ti', '512GB nvme', 4765000, 4685000),
  pc('PC-55', 'i7 14700F', '360MM Liquid', 'B760 H2', 'DDR5 16GB', 'MID TOWER', 'ARGB 3X', '750W', 'RTX 5060Ti', '512GB nvme', 4870000, 4785000),
  pc('PC-56', 'i7 14700F', '360MM Liquid', 'B760 H2', 'DDR5 16GB', 'MID TOWER', 'ARGB 3X', '850W', 'RTX 4070', '512GB nvme', 5200000, 5055000),
  pc('PC-57', 'i7 14700F', '360MM Liquid', 'B760M H2', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4X', '850W', 'RTX 5070', '512GB nvme', 5965000, 5755000),

  // Intel Ultra (265K, 285K)
  pc('PC-58', 'Ultra 7 265K', '360MM Liquid', 'B860M', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4X', '850W', 'RTX 5060Ti', '1TB nvme', 5555000, 5290000),
  pc('PC-59', 'Ultra 7 265K', '360MM Liquid', 'B860M', 'DDR5 16GB', 'MID TOWER', 'ARGB FAN 4X', '850W', 'RTX 4070', '512GB nvme', 5550000, 5215000),
  pc('PC-60', 'Ultra 9 285K', '360MM Liquid', 'B860M', 'DDR5 32GB', 'MID TOWER', 'ARGB FAN 4X', '750W', 'RTX 5060Ti', '1TB nvme', 7070000, 6870000),
];

// ===== All Ready PCs combined =====
export const readyPCs: ReadyPC[] = [...pcs1to12, ...pcs13to60];

// ===== Other products =====
export const products: Product[] = [
  {
    id: 101,
    name: 'AMD Ryzen 7 7800X3D',
    category: 'Эд анги',
    specs: '8 Cores / 16 Threads / 5.0GHz Boost / AM5',
    price: 1450000,
    image: 'https://placehold.co/400x300/0A0E27/94A3B8?text=Ryzen+7+7800X3D',
  },
  {
    id: 102,
    name: 'ASUS RTX 4070 OC',
    category: 'Эд анги',
    specs: '12GB GDDR6X / 192-bit / 2550MHz Boost',
    price: 3200000,
    image: 'https://placehold.co/400x300/0A0E27/94A3B8?text=ASUS+RTX+4070',
  },
  {
    id: 103,
    name: 'Corsair 32GB DDR5 RGB',
    category: 'Эд анги',
    specs: '2x16GB / 6000MHz / CL36 / RGB',
    price: 520000,
    image: 'https://placehold.co/400x300/0A0E27/94A3B8?text=Corsair+32GB+DDR5',
  },
  {
    id: 104,
    name: 'Samsung 27" Odyssey G5',
    category: 'Дэлгэц',
    specs: '2560x1440 / 165Hz / 1ms / Curved',
    price: 1100000,
    image: 'https://placehold.co/400x300/0A0E27/00E5FF?text=Samsung+27+G5',
  },
  {
    id: 105,
    name: 'LG 24" UltraGear',
    category: 'Дэлгэц',
    specs: '1920x1080 / 144Hz / 1ms / IPS',
    price: 680000,
    image: 'https://placehold.co/400x300/0A0E27/00E5FF?text=LG+24+UltraGear',
  },
  {
    id: 106,
    name: 'Razer Huntsman V2',
    category: 'Дагалдах',
    specs: 'Optical switches / RGB / PBT Keycaps',
    price: 480000,
    image: 'https://placehold.co/400x300/0A0E27/A78BFA?text=Razer+Huntsman',
  },
  {
    id: 107,
    name: 'Logitech G Pro X Superlight',
    category: 'Дагалдах',
    specs: 'Wireless / 25K DPI / 63g / White',
    price: 380000,
    image: 'https://placehold.co/400x300/0A0E27/A78BFA?text=G+Pro+X+Superlight',
  },
  {
    id: 108,
    name: 'HyperX Cloud III Wireless',
    category: 'Дагалдах',
    specs: 'Wireless / 120h Battery / DTS Headphone:X',
    price: 520000,
    image: 'https://placehold.co/400x300/0A0E27/A78BFA?text=HyperX+Cloud+III',
  },
];

export const categories = [
  'Бүгд',
  'Бэлэн PC',
  'Эд анги',
  'Дэлгэц',
  'Дагалдах',
];
