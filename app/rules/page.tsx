import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { RulesList } from '@/components/rules/rules-list'
import { cache } from 'react'
import { getRules } from '../actions'
import { redirect } from 'next/navigation'

const loadRules = cache(async (userId?: string) => {
  return await getRules(userId)
})

export default async function Rules() {
  const session = (await auth()) as Session
  if (!session) {
    redirect('/login')
  }

  return <RulesList userId={session.user.id} />
}
