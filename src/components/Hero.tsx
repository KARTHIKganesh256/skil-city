"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Bright vibrant gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 105, 180, 0.25) 0%, 
              rgba(50, 205, 50, 0.2) 20%,
              rgba(255, 20, 147, 0.3) 40%, 
              rgba(0, 255, 127, 0.2) 60%,
              rgba(255, 69, 0, 0.15) 80%, 
              rgba(255, 105, 180, 0.2) 100%
            )
          `
        }}
      />
      
      {/* Animated raindrop effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 105, 180, 0.2) 0%, transparent 30%),
            radial-gradient(circle at 80% 80%, rgba(50, 205, 50, 0.2) 0%, transparent 30%),
            radial-gradient(circle at 40% 60%, rgba(255, 20, 147, 0.2) 0%, transparent 30%),
            radial-gradient(circle at 60% 40%, rgba(0, 255, 127, 0.2) 0%, transparent 30%),
            radial-gradient(circle at 10% 70%, rgba(255, 69, 0, 0.2) 0%, transparent 30%),
            radial-gradient(circle at 90% 30%, rgba(50, 205, 50, 0.2) 0%, transparent 30%)
          `
        }}
        animate={{
          transform: [
            "translateY(0px) scale(1)",
            "translateY(-20px) scale(1.1)",
            "translateY(-10px) scale(0.9)",
            "translateY(-30px) scale(1.2)",
            "translateY(0px) scale(1)"
          ],
          opacity: [0.2, 0.3, 0.1, 0.4, 0.2]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(123, 44, 44, 0.1) 35px,
            rgba(123, 44, 44, 0.1) 70px
          )`,
        }}
        animate={{
          backgroundPosition: ["0px 0px", "70px 70px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-serif font-bold text-maroon mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              SilkCity
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-maroon-700 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              The Heritage of Dharmavaram
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Discover the finest collection of authentic Indian sarees from Dharmavaram 
              and across India. Each piece tells a story of tradition, craftsmanship, 
              and timeless elegance.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(255, 105, 180, 0.4)'
                }}
              >
                <Link href="#regions">Explore Collections</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(50, 205, 50, 0.4)'
                }}
              >
                <Link href="#dharmavaram">Dharmavaram Story</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              {/* Weaving photo (place your image at public/weaving.jpg) */}
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: "url(/weaving.jpg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10" />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-gold rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-maroon rounded-full opacity-10"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-maroon" />
      </motion.div>
    </section>
  );
}

