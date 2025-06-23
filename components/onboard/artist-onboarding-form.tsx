"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Upload, User, Briefcase, DollarSign, Globe, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"

const categories = ["Musicians", "Dancers", "Speakers", "DJs"]
const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Mandarin",
  "Japanese",
  "Korean",
  "Arabic",
]
const feeRanges = ["$0-500", "$500-1000", "$1000-1500", "$1500-2000", "$2000-3000", "$3000+"]

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  bio: z.string().min(50, "Bio must be at least 50 characters").max(500, "Bio must be less than 500 characters"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  feeRange: z.string().min(1, "Please select a fee range"),
  location: z.string().min(2, "Please enter your location"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  experience: z.string().min(1, "Please select your experience level"),
  profileImage: z.string().optional(),
  specialties: z.string().min(10, "Please describe your specialties (minimum 10 characters)"),
  availability: z.string().min(1, "Please select your availability status"),
})

type FormData = z.infer<typeof formSchema>

const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

const progressVariants = {
  hidden: { width: 0 },
  visible: { width: "100%" },
}

export function ArtistOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      categories: [],
      languages: [],
      feeRange: "",
      location: "",
      website: "",
      experience: "",
      profileImage: "",
      specialties: "",
      availability: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Form submitted:", data)

      toast({
        title: "Application Submitted Successfully!",
        description:
          "Thank you for joining Artistly. We'll review your application and get back to you within 2-3 business days.",
      })

      // Reset form
      form.reset()
      setCurrentStep(1)
      setSelectedCategories([])
      setSelectedLanguages([])
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category)

    setSelectedCategories(updatedCategories)
    form.setValue("categories", updatedCategories)
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    const updatedLanguages = checked
      ? [...selectedLanguages, language]
      : selectedLanguages.filter((l) => l !== language)

    setSelectedLanguages(updatedLanguages)
    form.setValue("languages", updatedLanguages)
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Professional Details", icon: Briefcase },
    { number: 3, title: "Pricing & Availability", icon: DollarSign },
    { number: 4, title: "Additional Info", icon: Globe },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </motion.div>
              <div className="ml-3 hidden sm:block">
                <p
                  className={`text-sm font-medium transition-colors ${currentStep >= step.number ? "text-blue-600" : "text-gray-400"}`}
                >
                  Step {step.number}
                </p>
                <p
                  className={`text-sm transition-colors ${currentStep >= step.number ? "text-gray-900" : "text-gray-400"}`}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden sm:block w-16 h-0.5 ml-6 bg-gray-300 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-blue-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: currentStep > step.number ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / 4) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center text-xl">
                      <User className="mr-3 h-6 w-6" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Full Name *</FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                <Input
                                  placeholder="Enter your full name"
                                  className="border-2 focus:border-blue-500"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Email Address *</FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                <Input
                                  type="email"
                                  placeholder="your.email@example.com"
                                  className="border-2 focus:border-blue-500"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Phone Number *</FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                <Input
                                  placeholder="+1 (555) 123-4567"
                                  className="border-2 focus:border-blue-500"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Location *</FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                <Input
                                  placeholder="City, State/Country"
                                  className="border-2 focus:border-blue-500"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Professional Bio *</FormLabel>
                          <FormControl>
                            <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                              <Textarea
                                placeholder="Tell us about yourself, your experience, and what makes you unique as a performer..."
                                className="min-h-[120px] border-2 focus:border-blue-500 resize-none"
                                {...field}
                              />
                            </motion.div>
                          </FormControl>
                          <FormDescription className="flex justify-between">
                            <span>Minimum 50 characters required</span>
                            <span className={field.value?.length >= 50 ? "text-green-600" : "text-gray-500"}>
                              {field.value?.length || 0}/500 characters
                            </span>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center text-xl">
                      <Briefcase className="mr-3 h-6 w-6" />
                      Professional Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    <FormField
                      control={form.control}
                      name="categories"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Performance Categories *</FormLabel>
                          <FormDescription>Select all categories that apply to your performances</FormDescription>
                          <div className="grid grid-cols-2 gap-4">
                            {categories.map((category, index) => (
                              <motion.div
                                key={category}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-3 p-3 rounded-lg border-2 hover:border-purple-300 transition-colors"
                              >
                                <Checkbox
                                  id={category}
                                  checked={selectedCategories.includes(category)}
                                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <Label htmlFor={category} className="font-medium cursor-pointer">
                                  {category}
                                </Label>
                              </motion.div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="languages"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Languages Spoken *</FormLabel>
                          <FormDescription>Select all languages you can perform or communicate in</FormDescription>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {languages.map((language, index) => (
                              <motion.div
                                key={language}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="flex items-center space-x-2 p-2 rounded-lg border hover:border-purple-300 transition-colors"
                              >
                                <Checkbox
                                  id={language}
                                  checked={selectedLanguages.includes(language)}
                                  onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <Label htmlFor={language} className="text-sm cursor-pointer">
                                  {language}
                                </Label>
                              </motion.div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Experience Level *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-2 focus:border-purple-500">
                                  <SelectValue placeholder="Select your experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                                <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                                <SelectItem value="experienced">Experienced (5-10 years)</SelectItem>
                                <SelectItem value="expert">Expert (10+ years)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Website/Portfolio URL</FormLabel>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                <Input
                                  placeholder="https://your-website.com"
                                  className="border-2 focus:border-purple-500"
                                  {...field}
                                />
                              </motion.div>
                            </FormControl>
                            <FormDescription>Optional: Link to your website or portfolio</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="specialties"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Specialties & Skills *</FormLabel>
                          <FormControl>
                            <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                              <Textarea
                                placeholder="Describe your specific skills, genres, styles, or unique offerings..."
                                className="min-h-[100px] border-2 focus:border-purple-500 resize-none"
                                {...field}
                              />
                            </motion.div>
                          </FormControl>
                          <FormDescription>
                            Examples: Jazz vocals, contemporary dance, motivational speaking, electronic music
                            production
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Pricing & Availability */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center text-xl">
                      <DollarSign className="mr-3 h-6 w-6" />
                      Pricing & Availability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="feeRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Fee Range *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-2 focus:border-green-500">
                                  <SelectValue placeholder="Select your typical fee range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {feeRanges.map((range) => (
                                  <SelectItem key={range} value={range}>
                                    {range}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              This is your typical range for standard performances. Custom quotes can be provided for
                              specific events.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Current Availability *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-2 focus:border-green-500">
                                  <SelectValue placeholder="Select your current availability" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="available">Available - Actively taking bookings</SelectItem>
                                <SelectItem value="busy">Busy - Limited availability</SelectItem>
                                <SelectItem value="unavailable">Unavailable - Not taking new bookings</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200"
                    >
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" />
                        Pricing Guidelines
                      </h4>
                      <ul className="text-sm text-green-700 space-y-2">
                        <li>• Consider your experience level and market rates</li>
                        <li>• Factor in travel time, setup, and performance duration</li>
                        <li>• You can always negotiate custom rates for special events</li>
                        <li>• Higher rates often reflect premium quality and experience</li>
                      </ul>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Additional Information */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50">
                  <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center text-xl">
                      <Globe className="mr-3 h-6 w-6" />
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    <FormField
                      control={form.control}
                      name="profileImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Profile Image</FormLabel>
                          <FormControl>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                              className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center bg-gradient-to-br from-orange-50 to-yellow-50 hover:border-orange-400 transition-colors"
                            >
                              <Upload className="mx-auto h-12 w-12 text-orange-400 mb-4" />
                              <div>
                                <Label htmlFor="file-upload" className="cursor-pointer">
                                  <span className="text-lg font-medium text-gray-900 hover:text-orange-600 transition-colors">
                                    Upload a profile photo
                                  </span>
                                  <Input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        field.onChange(file.name)
                                      }
                                    }}
                                  />
                                </Label>
                                <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                              </div>
                            </motion.div>
                          </FormControl>
                          <FormDescription>
                            Optional: A professional photo helps build trust with potential clients
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200"
                    >
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        What happens next?
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-2">
                        <li>• We'll review your application within 2-3 business days</li>
                        <li>• You'll receive an email confirmation once approved</li>
                        <li>• Your profile will be visible to event planners</li>
                        <li>• You can start receiving booking requests immediately</li>
                        <li>• Our support team will help you optimize your profile</li>
                      </ul>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-between pt-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Previous
              </Button>
            </motion.div>

            {currentStep < 4 ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="button" onClick={nextStep} className="px-6 py-3 group">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 group"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </form>
      </Form>
    </div>
  )
}
