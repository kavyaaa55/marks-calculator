"use client"
import Head from 'next/head'
import Image from 'next/image'

export default function BuyMeCoffee() {
  return (
    <>
      <Head>
        <title>Buy Me a Coffee</title>
        <meta name="description" content="Support me by buying me a coffee!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex items-center justify-center p-5">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full text-center shadow-2xl border border-white/20 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-3xl">

          {/* QR Code Section */}
          <div className="w-48 h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl mx-auto mb-8 flex items-center justify-center text-gray-500 text-sm hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
            <Image
              src="/paymentqr.jpeg"
              alt="Payment QR Code"
              width={200}
              height={200}
              className="rounded-xl"
            />

          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Buy Me a Coffee{' '}
            <span className="inline-block animate-bounce text-4xl">☕</span>
          </h1>

          {/* Support Text */}
          <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-5 rounded-2xl mb-6 border border-orange-200/50">
            <p className="text-gray-800 font-medium m-0">
              Love what I do? Help keep me caffeinated and creating!
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Scan the QR code above to show your support. Every coffee counts and helps us continue doing what We love.
          </p>

          {/* Footer */}
          <div className="text-gray-500 text-sm">
            Made with{' '}
            <span className="text-red-500 animate-pulse inline-block">❤️</span>{' '}
            and lots of coffee
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  )
}
