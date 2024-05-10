'use client'

import {
  CardIcon,
  GoogleIcon,
  LockIcon,
  SparklesIcon
} from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { readStreamableValue, useActions, useUIState } from 'ai/rsc'
import { useState } from 'react'

type Status =
  | 'requires_confirmation'
  | 'requires_code'
  | 'completed'
  | 'failed'
  | 'expired'
  | 'in_progress'

interface PurchaseProps {
  status: Status
  summary: {
    airline: string
    departureTime: string
    arrivalTime: string
    price: number
    seat: string
  }
}

export const suggestions = [
  'Show flight status',
  'Show boarding pass for flight'
]
