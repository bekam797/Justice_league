'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useToast } from '../../lib/use-toast'
import { getStrapiURL } from 'lib/utils'
import axios from 'axios'

interface ContactFormProps {
  nameLabel?: string
  surnameLabel?: string
  emailLabel?: string
  messageLabel?: string
  submitButtonText?: string
}

export default function ContactForm({
  nameLabel = 'Name',
  surnameLabel = 'Surname',
  emailLabel = 'Email',
  messageLabel = 'Your message',
  submitButtonText = 'Send Message',
}: ContactFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    content: '',
  })

  // Add effect to hide success message after 3 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send data to Strapi API
      const baseUrl = getStrapiURL()
      const url = new URL('/api/email', baseUrl).href

      const response = await axios.post(url, {
        to: 'bekamakharoblishvili@gmail.com',
        from: formData.email,
        subject: `New message from ${formData.name} ${formData.surname}`,
        text: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;>
            <div style="border-radius: 5px;">
              <p style="margin: 10px 0;"><strong style="color: #333;">Name:</strong> ${formData.name}</p>
              <p style="margin: 10px 0;"><strong style="color: #333;">Surname:</strong> ${formData.surname}</p>
              <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> ${formData.email}</p>
              <div style="margin-top: 20px;">
                <strong style="color: #333;">Message:</strong>
                <p style="margin-top: 10px; white-space: pre-wrap;">${formData.content}</p>
              </div>
            </div>
          </div>
        `,
      })

      const responseData = response.data

      if (response.status !== 200) {
        throw new Error('Failed to submit form')
      }

      setIsSuccess(true)
      toast({
        title: 'Message sent',
        description: "We'll get back to you as soon as possible.",
      })

      // Reset form
      setFormData({
        name: '',
        surname: '',
        email: '',
        content: '',
      })
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Input
            name="name"
            placeholder={nameLabel}
            value={formData.name}
            onChange={handleChange}
            required
            className="min-h-[75px] rounded-lg border-zinc-800 bg-[#0B0B0B] text-white placeholder:text-white"
          />
        </div>
        <div>
          <Input
            name="surname"
            placeholder={surnameLabel}
            value={formData.surname}
            onChange={handleChange}
            required
            className="min-h-[75px] rounded-lg border-zinc-800 bg-[#0B0B0B] text-white placeholder:text-white"
          />
        </div>
      </div>
      <div>
        <Input
          name="email"
          type="email"
          placeholder={emailLabel}
          value={formData.email}
          onChange={handleChange}
          required
          className="min-h-[75px] rounded-lg border-zinc-800 bg-[#0B0B0B] text-white placeholder:text-white"
        />
      </div>
      <div>
        <Textarea
          name="content"
          placeholder={messageLabel}
          value={formData.content}
          onChange={handleChange}
          required
          className="min-h-[120px] rounded-lg border-zinc-800 bg-[#0B0B0B] text-white placeholder:text-white"
        />
      </div>
      {isSuccess && (
        <Alert className="border-green-500 bg-[#0B0B0B]">
          <AlertTitle className="font-justice text-2xl text-white">Thank You!</AlertTitle>
          <AlertDescription className="text-zinc-400">
            Your message has been sent successfully. We'll get back to you soon.
          </AlertDescription>
        </Alert>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="font-justice min-h-[75px] w-full cursor-pointer rounded-lg bg-white text-black hover:bg-zinc-200"
      >
        {isSubmitting ? 'Sending...' : submitButtonText}
      </Button>
    </form>
  )
}
