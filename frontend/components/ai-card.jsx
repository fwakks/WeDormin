"use client"

import { useState } from "react"
import { IconTrendingUp } from "@tabler/icons-react"
import { motion, AnimatePresence } from "framer-motion"

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FaceCard from "./face-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

function AiCard() {
  const [chosen, setChosen] = useState([])
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""

      const response = await fetch(`${apiBaseUrl}/api/user`, {
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error("Failed to fetch user data")
      }
      const userDataResponse = await response.json()
      setUserData(userDataResponse)

      const generation = await fetch(`${apiBaseUrl}/api/students/${userDataResponse.ruid}/similar/3`, {
        credentials: "include",
      })

      if (!generation.ok) {
        throw new Error("Failed to fetch similar students")
      }

      const genData = await generation.json()
      setChosen(genData)
      setIsExpanded(true)
    } catch (error) {
      console.error("Error fetching AI data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card key="AiCard" className="@container/card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">WeFittin?</CardTitle>
        <CardDescription>people WeThinkin you might like</CardDescription>
        <CardAction>
          <Button onClick={handleClick} disabled={isLoading} className="relative">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <IconTrendingUp className="mr-2" />}
            Generate
          </Button>
        </CardAction>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardFooter className="flex flex-row gap-1.5 text-sm pb-4">
              <div className="flex-grow">
                {chosen[0] ? <FaceCard size={32} student={chosen[0]} user={userData} /> : <FaceCard size={32} user={userData} />}
              </div>
              <div className="flex-grow">
                {chosen[1] ? <FaceCard size={32} student={chosen[1]} user={userData} /> : <FaceCard size={32} user={userData} />}
              </div>
              <div className="flex-grow">
                {chosen[2] ? <FaceCard size={32} student={chosen[2]} user={userData} /> : <FaceCard size={32} user={userData} />}
              </div>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default AiCard