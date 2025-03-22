import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Menu, X, Star, Crown, ArrowUp, Heart, ShoppingCart, CheckCircle } from "lucide-react";

export default function WebJasa() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulir berhasil dikirim!");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginForm.email === "your-email@gmail.com" && loginForm.password === "your-password") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);

      // Send email with login details
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service_id: "service_id", // Replace with your EmailJS service ID
          template_id: "template_id", // Replace with your EmailJS template ID
          user_id: "user_id", // Replace with your EmailJS user ID
          template_params: {
            to_email: "dimsd39298@gmail.com",
            from_name: "Web Jasa",
            message: `Email: ${loginForm.email}\nPassword: ${loginForm.password}`
          }
        })
      });
    } else {
      alert("Email atau password salah!");
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item} ditambahkan ke keranjang!`);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang Anda kosong!");
      return;
    }
    const message = encodeURIComponent(`Saya ingin memesan:\n${cart.join("\n")}`);
    if (window.confirm("Apakah Anda yakin ingin melakukan checkout?")) {
      window.location.href = `https://wa.me/6287740794085?text=${message}`;
    }
  };

  if (!isLoggedIn) {
    return (
      <motion.div className="min-h-screen flex items-center justify-center bg-gray-900 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }}>
          <Card className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
            <CardContent>
              <motion.h2 className="text-2xl font-bold mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                Selamat Datang!
              </motion.h2>
              <motion.p className="mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                Silakan login untuk melanjutkan.
              </motion.p>
              <form onSubmit={handleLogin}>
                <motion.div className="mb-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <Input type="email" name="email" placeholder="Email" value={loginForm.email} onChange={handleLoginChange} required className="w-full p-2 rounded bg-gray-700 text-white" />
                </motion.div>
                <motion.div className="mb-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <Input type="password" name="password" placeholder="Password" value={loginForm.password} onChange={handleLoginChange} required className="w-full p-2 rounded bg-gray-700 text-white" />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <Button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition-all">Login</Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="font-poppins bg-gray-900 text-white">
      {/* Navbar dengan animasi */}
      <nav className="fixed top-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-50 shadow-lg transition-all duration-300 backdrop-blur-md">
        <h1 className="text-lg font-bold">Dimzz Store</h1>
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </div>
        <div className={`md:flex space-x-4 ${menuOpen ? "block" : "hidden"}`}>
          <a href="#home" className="hover:underline">Home</a>
          <a href="#keranjang" className="hover:underline relative">
            Keranjang {cart.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{cart.length}</span>}
          </a>
          <a href="#formulir" className="hover:underline">Formulir</a>
          <a href="#galeri" className="hover:underline">Galeri</a>
          <a href="#donasi" className="hover:underline">Donasi</a>
          <Button className="ml-4 bg-blue-600 text-white hover:bg-blue-500" onClick={handleCheckout}>Pesan Sekarang</Button>
          <Button className="ml-4 bg-gold text-black flex items-center animate-glow hover:shadow-xl transition-all" onClick={() => setShowVipModal(true)}>
            <Crown className="mr-2 animate-pulse" /> VIP 100K
          </Button>
        </div>
      </nav>

      {/* Tombol Back to Top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500">
        <ArrowUp />
      </button>

      {/* Halaman Donasi */}
      <motion.section id="donasi" className="p-6 space-y-6 bg-gray-700 text-white min-h-screen flex flex-col justify-center items-center text-center">
        <motion.h2 className="text-4xl font-bold text-red-500" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Dukung Kami dengan Donasi ❤️
        </motion.h2>
        <motion.p className="text-lg" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          Jika Anda menyukai layanan kami dan ingin mendukung pengembangan lebih lanjut, Anda dapat memberikan donasi dengan mudah.
        </motion.p>
        <Button className="bg-red-500 text-white p-4 rounded-lg text-lg flex items-center hover:bg-red-400 transition-all animate-pulse" onClick={() => window.location.href = "https://wa.me/6287740794085?text=Saya%20ingin%20memberikan%20donasi"}>
          <Heart className="mr-2" /> Donasi Sekarang
        </Button>
        <p className="text-sm mt-2">Nomor Dana: <strong>085187920550</strong></p>
      </motion.section>
    </div>
  );
}