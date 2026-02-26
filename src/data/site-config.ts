import { 
  Home, Building2, GraduationCap, Server, Coffee, 
  Gamepad2, Laptop, Tv, Upload, MessageCircle,
  Facebook, Instagram, Video // Social icons
} from 'lucide-react';

// Icon mapping for client components
export const iconMap = {
  Home,
  Building2,
  GraduationCap,
  Server,
  Coffee,
  Gamepad2,
  Laptop,
  Tv,
  Upload,
  MessageCircle,
  Facebook,
  Instagram,
  Video
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
      desc: 'Kembangkan Bisnis Anda Berama Kami',
      icon: 'Building2',
      plans: [
        { name: 'BASIC', speed: '50 Mbps', price: '600.000', features: ['+ 1 Router Paralel', 'Cocok untuk Usaha Kecil'] },
        { name: 'SMALL', speed: '100 Mbps', price: '900.000', features: ['+ 1 Router Paralel', 'Cocok untuk Ruko/Kantor'] },
        { name: 'MEDIUM', speed: '150 Mbps', price: '1.300.000', features: ['+ 2 Router Paralel', 'Cocok untuk Bisnis Menengah'], popular: true },
        { name: 'ADVAN', speed: '200 Mbps', price: '1.600.000', features: ['+ 2 Router Paralel', 'Cocok untuk Kantor Besar'] },
      ]
    },
    cafe: {
      title: 'Paket Cafe',
      desc: 'Maksimalkan Bisnis Cafe Anda Dengan Koneksi Stabil',
      icon: 'Coffee',
      plans: [
        { name: 'LITE', speed: '50 Mbps', price: '555.000', features: ['Koneksi Office Up To 50 Mbps', 'Koneksi Free WiFi Up To 100 Mbps'] },
        { name: 'BASIC', speed: '75 Mbps', price: '888.000', features: ['Koneksi Office Up To 75 Mbps', 'Koneksi Free WiFi Up To 150 Mbps'], popular: true },
        { name: 'ADVANCED', speed: '100 Mbps', price: '1.110.000', features: ['Koneksi Office Up To 100 Mbps', 'Koneksi Free WiFi Up To 200 Mbps'] },
      ]
    },
    school: {
      title: 'Paket Sekolah',
      desc: 'Menggapai Masa Depan Bersama Kami',
      icon: 'GraduationCap',
      plans: [
        { name: 'Educate 50', speed: '50 Mbps', price: '2.500.000', features: ['Koneksi stabil dan cepat', 'Prioritas traffic untuk pendidikan'] },
        { name: 'Educate 100', speed: '100 Mbps', price: '3.500.000', features: ['Static IP Address', 'Dukungan teknis prioritas (SLA)', '1 Wi-Fi Access Point profesional', 'Diskon khusus edukasi center 3x pertemuan'], popular: true },
        { name: 'Educate 200', speed: '200 Mbps', price: '6.000.000', features: ['2 Wi-Fi Access Point profesional', 'Firewall dan Keamanan jaringan', 'Konsultasi Gratis infrastruktur IT', 'Diskon khusus edukasi center 7x pertemuan'] },
      ]
    },
    dedicated: {
      title: 'Paket Dedicated',
      desc: 'Internet Dedicated Untuk Kebutuhan Bisnis Professional',
      icon: 'Server',
      plans: [
        { name: 'OFFICE LOW', speed: '25 Mbps', price: '1.500.000', features: ['Unlimited Kuota', 'IP Public by Request'] },
        { name: 'OFFICE MEDIUM', speed: '50 Mbps', price: '2.850.000', features: ['Unlimited Kuota', 'IP Public by Request'], popular: true },
        { name: 'OFFICE HIGH', speed: '100 Mbps', price: '5.000.000', features: ['Unlimited Kuota', 'IP Public by Request'] },
        { name: 'OFFICE HIGH UP', speed: '100 Mbps - 10 Gbps', price: 'Call Us', features: ['Unlimited Kuota', 'IP Public by Request'] },
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
    subtitle: '#juaranyawifi - Rasakan masa depan internet dengan Perkasa Networks. Jaringan handal, kecepatan stabil, dan memberikan pelayanan terbaik untuk anda.',
    slides: [
      "/hero-1.png",
      "/hero-2.png",
      "/hero-3.jpg",
      "/hero-4.jpg",
      "/hero-5.png"
    ]
  },

  // 6. FEATURES SECTION
  features: {
    title: 'Dirancang untuk',
    highlight: 'Performa',
    description: 'Infrastruktur kami dibangun dengan teknologi fiber optic generasi terbaru untuk memberikan koneksi yang maksimal.',
    items: [
      {
        title: 'Optimal untuk Gaming',
        description: 'Routing prioritas untuk server game populer. Ping rendah, minim packet loss.',
        icon: 'Gamepad2',
        color: 'text-perkasa-red',
        colSpan: 'md:col-span-2',
        bg: 'bg-red-900/10',
        border: 'hover:border-red-500/50',
      },
      {
        title: 'Kecepatan Simetris',
        description: 'Kecepatan upload setara dengan download. Sempurna untuk kreator.',
        icon: 'Upload',
        color: 'text-perkasa-blue',
        colSpan: 'md:col-span-1',
        bg: 'bg-blue-900/10',
        border: 'hover:border-blue-500/50',
      },
      {
        title: 'Streaming 4K/8K',
        description: 'Streaming tanpa buffering untuk Netflix, YouTube, dan lainnya.',
        icon: 'Tv',
        color: 'text-perkasa-red',
        colSpan: 'md:col-span-1',
        bg: 'bg-red-900/10',
        border: 'hover:border-red-500/50',
      },
      {
        title: 'Bandwidth Terdedikasi',
        description: 'Tidak dibagi dengan tetangga. Kecepatan Anda terjamin 24/7.',
        icon: 'Laptop',
        color: 'text-perkasa-blue',
        colSpan: 'md:col-span-1',
        bg: 'bg-blue-900/10',
        border: 'hover:border-blue-500/50',
      },
      {
        title: 'Support 24 Jam',
        description: 'Bantuan teknis siap sedia kapanpun. Klik untuk chat WhatsApp sekarang.',
        icon: 'MessageCircle',
        color: 'text-green-500',
        colSpan: 'md:col-span-1',
        bg: 'bg-green-900/10',
        border: 'hover:border-green-500/50 cursor-pointer',
        href: 'https://wa.me/6282225500100',
      }
    ]
  },

  // 7. FOOTER SECTION
  footer: {
    socials: [
      { name: '081252000220', link: 'https://wa.me/6281252000220', icon: 'Whatsapp', color: 'text-green-400', bgHover: 'group-hover:bg-green-500/20' },
      { name: 'perkasa_networks', link: 'https://instagram.com/perkasa_networks', icon: 'Instagram', color: 'text-pink-400', bgHover: 'group-hover:bg-pink-500/20' },
      { name: 'perkasa networks', link: 'https://facebook.com/perkasa.networks', icon: 'Facebook', color: 'text-blue-400', bgHover: 'group-hover:bg-blue-500/20' },
      { name: 'perkasa.networks', link: 'https://tiktok.com/@perkasa.networks', icon: 'Video', color: 'text-white', bgHover: 'group-hover:bg-white/20' } // Using Video icon as placeholder for TikTok if not available in lucide-react mapping or use custom SVG in component
    ],
    copyright: '© 2020 PT Mega Data Perkasa. All rights reserved.',
    links: [
      { name: 'Kebijakan Privasi', href: '#' },
      { name: 'Syarat Layanan', href: '#' }
    ]
  },

  // 8. COMPANY PROFILE
  company: {
    name: 'PT Mega Data Perkasa',
    shortName: 'Perkasa Networks',
    foundedYear: 2020,
    customers: '5000+',
    address: 'Perumahan Kebun Bibit Buah Blok A No 1, Sidokerto, Pati, Jawa Tengah 59111',
    mapsUrl: 'https://maps.app.goo.gl/FHfDjLpTrqNUKr7W8',
    email: 'callcentre@perkasa.net.id',
    link: 'https://mail.google.com',
    phone: '0812-5200-0220', 
    link: 'https://wa.me/6281252000220',
    description: [
      'Berawal dari sebuah impian besar, serta pengalaman kerja yang cukup banyak di bidang IT dan sistem komunikasi yang telah berkembang selama lebih dari 10 tahun di berbagai perusahaan lokal maupun nasional maka didirikanlah PT. Mega Data Perkasa dengan nama brand Perkasa Networks yang bergerak dalam semua layanan solusi IT dan Komunikasi (Pengadaan, Jasa, Konsultan, Internet Content/Provider, Instalasi dan Maintenance System).',
      'Dengan berbekal pengalaman yang telah terlatih, teruji, profesional, kreatif dan memiliki sertifikat teknis tingkat nasional. Kami selalu berusaha meningkatkan mutu dan layanan untuk menjaga kepuasan pelanggan terhadap service yang di berikan oleh Perkasa Networks agar dapat menjadi solusi dengan hasil yang memuaskan.'
    ],
    vision: 'Menjadi pelopor ekosistem digital masadepan di Indonesia, yang menghadirkan konektivitas tanpa batas, smart home inovatif, teknologi modern yang mutakhir untuk menciptakan kehidupan yang lebih ramah, cerdas, aman, dan efisien.',
    mission: [
      'Membangun dan mengelola infrastruktur jaringan yang handal, cepat, stabil, efektif dan efisien untuk memastikan akses digital yang merata dan berkualitas tinggi bagi seluruh pelanggan.',
      'Merancang dan menghadirkan produk serta layanan smart home yang intuitif, aman, dan dapat meningkatkan kenyamanan, efisiensi energi, dan keamanan hunian.',
      'Mengedukasi dan memfasilitasi masyarakat serta bisnis dalam memanfaatkan potensi penuh teknologi Internet of Things (IoT) dan aplikasi berbasis internet lainnya untuk transformasi digital.',
      'Menjadi mitra terpercaya bagi pelanggan dengan menyediakan dukungan teknis yang responsif, solusi yang efektif efisien, dan pengalaman layanan yang memuaskan.',
      'Terus melakukan riset dan pengembangan untuk mengadopsi teknologi terbaru, mengantisipasi kebutuhan pasar, dan menghadirkan solusi masa depan yang relevan.'
    ],
    licenses: [
      'ASN 141636',
      'SKLO 0155/TEL.04.02/2022',
      'IZIN ISP 02600102429360002',
      'NIB 0260010242936',
      'AHU-0218054.AH.01.11.Tahun2020',
      'AKTA PENDIRIAN No. 26 17 Desember 2020',
      'Merk Terdaftar IDM001076147'
    ]
  }
};
