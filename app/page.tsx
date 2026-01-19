"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Home,
  Calendar,
  Shirt,
  Bell,
  User,
  ChevronRight,
  Play,
  QrCode,
  Moon,
  Sun,
  Clock,
  Gift,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
  Trophy,
  LogOut,
  Edit,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Page = "welcome" | "home" | "booking" | "payment" | "confirmed" | "track" | "alerts" | "profile"
type PaymentMethod = "fpx" | "tng" | "card" | null
type MachineType = "washer" | "dryer" | null
type ProfileTab = "info" | "rewards"

interface BookingData {
  machineType: MachineType
  machineNumber: string
  date: string
  dateLabel: string
  time: string | null
  price: number
  orderId: string
  status: "pending" | "in-progress" | "completed"
  progress: number
}

// Generate a unique order ID
const generateOrderId = () => {
  const year = new Date().getFullYear()
  const num = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
  return `ORD-${year}-${num}`
}

export default function LaundryApp() {
  const [currentPage, setCurrentPage] = useState<Page>("welcome")
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null)
  const [selectedMachine, setSelectedMachine] = useState<MachineType>(null)
  const [selectedDate, setSelectedDate] = useState("15")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [profileTab, setProfileTab] = useState<ProfileTab>("info")
  
  // Current active booking that syncs across all pages
  const [currentBooking, setCurrentBooking] = useState<BookingData | null>(null)
  const [bookingHistory, setBookingHistory] = useState<BookingData[]>([
    {
      machineType: "dryer",
      machineNumber: "Dryer D1",
      date: "Dec 3",
      dateLabel: "Dec 3, Monday",
      time: "12:00 PM",
      price: 6,
      orderId: "ORD-2025-001",
      status: "completed",
      progress: 100
    }
  ])

  // Date options with labels
  const dateOptions = useMemo(() => [
    { day: "Mon", date: "15", label: "Today", fullDate: "Dec 15, Monday" },
    { day: "Tue", date: "16", label: "", fullDate: "Dec 16, Tuesday" },
    { day: "Wed", date: "17", label: "", fullDate: "Dec 17, Wednesday" },
    { day: "Thu", date: "18", label: "", fullDate: "Dec 18, Thursday" },
  ], [])

  // Get selected date label
  const getSelectedDateLabel = () => {
    const found = dateOptions.find(d => d.date === selectedDate)
    return found?.fullDate || "Dec 15, Monday"
  }

  // Get machine number based on selection
  const getMachineNumber = () => {
    if (selectedMachine === "washer") return "Washer W1"
    if (selectedMachine === "dryer") return "Dryer D2"
    return "Unknown"
  }

  // Get price based on machine type
  const getPrice = () => {
    if (selectedMachine === "washer") return 5
    if (selectedMachine === "dryer") return 6
    return 5
  }

  // Confirm booking and create booking data
  const confirmBooking = () => {
    const newBooking: BookingData = {
      machineType: selectedMachine,
      machineNumber: getMachineNumber(),
      date: `Dec ${selectedDate}`,
      dateLabel: getSelectedDateLabel(),
      time: selectedTime,
      price: getPrice(),
      orderId: generateOrderId(),
      status: "in-progress",
      progress: 65
    }
    setCurrentBooking(newBooking)
    setCurrentPage("confirmed")
  }

  // Logo component for consistent sizing
  const Logo = ({ size = "default" }: { size?: "default" | "large" | "header" }) => {
    const sizeClasses = {
      default: "w-12 h-12 sm:w-14 sm:h-14",
      large: "w-24 h-24 sm:w-32 sm:h-32",
      header: "w-10 h-10 sm:w-12 sm:h-12"
    }
    return (
      <div className={cn("relative", sizeClasses[size])}>
        <Image
          src="/laundry-logo.png"
          alt="Laundry Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    )
  }

  const NavBar = ({ active }: { active: string }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFE4EC] border-t-2 border-[#E8779A] flex justify-around py-3 max-w-screen-xl mx-auto">
      <button onClick={() => setCurrentPage("home")} className="flex flex-col items-center gap-1 text-[#4A3540]">
        <Home className={cn("w-5 h-5 sm:w-6 sm:h-6", active === "home" && "fill-[#E8779A] text-[#E8779A]")} />
        <span className="text-xs font-medium">Home</span>
      </button>
      <button onClick={() => setCurrentPage("booking")} className="flex flex-col items-center gap-1 text-[#4A3540]">
        <Calendar className={cn("w-5 h-5 sm:w-6 sm:h-6", active === "book" && "fill-[#E8779A] text-[#E8779A]")} />
        <span className="text-xs font-medium">Book</span>
      </button>
      <button onClick={() => setCurrentPage("track")} className={cn("flex flex-col items-center gap-1 -mt-2")}>
        <div className={cn("rounded-full p-2 sm:p-3 border-2 border-[#E8779A]", active === "track" ? "bg-[#E8779A]" : "bg-[#FFE4EC]")}>
          <Shirt className={cn("w-5 h-5 sm:w-6 sm:h-6", active === "track" ? "text-white" : "text-[#4A3540]")} />
        </div>
        <span className="text-xs font-medium text-[#4A3540]">Track</span>
      </button>
      <button onClick={() => setCurrentPage("alerts")} className="flex flex-col items-center gap-1 text-[#4A3540]">
        <Bell className={cn("w-5 h-5 sm:w-6 sm:h-6", active === "alerts" && "fill-[#E8779A] text-[#E8779A]")} />
        <span className="text-xs font-medium">Alerts</span>
      </button>
      <button onClick={() => setCurrentPage("profile")} className="flex flex-col items-center gap-1 text-[#4A3540]">
        <User className={cn("w-5 h-5 sm:w-6 sm:h-6", active === "profile" && "fill-[#E8779A] text-[#E8779A]")} />
        <span className="text-xs font-medium">Profile</span>
      </button>
    </div>
  )

  const WelcomePage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF0F5] p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm lg:max-w-md space-y-6 sm:space-y-8">
        <div className="border-4 border-[#E8779A] rounded-lg p-8 sm:p-10 md:p-12 bg-[#FFE4EC] flex items-center justify-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <Image
              src="/laundry-logo.png"
              alt="Bubbles Laundry Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 bg-[#FFE4EC] text-center">
          <span className="text-base sm:text-lg font-semibold text-[#4A3540]">Laundry Booking App</span>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <Button
            onClick={() => setCurrentPage("home")}
            variant="outline"
            className="flex-1 border-2 border-[#E8779A] font-bold text-base sm:text-lg py-5 sm:py-6 bg-[#FFE4EC] text-[#4A3540] hover:bg-[#FFD6E0]"
          >
            Login
          </Button>
          <Button
            onClick={() => setCurrentPage("home")}
            variant="outline"
            className="flex-1 border-2 border-[#E8779A] font-bold text-base sm:text-lg py-5 sm:py-6 bg-[#FFE4EC] text-[#4A3540] hover:bg-[#FFD6E0]"
          >
            Sign Up
          </Button>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium mb-4 text-[#4A3540]">Or continue with</p>
          <div className="flex justify-center gap-4 sm:gap-6">
            <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-[#E8779A] flex items-center justify-center bg-[#FFE4EC] font-bold text-base sm:text-lg text-[#4A3540] hover:bg-[#FFD6E0]">
              G
            </button>
            <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-[#E8779A] flex items-center justify-center bg-[#FFE4EC] font-bold text-base sm:text-lg text-[#4A3540] hover:bg-[#FFD6E0]">
              f
            </button>
            <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-[#E8779A] flex items-center justify-center bg-[#FFE4EC] text-[#4A3540] hover:bg-[#FFD6E0]">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const HomePage = () => (
    <div className="min-h-screen bg-[#FFF0F5] pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-[#E8779A] p-3 sm:p-4 flex items-center justify-between bg-[#FF8FAB]">
        <div className="flex items-center gap-2 sm:gap-3">
          <Logo size="header" />
          <h1 className="text-lg sm:text-xl font-bold text-white">Home</h1>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-white">
          {darkMode ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
        <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex items-center gap-3 bg-[#FFE4EC]">
          <QrCode className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8779A]" />
          <div>
            <p className="font-bold text-sm sm:text-base text-[#4A3540]">Scan QR Code</p>
            <p className="text-xs sm:text-sm text-[#7D5A6A]">Activate your machine instantly</p>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3 text-[#4A3540]">Quick Tutorials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 bg-[#FFE4EC]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#E8779A] flex items-center justify-center mb-2 bg-[#FFD6E0]">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-[#E8779A] text-[#E8779A]" />
              </div>
              <p className="font-bold text-xs sm:text-sm text-[#4A3540]">How to book a machine</p>
              <p className="text-xs text-[#7D5A6A]">Learn how to book your preferred time slot</p>
            </div>
            <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 bg-[#FFE4EC]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#E8779A] flex items-center justify-center mb-2 bg-[#FFD6E0]">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-[#E8779A] text-[#E8779A]" />
              </div>
              <p className="font-bold text-xs sm:text-sm text-[#4A3540]">Earning Rewards</p>
              <p className="text-xs text-[#7D5A6A]">Get the most out of your points</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3 text-[#4A3540]">Washers</h2>
          <div className="space-y-2">
            <div className="border-2 border-[#E8779A] rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#FFE4EC]">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8779A]" />
                <div>
                  <p className="font-bold text-sm sm:text-base text-[#4A3540]">Washer W1</p>
                  <p className="text-xs sm:text-sm text-green-600">Available</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelectedMachine("washer")
                  setCurrentPage("booking")
                }}
                variant="outline"
                className="border-2 border-[#E8779A] font-bold text-xs sm:text-sm w-full sm:w-auto bg-[#FFD6E0] text-[#4A3540] hover:bg-[#FFC2D1]"
              >
                Book Now
              </Button>
            </div>
            <div className="border-2 border-[#E8779A] rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#FFD6E0]">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8779A]" />
                <div>
                  <p className="font-bold text-sm sm:text-base text-[#4A3540]">Washer W2</p>
                  <p className="text-xs sm:text-sm text-[#7D5A6A]">23 min remaining</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-2 border-[#E8779A] font-bold bg-[#FFC2D1] text-xs sm:text-sm w-full sm:w-auto text-[#7D5A6A]"
                disabled
              >
                In Use
              </Button>
            </div>
            <div className="border-2 border-[#E8779A] rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#FFE4EC]">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8779A]" />
                <div>
                  <p className="font-bold text-sm sm:text-base text-[#4A3540]">Washer W3</p>
                  <p className="text-xs sm:text-sm text-green-600">Available</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelectedMachine("washer")
                  setCurrentPage("booking")
                }}
                variant="outline"
                className="border-2 border-[#E8779A] font-bold text-xs sm:text-sm w-full sm:w-auto bg-[#FFD6E0] text-[#4A3540] hover:bg-[#FFC2D1]"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3 text-[#4A3540]">Dryers</h2>
          <div className="space-y-2">
            <div className="border-2 border-[#E8779A] rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#FFD6E0]">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8779A]" />
                <div>
                  <p className="font-bold text-sm sm:text-base text-[#4A3540]">Dryer D1</p>
                  <p className="text-xs sm:text-sm text-orange-600">Maintenance</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-2 border-[#E8779A] font-bold bg-[#FFC2D1] text-xs sm:text-sm w-full sm:w-auto text-[#7D5A6A]"
                disabled
              >
                Book Now
              </Button>
            </div>
            <div className="border-2 border-[#E8779A] rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#FFE4EC]">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8779A]" />
                <div>
                  <p className="font-bold text-sm sm:text-base text-[#4A3540]">Dryer D2</p>
                  <p className="text-xs sm:text-sm text-green-600">Available</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelectedMachine("dryer")
                  setCurrentPage("booking")
                }}
                variant="outline"
                className="border-2 border-[#E8779A] font-bold text-xs sm:text-sm w-full sm:w-auto bg-[#FFD6E0] text-[#4A3540] hover:bg-[#FFC2D1]"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <NavBar active="home" />
    </div>
  )

  const BookingPage = () => (
    <div className="min-h-screen bg-[#FFF0F5] pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-[#E8779A] p-3 sm:p-4 flex items-center gap-2 sm:gap-3 bg-[#FF8FAB]">
        <Logo size="header" />
        <h1 className="text-lg sm:text-xl font-bold text-white">Booking</h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-5 sm:space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3 text-[#4A3540]">Machine Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedMachine("washer")}
              className={cn(
                "border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex flex-col items-center gap-2",
                selectedMachine === "washer" ? "bg-[#E8779A] text-white" : "bg-[#FFE4EC] text-[#4A3540]",
              )}
            >
              <Shirt className="w-10 h-10 sm:w-12 sm:h-12" />
              <p className="font-bold text-sm sm:text-base">Washer</p>
              <p className="text-xs sm:text-sm">RM5 FOR 14KG</p>
            </button>
            <button
              onClick={() => setSelectedMachine("dryer")}
              className={cn(
                "border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex flex-col items-center gap-2",
                selectedMachine === "dryer" ? "bg-[#E8779A] text-white" : "bg-[#FFE4EC] text-[#4A3540]",
              )}
            >
              <Shirt className="w-10 h-10 sm:w-12 sm:h-12" />
              <p className="font-bold text-sm sm:text-base">Dryer</p>
              <p className="text-xs sm:text-sm">RM6 FOR 14KG</p>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3 text-[#4A3540]">Select Date</h2>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {dateOptions.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={cn(
                  "border-2 border-[#E8779A] rounded-lg p-2 sm:p-3 text-center",
                  selectedDate === d.date ? "bg-[#E8779A] text-white" : "bg-[#FFE4EC] text-[#4A3540]",
                )}
              >
                <p className="text-xs sm:text-sm font-medium">{d.day}</p>
                <p className="text-xl sm:text-2xl font-bold">{d.date}</p>
                {d.label && <p className="text-xs">{d.label}</p>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3 text-[#4A3540]">Available Time</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "border-2 border-[#E8779A] rounded-lg p-2 sm:p-3 font-bold text-sm sm:text-base",
                  selectedTime === time ? "bg-[#E8779A] text-white" : "bg-[#FFE4EC] text-[#4A3540]",
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={() => setCurrentPage("payment")}
          variant="outline"
          className="w-full border-2 border-[#E8779A] font-bold text-base sm:text-lg py-5 sm:py-6 flex items-center justify-center gap-2 bg-[#E8779A] text-white hover:bg-[#d66a8a]"
        >
          Next <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>

      <NavBar active="book" />
    </div>
  )

  const PaymentPage = () => (
    <div className="min-h-screen bg-[#FFF0F5] pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-[#E8779A] p-3 sm:p-4 flex items-center gap-2 sm:gap-3 bg-[#FF8FAB]">
        <Logo size="header" />
        <h1 className="text-lg sm:text-xl font-bold text-white">Booking Payment</h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-5 sm:space-y-6">
        <h2 className="text-base sm:text-lg font-bold text-[#4A3540]">Select payment method</h2>

        <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 text-center bg-[#FFE4EC]">
          <p className="font-bold text-base sm:text-lg text-[#4A3540]">Total</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#E8779A]">RM{getPrice()}.00</p>
          <p className="text-xs sm:text-sm text-[#7D5A6A] mt-2">
            {selectedMachine === "washer" ? "Washer" : "Dryer"} - {getSelectedDateLabel()} at {selectedTime || "Not selected"}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setSelectedPayment("fpx")}
            className={cn(
              "w-full border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3",
              selectedPayment === "fpx" ? "bg-[#E8779A] text-white" : "bg-[#FFE4EC] text-[#4A3540]",
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                selectedPayment === "fpx" ? "border-white" : "border-[#E8779A]",
              )}
            >
              {selectedPayment === "fpx" && <div className="w-3 h-3 rounded-full bg-white" />}
            </div>
            <div
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 border rounded flex items-center justify-center text-xs font-bold flex-shrink-0",
                selectedPayment === "fpx" ? "bg-white text-[#E8779A] border-white" : "bg-[#FFD6E0] border-[#E8779A] text-[#4A3540]",
              )}
            >
              FPX
            </div>
            <span className="font-bold text-sm sm:text-base">Internet Banking</span>
          </button>

          <button
            onClick={() => setSelectedPayment("tng")}
            className={cn(
              "w-full border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3",
              selectedPayment === "tng" ? "bg-[#E8779A] text-white" : "bg-[#FFE4EC] text-[#4A3540]",
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                selectedPayment === "tng" ? "border-white" : "border-[#E8779A]",
              )}
            >
              {selectedPayment === "tng" && <div className="w-3 h-3 rounded-full bg-white" />}
            </div>
            <div
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 border rounded flex items-center justify-center text-xs font-bold flex-shrink-0",
                selectedPayment === "tng" ? "bg-white text-[#E8779A] border-white" : "bg-[#FFD6E0] border-[#E8779A] text-[#4A3540]",
              )}
            >
              TNG
            </div>
            <span className="font-bold text-sm sm:text-base">{"Touch 'n Go E-Wallet"}</span>
          </button>

          <button
            onClick={() => setSelectedPayment("card")}
            className={cn(
              "w-full border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3",
              selectedPayment === "card" ? "bg-[#E8779A] text-white" : "bg-[#FFE4EC] text-[#4A3540]",
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                selectedPayment === "card" ? "border-white" : "border-[#E8779A]",
              )}
            >
              {selectedPayment === "card" && <div className="w-3 h-3 rounded-full bg-white" />}
            </div>
            <div
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 border rounded flex items-center justify-center text-xs font-bold flex-shrink-0",
                selectedPayment === "card" ? "bg-white text-[#E8779A] border-white" : "bg-[#FFD6E0] border-[#E8779A] text-[#4A3540]",
              )}
            >
              VISA
            </div>
            <span className="font-bold text-sm sm:text-base">Credit/Debit Card</span>
          </button>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <Button
            onClick={() => setCurrentPage("booking")}
            variant="outline"
            className="flex-1 border-2 border-[#E8779A] font-bold text-base sm:text-lg py-5 sm:py-6 bg-[#FFE4EC] text-[#4A3540] hover:bg-[#FFD6E0]"
          >
            Back
          </Button>
          <Button
            onClick={confirmBooking}
            variant="outline"
            className="flex-1 border-2 border-[#E8779A] font-bold text-base sm:text-lg py-5 sm:py-6 bg-[#E8779A] text-white hover:bg-[#d66a8a]"
          >
            Proceed
          </Button>
        </div>
      </div>

      <NavBar active="book" />
    </div>
  )

  const ConfirmedPage = () => (
    <div className="min-h-screen bg-[#FFF0F5] pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-[#E8779A] p-3 sm:p-4 flex items-center gap-2 sm:gap-3 bg-[#FF8FAB]">
        <Logo size="header" />
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-5 sm:space-y-6 flex flex-col items-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E8779A] flex items-center justify-center mt-4 sm:mt-8">
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={3} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-[#4A3540]">Confirmed</h1>
          <p className="text-xs sm:text-sm text-[#7D5A6A]">Booking placed, sit back and relax</p>
        </div>

        <div className="w-full space-y-3 sm:space-y-4 border-t-2 border-[#E8779A] pt-4 sm:pt-6">
          <div className="bg-[#FFE4EC] rounded-lg p-3">
            <p className="font-bold mb-1 text-sm sm:text-base text-[#4A3540]">Machine Type</p>
            <p className="text-sm sm:text-base text-[#7D5A6A]">{currentBooking?.machineType === "washer" ? "Washer" : "Dryer"}</p>
          </div>
          <div className="border-t-2 border-[#FFC2D1] pt-3 sm:pt-4 bg-[#FFE4EC] rounded-lg p-3">
            <p className="font-bold mb-1 text-sm sm:text-base text-[#4A3540]">Machine Number</p>
            <p className="text-sm sm:text-base text-[#7D5A6A]">{currentBooking?.machineNumber}</p>
          </div>
          <div className="border-t-2 border-[#FFC2D1] pt-3 sm:pt-4 bg-[#FFE4EC] rounded-lg p-3">
            <p className="font-bold mb-1 text-sm sm:text-base text-[#4A3540]">Date and Time</p>
            <p className="text-sm sm:text-base text-[#7D5A6A]">{currentBooking?.dateLabel}</p>
            <p className="text-sm sm:text-base text-[#7D5A6A]">{currentBooking?.time}</p>
          </div>
          <div className="border-t-2 border-[#FFC2D1] pt-3 sm:pt-4 bg-[#FFE4EC] rounded-lg p-3">
            <p className="font-bold mb-1 text-sm sm:text-base text-[#4A3540]">Order ID</p>
            <p className="text-sm sm:text-base text-[#7D5A6A]">{currentBooking?.orderId}</p>
          </div>
          <div className="border-t-2 border-[#FFC2D1] pt-3 sm:pt-4 bg-[#FFE4EC] rounded-lg p-3">
            <p className="font-bold mb-1 text-sm sm:text-base text-[#4A3540]">Amount Paid</p>
            <p className="text-sm sm:text-base text-[#E8779A] font-bold">RM{currentBooking?.price}.00</p>
          </div>
        </div>

        <div className="w-full border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 bg-[#FFE4EC]">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-[#E8779A]" />
            <div>
              <p className="font-bold mb-1 text-sm sm:text-base text-[#4A3540]">How to activate the machine ?</p>
              <p className="text-xs sm:text-sm text-[#7D5A6A]">
                Scan the QR code on the machine using the scanner on the homepage to activate it.
              </p>
            </div>
          </div>
        </div>
      </div>

      <NavBar active="track" />
    </div>
  )

  const TrackPage = () => (
    <div className="min-h-screen bg-[#FFF0F5] pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-[#E8779A] p-3 sm:p-4 flex items-center gap-2 sm:gap-3 bg-[#FF8FAB]">
        <Logo size="header" />
        <h1 className="text-lg sm:text-xl font-bold text-white">Track</h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {currentBooking && (
          <div>
            <h2 className="text-base sm:text-lg font-bold mb-2 text-[#4A3540]">Monitor your laundry process</h2>
            <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 bg-[#FFE4EC]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs sm:text-sm font-bold mb-1 text-[#E8779A]">Current Order</p>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#4A3540]">Order ID</p>
                    <p className="text-xs sm:text-sm text-[#7D5A6A]">{currentBooking.orderId}</p>
                  </div>
                </div>
                <div className="border-2 border-[#E8779A] rounded px-2 sm:px-3 py-1 font-bold text-xs sm:text-sm bg-[#FFD6E0] text-[#4A3540]">
                  {currentBooking.machineNumber}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-xs sm:text-sm font-bold text-[#4A3540]">Progress</p>
                    <p className="text-xs sm:text-sm text-[#7D5A6A]">{currentBooking.progress}%</p>
                  </div>
                  <div className="h-2 sm:h-3 border-2 border-[#E8779A] rounded-full overflow-hidden bg-[#FFD6E0]">
                    <div className="h-full bg-[#E8779A]" style={{ width: `${currentBooking.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8779A]" />
                  <div className="flex-1">
                    <p className="font-bold text-xs sm:text-sm text-[#4A3540]">{currentBooking.machineType === "washer" ? "Washing" : "Drying"}</p>
                    <p className="text-xs text-[#7D5A6A]">In Progress</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 opacity-50">
                  <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8779A]" />
                  <div className="flex-1">
                    <p className="font-bold text-xs sm:text-sm text-[#4A3540]">Ready for pickup</p>
                    <p className="text-xs text-[#7D5A6A]">{currentBooking.time}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 mt-3 sm:mt-4 flex items-center justify-center gap-2 bg-[#FFD6E0]">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8779A]" />
              <span className="font-bold text-xs sm:text-sm text-[#4A3540]">10 minutes remaining</span>
            </div>
          </div>
        )}

        {!currentBooking && (
          <div className="border-2 border-[#E8779A] rounded-lg p-6 text-center bg-[#FFE4EC]">
            <Shirt className="w-12 h-12 mx-auto mb-3 text-[#E8779A]" />
            <p className="font-bold text-[#4A3540]">No active booking</p>
            <p className="text-sm text-[#7D5A6A]">Book a machine to start tracking</p>
            <Button
              onClick={() => setCurrentPage("booking")}
              className="mt-4 bg-[#E8779A] text-white hover:bg-[#d66a8a]"
            >
              Book Now
            </Button>
          </div>
        )}

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-2 text-[#4A3540]">Order History</h2>
          {bookingHistory.map((booking) => (
            <div key={booking.orderId} className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 bg-[#FFE4EC] mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-sm sm:text-base text-[#4A3540]">{booking.orderId}</p>
                  <p className="text-xs sm:text-sm text-[#7D5A6A]">{booking.machineNumber}</p>
                </div>
                <div className="text-right">
                  <div className="border-2 border-[#E8779A] rounded px-2 sm:px-3 py-1 font-bold mb-1 text-xs sm:text-sm bg-[#FFD6E0] text-[#4A3540]">
                    Completed
                  </div>
                  <p className="text-xs sm:text-sm text-[#7D5A6A]">{booking.date}, {booking.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NavBar active="track" />
    </div>
  )

  const AlertsPage = () => (
    <div className="min-h-screen bg-[#FFF0F5] pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-[#E8779A] p-3 sm:p-4 flex items-center gap-2 sm:gap-3 bg-[#FF8FAB]">
        <Logo size="header" />
        <h1 className="text-lg sm:text-xl font-bold text-white">Alerts</h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-[#4A3540]">Stay updated with your laundry</h2>

        {currentBooking && (
          <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3 bg-[#FFD6E0]">
            <Shirt className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1 text-[#E8779A]" />
            <div className="flex-1">
              <p className="font-bold text-sm sm:text-base text-[#4A3540]">Booking Confirmed!</p>
              <p className="text-xs sm:text-sm text-[#7D5A6A]">
                Your {currentBooking.machineType} booking ({currentBooking.machineNumber}) is confirmed for {currentBooking.dateLabel} at {currentBooking.time}.
              </p>
              <p className="text-xs text-[#E8779A] mt-1">Just now</p>
            </div>
          </div>
        )}

        <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3 bg-[#FFE4EC]">
          <Shirt className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1 text-[#E8779A]" />
          <div className="flex-1">
            <p className="font-bold text-sm sm:text-base text-[#4A3540]">Laundry Complete!</p>
            <p className="text-xs sm:text-sm text-[#7D5A6A]">Your wash cycle in WS has finished. Please collect your laundry.</p>
            <p className="text-xs text-[#E8779A] mt-1">1 min ago</p>
          </div>
        </div>

        <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3 bg-[#FFE4EC]">
          <Gift className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1 text-[#E8779A]" />
          <div className="flex-1">
            <p className="font-bold text-sm sm:text-base text-[#4A3540]">Reward Unlocked!</p>
            <p className="text-xs sm:text-sm text-[#7D5A6A]">{"You've earned 50 points! Redeem for a free wash cycle."}</p>
            <p className="text-xs text-[#E8779A] mt-1">1 hour ago</p>
          </div>
        </div>

        <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3 bg-[#FFE4EC]">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1 text-[#E8779A]" />
          <div className="flex-1">
            <p className="font-bold text-sm sm:text-base text-[#4A3540]">Booking Reminder</p>
            <p className="text-xs sm:text-sm text-[#7D5A6A]">Your schedule wash is starting in 15 minutes at Washer W3.</p>
            <p className="text-xs text-[#E8779A] mt-1">2 hours ago</p>
          </div>
        </div>

        <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3 bg-[#FFE4EC]">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1 text-[#E8779A]" />
          <div className="flex-1">
            <p className="font-bold text-sm sm:text-base text-[#4A3540]">Machine Available</p>
            <p className="text-xs sm:text-sm text-[#7D5A6A]">{"Dryer D3 is now available. Book before it's taken!"}</p>
            <p className="text-xs text-[#E8779A] mt-1">5 hours ago</p>
          </div>
        </div>

        {currentBooking && (
          <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3 bg-[#FFD6E0]">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1 text-[#E8779A]" />
            <div className="flex-1">
              <p className="font-bold text-sm sm:text-base text-[#4A3540]">Payment Confirmed</p>
              <p className="text-xs sm:text-sm text-[#7D5A6A]">Your payment of RM{currentBooking.price}.00 has been processed successfully.</p>
              <p className="text-xs text-[#E8779A] mt-1">Just now</p>
            </div>
          </div>
        )}

        {!currentBooking && (
          <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3 bg-[#FFD6E0]">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1 text-[#E8779A]" />
            <div className="flex-1">
              <p className="font-bold text-sm sm:text-base text-[#4A3540]">Payment Confirmed</p>
              <p className="text-xs sm:text-sm text-[#7D5A6A]">Your payment of RM5.00 has been processed successfully.</p>
              <p className="text-xs text-[#E8779A] mt-1">1 day ago</p>
            </div>
          </div>
        )}
      </div>

      <NavBar active="alerts" />
    </div>
  )

  const ProfilePage = () => (
    <div className="min-h-screen bg-[#FFF0F5] pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-[#E8779A] p-3 sm:p-4 flex items-center gap-2 sm:gap-3 bg-[#FF8FAB]">
        <Logo size="header" />
        <h1 className="text-lg sm:text-xl font-bold text-white">Profile</h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#E8779A] flex items-center justify-center bg-[#FFE4EC]">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-[#E8779A]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-base sm:text-lg text-[#4A3540]">Name</p>
              <Edit className="w-4 h-4 text-[#E8779A]" />
            </div>
            <p className="text-xs sm:text-sm text-[#E8779A]">Premium Member</p>
            <p className="text-xs text-[#7D5A6A]">Referral Code : XXX2235</p>
          </div>
        </div>

        <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex items-center justify-between bg-[#FFE4EC]">
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-[#E8779A]">125</p>
            <p className="text-xs sm:text-sm text-[#7D5A6A]">points</p>
            <p className="text-xs sm:text-sm mt-1 text-[#4A3540]">Next Reward</p>
          </div>
          <div className="text-right">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 text-[#E8779A]" />
            <p className="text-xs sm:text-sm text-[#7D5A6A]">25 pts to go</p>
          </div>
        </div>

        <div className="flex border-2 border-[#E8779A] rounded-lg overflow-hidden">
          <button
            onClick={() => setProfileTab("info")}
            className={cn(
              "flex-1 py-2 sm:py-3 font-bold text-sm sm:text-base",
              profileTab === "info" ? "bg-[#E8779A] text-white" : "bg-[#FFE4EC] text-[#4A3540]",
            )}
          >
            Profile Info
          </button>
          <button
            onClick={() => setProfileTab("rewards")}
            className={cn(
              "flex-1 py-2 sm:py-3 font-bold border-l-2 border-[#E8779A] text-sm sm:text-base",
              profileTab === "rewards" ? "bg-[#E8779A] text-white" : "bg-[#FFE4EC] text-[#4A3540]",
            )}
          >
            Rewards
          </button>
        </div>

        {profileTab === "info" ? (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 border-b-2 border-[#FFC2D1]">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8779A]" />
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#4A3540]">Email</p>
                <p className="text-xs sm:text-sm text-[#7D5A6A]">xxxxx@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 border-b-2 border-[#FFC2D1]">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8779A]" />
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#4A3540]">Phone Number</p>
                <p className="text-xs sm:text-sm text-[#7D5A6A]">(+60)12-3456789</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 border-b-2 border-[#FFC2D1]">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8779A]" />
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#4A3540]">Member Since</p>
                <p className="text-xs sm:text-sm text-[#7D5A6A]">Jan 2024</p>
              </div>
            </div>

            <div>
              <p className="font-bold mb-2 text-sm sm:text-base text-[#4A3540]">Your Stats</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="border-2 border-[#E8779A] rounded-lg p-2 sm:p-3 text-center bg-[#FFE4EC]">
                  <p className="text-xs sm:text-sm font-bold mb-1 text-[#4A3540]">Total Washes</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#E8779A]">24</p>
                </div>
                <div className="border-2 border-[#E8779A] rounded-lg p-2 sm:p-3 text-center bg-[#FFE4EC]">
                  <p className="text-xs sm:text-sm font-bold mb-1 text-[#4A3540]">Total Drys</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#E8779A]">18</p>
                </div>
                <div className="border-2 border-[#E8779A] rounded-lg p-2 sm:p-3 text-center bg-[#FFE4EC]">
                  <p className="text-xs sm:text-sm font-bold mb-1 text-[#4A3540]">Favorite Time</p>
                  <p className="text-lg sm:text-xl font-bold text-[#E8779A]">10:00AM</p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-2 border-[#E8779A] font-bold flex items-center justify-center gap-2 py-5 sm:py-6 bg-[#FFE4EC] text-[#4A3540] hover:bg-[#FFD6E0]"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              Log Out
            </Button>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 bg-[#FFE4EC]">
              <p className="font-bold mb-2 text-sm sm:text-base flex items-center gap-1 text-[#4A3540]">
                <AlertCircle className="w-4 h-4 text-[#E8779A]" />
                How to earn points ?
              </p>
              <ul className="text-xs sm:text-sm space-y-1 text-[#7D5A6A]">
                <li>
                  {"• Complete a wash"} <span className="font-bold text-[#E8779A]">+10 pts</span>
                </li>
                <li>
                  {"• Complete a dry"} <span className="font-bold text-[#E8779A]">+8 pts</span>
                </li>
                <li>
                  {"• Refer a friend"} <span className="font-bold text-[#E8779A]">+50 pts</span>
                </li>
                <li>
                  {"• Weekly streak"} <span className="font-bold text-[#E8779A]">+20 pts</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold mb-2 text-sm sm:text-base text-[#4A3540]">Rewards</p>
              <div className="space-y-2 sm:space-y-3">
                <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex items-center justify-between bg-[#FFE4EC]">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8779A]" />
                    <div>
                      <p className="font-bold text-sm sm:text-base text-[#4A3540]">Free Wash</p>
                      <p className="text-xs sm:text-sm text-[#7D5A6A]">Get one free wash cycle</p>
                      <p className="text-xs font-bold text-[#E8779A]">100 points</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-2 border-[#E8779A] font-bold text-xs sm:text-sm bg-[#E8779A] text-white hover:bg-[#d66a8a]"
                  >
                    Redeem
                  </Button>
                </div>

                <div className="border-2 border-[#E8779A] rounded-lg p-3 sm:p-4 flex items-center justify-between bg-[#FFD6E0]">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8779A]" />
                    <div>
                      <p className="font-bold text-sm sm:text-base text-[#4A3540]">50% off</p>
                      <p className="text-xs sm:text-sm text-[#7D5A6A]">Save 50% on your next booking</p>
                      <p className="text-xs font-bold text-[#E8779A]">130 points</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-2 border-[#E8779A] font-bold bg-[#FFC2D1] text-xs sm:text-sm text-[#7D5A6A]"
                    disabled
                  >
                    Locked
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <NavBar active="profile" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FFF0F5]">
      {currentPage === "welcome" && <WelcomePage />}
      {currentPage === "home" && <HomePage />}
      {currentPage === "booking" && <BookingPage />}
      {currentPage === "payment" && <PaymentPage />}
      {currentPage === "confirmed" && <ConfirmedPage />}
      {currentPage === "track" && <TrackPage />}
      {currentPage === "alerts" && <AlertsPage />}
      {currentPage === "profile" && <ProfilePage />}
    </div>
  )
}
