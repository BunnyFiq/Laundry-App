"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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

export default function LaundryApp() {
  const [currentPage, setCurrentPage] = useState<Page>("welcome")
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null)
  const [selectedMachine, setSelectedMachine] = useState<MachineType>(null)
  const [selectedDate, setSelectedDate] = useState("15")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [profileTab, setProfileTab] = useState<ProfileTab>("info")

  const NavBar = ({ active }: { active: string }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black flex justify-around py-3 max-w-screen-xl mx-auto">
      <button onClick={() => setCurrentPage("home")} className="flex flex-col items-center gap-1">
        <Home className={cn("w-5 h-5 sm:w-6 sm:h-6", active === "home" && "fill-black")} />
        <span className="text-xs font-medium">Home</span>
      </button>
      <button onClick={() => setCurrentPage("booking")} className="flex flex-col items-center gap-1">
        <Calendar className={cn("w-5 h-5 sm:w-6 sm:h-6", active === "book" && "fill-black")} />
        <span className="text-xs font-medium">Book</span>
      </button>
      <button onClick={() => setCurrentPage("track")} className={cn("flex flex-col items-center gap-1 -mt-2")}>
        <div className={cn("rounded-full p-2 sm:p-3 border-2 border-black bg-white", active === "track" && "bg-black")}>
          <Shirt className={cn("w-5 h-5 sm:w-6 sm:h-6", active === "track" && "text-white")} />
        </div>
        <span className="text-xs font-medium">Track</span>
      </button>
      <button onClick={() => setCurrentPage("alerts")} className="flex flex-col items-center gap-1">
        <Bell className={cn("w-5 h-5 sm:w-6 sm:h-6", active === "alerts" && "fill-black")} />
        <span className="text-xs font-medium">Alerts</span>
      </button>
      <button onClick={() => setCurrentPage("profile")} className="flex flex-col items-center gap-1">
        <User className={cn("w-5 h-5 sm:w-6 sm:h-6", active === "profile" && "fill-black")} />
        <span className="text-xs font-medium">Profile</span>
      </button>
    </div>
  )

  const WelcomePage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm lg:max-w-md space-y-6 sm:space-y-8">
        <div className="bg-gray-300 aspect-[4/3] rounded-lg flex items-center justify-center">
          <svg className="w-24 h-24 sm:w-32 sm:h-32 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="border-4 border-black rounded-lg p-6 sm:p-8 bg-white flex items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold">Logo</span>
        </div>
        <div className="border-2 border-black rounded-lg p-3 sm:p-4 bg-white text-center">
          <span className="text-base sm:text-lg font-semibold">Laundry Booking App</span>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <Button
            onClick={() => setCurrentPage("home")}
            variant="outline"
            className="flex-1 border-2 border-black font-bold text-base sm:text-lg py-5 sm:py-6"
          >
            Login
          </Button>
          <Button
            onClick={() => setCurrentPage("home")}
            variant="outline"
            className="flex-1 border-2 border-black font-bold text-base sm:text-lg py-5 sm:py-6"
          >
            Sign Up
          </Button>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium mb-4">Or continue with</p>
          <div className="flex justify-center gap-4 sm:gap-6">
            <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-black flex items-center justify-center bg-white font-bold text-base sm:text-lg">
              G
            </button>
            <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-black flex items-center justify-center bg-white font-bold text-base sm:text-lg">
              f
            </button>
            <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-black flex items-center justify-center bg-white">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const HomePage = () => (
    <div className="min-h-screen bg-white pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-black p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center font-bold text-xs sm:text-sm">
            Logo
          </div>
          <h1 className="text-lg sm:text-xl font-bold">Home</h1>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2">
          {darkMode ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
        <div className="border-2 border-black rounded-lg p-3 sm:p-4 flex items-center gap-3">
          <QrCode className="w-7 h-7 sm:w-8 sm:h-8" />
          <div>
            <p className="font-bold text-sm sm:text-base">Scan QR Code</p>
            <p className="text-xs sm:text-sm">Activate your machine instantly</p>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3">Quick Tutorials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border-2 border-black rounded-lg p-3 sm:p-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black flex items-center justify-center mb-2">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-black" />
              </div>
              <p className="font-bold text-xs sm:text-sm">How to book a machine</p>
              <p className="text-xs text-gray-600">Learn how to book your preferred time slot</p>
            </div>
            <div className="border-2 border-black rounded-lg p-3 sm:p-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black flex items-center justify-center mb-2">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-black" />
              </div>
              <p className="font-bold text-xs sm:text-sm">Earning Rewards</p>
              <p className="text-xs text-gray-600">Get the most out of your points</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3">Washers</h2>
          <div className="space-y-2">
            <div className="border-2 border-black rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-7 h-7 sm:w-8 sm:h-8" />
                <div>
                  <p className="font-bold text-sm sm:text-base">Washer W1</p>
                  <p className="text-xs sm:text-sm text-green-600">Available</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelectedMachine("washer")
                  setCurrentPage("booking")
                }}
                variant="outline"
                className="border-2 border-black font-bold text-xs sm:text-sm w-full sm:w-auto"
              >
                Book Now
              </Button>
            </div>
            <div className="border-2 border-black rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-gray-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-7 h-7 sm:w-8 sm:h-8" />
                <div>
                  <p className="font-bold text-sm sm:text-base">Washer W2</p>
                  <p className="text-xs sm:text-sm text-gray-600">23 min remaining</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-2 border-black font-bold bg-gray-300 text-xs sm:text-sm w-full sm:w-auto"
                disabled
              >
                In Use
              </Button>
            </div>
            <div className="border-2 border-black rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-7 h-7 sm:w-8 sm:h-8" />
                <div>
                  <p className="font-bold text-sm sm:text-base">Washer W3</p>
                  <p className="text-xs sm:text-sm text-green-600">Available</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelectedMachine("washer")
                  setCurrentPage("booking")
                }}
                variant="outline"
                className="border-2 border-black font-bold text-xs sm:text-sm w-full sm:w-auto"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3">Dryers</h2>
          <div className="space-y-2">
            <div className="border-2 border-black rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-gray-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-7 h-7 sm:w-8 sm:h-8" />
                <div>
                  <p className="font-bold text-sm sm:text-base">Dryer D1</p>
                  <p className="text-xs sm:text-sm text-orange-600">Maintenance</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-2 border-black font-bold bg-gray-300 text-xs sm:text-sm w-full sm:w-auto"
                disabled
              >
                Book Now
              </Button>
            </div>
            <div className="border-2 border-black rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-7 h-7 sm:w-8 sm:h-8" />
                <div>
                  <p className="font-bold text-sm sm:text-base">Dryer D2</p>
                  <p className="text-xs sm:text-sm text-green-600">Available</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelectedMachine("dryer")
                  setCurrentPage("booking")
                }}
                variant="outline"
                className="border-2 border-black font-bold text-xs sm:text-sm w-full sm:w-auto"
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
    <div className="min-h-screen bg-white pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-black p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center font-bold text-xs sm:text-sm">
          Logo
        </div>
        <h1 className="text-lg sm:text-xl font-bold">Booking</h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-5 sm:space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3">Machine Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedMachine("washer")}
              className={cn(
                "border-2 border-black rounded-lg p-3 sm:p-4 flex flex-col items-center gap-2",
                selectedMachine === "washer" && "bg-black text-white",
              )}
            >
              <Shirt className="w-10 h-10 sm:w-12 sm:h-12" />
              <p className="font-bold text-sm sm:text-base">Washer</p>
              <p className="text-xs sm:text-sm">RM5 FOR 14KG</p>
            </button>
            <button
              onClick={() => setSelectedMachine("dryer")}
              className={cn(
                "border-2 border-black rounded-lg p-3 sm:p-4 flex flex-col items-center gap-2",
                selectedMachine === "dryer" && "bg-black text-white",
              )}
            >
              <Shirt className="w-10 h-10 sm:w-12 sm:h-12" />
              <p className="font-bold text-sm sm:text-base">Dryer</p>
              <p className="text-xs sm:text-sm">RM6 FOR 14KG</p>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-3">Select Date</h2>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {[
              { day: "Mon", date: "15", label: "Today" },
              { day: "Tue", date: "16" },
              { day: "Wed", date: "17" },
              { day: "Thu", date: "18" },
            ].map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={cn(
                  "border-2 border-black rounded-lg p-2 sm:p-3 text-center",
                  selectedDate === d.date && "bg-black text-white",
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
          <h2 className="text-base sm:text-lg font-bold mb-3">Available Time</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "border-2 border-black rounded-lg p-2 sm:p-3 font-bold text-sm sm:text-base",
                  selectedTime === time && "bg-black text-white",
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
          className="w-full border-2 border-black font-bold text-base sm:text-lg py-5 sm:py-6 flex items-center justify-center gap-2"
        >
          Next <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>

      <NavBar active="track" />
    </div>
  )

  const PaymentPage = () => (
    <div className="min-h-screen bg-white pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-black p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center font-bold text-xs sm:text-sm">
          Logo
        </div>
        <h1 className="text-lg sm:text-xl font-bold">Booking Payment</h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-5 sm:space-y-6">
        <h2 className="text-base sm:text-lg font-bold">Select payment method</h2>

        <div className="border-2 border-black rounded-lg p-3 sm:p-4 text-center">
          <p className="font-bold text-base sm:text-lg">Total</p>
          <p className="text-2xl sm:text-3xl font-bold">RM5.00</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setSelectedPayment("fpx")}
            className={cn(
              "w-full border-2 border-black rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3",
              selectedPayment === "fpx" && "bg-black text-white",
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0",
                selectedPayment === "fpx" && "border-white",
              )}
            >
              {selectedPayment === "fpx" && <div className="w-3 h-3 rounded-full bg-white" />}
            </div>
            <div
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 border border-black rounded flex items-center justify-center text-xs font-bold flex-shrink-0",
                selectedPayment === "fpx" ? "bg-white text-black" : "bg-gray-200",
              )}
            >
              FPX
            </div>
            <span className="font-bold text-sm sm:text-base">Internet Banking</span>
          </button>

          <button
            onClick={() => setSelectedPayment("tng")}
            className={cn(
              "w-full border-2 border-black rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3",
              selectedPayment === "tng" && "bg-black text-white",
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0",
                selectedPayment === "tng" && "border-white",
              )}
            >
              {selectedPayment === "tng" && <div className="w-3 h-3 rounded-full bg-white" />}
            </div>
            <div
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 border border-black rounded flex items-center justify-center text-xs font-bold flex-shrink-0",
                selectedPayment === "tng" ? "bg-white text-black" : "bg-gray-200",
              )}
            >
              TNG
            </div>
            <span className="font-bold text-sm sm:text-base">Touch 'n Go E-Wallet</span>
          </button>

          <button
            onClick={() => setSelectedPayment("card")}
            className={cn(
              "w-full border-2 border-black rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3",
              selectedPayment === "card" && "bg-black text-white",
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0",
                selectedPayment === "card" && "border-white",
              )}
            >
              {selectedPayment === "card" && <div className="w-3 h-3 rounded-full bg-white" />}
            </div>
            <div
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 border border-black rounded flex items-center justify-center text-xs font-bold flex-shrink-0",
                selectedPayment === "card" ? "bg-white text-black" : "bg-gray-200",
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
            className="flex-1 border-2 border-black font-bold text-base sm:text-lg py-5 sm:py-6"
          >
            Back
          </Button>
          <Button
            onClick={() => setCurrentPage("confirmed")}
            variant="outline"
            className="flex-1 border-2 border-black font-bold text-base sm:text-lg py-5 sm:py-6"
          >
            Proceed
          </Button>
        </div>
      </div>

      <NavBar active="track" />
    </div>
  )

  const ConfirmedPage = () => (
    <div className="min-h-screen bg-white pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-black p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center font-bold text-xs sm:text-sm">
          Logo
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-5 sm:space-y-6 flex flex-col items-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black flex items-center justify-center mt-4 sm:mt-8">
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={3} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Confirmed</h1>
          <p className="text-xs sm:text-sm">Booking placed, sit back and relax</p>
        </div>

        <div className="w-full space-y-3 sm:space-y-4 border-t-2 border-black pt-4 sm:pt-6">
          <div>
            <p className="font-bold mb-1 text-sm sm:text-base">Machine Type</p>
            <p className="text-sm sm:text-base">Washer</p>
          </div>
          <div className="border-t-2 border-black pt-3 sm:pt-4">
            <p className="font-bold mb-1 text-sm sm:text-base">Machine Number</p>
            <p className="text-sm sm:text-base">Washer W2</p>
          </div>
          <div className="border-t-2 border-black pt-3 sm:pt-4">
            <p className="font-bold mb-1 text-sm sm:text-base">Date and Time</p>
            <p className="text-sm sm:text-base">Dec 15, Monday</p>
            <p className="text-sm sm:text-base">10:00 AM</p>
          </div>
        </div>

        <div className="w-full border-2 border-black rounded-lg p-3 sm:p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1 text-sm sm:text-base">How to activate the machine ?</p>
              <p className="text-xs sm:text-sm">
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
    <div className="min-h-screen bg-white pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-black p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center font-bold text-xs sm:text-sm">
          Logo
        </div>
        <h1 className="text-lg sm:text-xl font-bold">Track</h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold mb-2">Monitor your laundry process</h2>
          <div className="border-2 border-black rounded-lg p-3 sm:p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs sm:text-sm font-bold mb-1">Current Order</p>
                <div>
                  <p className="text-xs sm:text-sm font-bold">Order ID</p>
                  <p className="text-xs sm:text-sm">ORD-2025-003</p>
                </div>
              </div>
              <div className="border-2 border-black rounded px-2 sm:px-3 py-1 font-bold text-xs sm:text-sm">
                Washer W2
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-xs sm:text-sm font-bold">Progress</p>
                  <p className="text-xs sm:text-sm">65%</p>
                </div>
                <div className="h-2 sm:h-3 border-2 border-black rounded-full overflow-hidden">
                  <div className="h-full bg-black" style={{ width: "65%" }} />
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Shirt className="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="flex-1">
                  <p className="font-bold text-xs sm:text-sm">Washing</p>
                  <p className="text-xs">In Progress</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 opacity-50">
                <Shirt className="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="flex-1">
                  <p className="font-bold text-xs sm:text-sm">Ready for pickup</p>
                  <p className="text-xs">10:45 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-black rounded-lg p-3 sm:p-4 mt-3 sm:mt-4 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-bold text-xs sm:text-sm">10 minutes remaining</span>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold mb-2">Order History</h2>
          <div className="border-2 border-black rounded-lg p-3 sm:p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-sm sm:text-base">ORD-2025-001</p>
                <p className="text-xs sm:text-sm">Dryer D1</p>
              </div>
              <div className="text-right">
                <div className="border-2 border-black rounded px-2 sm:px-3 py-1 font-bold mb-1 text-xs sm:text-sm">
                  Completed
                </div>
                <p className="text-xs sm:text-sm">Dec 3, 12:00PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavBar active="track" />
    </div>
  )

  const AlertsPage = () => (
    <div className="min-h-screen bg-white pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-black p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center font-bold text-xs sm:text-sm">
          Logo
        </div>
        <h1 className="text-lg sm:text-xl font-bold">Alerts</h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-bold">Stay updated with your laundry</h2>

        <div className="border-2 border-black rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3">
          <Shirt className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="font-bold text-sm sm:text-base">Laundry Complete!</p>
            <p className="text-xs sm:text-sm">Your wash cycle in WS has finished. Please collect your laundry.</p>
            <p className="text-xs text-gray-500 mt-1">1 min ago</p>
          </div>
        </div>

        <div className="border-2 border-black rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3">
          <Gift className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="font-bold text-sm sm:text-base">Reward Unlocked!</p>
            <p className="text-xs sm:text-sm">You've earned 50 points! Redeem for a free wash cycle.</p>
            <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
          </div>
        </div>

        <div className="border-2 border-black rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="font-bold text-sm sm:text-base">Booking Reminder</p>
            <p className="text-xs sm:text-sm">Your schedule wash is starting in 15 minutes at Washer W3.</p>
            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
          </div>
        </div>

        <div className="border-2 border-black rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="font-bold text-sm sm:text-base">Machine Available</p>
            <p className="text-xs sm:text-sm">Dryer D3 is now available. Book before it's taken!</p>
            <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
          </div>
        </div>

        <div className="border-2 border-black rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3 bg-gray-50">
          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="font-bold text-sm sm:text-base">Payment Confirmed</p>
            <p className="text-xs sm:text-sm">Your payment of RM5.00 has been processed successfully.</p>
            <p className="text-xs text-gray-500 mt-1">1 day ago</p>
          </div>
        </div>
      </div>

      <NavBar active="alerts" />
    </div>
  )

  const ProfilePage = () => (
    <div className="min-h-screen bg-white pb-20 max-w-screen-xl mx-auto">
      <div className="border-b-2 border-black p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center font-bold text-xs sm:text-sm">
          Logo
        </div>
        <h1 className="text-lg sm:text-xl font-bold">Profile</h1>
      </div>

      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-black flex items-center justify-center bg-gray-100">
            <User className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-base sm:text-lg">Name</p>
              <Edit className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm">Premium Member</p>
            <p className="text-xs text-gray-600">Referral Code : XXX2235</p>
          </div>
        </div>

        <div className="border-2 border-black rounded-lg p-3 sm:p-4 flex items-center justify-between">
          <div>
            <p className="text-3xl sm:text-4xl font-bold">125</p>
            <p className="text-xs sm:text-sm">points</p>
            <p className="text-xs sm:text-sm mt-1">Next Reward</p>
          </div>
          <div className="text-right">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1" />
            <p className="text-xs sm:text-sm">25 pts to go</p>
          </div>
        </div>

        <div className="flex border-2 border-black rounded-lg overflow-hidden">
          <button
            onClick={() => setProfileTab("info")}
            className={cn(
              "flex-1 py-2 sm:py-3 font-bold text-sm sm:text-base",
              profileTab === "info" && "bg-black text-white",
            )}
          >
            Profile Info
          </button>
          <button
            onClick={() => setProfileTab("rewards")}
            className={cn(
              "flex-1 py-2 sm:py-3 font-bold border-l-2 border-black text-sm sm:text-base",
              profileTab === "rewards" && "bg-black text-white",
            )}
          >
            Rewards
          </button>
        </div>

        {profileTab === "info" ? (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 border-b-2 border-black">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-bold text-xs sm:text-sm">Email</p>
                <p className="text-xs sm:text-sm">xxxxx@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 border-b-2 border-black">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-bold text-xs sm:text-sm">Phone Number</p>
                <p className="text-xs sm:text-sm">(+60)12-3456789</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 border-b-2 border-black">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-bold text-xs sm:text-sm">Member Since</p>
                <p className="text-xs sm:text-sm">Jan 2024</p>
              </div>
            </div>

            <div>
              <p className="font-bold mb-2 text-sm sm:text-base">Your Stats</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="border-2 border-black rounded-lg p-2 sm:p-3 text-center">
                  <p className="text-xs sm:text-sm font-bold mb-1">Total Washes</p>
                  <p className="text-xl sm:text-2xl font-bold">24</p>
                </div>
                <div className="border-2 border-black rounded-lg p-2 sm:p-3 text-center">
                  <p className="text-xs sm:text-sm font-bold mb-1">Total Drys</p>
                  <p className="text-xl sm:text-2xl font-bold">18</p>
                </div>
                <div className="border-2 border-black rounded-lg p-2 sm:p-3 text-center">
                  <p className="text-xs sm:text-sm font-bold mb-1">Favorite Time</p>
                  <p className="text-lg sm:text-xl font-bold">10:00AM</p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-2 border-black font-bold flex items-center justify-center gap-2 py-5 sm:py-6 bg-transparent"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              Log Out
            </Button>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <div className="border-2 border-black rounded-lg p-3 sm:p-4">
              <p className="font-bold mb-2 text-sm sm:text-base flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                How to earn points ?
              </p>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>
                  • Complete a wash <span className="font-bold">+10 pts</span>
                </li>
                <li>
                  • Complete a dry <span className="font-bold">+8 pts</span>
                </li>
                <li>
                  • Refer a friend <span className="font-bold">+50 pts</span>
                </li>
                <li>
                  • Weekly streak <span className="font-bold">+20 pts</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold mb-2 text-sm sm:text-base">Rewards</p>
              <div className="space-y-2 sm:space-y-3">
                <div className="border-2 border-black rounded-lg p-3 sm:p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Shirt className="w-5 h-5 sm:w-6 sm:h-6" />
                    <div>
                      <p className="font-bold text-sm sm:text-base">Free Wash</p>
                      <p className="text-xs sm:text-sm">Get one free wash cycle</p>
                      <p className="text-xs font-bold">⭐ 100 points</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-2 border-black font-bold text-xs sm:text-sm bg-transparent"
                  >
                    Redeem
                  </Button>
                </div>

                <div className="border-2 border-black rounded-lg p-3 sm:p-4 flex items-center justify-between bg-gray-100">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
                    <div>
                      <p className="font-bold text-sm sm:text-base">50% off</p>
                      <p className="text-xs sm:text-sm">Save 50% on your next booking</p>
                      <p className="text-xs font-bold">⭐ 130 points</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-2 border-black font-bold bg-gray-300 text-xs sm:text-sm"
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
    <div className="min-h-screen bg-gray-100">
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
