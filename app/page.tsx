"use client"
import { CalculatorForm } from "@/components/calculator-form"
import { ModeToggle } from "@/components/mode-toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Coffee } from "lucide-react"
import Link from "next/link" // Fixed: Import Link from next/link, not lucide-react

export default function Home() {
  const [selectedModule, setSelectedModule] = useState("1")

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground rounded-full shadow-lg flex space-x-4 py-2 px-6 z-50">
        <button
          className={`py-1 px-3 rounded-full ${selectedModule === "1" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          onClick={() => setSelectedModule("1")}
        >
          Module 1
        </button>
        <button
          className={`py-1 px-3 rounded-full ${selectedModule === "2" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          onClick={() => setSelectedModule("2")}
        >
          Module 2
        </button>
        <ModeToggle />
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Marks Calculator</h1>
          <p className="mt-3 text-xl text-muted-foreground">Calculate your SGPA based on your course marks</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Marks</CardTitle>
            <CardDescription>Fill in the obtained marks and total marks for each component</CardDescription>
          </CardHeader>
          <CardContent>
            <CalculatorForm module={selectedModule} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-2 flex justify-center items-center gap-4 text-center">
        <div>
          <p className="text-sm text-muted-foreground">
            ~Made by{" "}
            <a
              href="https://github.com/vewake"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Vivek
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/kavyaaa55"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Kavyanjali
            </a>
          </p>
          <a
            href="https://pptsmugllers.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block border-b-4 border-gray-400 font-semibold text-gray-800 hover:text-black transition"
          >
            Check out this new website we made
          </a>
        </div>
      </div>
      {/* Floating Buy Me a Coffee Button */}
      <Link href="/coffee"> {/* Fixed: Removed extra quote */}
        <button
          className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center gap-2"
        >
          <Coffee size={20} />
          <span className="hidden sm:inline text-sm font-medium">Buy me a coffee</span>
        </button>
      </Link>
    </div>
  )
}
