'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '../../lib/use-toast'

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
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    content: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send data to Strapi API
      const response = await fetch('http://localhost:1337/api/contacts/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

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
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
