import { Home, Building2, GraduationCap, Server, Coffee } from 'lucide-react';

// Icon mapping for client components
export const iconMap = {
  Home,
  Building2,
  GraduationCap,
  Server,
  Coffee
};

export const siteConfig = {
  // 1. ANNOUNCEMENT BAR (Top Bar)
  announcement: {
    active: true,
    badge: 'PROMO',
    text: 'Gratis Biaya Instalasi + Diskon 6,7% Untuk Pemasangan Baru Paket Home Lite!',
    link: '#pricing', // Optional link when clicked
  },

  // 2. PRICING PACKAGES
  packages: {
    home: {
      title: 'Paket Home',
      desc: 'Internet rumah cepat-stabil untuk keluarga',
      icon: 'Home',
      plans: [
        { 
          name: 'HOME LITE', 
          speed: '12.5 Mbps', 
          price: '125.000', 
          features: ['Kuota Unlimited', 'Ideal untuk 3 Perangkat', 'Bundling 3 Bulan Pasang Baru (Diskon Rp 25.000)'] 
        },
        { 
          name: 'HOME BASIC', 
          speed: '25 Mbps', 
          price: '166.500', 
          features: ['Kuota Unlimited', 'Ideal untuk 6 Perangkat', 'Paling Laris'], 
          popular: true 
        },
        { 
          name: 'HOME STREAM', 
          speed: '35/55 Mbps', 
          price: '200.000', 
          features: ['Kuota Unlimited', 'Ideal untuk 10 Perangkat', 'Upload hingga 55 Mbps'] 
        },
        { 
          name: 'HOME ENTERTAIN', 
          speed: '60 Mbps', 
          price: '260.000', 
          features: ['Kuota Unlimited', 'Ideal untuk 20 Perangkat', 'Siap Streaming 4K'] 
        },
        { 
          name: 'HOME SMALL', 
          speed: '100 Mbps', 
          price: '325.000', 
          features: ['Kuota Unlimited', 'Ideal untuk 30 Perangkat', 'Optimal untuk Gaming'] 
        },
        { 
          name: 'HOME ADVAN', 
          speed: '125 Mbps', 
          price: '465.000', 
          features: ['Kuota Unlimited', 'Ideal untuk 40 Perangkat', 'Performa Pro'] 
        },
      ]
    },
    umkm: {
      title: 'Paket UMKM',
      desc: 'Solusi bisnis berkembang dengan koneksi stabil',
      icon: 'Building2',
      plans: [
        { name: 'UMKM STARTER', speed: '20 Mbps', price: '250.000', features: ['Cocok untuk Warung/Cafe Kecil', 'Support POS System', 'IP Dynamic Public'] },
        { name: 'UMKM BUSINESS', speed: '50 Mbps', price: '450.000', features: ['Cocok untuk Kantor Kecil (10 Staff)', 'Prioritas Traffic Bisnis', 'Support CCTV Online'], popular: true },
        { name: 'UMKM PRO', speed: '100 Mbps', price: '750.000', features: ['Cocok untuk Cafe Ramai/Co-working', 'High Concurrent Users', 'Bandwidth Management Support'] },
      ]
    },
    cafe: {
      title: 'Paket Cafe',
      desc: 'WiFi kencang untuk kenyamanan pelanggan cafe & resto',
      icon: 'Coffee',
      plans: [
        { name: 'CAFE STARTER', speed: '30 Mbps', price: '300.000', features: ['Cocok untuk Coffee Shop Kecil', 'Landing Page Login Support', 'Limit Bandwidth per User'] },
        { name: 'CAFE HANGOUT', speed: '75 Mbps', price: '550.000', features: ['Cocok untuk Cafe Ramai (50+ User)', 'Voucher WiFi System Support', 'Prioritas Gaming Mobile'], popular: true },
        { name: 'CAFE PREMIUM', speed: '150 Mbps', price: '900.000', features: ['Cocok untuk Resto Besar/Lounge', 'Dedicated IP Public', 'Mikrotik Management Support'] },
      ]
    },
    school: {
      title: 'Paket Sekolah',
      desc: 'Koneksi edukasi stabil untuk pembelajaran digital',
      icon: 'GraduationCap',
      plans: [
        { name: 'EDUNET BASIC', speed: '50 Mbps', price: 'Call Us', features: ['Akses E-Learning Cepat', 'Filter Konten Negatif', 'Support ANBK'] },
        { name: 'EDUNET PRO', speed: '100 Mbps', price: 'Call Us', features: ['Lab Komputer Ready', 'Ujian Online Stabil', 'Prioritas Akses Edukasi'], popular: true },
        { name: 'EDUNET MAX', speed: '200+ Mbps', price: 'Call Us', features: ['Full Campus Coverage', 'Dedicated Bandwidth Option', 'SLA Jaminan Koneksi'] },
      ]
    },
    dedicated: {
      title: 'Paket Dedicated',
      desc: 'Bandwidth prioritas 1:1 untuk performa maksimal',
      icon: 'Server',
      plans: [
        { name: 'CORP LITE', speed: '10 Mbps', price: 'Call Us', features: ['Bandwidth 1:1 (Simetris)', 'SLA 99.5%', 'IP Public Static /29', '24/7 Priority Support'] },
        { name: 'CORP STANDARD', speed: '20 Mbps', price: 'Call Us', features: ['Bandwidth 1:1 (Simetris)', 'SLA 99.8%', 'IP Public Static /29', 'MRTG Monitoring'], popular: true },
        { name: 'CORP ULTIMATE', speed: 'Custom', price: 'Call Us', features: ['Bandwidth Custom (hingga 10Gbps)', 'SLA 99.9%', 'IP Public Custom', 'Fiber Optic Direct Core'] },
      ]
    }
  },

  // 3. TESTIMONIALS
  testimonials: [
    {
      name: 'Budi Santoso',
      role: 'Gamer & Streamer',
      text: 'Ping stabil banget buat main Valorant, gak pernah RTO lagi. Upload speed simetris jadi live streaming lancar jaya!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop'
    },
    {
      name: 'Siti Aminah',
      role: 'Pemilik Cafe',
      text: 'Paket Cafe-nya mantap. Pelanggan senang wifi kencang, omzet naik karena banyak yang betah nongkrong lama.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
    },
    {
      name: 'SMK Tunas Bangsa',
      role: 'Kepala Sekolah',
      text: 'Ujian online (ANBK) berjalan sangat lancar dengan Paket Sekolah Dedicated. Support teknisnya juga fast respon 24 jam.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'
    },
    {
      name: 'Rian Pratama',
      role: 'Freelancer',
      text: 'Upload file bergiga-giga ke client cepet banget. Harga segini dapet speed simetris itu worth it parah!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'
    },
    {
      name: 'Dewi Lestari',
      role: 'Ibu Rumah Tangga',
      text: 'Anak-anak sekolah online lancar, suami WFH aman, saya streaming drakor juga gak buffering. Paket Home Basic udah cukup banget.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop'
    }
  ],

  // 4. FAQ
  faqs: [
    {
      question: 'Apakah ada biaya pemasangan awal?',
      answer: 'Saat ini kami sedang ada promo GRATIS biaya instalasi senilai Rp 250.000 untuk pelanggan baru di area tercover. Syarat dan ketentuan berlaku.',
    },
    {
      question: 'Berapa lama proses pemasangan?',
      answer: 'Proses pemasangan biasanya memakan waktu 1-3 hari kerja setelah survei lokasi dilakukan dan dinyatakan tercover jaringan kami.',
    },
    {
      question: 'Apakah koneksi Perkasa Networks stabil saat hujan?',
      answer: 'Ya, karena kami menggunakan 100% kabel Fiber Optic (bukan wireless/radio), koneksi tetap stabil di segala cuaca, termasuk hujan deras.',
    },
    {
      question: 'Bagaimana jika saya mengalami gangguan?',
      answer: 'Tim support kami siap membantu 24/7. Anda bisa menghubungi kami via WhatsApp atau telepon, dan teknisi akan segera melakukan perbaikan jika diperlukan.',
    },
    {
      question: 'Apakah ada batasan kuota (FUP)?',
      answer: 'TIDAK ADA. Semua paket internet Perkasa Networks adalah TRUE UNLIMITED tanpa batasan kuota (FUP). Anda bebas download/upload sepuasnya.',
    }
  ],

  // 5. HERO SLIDESHOW
  hero: {
    badge: 'Fiber Optic Berkecepatan Tinggi',
    title: {
      first: 'Connect',
      second: 'Your',
      third: 'Future'
    },
    slides: [
      "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2000&auto=format&fit=crop", // Data Center
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop", // Abstract Tech
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop", // Connectivity
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop", // Speed/Light
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"  // Cybersecurity/Tech
    ]
  },

  // 6. COMPANY PROFILE
  company: {
    name: 'PT Mega Data Perkasa',
    shortName: 'Perkasa Networks',
    foundedYear: 2020,
    customers: '5000+',
    address: 'Perumahan Kebun Bibit Buah Blok A No 1, Sidokerto, Pati, Jawa Tengah 59111',
    mapsUrl: 'https://maps.google.com/?q=Perumahan+Kebun+Bibit+Buah+Blok+A+No+1+Sidokerto+Pati',
    email: 'info@perkasanetworks.co.id',
    phone: '+62 812-5200-0220',
    description: 'Perkasa Networks adalah penyedia layanan internet (ISP) berbasis Fiber Optic yang berkomitmen menghadirkan konektivitas stabil, cepat, dan terjangkau untuk masyarakat Indonesia. Kami hadir untuk mendukung transformasi digital mulai dari rumah, sekolah, hingga sektor bisnis.',
    vision: 'Menjadi ISP pilihan utama yang menghubungkan seluruh pelosok negeri dengan internet berkualitas.',
    mission: [
      'Menyediakan infrastruktur Fiber Optic yang handal dan luas.',
      'Memberikan pelayanan pelanggan yang responsif dan solutif.',
      'Menghadirkan inovasi teknologi internet terbaru dengan harga kompetitif.',
      'Mendukung pertumbuhan ekonomi digital UMKM dan pendidikan.'
    ],
    licenses: [
      'Izin Penyelenggaraan Jasa Akses Internet (ISP) No. XX/Kominfo/2020',
      'Anggota APJII (Asosiasi Penyelenggara Jasa Internet Indonesia)'
    ]
  }
};
