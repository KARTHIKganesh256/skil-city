"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with traditional patterns */}
      <div className="absolute inset-0">
        {/* Try to use the login background image if it exists, otherwise use CSS patterns */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/login.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Fallback: Enhanced traditional patterns if image not found */}
          <div className="absolute inset-0">
            {/* Left side - Green background with detailed peacock patterns */}
            <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900">
              <div className="absolute inset-0 opacity-30">
                {/* Detailed Peacock with elaborate tail */}
                <div className="absolute top-8 left-8 w-40 h-40">
                  {/* Peacock body */}
                  <div className="absolute top-4 left-4 w-8 h-12 bg-yellow-400 rounded-full opacity-60"></div>
                  {/* Peacock head */}
                  <div className="absolute top-2 left-6 w-4 h-4 bg-yellow-400 rounded-full opacity-70"></div>
                  {/* Elaborate tail with multiple feathers */}
                  <div className="absolute top-8 left-12 w-24 h-32">
                    {/* Main tail feathers */}
                    <div className="absolute top-0 left-0 w-20 h-4 border-2 border-yellow-400 rounded-full opacity-60 transform rotate-12"></div>
                    <div className="absolute top-2 left-2 w-18 h-4 border-2 border-yellow-400 rounded-full opacity-50 transform rotate-8"></div>
                    <div className="absolute top-4 left-4 w-16 h-4 border-2 border-yellow-400 rounded-full opacity-60 transform rotate-4"></div>
                    <div className="absolute top-6 left-6 w-14 h-4 border-2 border-yellow-400 rounded-full opacity-50 transform rotate-2"></div>
                    <div className="absolute top-8 left-8 w-12 h-4 border-2 border-yellow-400 rounded-full opacity-60"></div>
                    {/* Tail feather eyes */}
                    <div className="absolute top-2 left-8 w-3 h-3 border border-yellow-300 rounded-full opacity-70"></div>
                    <div className="absolute top-4 left-10 w-2 h-2 border border-yellow-300 rounded-full opacity-60"></div>
                    <div className="absolute top-6 left-12 w-2 h-2 border border-yellow-300 rounded-full opacity-50"></div>
                  </div>
                </div>
                
                {/* Second Peacock */}
                <div className="absolute top-60 left-12 w-32 h-32">
                  <div className="absolute top-2 left-2 w-6 h-10 bg-yellow-400 rounded-full opacity-50"></div>
                  <div className="absolute top-0 left-4 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
                  <div className="absolute top-4 left-8 w-16 h-20">
                    <div className="absolute top-0 left-0 w-12 h-3 border-2 border-yellow-400 rounded-full opacity-50 transform rotate-15"></div>
                    <div className="absolute top-2 left-2 w-10 h-3 border-2 border-yellow-400 rounded-full opacity-40 transform rotate-10"></div>
                    <div className="absolute top-4 left-4 w-8 h-3 border-2 border-yellow-400 rounded-full opacity-50 transform rotate-5"></div>
                  </div>
                </div>

                {/* Lotus flowers with detailed petals */}
                <div className="absolute top-32 left-32 w-16 h-16">
                  <div className="absolute top-2 left-2 w-12 h-12 border-2 border-yellow-400 rounded-full opacity-60">
                    <div className="absolute inset-1 border border-yellow-300 rounded-full opacity-40"></div>
                  </div>
                  {/* Lotus petals */}
                  <div className="absolute top-4 left-1 w-3 h-6 border border-yellow-400 transform rotate-45 opacity-50"></div>
                  <div className="absolute top-1 left-4 w-3 h-6 border border-yellow-400 transform rotate-90 opacity-50"></div>
                  <div className="absolute top-4 left-7 w-3 h-6 border border-yellow-400 transform rotate-135 opacity-50"></div>
                  <div className="absolute top-7 left-4 w-3 h-6 border border-yellow-400 transform rotate-180 opacity-50"></div>
                </div>

                {/* Mandala patterns */}
                <div className="absolute top-80 left-20 w-20 h-20">
                  <div className="absolute top-2 left-2 w-16 h-16 border-2 border-yellow-400 rounded-full opacity-40">
                    <div className="absolute inset-2 border border-yellow-300 rounded-full opacity-30"></div>
                    <div className="absolute inset-4 border border-yellow-200 rounded-full opacity-20"></div>
                  </div>
                  <div className="absolute top-6 left-6 w-8 h-8 border border-yellow-400 transform rotate-45 opacity-50"></div>
                </div>

                {/* Swirling vine patterns */}
                <div className="absolute top-120 left-16 w-24 h-16">
                  <div className="absolute top-0 left-0 w-20 h-2 border border-yellow-400 rounded-full opacity-40 transform rotate-12"></div>
                  <div className="absolute top-2 left-2 w-16 h-2 border border-yellow-400 rounded-full opacity-30 transform rotate-8"></div>
                  <div className="absolute top-4 left-4 w-12 h-2 border border-yellow-400 rounded-full opacity-40 transform rotate-4"></div>
                </div>
              </div>
            </div>

            {/* Right side - Magenta background with detailed dancer patterns */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-rose-800 via-pink-700 to-rose-900">
              <div className="absolute inset-0 opacity-30">
                {/* Detailed Dancing Woman - Upper Right */}
                <div className="absolute top-12 right-12 w-24 h-32">
                  {/* Dancer body */}
                  <div className="absolute top-8 left-6 w-4 h-16 bg-yellow-400 rounded-full opacity-60"></div>
                  {/* Dancer head */}
                  <div className="absolute top-4 left-5 w-6 h-6 bg-yellow-400 rounded-full opacity-70"></div>
                  {/* Raised arm */}
                  <div className="absolute top-6 left-2 w-3 h-8 border-2 border-yellow-400 transform rotate-45 opacity-60"></div>
                  {/* Bent arm */}
                  <div className="absolute top-8 left-8 w-3 h-6 border-2 border-yellow-400 transform rotate-30 opacity-50"></div>
                  {/* Flowing skirt */}
                  <div className="absolute top-20 left-4 w-8 h-12 border-2 border-yellow-400 rounded-full opacity-40"></div>
                  {/* Traditional jewelry */}
                  <div className="absolute top-2 left-4 w-2 h-2 border border-yellow-300 rounded-full opacity-60"></div>
                  <div className="absolute top-2 left-7 w-2 h-2 border border-yellow-300 rounded-full opacity-60"></div>
                </div>

                {/* Second Dancing Woman - Lower Right */}
                <div className="absolute top-80 right-16 w-20 h-28">
                  <div className="absolute top-6 left-4 w-4 h-14 bg-yellow-400 rounded-full opacity-50"></div>
                  <div className="absolute top-2 left-3 w-5 h-5 bg-yellow-400 rounded-full opacity-60"></div>
                  <div className="absolute top-4 left-1 w-3 h-6 border-2 border-yellow-400 transform rotate-30 opacity-50"></div>
                  <div className="absolute top-6 left-6 w-3 h-5 border-2 border-yellow-400 transform rotate-20 opacity-40"></div>
                  <div className="absolute top-16 left-2 w-6 h-10 border-2 border-yellow-400 rounded-full opacity-30"></div>
                </div>

                {/* Detailed Lotus flowers */}
                <div className="absolute top-40 right-40 w-12 h-12">
                  <div className="absolute top-2 left-2 w-8 h-8 border-2 border-yellow-400 rounded-full opacity-60">
                    <div className="absolute inset-1 border border-yellow-300 rounded-full opacity-40"></div>
                  </div>
                  <div className="absolute top-3 left-1 w-2 h-4 border border-yellow-400 transform rotate-45 opacity-50"></div>
                  <div className="absolute top-1 left-3 w-2 h-4 border border-yellow-400 transform rotate-90 opacity-50"></div>
                  <div className="absolute top-3 left-5 w-2 h-4 border border-yellow-400 transform rotate-135 opacity-50"></div>
                  <div className="absolute top-5 left-3 w-2 h-4 border border-yellow-400 transform rotate-180 opacity-50"></div>
                </div>

                {/* Paisley patterns */}
                <div className="absolute top-60 right-32 w-16 h-12">
                  <div className="absolute top-2 left-2 w-12 h-8 border-2 border-yellow-400 transform rotate-15 opacity-50">
                    <div className="absolute inset-1 border border-yellow-300 transform rotate-15 opacity-30"></div>
                  </div>
                </div>

                {/* Mandala patterns */}
                <div className="absolute top-100 right-28 w-16 h-16">
                  <div className="absolute top-2 left-2 w-12 h-12 border-2 border-yellow-400 rounded-full opacity-40">
                    <div className="absolute inset-1 border border-yellow-300 rounded-full opacity-30"></div>
                    <div className="absolute inset-2 border border-yellow-200 rounded-full opacity-20"></div>
                  </div>
                </div>

                {/* Swirling vine patterns */}
                <div className="absolute top-140 right-20 w-20 h-12">
                  <div className="absolute top-0 left-0 w-16 h-2 border border-yellow-400 rounded-full opacity-40 transform rotate-20"></div>
                  <div className="absolute top-2 left-2 w-12 h-2 border border-yellow-400 rounded-full opacity-30 transform rotate-15"></div>
                  <div className="absolute top-4 left-4 w-8 h-2 border border-yellow-400 rounded-full opacity-40 transform rotate-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Central Login Form */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-full max-w-md"
        >
          {/* Main Login Container */}
          <div className="relative">
            {/* Golden ornate border */}
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-3xl blur-sm opacity-80"></div>
            <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-3xl p-8 shadow-2xl">
                {/* Header with decorative elements */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-8 h-0.5 bg-yellow-400"></div>
                    <span className="mx-4 text-lg font-bold text-gray-800">★</span>
                    <span className="text-lg font-bold text-gray-800">LOGIN TO YOUR ACCOUNT</span>
                    <span className="mx-4 text-lg font-bold text-gray-800">★</span>
                    <div className="w-8 h-0.5 bg-yellow-400"></div>
                  </div>
                </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Username/Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    USERNAME OR EMAIL
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Username or Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-2 border-yellow-300 focus:border-yellow-500 bg-white/80 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                    PASSWORD
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-xl border-2 border-yellow-300 focus:border-yellow-500 bg-white/80 backdrop-blur-sm pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    className="border-yellow-400 data-[state=checked]:bg-yellow-500"
                  />
                  <Label htmlFor="remember" className="text-sm font-medium text-gray-700">
                    REMEMBER ME
                  </Label>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-emerald-500 hover:from-pink-600 hover:via-rose-600 hover:to-emerald-600 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {loading ? "SIGNING IN..." : "LOGIN"}
                </Button>
              </form>

              {/* Social Login Section */}
              <div className="mt-8 text-center">
                <p className="text-sm font-medium text-gray-600 mb-4">OR CONTINUE WITH</p>
                
                <div className="flex justify-center space-x-4 mb-6">
                  {/* Facebook */}
                  <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold hover:bg-blue-700 transition-colors">
                    f
                  </button>
                  
                  {/* Google */}
                  <button className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold hover:bg-green-700 transition-colors">
                    G
                  </button>
                  
                  {/* Instagram */}
                  <button className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-purple-700 transition-all">
                    📷
                  </button>
                </div>

                <div className="text-center">
                  <Link href="/signup" className="text-sm font-semibold text-gray-700 hover:text-yellow-600 transition-colors">
                    SIGN UP
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-600">
                  DON'T HAVE ACCOUNT? SIGN UP
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


