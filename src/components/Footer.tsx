import { Facebook, Instagram, MapPin, Phone, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0B0F19] text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-perkasa-red via-white to-perkasa-blue bg-clip-text text-transparent inline-block">PERKASA NETWORKS</h3>
            <p className="text-gray-400 font-medium mb-4">Penyedia Layanan Internet</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Penyedia layanan internet (ISP) terpercaya dengan jaringan fiber optic berkualitas. <span className="font-bold"><span className="text-perkasa-red">#</span><span className="text-perkasa-blue">juaranya</span><span className="text-perkasa-red">wifi</span></span>
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/perkasanetworks" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-perkasa-blue transition-colors" title="Facebook"><Facebook size={20} /></a>
              <a href="https://instagram.com/perkasa_networks" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-perkasa-red transition-colors" title="Instagram"><Instagram size={20} /></a>
              <a href="https://tiktok.com/@perkasa.networks" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="TikTok"><Video size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#pricing" className="hover:text-perkasa-blue transition-colors">Internet Rumah</a></li>
              <li><a href="#pricing" className="hover:text-perkasa-blue transition-colors">Internet Bisnis</a></li>
              <li><a href="#" className="hover:text-perkasa-blue transition-colors">Dedicated Server</a></li>
              <li><a href="#" className="hover:text-perkasa-blue transition-colors">Instalasi CCTV</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-perkasa-blue transition-colors">Cek Tagihan</a></li>
              <li><a href="#" className="hover:text-perkasa-blue transition-colors">Lapor Gangguan</a></li>
              <li><a href="#" className="hover:text-perkasa-blue transition-colors">Panduan Pembayaran</a></li>
              <li><a href="#" className="hover:text-perkasa-blue transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-perkasa-red" />
                <span>Kantor Pusat: Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-perkasa-red" />
                <a href="https://wa.me/6281252000220" className="hover:text-white transition-colors">0812-5200-0220 (WhatsApp)</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xs text-gray-500">IG: @perkasa_networks</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Perkasa Networks. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
