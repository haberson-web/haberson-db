import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-zinc-200 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="select-none font-extrabold text-2xl">
              <span className="text-white">Son</span>
              <span className="text-red-600">Haber</span>
            </Link>
            <p className="text-sm text-zinc-400">
              Türkiye ve dünyadan en son gelişmeleri, tarafsız ve hızlı bir şekilde sunan haber portalı.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Kategoriler</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/general" className="hover:text-white transition">Gündem</Link></li>
              <li><Link href="/category/business" className="hover:text-white transition">Ekonomi</Link></li>
              <li><Link href="/category/sports" className="hover:text-white transition">Spor</Link></li>
              <li><Link href="/category/technology" className="hover:text-white transition">Teknoloji</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Kurumsal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Hakkımızda</Link></li>
              <li><Link href="#" className="hover:text-white transition">Künye</Link></li>
              <li><Link href="#" className="hover:text-white transition">İletişim</Link></li>
              <li><Link href="#" className="hover:text-white transition">Reklam</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Bülten</h3>
            <p className="text-sm text-zinc-400 mb-4">
              En önemli gelişmelerden haberdar olmak için e-bültenimize abone olun.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="bg-zinc-800 border-none rounded px-3 py-2 text-sm w-full focus:ring-1 focus:ring-red-600 outline-none text-white placeholder-zinc-500"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold transition">
                Kayıt
              </button>
            </div>
          </div>

        </div>
        
        <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} SonHaber. Tüm hakları saklıdır.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link href="#" className="hover:text-zinc-300">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-zinc-300">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
