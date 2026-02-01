import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      <Hero />
      <Pricing />
      
      {/* Call to Action Section (Simplified Contact) */}
      <section className="py-20 bg-gradient-to-r from-perkasa-blue to-perkasa-red text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Siap Berlangganan Internet Cepat?</h2>
          <p className="text-blue-50 text-lg mb-8">
            Jangan biarkan internet lambat menghambat produktivitas Anda. Gabung dengan Perkasa Networks sekarang!
          </p>
          <button className="bg-white text-perkasa-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Hubungi Sales via WhatsApp
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
